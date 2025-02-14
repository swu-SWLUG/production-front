const notices = Array.from({ length: 100 }, (_, index) => {
  const id = index + 1;
  const title = `공지사항 제목 ${id}`;
  const date = `2024.${10 + Math.floor((id - 1) / 30)}.${15 + ((id - 1) % 30) % 15}`;
  const author = "관리자";
  const content = `공지사항 내용 ${id}`;

  return { id, title, date, author, content };
});

export default notices;
