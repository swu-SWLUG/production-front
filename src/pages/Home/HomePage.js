// src/pages/Home/HomePage.js
import React, { useEffect, useState } from 'react';
import HomeMain from '../../components/Home/HomeMain';
import RecentNotices from '../../components/Home/RecentNotices';
import axios from "axios"; // RecentNotices 추가

const HomePage = () => {

    const [data, setData] = useState([]); // API 데이터를 저장

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 하나의 API 호출 (예: `/main`)
                const response = await axios.get('/api/main');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    console.log(data);

    return (
        <div className="container mx-auto px-4 py-8 bg-white">
            <HomeMain />
            <div className="mt-12">
                {Array.isArray(data) && data.length > 0 && <RecentNotices data={data} />}
            </div>
        </div>
    );
};

export default HomePage;
