// middleware.ts (프로젝트 루트 경로에 생성)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const refreshToken = request.cookies.get('refreshToken');
    const accessToken = request.cookies.get('accessToken');

    // 1. Access Token이 멀쩡히 있으면 그냥 통과
    if (accessToken) {
        console.log("access token 유효");
        return NextResponse.next();
    }

    // 2. Access Token은 없는데 Refresh Token이 있다면 갱신 시도
    if (refreshToken) {
        try {
            console.log("refresh 토큰으로 access token 새로 발급받는 중..");
            const apiResponse = await fetch("http://localhost:8080/auth/refresh-token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    refreshToken: refreshToken.value
                })
            });

            if (apiResponse.ok) {
                console.log("access token 발급완료. 쿠키에 담는 중.");

                // 스프링이 내려준 새로운 쿠키(Set-Cookie) 가져오기
                const setCookieHeaders = apiResponse.headers.getSetCookie();
                
                // 다음 응답으로 넘어갈 객체 생성
                const response = NextResponse.next();

                // 미들웨어에서는 응답 객체에 쿠키를 마음껏 세팅할 수 있습니다!
                for (const cookieStr of setCookieHeaders) {
                    response.headers.append("Set-Cookie", cookieStr);
                }

                return response;
            }
        } catch (err) {
            console.log("미들웨어 토큰 갱신 중 에러 발생:", err);
        }
    }

    // 3. 둘 다 없거나 갱신 실패 시 로그인 페이지로 튕겨내기
    return NextResponse.redirect(new URL('/login', request.url));
}

// 어떤 경로에 진입할 때 이 미들웨어를 실행할지 설정
export const config = {
    matcher: ['/student/:path*', '/dashboard/:path*'], // 로그인이 필요한 경로 지정
};