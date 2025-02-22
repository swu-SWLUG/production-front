import React, { useEffect, useState } from "react";
import {useParams, useNavigate, useLocation} from "react-router-dom";
import "../../styles/BlogPost.css";
import "../../services/blogAPI"
import axios from "axios";
import {deletePost} from "../../services/blogAPI";

const BlogPost = () => {
    const { boardId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [adjacentPosts, setAdjacentPosts] = useState({ previous: null, next: null });
    const isMyPageEdit = location.state?.isMyPageEdit || false;
    const currentUserId = localStorage.getItem("userId");

    useEffect(() => {
        window.scrollTo(0,0);
    }, [boardId]);

    const handleCategoryClick = (category) => {
        navigate(`/blog?category=${category}`);
        window.scrollTo(0, 0);
    };

    const handleNavigate = (id) => {
        navigate(`/board/${id}`);
        window.scrollTo(0, 0);
    };

    const handleDelete = async () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
                await deletePost({id: boardId});
                alert("게시물이 삭제되었습니다.");
                navigate(isMyPageEdit ? "/users/mypage" : "/blog");
            } catch (error) {
                console.error("게시물 삭제 실패: ", error);
                if (error.response?.status === 401) {
                    alert("로그인이 필요하거나 삭제 권한이 없습니다.");
                } else {
                    alert("게시물 삭제에 실패했습니다. 다시 시도해주세요.");
                }
            }
        }
    };

    const handleEdit = () => {
        navigate("/board/write", { state: { post } });
        window.scrollTo(0,0);
    };

    const truncateTitle = (title) => {
        if (!title) return '';
        return title.length > 20 ? `${title.substring(0, 20)}...` : title;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [blogResponse, adjacentResponse] = await Promise.all([
                    axios.post("/api/blog/detail", {id: boardId}),
                    axios.post("/api/blog/adjacent", {id: boardId})
                ]);
                console.log(blogResponse.data);

                setPost({
                    id: blogResponse.data.id,
                    userId: blogResponse.data.userId,
                    title: blogResponse.data.boardTitle,
                    date: blogResponse.data.createAt,
                    author: blogResponse.data.nickname,
                    contents: blogResponse.data.boardContents,
                    tag: blogResponse.data.tag,
                    image: blogResponse.data.image,  // imageFiles에서 image로 수정
                    category: blogResponse.data.boardCategory
                });

                setAdjacentPosts({
                    previous: adjacentResponse.data.previous || null,
                    next: adjacentResponse.data.next || null
                });

                setLoading(false);
            } catch (error) {
                console.error("데이터 로딩 실패: ", error);
                setLoading(false);
            }
        };
        fetchData()
    }, [boardId]);

    if (loading) return <p>Loading...</p>;

    if (!post) return <p>게시물을 찾을 수 없습니다.</p>;

    const categoryMapping = {
        "0": "공지사항",
        "1": "성과",
        "2": "정보",
        "3": "후기",
        "4": "활동",
    };

    const formatDate = (date) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        };
        return new Date(date)
            .toLocaleDateString('ko-KR', options)
            .replace(/\s/g, '')
            .replace(/.$/, '');  // 마지막 점 제거
    };

    return (
        <div className="blog-post">
            <div
                className="post-category"
                onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick(post.category);
                }}
                style={{cursor: 'pointer'}}
            >
                {categoryMapping[post.category]}
            </div>
            <h1>{post.title}</h1>
            <div className="post-info">
                <div className="metadata">
                    <span className="author">{post.author}</span>
                    <span className="divider">|</span>
                    <span className="date">{formatDate(post.date)}</span>
                </div>
                {currentUserId === post.userId && (
                    <div className="button-group">
                        <button className="edit-btn" onClick={handleEdit}>수정</button>
                        <button className="delete-btn" onClick={handleDelete}>삭제</button>
                    </div>
                )}
            </div>
            <div className="ck-content" dangerouslySetInnerHTML={{__html: post.contents}}/>

            <div className="post-tags">
                {post.tag && post.tag.map((tag, index) => (
                    <span key={index} className="tag">
                       #{tag}
                   </span>
                ))}
            </div>

            <div className="navigation">
                <button
                    onClick={() => adjacentPosts.previous && handleNavigate(adjacentPosts.previous.id)}
                    disabled={!adjacentPosts.previous}
                >
                    {adjacentPosts.previous ? (
                        <>
                            <span className="nav-label">&lt; 이전글</span>
                            <span className="nav-title">
                               {truncateTitle(adjacentPosts.previous.blogTitle)}
                           </span>
                        </>
                    ) : (
                        <span className="nav-label">&lt; 글이 없습니다</span>
                    )}
                </button>
                <button
                    onClick={() => adjacentPosts.next && handleNavigate(adjacentPosts.next.id)}
                    disabled={!adjacentPosts.next}
                >
                    {adjacentPosts.next ? (
                        <>
                           <span className="nav-title">
                               {truncateTitle(adjacentPosts.next.blogTitle)}
                           </span>
                            <span className="nav-label">다음글 &gt;</span>
                        </>
                    ) : (
                        <span className="nav-label">글이 없습니다 &gt;</span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default BlogPost;