import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import root from "./router/root";
import Header from './components/Header';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import store from './store/store';
import ScrollToTop from './components/ScrollToTop';
import { Helmet } from 'react-helmet-async';

import "./styles/common.css";

function App() {
  return (
      <Provider store={store}>
        <div className="App flex flex-col min-h-screen">
          <Helmet>
            <title>SWLUG</title>
            <meta name="description" content="서울여자대학교 정보보호학부 소학회 SWLUG" />
            <meta property="og:title" content="SWLUG" />
            <meta property="og:description" content="서울여자대학교 정보보호학부 소학회 SWLUG" />
            <meta property="og:url" content="https://www.swlug.com" />
            {/* 네이버 검색엔진 최적화를 위한 추가 메타 태그 */}
          </Helmet>
          <Header />
          <main className="min-h-screen">
            <div className="container mx-auto text-center">
              <Suspense fallback={<div>Loading...</div>}>
                <RouterProvider router={root}>
                  <ScrollToTop />
                </RouterProvider>
              </Suspense>
            </div>
          </main>
          <Footer />
        </div>
      </Provider>
  );
}

export default App;