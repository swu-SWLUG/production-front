import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createNotice, updateNotice } from '../../services/noticeAPI';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    Autoformat,
    AutoImage,
    BlockQuote,
    Bold,
    Code,
    Essentials,
    FontBackgroundColor,
    FontColor,
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
} from 'ckeditor5';
import coreTranslations from 'ckeditor5/translations/ko.js';
import 'ckeditor5/ckeditor5.css';
import UploadAdapter from '../Blog/UploadAdapter';
import "../../styles/NoticeWrite.css";
import {useSelector} from "react-redux";

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

    useEffect(() => {
        if (!isAuthenticated || !allowedRoles.includes(userRole)) {
            alert("접근 권한이 없습니다.");
            navigate('/notice');
            return;
        }
    }, [isAuthenticated, userRole, navigate]);

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
                boardCategory: 0,
                noticeTitle: title,
                noticeContents: contents,
                imageUrl: uploadedImages
            };

            if (noticeToEdit) {
                await updateNotice({
                    id: noticeToEdit.id,
                    ...noticeData,
                    imageUrls: uploadedImages
                }, null);
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

        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const images = Array.from(doc.querySelectorAll('img'));
        const currentImageUrls = images
            .map(img => img.getAttribute('src'))
            .filter(src => !!src);

        setUploadedImages(currentImageUrls);
    };

    const editorConfig = React.useMemo(() => {
        if (!isLayoutReady) {
            return {};
        }

        return {
            toolbar: {
                items: [
                    'heading',
                    '|',
                    'fontSize',
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
                    'insertTable',
                    'blockQuote',
                    '|',
                    'bulletedList',
                    'numberedList',
                    'todoList',
                    'outdent',
                    'indent'
                ],
            },
            plugins: [
                Autoformat,
                AutoImage,
                BlockQuote,
                Bold,
                Code,
                Essentials,
                FontBackgroundColor,
                FontColor,
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
            translations: [coreTranslations],
            language: 'ko',
            fontSize: {
                options: [10, 12, 14, 'default', 18, 20, 22],
                supportAllValues: true
            },
            image: {
                resizeOptions: [
                    { name: 'resizeImage:original', value: null, label: '원본 크기' },
                    { name: 'resizeImage:50', value: '50', label: '50%' },
                    { name: 'resizeImage:75', value: '75', label: '75%' }
                ],
                resizeUnit: '%',
                toolbar: [
                    'imageStyle:alignLeft',
                    'imageStyle:alignCenter',
                    'imageStyle:alignRight',
                    '|',
                    'toggleImageCaption',
                    'imageTextAlternative',
                    'resizeImage'
                ],
                styles: {
                    options: ['alignLeft', 'alignCenter', 'alignRight']
                }
            },
            licenseKey: 'GPL',
            link: {
                addTargetToExternalLinks: true,
                defaultProtocol: 'https://'
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
        };
    }, [isLayoutReady]);

    return (
        <div className="notice-write">
            <select value="0" disabled className="category-select">
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
                        {isLayoutReady && (
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