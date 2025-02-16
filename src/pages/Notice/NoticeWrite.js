import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createNotice, updateNotice } from '../../services/noticeAPI';
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';
import UploadAdapter from '../Blog/UploadAdapter';
import "../../styles/NoticeWrite.css";
import {useSelector} from "react-redux";

const LICENSE_KEY = process.env.REACT_APP_ckEditor_LICENSE_KEY;

const NoticeWrite = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const noticeToEdit = location.state?.notice || null;
    const userRole = localStorage.getItem("userRole");
    const {isAuthenticated} = useSelector(state => state.auth);
    const allowedRoles = ["ROLE_ADMIN"];

    const [title, setTitle] = useState(noticeToEdit?.noticeTitle || '');
    const [contents, setContents] = useState(noticeToEdit?.noticeContents || '');
    const [uploadedImages, setUploadedImages] = useState(noticeToEdit?.imageUrl || []);
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const cloud = useCKEditorCloud({ version: '44.1.0', translations: ['ko'] });

    // 권한 체크
    useEffect(() => {
        if (!isAuthenticated || !allowedRoles.includes(userRole)) {
            alert("접근 권한이 없습니다.");
            navigate('/notice');
            return;
        }
    }, [isAuthenticated, userRole, navigate]);

    // 새로고침 경고 추가
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (title || contents) {
                e.preventDefault();
                e.returnValue = '작성 중인 내용이 있습니다. 페이지를 나가시겠습니까?';
                return e.returnValue;
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [title, contents]);

    // 레이아웃 준비
    useEffect(() => {
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false);
    }, []);

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