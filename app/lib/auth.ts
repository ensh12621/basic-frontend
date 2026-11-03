import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function refreshJwt(){
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken");

    if(!refreshToken){
        return false;
    }

    console.log("refreshing..'");

    try{

        const apiResponse = await fetch("http://localhost:8080/auth/refresh-token", {
            method:"post",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                refreshToken: refreshToken.value
            })
        });

        if(!apiResponse.ok){
            console.log(apiResponse.status);
            console.log(apiResponse.statusText);
            return false;
        }

        const setCookieHeaders = apiResponse.headers.getSetCookie();
        for(const cookieStr of setCookieHeaders){
            parseAndSetCookie(cookieStr, cookieStore);
        }

        return true;
    }catch(err){
        console.log(err);
        console.log("ajax 오류 발생");
        return false;
    }
    
}

function parseAndSetCookie(cookieStr: string, cookieStore: any) {
    const parts = cookieStr.split(";").map((p) => p.trim());
    const [nameValue, ...attrParts] = parts;
    const [name, value] = nameValue.split("=");

    if (!name || value === undefined) return;

    const options: any = {};
    for (const attr of attrParts) {
        const [key, val] = attr.split("=");
        const lowerKey = key.toLowerCase();

        if (lowerKey === "path") options.path = val;
        else if (lowerKey === "domain") options.domain = val;
        else if (lowerKey === "max-age") options.maxAge = parseInt(val, 10);
        else if (lowerKey === "expires") options.expires = new Date(val);
        else if (lowerKey === "httponly") options.httpOnly = true;
        else if (lowerKey === "secure") options.secure = true;
        else if (lowerKey === "samesite") options.sameSite = val.toLowerCase();
    }

    console.log("cookie options..");
    console.log(options);
    console.log("cookie options..end");

    // Next.js 서버 쿠키 스토어에 반영
    cookieStore.set(name, value, options);
}