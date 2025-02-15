import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';
import "../../styles/BlogMain.css";
import TagFilter from "../../components/Blog/TagFilter";
import { getAllTags } from "../../services/blogAPI";

const BlogMain = () => {
    const {isAuthenticated} = useSelector(state => state.auth);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTag, setSelectedTag] = useState("");
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const userRole = localStorage.getItem("userRole");
    const allowedRoles = ["ROLE_USER", "ROLE_ADMIN"];

    const postsPerPage = 9;
    const navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const initialCategory = searchParams.get("category") || "";
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);

    const fetchBlogs = async (page, search, tags) => {
        try {
            setError(null);
            setLoading(true);

            console.log('API 요청:', { page, category: selectedCategory, search, tags });

            const response = await axios.get(
                `/api/blog?page=${page}&category=${selectedCategory}&searchTerm=${search}&size=${postsPerPage}&tags=${tags}`,
                {
                    withCredentials: true,
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache'
                    }
                }
            );

            console.log('API 응답:', response.data);

            setPosts(response.data?.blogs || []);
            setTotalPages(response.data?.totalPages || 1);
            setTotalElements(response.data?.totalElements || 0);
        } catch (error) {
            console.error('API 에러:', error);
            setError('블로그를 불러오는데 실패했습니다.');
            setPosts([]);
            setTotalPages(1);
            setTotalElements(0);
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
                setTags(allTags || []);
            } catch (error) {
                console.error('태그 로드 에러:', error);
                setError('태그를 불러오는데 실패했습니다.');
                setTags([]);
            }
        };

        setAllTags();
        fetchBlogs(currentPage, searchTerm, selectedTag);
    }, [currentPage, selectedCategory, selectedTag]);

    const categoryMapping = {
        "0": "공지사항",
        "1": "성과",
        "2": "정보",
        "3": "후기",
        "4": "활동",
    };

    useEffect(() => {
        if (!searchTerm) {
            fetchBlogs(currentPage, searchTerm, selectedTag);
        }
    }, [currentPage]);

    useEffect(() => {
        setSelectedCategory(initialCategory);
    }, [initialCategory]);

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

    const handleSearchClick = () => {
        handleSearch(searchTerm);
        window.scrollTo(0, 0);
    };

    const handleTagSelect = (tag) => {
        setSelectedTag(tag);
        setCurrentPage(1);
        fetchBlogs(1, searchTerm, tag);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const getPageNumbers = () => {
        if (!totalPages) return [];

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
            <div className="tags-total">
                <div className="tags">
                    <h3 className="tag-title">Tags</h3>
                    <TagFilter
                        tags={tags || []}
                        selectedTag={selectedTag}
                        setSelectedTag={handleTagSelect}
                    />
                </div>
            </div>

            <h3 className="posts-title">Posts</h3>

            {error ? (
                <div className="flex justify-center items-center py-20 text-red-500">
                    {error}
                </div>
            ) : loading ? (
                <div className="flex justify-center items-center py-20">Loading...</div>
            ) : Array.isArray(posts) && posts.length > 0 ? (
                <div className="posts-container">
                    <div className="posts">
                        {posts.map((post, index) => (
                            <div
                                key={post?.id || index}
                                className="post-card"
                                onClick={() => post?.id && handlePostClick(post.id)}
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