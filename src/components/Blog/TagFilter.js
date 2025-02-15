import React from "react";
import "../../styles/TagFilter.css";

const TagFilter = ({ tags = [], selectedTag, setSelectedTag }) => {  // 기본값 [] 설정
    const handleTagClick = (tag) => {
        if (selectedTag === tag) {
            setSelectedTag("");
        } else {
            setSelectedTag(tag);
        }
    };

    // tags가 배열인지 확인하고 map 실행
    return (
        <div className="tag-list">
            {Array.isArray(tags) && tags.map((tag) => (
                <button
                    key={tag}
                    className={`tag-button ${selectedTag === tag ? "active" : ""}`}
                    onClick={() => handleTagClick(tag)}
                >
                    #{tag}
                </button>
            ))}
        </div>
    );
};

export default TagFilter;