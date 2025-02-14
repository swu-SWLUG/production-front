import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createNotice, updateNotice } from '../../services/noticeAPI';
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';
import UploadAdapter from '../Blog/UploadAdapter';
import "../../styles/NoticeWrite.css";
import {useSelector} from "react-redux";


const LICENSE_KEY = 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjgyNjIzOTksImp0aSI6ImQxMWFlMjhjLTRhNGEtNGQ4MC1hNTBmLTA3MTI5NmI5YjE4ZCIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIl0sInZjIjoiZGMyZWIzYjUifQ.bGfz0zMJry9GHH6ANiZ8qqhYMFF94RHXyA0e9FVZLeMYpS1c02VFc4zm-KRJdYR7dgFnuGAvj8VvP9uPoV-Glw';

const NoticeWrite = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const noticeToEdit = location.state?.notice || null;
    const userRole = localStorage.getItem("userRole");
    const {isAuthenticated} = useSelector(state => state.auth);
    const allowedRoles = ["ROLE_ADMIN"];

    useEffect(() => {
        if (!isAuthenticated || !allowedRoles.includes(userRole)) {
            alert("접근 권한이 없습니다.");
            navigate('/notice');
            return;
        }
    }, [isAuthenticated, userRole, navigate]);

    const [title, setTitle] = useState(noticeToEdit?.noticeTitle || '');
    const [contents, setContents] = useState(noticeToEdit?.noticeContents || '');
    const [uploadedImages, setUploadedImages] = useState(noticeToEdit?.imageUrl || []);
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const cloud = useCKEditorCloud({ version: '44.1.0', translations: ['ko'] });

    function MyCustomUploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new UploadAdapter(loader, (imageUrl) => {
                setUploadedImages(prev => {
                    if (!prev.includes(imageUrl)) {
                        return [...prev, imageUrl];
                    }
                    return prev;
                });
            });
        };
    }

    useEffect(() => {
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false);
    }, []);

    const handleSubmit = async () => {
        if (!title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }

        if (!contents.trim()) {
            alert('내용을 입력해주세요.');
            return;
        }

        try {
            const noticeData = {
                boardCategory: 0,  // 추가: 공지사항은 항상 카테고리 0
                noticeTitle: title,
                noticeContents: contents,
                imageUrl: uploadedImages
            };

            if (noticeToEdit) {
                await updateNotice({
                    id: noticeToEdit.id,
                    ...noticeData
                });
                alert('공지사항이 수정되었습니다.');
            } else {
                await createNotice(noticeData);
                alert('공지사항이 등록되었습니다.');
            }

            navigate('/notice');
            window.scrollTo(0, 0);
        } catch (error) {
            console.error('공지사항 저장 실패:', error);
            alert(error.message);
        }
    };


    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setContents(data);

        // 에디터 내용에서 이미지 URL 추출
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const images = Array.from(doc.querySelectorAll('img'));
        const currentImageUrls = images
            .map(img => img.getAttribute('src'))
            .filter(src => src && src.startsWith('/api/notice/images/'));

        setUploadedImages(currentImageUrls);
    };

    const { ClassicEditor, editorConfig } = React.useMemo(() => {
        if (cloud.status !== 'success' || !isLayoutReady) {
            return {};
        }

        const {
            ClassicEditor,
            Autoformat,
            AutoImage,
            BlockQuote,
            Bold,
            CloudServices,
            Code,
            Essentials,
            FontBackgroundColor,
            FontColor,
            FontFamily,
            FontSize,
            Heading,
            ImageBlock,
            ImageCaption,
            ImageInline,
            ImageInsert,
            ImageInsertViaUrl,
            ImageResize,
            ImageStyle,
            ImageTextAlternative,
            ImageToolbar,
            ImageUpload,
            Indent,
            IndentBlock,
            Italic,
            Link,
            LinkImage,
            List,
            ListProperties,
            MediaEmbed,
            Paragraph,
            PasteFromOffice,
            SimpleUploadAdapter,
            Strikethrough,
            Table,
            TableCaption,
            TableCellProperties,
            TableColumnResize,
            TableProperties,
            TableToolbar,
            TextTransformation,
            TodoList,
            Underline
        } = cloud.CKEditor;

        return {
            ClassicEditor,
            editorConfig: {
                toolbar: {
                    items: [
                        'heading',
                        '|',
                        'fontSize',
                        'fontFamily',
                        'fontColor',
                        'fontBackgroundColor',
                        '|',
                        'bold',
                        'italic',
                        'underline',
                        'strikethrough',
                        'code',
                        '|',
                        'link',
                        'insertImage',
                        'mediaEmbed',
                        'insertTable',
                        'blockQuote',
                        '|',
                        'bulletedList',
                        'numberedList',
                        'todoList',
                        'outdent',
                        'indent'
                    ],
                    shouldNotGroupWhenFull: false
                },
                plugins: [
                    Autoformat,
                    AutoImage,
                    BlockQuote,
                    Bold,
                    CloudServices,
                    Code,
                    Essentials,
                    FontBackgroundColor,
                    FontColor,
                    FontFamily,
                    FontSize,
                    Heading,
                    ImageBlock,
                    ImageCaption,
                    ImageInline,
                    ImageInsert,
                    ImageInsertViaUrl,
                    ImageResize,
                    ImageStyle,
                    ImageTextAlternative,
                    ImageToolbar,
                    ImageUpload,
                    Indent,
                    IndentBlock,
                    Italic,
                    Link,
                    LinkImage,
                    List,
                    ListProperties,
                    MediaEmbed,
                    Paragraph,
                    PasteFromOffice,
                    SimpleUploadAdapter,
                    Strikethrough,
                    Table,
                    TableCaption,
                    TableCellProperties,
                    TableColumnResize,
                    TableProperties,
                    TableToolbar,
                    TextTransformation,
                    TodoList,
                    Underline,
                    MyCustomUploadAdapterPlugin
                ],
                fontFamily: {
                    supportAllValues: true
                },
                fontSize: {
                    options: [10, 12, 14, 'default', 18, 20, 22],
                    supportAllValues: true
                },
                image: {
                    resizeOptions: [
                        {
                            name: 'resizeImage:original',
                            value: null,
                            label: '원본 크기'
                        },
                        {
                            name: 'resizeImage:50',
                            value: '50',
                            label: '50%'
                        },
                        {
                            name: 'resizeImage:75',
                            value: '75',
                            label: '75%'
                        }
                    ],
                    resizeUnit: '%',
                    toolbar: [
                        'imageStyle:inline',
                        'imageStyle:block',
                        'imageStyle:side',
                        '|',
                        'toggleImageCaption',
                        'imageTextAlternative',
                        'resizeImage'
                    ],
                    styles: {
                        options: [
                            'inline',
                            'block',
                            'side'
                        ]
                    }
                },
                licenseKey: LICENSE_KEY,
                link: {
                    addTargetToExternalLinks: true,
                    defaultProtocol: 'https://'
                },
                simpleUpload: {
                    uploadUrl: '/api/notice/upload-image',
                },
                placeholder: '내용을 입력하세요',
                table: {
                    contentToolbar: [
                        'tableColumn',
                        'tableRow',
                        'mergeTableCells',
                        'tableProperties',
                        'tableCellProperties'
                    ]
                }
            }
        };
    }, [cloud, isLayoutReady]);

    return (
        <div className="notice-write">
            <select
                value="0"
                disabled
                className="category-select"
            >
                <option value="0">공지사항</option>
            </select>
            <input
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="title-input"
            />
            <div className="editor-container">
                <div ref={editorContainerRef}>
                    <div ref={editorRef}>
                        {ClassicEditor && editorConfig && (
                            <CKEditor
                                editor={ClassicEditor}
                                config={editorConfig}
                                data={contents}
                                onChange={handleEditorChange}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="buttons-container">
                <button className="cancel-button" onClick={() => navigate('/notice')}>
                    취소
                </button>
                <button className="submit-button" onClick={handleSubmit}>
                    {noticeToEdit ? '수정' : '등록'}
                </button>
            </div>
        </div>
    );
};

export default NoticeWrite;