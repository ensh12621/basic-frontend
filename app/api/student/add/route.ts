import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request : Request){

    
    const body = await request.json();
    const {studentName, email, gender, deptNo} = body;
    

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if(!accessToken){
        return NextResponse.json({
            message:"no jwt found"
        }, {
            status:401
        });
    }

    const apiResponse = await fetch("http://localhost:8080/student/add", {
        method:"post",
        headers:{
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${accessToken}`
        },
        body:JSON.stringify({
            studentName,
            email,
            gender,
            deptNo
        })
    });

    if(!apiResponse.ok){
        return NextResponse.json({
            message:apiResponse.statusText
        }, {
            status:apiResponse.status
        });
    }

    const data = await apiResponse.json();

    return NextResponse.json(
        data,
        {
            status: 200
        }
    );

}