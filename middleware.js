import { NextResponse } from "next/server";

export function middleware(req) {
    const res = NextResponse.next();

    // ❌ 보안상 불필요한 헤더 제거
    res.headers.delete("Server"); // 서버 정보 숨기기
    res.headers.delete("X-Powered-By"); // 프레임워크 정보 숨기기
    res.headers.delete("Age"); // 캐시 관련 정보 제거
    res.headers.delete("Last-Modified"); // 캐시 관련 정보 제거
    res.headers.delete("Strict-Transport-Security"); // 필요에 따라 제거

    return res;
}
