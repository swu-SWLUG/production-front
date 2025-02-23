import React from 'react';
import { useNavigate } from "react-router-dom";
import "../../styles/NoticeList.css"

const NoticeList = ({ notices }) => {
  const navigate = useNavigate();
  console.log(notices);

  const handleNoticeClick = (noticeId) => {
    navigate(`/notice/${noticeId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
      <div className="notice-list">
        {/* 헤더 추가 */}
        <div className="notice-header flex items-center justify-between py-3 border-b-2 border-black font-bold text-center">
          <div className="flex-shrink-0 w-20">번호</div>
          <div className="flex-grow text-center">제목</div>
          <div className="flex-shrink-0 w-64">작성일</div>
          <div className="flex-shrink-0 w-32">작성자</div>
        </div>
        {notices.map((notice) => (
            <div
                key={notice.id}
                className="notice-item flex items-center justify-between py-3 border-b border-gray-300 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleNoticeClick(notice.id)}
            >
              <div className="flex-shrink-0 w-20 text-center">{notice.displayNumber}</div>
              <div className="flex-grow text-left pl-12">{notice.noticeTitle}</div>
              <div className="flex-shrink-0 w-64 text-center">{formatDate(notice.createAt)}</div>
              <div className="flex-shrink-0 w-32 text-center">{(notice.nickname)? notice.nickname: notice.userId}</div>
            </div>
        ))}
      </div>
  );
};

export default NoticeList;