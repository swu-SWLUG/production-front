import axios from 'axios';

export const fetchNotices = async (page = 1, searchTerm = '', size = 10) => {
    try {
        const response = await axios.get(`/api/notice?page=${page}&searchTerm=${searchTerm}&size=${size}`);
        return response.data;
    } catch (error) {
        throw new Error("공지사항 목록을 가져오는데 실패했습니다.");
    }
};

export const fetchNoticeDetail = async (id) => {
    try {
        const response = await axios.post('/api/notice/detail', { id });
        return response.data;
    } catch (error) {
        throw new Error("공지사항 상세 정보를 가져오는데 실패했습니다.");
    }
};

export const createNotice = async (noticeData) => {
    try {
        const response = await axios.post('/api/notice/save', {
            noticeTitle: noticeData.noticeTitle,
            noticeContents: noticeData.noticeContents,
            imageUrl: noticeData.imageUrl
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            throw new Error("권한이 없습니다.");
        }
        throw new Error("공지사항 작성에 실패했습니다.");
    }
};

export const updateNotice = async (noticeData) => {
    try {
        const response = await axios.post('/api/notice/update', {
            id: noticeData.id,
            noticeTitle: noticeData.noticeTitle,
            noticeContents: noticeData.noticeContents,
            imageUrl: noticeData.imageUrl
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            throw new Error("권한이 없습니다.");
        }
        throw new Error("공지사항 수정에 실패했습니다.");
    }
};

export const deleteNotice = async (id) => {
    try {
        const response = await axios.post('/api/notice/delete', { id });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            throw new Error("권한이 없습니다.");
        }
        throw new Error("공지사항 삭제에 실패했습니다.");
    }
};

export const fetchAdjacentNotices = async (id) => {
    try {
        const response = await axios.post('/api/notice/adjacent', { id });
        return response.data;
    } catch (error) {
        throw new Error("이전/다음 공지사항을 가져오는데 실패했습니다.");
    }
};