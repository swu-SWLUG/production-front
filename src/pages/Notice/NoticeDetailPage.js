import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from "axios";
import "../../styles/NoticeDetail.css";

const NoticeDetailPage = () => {
    const { noticeId } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, role } = useSelector(state => state.auth);
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [adjacentNotice, setAdjacentNotice] = useState({ previous: null, next: null });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [noticeId]);

    const handleDelete = async () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
                const response = await axios.post("/api/notice/delete", { id: noticeId });

                if (response.status === 401) {
                    alert("삭제 권한이 없습니다.");
                    return;
                }

                if (response.data?.redirect) {
                    alert("게시물이 삭제되었습니다.");
                    navigate("/notice");
                } else {
                    throw new Error("Unexpected response format");
                }
            } catch (error) {
                console.error("게시물 삭제 실패:", error);
                if (error.response?.status === 401) {
                    alert("로그인이 필요하거나 삭제 권한이 없습니다.");
                } else {
                    alert("게시물 삭제에 실패했습니다. 다시 시도해주세요.");
                }
            }
        }
    };

    const handleEdit = () => {
        const editNotice = {
            id: notice.id,
            noticeTitle: notice.noticeTitle,
            noticeContents: notice.noticeContents,
            imageUrl: notice.image
        };
        navigate("/notice/write", { state: { notice: editNotice } });
        window.scrollTo(0, 0);
    };

    const handleNavigate = (id) => {
        navigate(`/notice/${id}`);
    };

    const truncateTitle = (title) => {
        if (!title) return '';
        return title.length > 25 ? `${title.substring(0, 25)}...` : title;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [noticeResponse, adjacentResponse] = await Promise.all([
                    axios.post("/api/notice/detail", { id: noticeId }),
                    axios.post("/api/notice/adjacent", { id: noticeId })
                ]);

                setNotice(noticeResponse.data);
                setAdjacentNotice({
                    previous: adjacentResponse.data.previous || null,
                    next: adjacentResponse.data.next || null
                });

                setLoading(false);
            } catch (error) {
                console.error("데이터 로딩 실패:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [noticeId]);

    if (loading) return <p>Loading...</p>;

    if (!notice) return <p>공지사항을 찾을 수 없습니다.</p>;

    return (
        <div className="notice-detail">
            <div
                className="notice-category"
                onClick={() => navigate('/notice')}
                style={{cursor: 'pointer'}}
            >
                공지사항
            </div>
            <h1 className="notice-title">{notice.noticeTitle}</h1>
            <div className="notice-info" style={{textAlign: 'center', marginBottom: '20px'}}>
                <span className="notice-date">
                    {new Date(notice.createAt).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    })}
                </span>
            </div>
            {isAuthenticated && (
                <div className="notice-actions">
                    <button onClick={handleEdit}>수정</button>
                    <span style={{margin: '0 10px', color: '#ddd'}}>|</span>
                    <button onClick={handleDelete}>삭제</button>
                </div>
            )}
            <div
                className="notice-content"
                dangerouslySetInnerHTML={{__html: notice.noticeContents}}
            />

            <div className="notice-navigation">
                <button
                    onClick={() => adjacentNotice.previous && handleNavigate(adjacentNotice.previous.id)}
                    disabled={!adjacentNotice.previous}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: adjacentNotice.previous ? 'pointer' : 'not-allowed'
                    }}
                >
                    {adjacentNotice.previous ? (
                        <>
                            <span className="nav-label">&lt; 이전글</span>
                            <span className="nav-title">
                                {truncateTitle(adjacentNotice.previous.noticeTitle)}
                            </span>
                        </>
                    ) : (
                        <span className="nav-label">&lt; 글이 없습니다</span>
                    )}
                </button>
                <button
                    onClick={() => adjacentNotice.next && handleNavigate(adjacentNotice.next.id)}
                    disabled={!adjacentNotice.next}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: adjacentNotice.next ? 'pointer' : 'not-allowed'
                    }}
                >
                    {adjacentNotice.next ? (
                        <>
                            <span className="nav-title">
                                {truncateTitle(adjacentNotice.next.noticeTitle)}
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

export default NoticeDetailPage;