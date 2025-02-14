import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux'; // 추가됨
import axios from 'axios';
import "../../styles/BlogMain.css";
import TagFilter from "../../components/Blog/TagFilter";
import { getAllTags } from "../../services/blogAPI";

const BlogMain = () => {
    const {isAuthenticated} = useSelector(state => state.auth); // 추가됨
    const [posts, setPosts] = useState([]); // 게시물 데이터
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    // const [tags, setTags] = useState(["인턴", "채용", "BOB", "등록X"]); // 태그 목록
    const [selectedTag, setSelectedTag] = useState(""); // 선택된 태그
    const [tags, setTags] = useState([]); // 선택된 태그들을 배열로 관리
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
    const [totalElements, setTotalElements] = useState(0);
    const userRole = localStorage.getItem("userRole"); // 로컬 스토리지에서 역할 가져오기
    const allowedRoles = ["ROLE_USER", "ROLE_ADMIN"]; // 글쓰기 허용된 역할


    const postsPerPage = 9; // 한 페이지에 표시할 게시물 수
    const navigate = useNavigate(); // 페이지 이동을 위한 hook

    // URL 파라미터 읽기
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const initialCategory = searchParams.get("category") || "";
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);

    const fetchBlogs = async (page, search, tags) => {
        try {
            setError(null);
            setLoading(true);

            // 검색어 전처리 제거 - 서버에서 처리
            const response = await axios.get(
                `/api/blog?page=${page}&category=${selectedCategory}&searchTerm=${search}&size=${postsPerPage}&tags=${tags}`,
                {
                    withCredentials: true, // 세션 쿠키 포함
                }
            );
            setPosts(response.data.blogs);
            setTotalPages(response.data.totalPages);
            setTotalElements(response.data.totalElements);
        } catch (error) {
            setError('블로그를 불러오는데 실패했습니다.');
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };


    const handleBlogTitleClick = () => {
        setCurrentPage(1);
        setSelectedCategory("");
        setSelectedTag("");
        setSearchTerm("");
        navigate("/blog");
        window.scrollTo(0, 0);
        fetchBlogs(1, "", "");
    };

    useEffect(() => {
        const setAllTags = async () => {
            try {
                const allTags = await getAllTags();
                setTags(allTags);
            } catch (error) {
                setError('모든 태그를 불러오는데 실패했습니다.');
                console.error("Error fetching tags:", error);
            }
        };

        setAllTags();
        fetchBlogs(currentPage, searchTerm, selectedTag);
    }, [currentPage, selectedCategory]);

    const categoryMapping = {
        "0": "공지사항",
        "1": "성과",
        "2": "정보",
        "3": "후기",
        "4": "활동",
    };


    useEffect(() => {
        // 검색어 없을 때만 currentPage 변경으로 API 호출
        if (!searchTerm) {
            fetchBlogs(currentPage, searchTerm, selectedTag);
        }
    }, [currentPage]);

    // 게시물 필터링
    useEffect(() => {
        setSelectedCategory(initialCategory); // URL 파라미터 기반으로 상태 초기화
    }, [initialCategory]);

    // 게시물 클릭 시 상세 페이지로 이동
    const handlePostClick = (boardId) => {
        navigate(`/board/${boardId}`);
        window.scrollTo(0, 0);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    const handleSearch = (term) => {
        setCurrentPage(1);
        fetchBlogs(1, term, selectedTag);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(searchTerm);
        }
    };

    // 페이지 변경 핸들러
    const handleSearchClick = () => {
        handleSearch(searchTerm);
        window.scrollTo(0, 0);
    };

    // 태그 선택 핸들러
    const handleTagSelect = (tag) => {
        setSelectedTag(tag);
        setCurrentPage(1); // 태그 선택 시 첫 페이지로 이동
        fetchBlogs(currentPage, searchTerm, tag);
    };

    // const handleTagSelect = (tag) => {
    //     setSelectedTag(tag);
    //     if (tags.includes(tag)) {
    //         setTags(tags.filter(t => t !== tag)); // 이미 선택된 태그는 제거
    //     } else {
    //         setTags([...tags, tag]); // 새 태그는 배열에 추가
    //     }
    //     setCurrentPage(1); // 태그가 바뀌면 첫 페이지로 이동
    // };

    // const handleTagSelect = (tag) => {
    //     setSelectedTag((prevSelected) => {
    //         if (prevSelected.includes(tag)) {
    //             return prevSelected.filter(t => t !== tag); // 이미 선택된 태그 제거
    //         } else {
    //             return [...prevSelected, tag]; // 새 태그 추가
    //         }
    //     });
    //
    //     setTags((prevTags) => {
    //         if (prevTags.includes(tag)) {
    //             return prevTags.filter(t => t !== tag);
    //         } else {
    //             return [...prevTags, tag];
    //         }
    //     });
    //
    //     setCurrentPage(1); // 태그 변경 시 첫 페이지로 이동
    // };


    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const getPageNumbers = () => {
        const groupSize = 3;
        const currentGroup = Math.ceil(currentPage / groupSize);
        const startPage = (currentGroup - 1) * groupSize + 1;
        const endPage = Math.min(startPage + groupSize - 1, totalPages);

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const getNextGroupFirstPage = () => {
        const groupSize = 3;
        return Math.min(Math.ceil(currentPage / groupSize) * groupSize + 1, totalPages);
    };

    const getPrevGroupFirstPage = () => {
        const groupSize = 3;
        return Math.max(Math.floor((currentPage - 1) / groupSize) * groupSize - 2, 1);
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber !== currentPage) {
            setCurrentPage(pageNumber);
            window.scrollTo(0, 0);
        }
    };

    // 글 작성 페이지로 이동
    const goToWritePage = (boardType) => {
        navigate("/board/write", {state: {boardType}});
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-white">
            <h1
                className="apply-title font-bold text-center mb-6 cursor-pointer hover:text-gray-700"
                onClick={handleBlogTitleClick}
            >
                Blog
            </h1>
            {/* 검색 */}
            <div className="flex justify-end mb-6">
                <div className="search-bar flex items-center border rounded-full shadow-sm px-4 py-2">
                    <span className="text-sm text-gray-700 mr-2">제목</span>
                    <div className="border-r border-gray-400 h-4 mx-2"></div>
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyPress={handleKeyPress}
                        className="flex-grow border-none focus:outline-none text-sm text-gray-700"
                    />
                    <button
                        onClick={handleSearchClick}
                        className="flex items-center justify-center text-gray-700 hover:text-black"
                    >
                        🔍
                    </button>
                </div>    
            </div>
            {/* 태그 필터 */}    
            <div className="tags-total">
                <div className="tags">
                    <h3 className="tag-title">Tags</h3>
                    <TagFilter
                        tags={tags}
                        selectedTag={selectedTag}
                        setSelectedTag={handleTagSelect}
                    />
                </div>                
            </div>

            {/* 게시물 리스트 */}
            <h3 className="posts-title">Posts</h3>

            {error ? (
                <div className="flex justify-center items-center py-20 text-red-500">
                    {error}
                </div>
            ) : loading ? (
                <div className="flex justify-center items-center py-20">Loading...</div>
            ) : posts.length > 0 ? (
                <div className="posts-container">
                    <div className="posts">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="post-card"
                                onClick={() => handlePostClick(post.id)}
                            >
                                <div className="post-card-image-container">
                                    <img
                                        src={post.image && post.image.length > 0
                                            ? post.image[0]
                                            : "/apply_swlug.png"}
                                        alt={post.boardTitle || "게시물 이미지"}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "/apply_swlug.png";
                                        }}
                                    />
                                </div>
                                <p className="posts-category">{post.categoryName}</p>
                                <div className="post-title-container">
                                    <p className="post-title">{post.boardTitle}</p>
                                </div>
                                <div className="post-info-main">
                                    <p className="post-writer">{post.nickname}</p>
                                    <p className="post-date">{formatDate(post.createAt)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="no-posts-container">
                    <p className="no-posts">등록된 글이 없습니다.</p>
                </div>
            )}


            {/* 글쓰기 버튼 컨테이너는 항상 존재하고, 버튼만 조건부 표시 */}

            <div className="write-button-container">
                {isAuthenticated && allowedRoles.includes(userRole) && (
                    <button
                        className="write-button"
                        onClick={() => {
                            goToWritePage("blog");
                            window.scrollTo(0, 0);
                        }}
                    >
                        글쓰기
                    </button>
                )}
            </div>

            {/* 페이지네이션 */}

            {totalPages > 1 && (
                <div className="pagination flex justify-center space-x-2 text-gray-700">
                    <button
                        onClick={() => handlePageChange(getPrevGroupFirstPage())}
                        disabled={currentPage <= 3}
                        className={`text-base px-2 hover:text-black ${
                            currentPage <= 3 && "text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        &lt;&lt;
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`text-base px-2 hover:text-black ${
                            currentPage === 1 && "text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        &lt;
                    </button>
                    {getPageNumbers().map((pageNum) => (
                        <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`text-base px-3 ${
                                currentPage === pageNum
                                    ? "font-extrabold text-black"
                                    : "text-gray-700 hover:text-black"
                            }`}
                        >
                            {pageNum}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`text-base px-2 hover:text-black ${
                            currentPage === totalPages && "text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        &gt;
                    </button>
                    <button
                        onClick={() => handlePageChange(getNextGroupFirstPage())}
                        disabled={currentPage > Math.floor(totalPages / 3) * 3}
                        className={`text-base px-2 hover:text-black ${
                            currentPage > Math.floor(totalPages / 3) * 3 &&
                            "text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        &gt;&gt;
                    </button>
                </div>
            )}
        </div>
    );
};

export default BlogMain;