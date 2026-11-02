import { NextResponse } from "next/server";

export async function POST(request : Request){
    const body = await request.json();
    const {userId, userPwd, nickname, email} = body;

    const response = await fetch("http://localhost:8080/auth/join-user", {
        method: "post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId,
            userPwd,
            nickname,
            email
        })
    });

    if(!response.ok){
        console.log(response.status);
        console.log(response.statusText);
        return NextResponse.json(
            {message: "회원가입 에러"},
            {status: 500}
        );
    }


    console.log("api/auth/join 호출되었음.");
    const data = await response.json();
    return NextResponse.json(
        {result: data.result}, {status: 200});

}