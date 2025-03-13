import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import root from "./router/root";
import Header from './components/Header';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import store from './store/store';
import ScrollToTop from './components/ScrollToTop';
import { Helmet, HelmetProvider } from "react-helmet-async";

import "./styles/common.css";

function App() {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <div className="App flex flex-col min-h-screen">
          <Helmet>
            <title>SWLUG</title>
            <meta name="description" content="서울여자대학교 정보보호학부 소속 소학회 SWLUG(슈러그) 입니다." />
            <meta property="og:title" content="SWLUG" />
            <meta property="og:description" content="서울여자대학교 정보보호학부 소속 소학회 SWLUG(슈러그) 입니다." />
            <meta property="og:url" content="https://www.swlug.com" />
            <meta property="og:image" content="https://www.swlug.com/Logo5.png" />
            <link rel="icon" href="/Logo5.png" />
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
      </HelmetProvider>
  );
}

export default App;
