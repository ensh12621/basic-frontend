import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request : Request){
    
    const body = await request.json();
    const {userId, userPwd} = body;

    if( userId.trim().length == 0 || userPwd.trim().length == 0){
        return NextResponse.json(
            {error: "제목과 내용을 입력해주세요"},
            {status: 400}
        );
    }

    try{
        const response = await fetch("http://localhost:8080/auth/login", {
            method:"post",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                userId,
                userPwd
            })
        });

        if(!response.ok){
            return NextResponse.json({ message: response.statusText}, {status:response.status});
        }


        
        const setCookieHeeaders = response.headers.getSetCookie();

        const routeResponse = NextResponse.json({
            result: "success"
        }, {
            status: 200
        });

        for(const cookieStr of setCookieHeeaders){
            routeResponse.headers.append("Set-Cookie", cookieStr);
            console.log("cookie 설정됨 - " + cookieStr);
        }


        return routeResponse;

    }catch(error){
        console.log(error);
        return NextResponse.json({ message: "api 오류 발생"}, {status:500});
    }
}