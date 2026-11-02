"use client";
import { BlackButton, BlueButton, GreenButton } from "@/app/component/buttons";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function JoinForm() {

    const [userId, setUserId] = useState("");
    const [userPwd, setUserPwd] = useState("");
    const [userPwd2, setUserPwd2] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [duplicated, setDuplicated] = useState(false);

    const router = useRouter();

    const handleUserIdChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;

        setUserId(val);

        if (val.trim() == "") {
            setDuplicated(false);
            return;
        }

        const response = await fetch(`/api/auth/dup-id?userId=`+val, {
            method:"get",
            headers:{
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        setDuplicated(data.duplicated);
    };

    const submitJoinForm = async () => {
        if (!(userId.length >= 6)) {
            alert("아이디는 최소 6글자 이상이어야 합니다.");
            return;
        }

        if (!(userPwd.length >= 6)) {
            alert("비밀번호는 최소 6글자 이상이어야 합니다.");
            return;
        }

        if (userPwd != userPwd2) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (!(nickname.length >= 2)) {
            alert("닉네임은 최소 2글자 이상이어야 합니다.");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            alert("이메일 형식이 올바르지 못합니다");
            return;
        }


        const response = await fetch(`/api/auth/join`, {
            method:"post",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                userId, userPwd, nickname, email
            })

        });


        const data = await response.json();

        if(data.result == true){
            router.push("/auth/login");
        }
    };


    const loginPage = () => {
        router.push("/auth/login");
    };


    let MessageForDuplicatedId = null;
    if (userId.length !== 0) {
        if (duplicated) {
            MessageForDuplicatedId = <span className="text-red-500 border-b border-gray-300">
                                        중복되는 아이디입니다.
                                    </span>;
        } else {
            MessageForDuplicatedId = <span className=" text-green-500 border-b border-gray-300">
                                        좋은 아이디입니다.
                                    </span>
        }
    }



    return (
    <section>
        <h1 className="hidden">회원가입 폼</h1>

        <div className="w-3/10 m-auto mt-10 text-center">
            <p
                className="text-2xl font-bold">
                회원가입 양식을 작성해주세요.
            </p>
        </div>

        <div className="w-4/10 m-auto mt-10 flex flex-col gap-5 ">
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
                    onChange={handleUserIdChange} />
                {MessageForDuplicatedId}


            </div>
            <div className="grid grid-cols-3 gap-2">
                <label
                    htmlFor="user-pwd"
                    className="w-[120px] inline-block">
                    비밀번호
                </label>
                <Input
                    type="password"
                    id="user-pwd"
                    value={userPwd}
                    onChange={e => setUserPwd(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-3 gap-2">
                <label
                    htmlFor="user-pwd2"
                    className="w-[120px] inline-block">
                    비밀번호 확인
                </label>
                <Input
                    type="password"
                    id="user-pwd2"
                    value={userPwd2}
                    onChange={e => setUserPwd2(e.target.value)} />
            </div>
            <div className="grid grid-cols-3 gap-2">
                <label
                    htmlFor="user-nickname"
                    className="w-[120px] inline-block">
                    닉네임
                </label>
                <Input
                    type="text"
                    id="user-nickname"
                    value={nickname}
                    onChange={e => setNickname(e.target.value)} />
            </div>
            <div className="grid grid-cols-3 gap-2">
                <label
                    htmlFor="user-email"
                    className="w-[120px] inline-block">
                    이메일
                </label>
                <Input
                    type="text"
                    id="user-email"
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="flex gap-5 justify-center">
                <GreenButton
                    value="가입하기"
                    disabled={duplicated || userId.length === 0}
                    onClick={submitJoinForm}
                />

                <BlackButton
                    value="로그인하러 가기"
                    onClick={loginPage}

                />

            </div>

        </div>

    </section>
);
}

interface InputProps {
    type?: string;
    id?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Input({ type = "text", id, value, onChange }: InputProps) {
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