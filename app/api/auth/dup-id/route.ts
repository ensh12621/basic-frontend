import { NextResponse } from "next/server";

export async function GET(request : Request){


    const {searchParams} = new URL(request.url);
    const userId = searchParams.get("userId");

    if(!userId){
        return NextResponse.json(
            {error: "userId가 누락되었습니다."},
            {status: 400}
        );
    }


    try{
        const response = await fetch(`http://localhost:8080/auth/dup-check-id?userId=${userId}`,{
        method:"get"
        });

        if(!response.ok){
            console.log(response.statusText);
            console.log(response.status);
            return false;
        }

        const data = await response.json();
        return NextResponse.json(data);
    }catch(e){
        console.log(e.status);
        console.log(e.statusText);
        return NextResponse.json(
            {error: "서버 통신 실패"},
            {status: 500}
        );
        
    }

}