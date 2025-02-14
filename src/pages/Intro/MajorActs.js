import React from "react";
import "../../styles/MajorActs.css";

const MajorActs = () => {
    const activities = [
        {
            title: "📚 다양한 분야에 대한 스터디",
            cards: [
                {
                    description: "리버싱, 시스템 해킹, 웹해킹, 포렌식 등 다양한 분야의 \n 심화 스터디를 운영하고 있어요.",
                    image: "/study_image_1.png"
                },
                {
                    description: "스터디에 필요한 책, 강의 등은 동아리 자료를 대여해주며, 스터디에 필요한 운영비를 지원하고 있어요.",
                    image: "/study_image_2.png"
                }
            ]
        },
        {
            title: "🔒 동아리원들과 함께하는 프로젝트",
            cards: [
                {
                    description: "관심 있는 주제를 선정하여 소학회원들과 프로젝트를 \n진행할 수 있어요.",
                    image: "/project_image_1.png"
                },
                {
                    description: "프로젝트를 통해 논문 작성이나 대회, 공모전 등 대외활동에 적극적으로 참여할 수 있어요.",
                    image: "/project_image_2.png"
                }
            ]
        },
        {
            title: "👩‍🏫 선후배와 함께하는 특강과 멘토-멘티 활동",
            cards: [
                {
                    description: "선후배간의 친목 및 멘토-멘티 활동을 통해 전공에 대해 \n 보다 전문적인 도움을 받을 수 있어요.",
                    image: "/mentor_image_1.png"
                },
                {
                    description: "선배님들이나 교수진, 기업 초청으로 진로, 실무 경험 등에 대해 다양한 특강을 진행해요.",
                    image: "/mentor_image_2.png"
                }
            ]
        },
        {
            title: "🔐 보안 세미나 참여 및 개최",
            cards: [
                {
                    description: "국내외 보안 세미나에 적극적으로 참가하며 최신 보안 \n트렌드를 배우고 경험할 수 있어요.",
                    image: "/seminar_image_2.png"
                },
                {
                    description: "슈러그는 매해 다양한 세미나를 개최하여 프로젝트 및\n 성과를 공유하고 발표해요.",
                    image: "/seminar_image_1.png"
                }
            ]
        }
    ];

    return (
        <div className="major-acts">
            {activities.map((activity, index) => (
                <div key={index} className="activity-group">
                    <h2 className="activity-title">{activity.title}</h2>
                    <div className="activity-content">
                        {activity.cards.map((card, cardIndex) => (
                            <div key={cardIndex} className="intro-activity-card">
                                <div className="activity-img-container">
                                    <img src={card.image} alt={`${activity.title} ${cardIndex + 1}`} className="activity-card-image" />
                                </div>
                                <p className="card-text">{card.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MajorActs;