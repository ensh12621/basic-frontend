"use client";

import { BlackButton, BlueButton } from "@/app/component/buttons";
import { Input1, UnderlineInput } from "@/app/component/inputs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {

    const [userId, setUserId] = useState("");
    const [userPwd, setUserPwd] = useState("");

    const router = useRouter();
    
    const handleLogin = async () => {
        if(userId.trim().length == 0){
            alert("아이디를 입력해주세요");
            return;
        }
        if(userPwd.trim().length == 0){
            alert("비밀번호를 입력해주세요");
            return;
        }

        const response = await fetch(`/api/auth/login`, {
            method:"post",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                userId,
                userPwd
            })
        });

        const data = await response.json();
        console.log(data);

    };

    const joinPage = () => {
        router.push("/auth/join");
    };

    return (
        <section>
            <div className="m-auto w-4/10 mt-10 text-center">
                <span className="text-4xl font-bold">
                    로그인하기
                </span>

                <div className="flex flex-col gap-5 mt-5">
                    <div>
                        <label 
                            htmlFor="userId" 
                            className="w-[100px] inline-block">
                            아이디
                        </label>
                        <UnderlineInput
                            id="userId"
                            value={userId}
                            onChange={e => setUserId(e.target.value)}
                            placeholder="아이디를 입력해주세요"
                         />
                    </div>
                    
                    <div>
                        <label 
                            htmlFor="userPwd"
                            className="w-[100px] inline-block">
                            비밀번호
                        </label>
                        <UnderlineInput
                            type="password"
                            value={userPwd}
                            onChange={e => setUserPwd(e.target.value)}
                            placeholder="비밀번호를 입력해주세요"
                         />
                    </div>

                    <div className="flex gap-2 justify-center">
                        <BlueButton 
                            value="로그인"
                            onClick={handleLogin}
                        />

                        <BlackButton 
                            value="회원가입"
                            onClick={joinPage}
                        />

                    </div>

                </div>

            </div>

        </section>
    );

}

