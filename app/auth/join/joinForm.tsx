import { BlackButton, BlueButton, GreenButton } from "@/app/component/buttons";

export default function JoinForm(){
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
                        id="user-id"  />
                    <span className="text-white text-red-500 border-b border-gray-300">
                        중복되는 아이디입니다.
                    </span>
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
                        disabled={true}
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
}

function Input({type = "text", id} : InputProps){
    return (
        <input 
            type={type} 
            id={id}
            className="border-b border-gray-300 px-2 py-1 outline-none"
                 />
    );
}