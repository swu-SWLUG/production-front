import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';
import Info from "../../components/MyPage/MyPageInfo";
import "../../services/blogAPI"
import "../../styles/MyPage.css";
import { useNavigate } from "react-router-dom";
import {deletePost} from "../../services/blogAPI";

function MyPage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 7;
  const [totalPage, setTotalPage] = useState(1);
  const navigate = useNavigate();

  const user = useSelector(state => state.auth.user);
  const localUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get('/api/mypage', {
          withCredentials: true
        });

        if (response.status === 200) {
          console.log(response.data.blogInfo);
          const blogPosts = response.data.blogInfo || [];
          setPosts(blogPosts.map(post => ({
            id: post.id,
            title: post.boardTitle,
            contents: post.boardContents,
            date: new Date(post.createAt).toLocaleDateString(),
            category: post.boardCategory,
            isPin: post.isPin,
            isSecure: post.isSecure,
            isDelete: post.isDelete
          })));
          setTotalPage(Math.ceil(blogPosts.length / postsPerPage));
        }
      } catch (error) {
        if (error.response?.status === 401) {
          alert('로그인이 필요합니다.');
          navigate('/users/login');
        } else {
          console.error('게시물 불러오기 실패:', error);
          alert('게시물을 불러오는데 실패했습니다.');
        }
      }
    };

    fetchUserPosts();
  }, [navigate]);

  const handleDelete = async (e, boardId) => {
    e.stopPropagation();
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const response = await deletePost({id: boardId});
        if (response.status === 200) {
          const updatedPosts = posts.filter((post) => post.id !== boardId); // boardId -> id
          setPosts(updatedPosts);
          setTotalPage(Math.ceil(updatedPosts.length / postsPerPage));
          alert('게시물이 성공적으로 삭제되었습니다.');
        }
      } catch (error) {
        console.error("게시물 삭제 실패: ", error);
        alert("게시물 삭제에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  const handleEdit = (e, post) => {
    e.stopPropagation(); // 이벤트 전파 중지
    navigate('/board/write', {
      state: {
        post,
        isMyPageEdit: true
      }
    });
  };

  const handlePostClick = (postId) => {
    navigate(`/board/${postId}`);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPage) return;
    setCurrentPage(page);
  };

  const currentPosts = posts.slice(
      (currentPage - 1) * postsPerPage,
      currentPage * postsPerPage
  );

  return (
      <div className="mypage">
        <h1 className="form_title">마이 페이지</h1>

        <Info />

        <section className="user-posts">
          <h2 className="form_subtitle">작성한 글</h2>
          <div className="posts-list">
            {currentPosts.length > 0 ? (
                currentPosts.map((post, index) => {
                  const displayNumber = posts.length - ((currentPage - 1) * postsPerPage + index);
                  return (
                      <div
                          className="post-item"
                          key={post.id}
                          onClick={() => handlePostClick(post.id)}
                          style={{ cursor: 'pointer' }}
                      >
                        <span className="post-number">{displayNumber}</span>
                        <div className="post-title">
                    <span className="title-text">
                      {post.title}
                    </span>
                          {post.isPin && <span className="pin-badge">공지</span>}
                          {post.isSecure > 0 && <span className="secure-badge">비공개</span>}
                        </div>
                        <span className="post-date">{post.date}</span>
                        <button
                            className="edit-btn"
                            onClick={(e) => handleEdit(e, post)}
                            disabled={post.isDelete > 0}
                        >
                          수정
                        </button>
                        <button
                            className="delete-btn"
                            onClick={(e) => handleDelete(e, post.id)}  // post.boardId -> post.id                            disabled={post.isDelete > 0}
                        >
                          삭제
                        </button>
                      </div>
                  );
                })
            ) : (
                <div className="no-posts">게시물이 없습니다.</div>
            )}
          </div>

          {totalPage > 1 && (
              <div className="pagination">
                <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                  &lt;&lt;
                </button>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                  &lt;
                </button>
                {[...Array(totalPage)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? "active" : ""}
                    >
                      {index + 1}
                    </button>
                ))}
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPage}>
                  &gt;
                </button>
                <button onClick={() => handlePageChange(totalPage)} disabled={currentPage === totalPage}>
                  &gt;&gt;
                </button>
              </div>
          )}
        </section>
      </div>
  );
};

export default MyPage;