"use client"
import { BlueButton, GreenButton } from "@/app/component/buttons";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TosAgreement() {
    const tos = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.";

    const [checked, setChecked] = useState(false);
    const router = useRouter();


    const joinForm = () => {
        router.push("/auth/join");
    };

    const loginForm = () => {
        router.push("/auth/login");
    };
    
    return (
        <section className="flex flex-col w-6/10 m-auto mt-10 gap-5">
            <span className="text-2xl font-bold ">가입하기 전에 이용약관에 동의해주세요</span>
            <textarea
                readOnly
                className="resize-none w-full  h-[250px] border border-gray-300"
                value={tos}
            />

            <div className="flex gap-3 justify-end">
                <input
                    type="checkbox"
                    id="tos-agree"
                    className="cursor-pointer"
                    onChange={e => setChecked(e.target.checked)}
                    checked={checked}
                />
                <label
                    htmlFor="tos-agree"
                    className="cursor-pointer">
                    약관에 동의합니다.
                </label>

            </div>

            <div className="flex justify-center gap-2">
                <BlueButton
                    value="가입하기"
                    disabled={!checked}
                    onClick={joinForm} />


                <GreenButton
                    value="로그인하러 가기"
                    onClick={loginForm}
                    />
            </div>
        </section>
    );
}