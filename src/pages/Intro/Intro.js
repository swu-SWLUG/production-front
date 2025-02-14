import React, { useState, useEffect} from "react";
import axios from "axios";
import IntroHeader from "../../components/Intro/IntroHeader";
import Tabs from "../../components/Intro/Tabs";
import MajorActs from "./MajorActs";
import History from "./History";
import Awards from "./Awards";
import CIIntro from "./CIIntro";

const Intro = () => {
    const tabs = [
        { label: "활동 소개", component: MajorActs },
        { label: "연혁", component: History },
        { label: "활동 내용", component: Awards },
        { label: "로고 소개", component: CIIntro },
    ];

    const [data, setData] = useState('');
    useEffect(() => {
        axios.get('/api/intro')
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, []);

    console.log(data);

    return (
        <div>
            <IntroHeader />
            <Tabs tabs={tabs} />
        </div>
    );
};

export default Intro;
