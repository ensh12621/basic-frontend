import { refreshJwt } from "@/app/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default  async function Page(){

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");

    if(accessToken){
        console.log("accessToken 값 : " + accessToken.value);
    }
    
    return  (
        <div>
            <h1 className="hidden">학생 목록 페이지</h1>
            테스트

        </div>
    );
}