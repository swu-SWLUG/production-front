import React from "react";
import { writePost, updatePost } from "../../services/blogAPI";
import "../../styles/BlogWrite.css";
import {useLocation, useNavigate} from "react-router-dom";
import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';
import UploadAdapter from './UploadAdapter';
import {useSelector} from "react-redux";

const LICENSE_KEY = process.env.REACT_APP_ckEditor_LICENSE;

const BlogWrite = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const postToEdit = location.state?.post || null;
	const isMyPageEdit = location.state?.isMyPageEdit || false;
	const userRole = localStorage.getItem("userRole");
	const { isAuthenticated } = useSelector(state => state.auth);
	const allowedRoles = ["ROLE_USER", "ROLE_ADMIN"];
	const MAX_TAGS = 10;

	// 모든 state 선언을 최상단으로 이동
	const [title, setTitle] = useState(postToEdit?.title || "");
	const [contents, setContents] = useState(postToEdit?.contents || "");
	const [category, setCategory] = useState(postToEdit?.category || "");
	const [tags, setTags] = useState(postToEdit?.tag || []);
	const [image, setImage] = useState(null);
	const [uploadedImages, setUploadedImages] = useState(postToEdit?.image || []);
	const [isLayoutReady, setIsLayoutReady] = useState(false);

	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const cloud = useCKEditorCloud({ version: '44.1.0', translations: ['ko'] });

	// 권한 체크
	useEffect(() => {
		if (!isAuthenticated || !allowedRoles.includes(userRole)) {
			alert("접근 권한이 없습니다.");
			navigate('/blog');
			return;
		}
	}, [isAuthenticated, userRole, navigate]);

	// 새로고침 경고
	useEffect(() => {
		const handleBeforeUnload = (e) => {
			if (title || contents || tags.length > 0) {
				e.preventDefault();
				e.returnValue = '작성 중인 내용이 있습니다. 페이지를 나가시겠습니까?';
				return e.returnValue;
			}
		};

		window.addEventListener('beforeunload', handleBeforeUnload);
		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [title, contents, tags]);

	// 레이아웃 준비
	useEffect(() => {
		setIsLayoutReady(true);
		return () => setIsLayoutReady(false);
	}, []);

	// boardType 설정 로직
	const boardType = useMemo(() => {
		if (location.state?.boardType) {
			return location.state.boardType;
		}
		if (location.pathname.includes("/notice")) {
			return "notice";
		} else if (location.pathname.includes("/board")) {
			return "blog";
		}
		return "";
	}, [location.pathname, location.state?.boardType]);

	// 게시판 옵션
	const boardOptions = useMemo(() => {
		if (boardType === "notice") {
			return [<option value="0" key="0">공지사항</option>];
		}
		if (boardType === "blog") {
			return [
				<option value="1" key="1">성과</option>,
				<option value="2" key="2">정보</option>,
				<option value="3" key="3">후기</option>,
				<option value="4" key="4">활동</option>
			];
		}
		return [];
	}, [boardType]);

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
		}
	}

	const handleTagInput = (e) => {
		if ((e.key === 'Enter' || e.key === ',') && e.target.value.trim() !== '') {
			e.preventDefault();
			const newTag = e.target.value.trim();
			if (tags.length >= MAX_TAGS) {
				return;
			}
			if (!tags.includes(newTag)) {
				setTags(prevTags => [...prevTags, newTag]);
			}
			e.target.value = '';
		}
	};

	const handleTagRemove = (tagToRemove) => {
		setTags(prevTags => prevTags.filter(tag => tag !== tagToRemove));
	};

	const handleSubmit = async () => {
		if (!category) {
			alert("게시판을 선택해주세요.");
			return;
		}

		try {
			const postData = {
				boardCategory: category,
				boardTitle: title,
				boardContent: contents,
				tag: tags,
			};

			if (postToEdit) {
				await updatePost({
					id: postToEdit.id,
					...postData,
					imageUrls: uploadedImages
				}, image);
				alert("게시물이 수정되었습니다.");
			} else {
				await writePost(postData, image);
				alert("게시물이 등록되었습니다.");
			}
			
			navigate(isMyPageEdit ? '/users/mypage' : `/${boardType}`);
			window.scrollTo(0, 0);
			//window.location.reload();
		} catch (error) {
			console.error("글 등록/수정 실패:", error);
			alert("글 등록/수정에 실패했습니다. 다시 시도해주세요.");
		}
	};

	const { ClassicEditor, editorConfig } = useMemo(() => {
		if (cloud.status !== 'success' || !isLayoutReady) {
			return {};
		}

		const {
			ClassicEditor,
			Autoformat,
			AutoImage,
			Autosave,
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
				},
				plugins: [
					Autoformat,
					AutoImage,
					Autosave,
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
				heading: {
					options: [
						{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
						{ model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
						{ model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
						{ model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
						{ model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
						{ model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
						{ model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
					]
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
						'imageStyle:alignLeft',
						'imageStyle:alignCenter',
						'imageStyle:alignRight',
						'|',
						'toggleImageCaption',
						'imageTextAlternative',
						'resizeImage'
					],
					styles: {
						options: [
							'alignLeft',
							'alignCenter',
							'alignRight'
						]
					}
				},
				initialData: '',
				licenseKey: LICENSE_KEY,
				link: {
					addTargetToExternalLinks: true,
					defaultProtocol: 'https://'
				},
				simpleUpload: {
					uploadUrl: '/api/blog/upload-image',
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

	const handleEditorChange = (event, editor) => {
		const data = editor.getData();
		setContents(data);

		// 에디터 내용에서 이미지 URL 추출
		const parser = new DOMParser();
		const doc = parser.parseFromString(data, 'text/html');
		const images = Array.from(doc.querySelectorAll('img'));
		const currentImageUrls = images
			.map(img => img.getAttribute('src'))
			.filter(src => src && src.startsWith('/api/blog/images/'));

		setUploadedImages(currentImageUrls);
	};

	return (
		<div className="blog-write">
			<select
				value={category}
				onChange={(e) => setCategory(e.target.value)}
				className="category-select"
			>
				<option value="" disabled>게시판 선택</option>
				{boardOptions}
			</select>
			<input
				type="text"
				placeholder="제목을 입력하세요"
				value={title}
				onChange={(e) => setTitle(e.target.value)}className="title-input"
			/>

			<div className="main-container">
				<div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
					<div className="editor-container__editor">
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
			</div>

			<div className="tag-input">
				<div className="tag-list">
					{tags.map((tag, index) => (
						<span key={index} className="tag">
                            #{tag}
							<button
								className="remove-tag-button"
								onClick={() => handleTagRemove(tag)}
							>
                                ×
                            </button>
                        </span>
					))}
					{tags.length < MAX_TAGS && (
						<input
							type="text"
							placeholder="#태그 입력"
							onKeyDown={handleTagInput}
							className="tag-input-field"
						/>
					)}
				</div>
			</div>

			<div className="buttons-container">
				<button
					className="submit-button"
					onClick={handleSubmit}
				>
					{postToEdit ? (isMyPageEdit ? "수정 완료" : "수정 완료") : "완료"}
				</button>
			</div>
		</div>
	);
};

export default BlogWrite;