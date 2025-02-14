/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        customHover: '#202123', // 사용자 정의 색상 추가
        customHoverText: '#F9F9F9', // 사용자 정의 글자색
      },
    },
    container: {
      screens: {
        sm: "100%", // 작은 화면에서는 100%
        md: "768px", // 중간 화면에서는 768px
        lg: "1024px", // 큰 화면에서는 1024px
        xl: "1280px", // 초대형 화면에서는 1280px
      },
    },
  },
  plugins: [],
}

