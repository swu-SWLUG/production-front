import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../styles/Notice.css"

const RecentNotices = ({ data }) => {
    const noticesList = data;
    const navigate = useNavigate();

    console.log(noticesList);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).replace(/-/g, ".").replace(/\.$/, "");
    };

    const handleMoreClick = () => {
        window.scrollTo(0, 0);
    };

    const handleNoticeClick = (noticeId) => {
        navigate(`/notice/${noticeId}`);
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h2
                className="font-bold text-center mb-8"
                style={{fontSize: '20px'}}
            >
                공지사항<span className="ml-2">📌</span>
            </h2>

            <div className="notice-list">
                <div className="main-notice-header flex items-center justify-between py-3 border-b-2 border-black font-bold text-center">
                    <div className="flex-grow text-center">제목</div>
                    <div className="flex-shrink-0 w-64">작성일</div>
                    <div className="flex-shrink-0 w-32">작성자</div>
                </div>
                {noticesList.map((notice) => (
                    <div
                        key={notice.id}
                        className="main-notice-item flex items-center justify-between py-3 border-b border-gray-300 hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleNoticeClick(notice.id)}
                    >
                        <div className="flex-grow text-left pl-16">{notice.noticeTitle}</div>
                        <div className="flex-shrink-0 w-64 text-center">{formatDate(notice.createdAt)}</div>
                        <div className="flex-shrink-0 w-32 text-center">{notice.nickname || notice.userId}</div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end mt-4">
                <Link
                    to="/notice"
                    onClick={handleMoreClick}
                    className="flex items-center justify-center text-sm px-4 py-2 border border-gray-500 rounded-full hover:bg-gray-100 transition"
                    style={{
                        borderRadius: '9999px',
                        border: '1px solid #555',
                        padding: '0.5rem 1.5rem',
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                    }}
                >
                    MORE →
                </Link>
            </div>
        </div>
    );
};

export default RecentNotices;