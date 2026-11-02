"use client";
import { BlackButton, BlueButton, GreenButton } from "@/app/component/buttons";
import { checkDuplicatedId } from "@/app/lib/auth";
import { ChangeEvent, useState } from "react";

export default function JoinForm(){

    const [userId, setUserId] = useState("");
    const [duplicated, setDuplicated] = useState(true);

    const handleUserIdChange = async (e : ChangeEvent<HTMLInputElement>) => {
        setUserId(e.target.value);

        setDuplicated(await checkDuplicatedId(e.target.value));
        

    };
    

    return (
        <section>
            <h1 className="hidden">회원가입 폼</h1>

            <div className="w-3/10 m-auto mt-10 text-center">
                <p 
                    className="text-2xl font-bold">
                    회원가입 양식을 작성해주세요.
                </p>
            </div>

            <div className="w-3/10 m-auto mt-10 flex flex-col gap-5 ">
                <div className="grid grid-cols-3 gap-2">
                    <label 
                        htmlFor="user-id"
                        className="w-[120px] inline-block"
                        >
                        아이디
                    </label>
                    <Input 
                        type="text" 
                        id="user-id"
                        value={userId}
                        onChange={handleUserIdChange}  />
                        {duplicated ? (
                            <span className="text-white text-red-500 border-b border-gray-300">
                                중복되는 아이디입니다.
                            </span>
                        ) : (
                            <span className=" text-green-500 border-b border-gray-300">
                                좋은 아이디입니다.
                            </span>
                        )}

                        
                    
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <label 
                        htmlFor="user-pwd"
                        className="w-[120px] inline-block">
                        비밀번호
                    </label>
                    <Input  
                        type="text" 
                        id="user-pwd" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <label 
                        htmlFor="user-pwd2"
                        className="w-[120px] inline-block">
                        비밀번호 확인
                    </label>
                    <Input  
                        type="text" 
                        id="user-pwd2" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <label 
                        htmlFor="user-nickname"
                        className="w-[120px] inline-block">
                        닉네임
                    </label>
                    <Input  
                        type="text" 
                        id="user-nickname" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <label 
                        htmlFor="user-email"
                        className="w-[120px] inline-block">
                        이메일
                    </label>
                    <Input 
                    type="text" 
                    id="user-email" />
                </div>
                <div className="flex gap-5 justify-center">
                    <GreenButton 
                        value="가입하기"
                        disabled={duplicated}
                    />
                    
                    <BlackButton 
                        value="로그인하러 가기"
                        
                    />

                </div>
                
            </div>

        </section>
    );
}

interface InputProps{
    type?: string;
    id?: string;
    value?:string;
    onChange?: ( e : ChangeEvent<HTMLInputElement>) => void;
}

function Input({type = "text", id, value, onChange} : InputProps){
    return (
        <input 
            type={type} 
            id={id}
            value={value}
            onChange={onChange}
            className="border-b border-gray-300 px-2 py-1 outline-none"
                 />
    );
}