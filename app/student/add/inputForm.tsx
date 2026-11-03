"use client"

import { BlackButton, BlueButton } from "@/app/component/buttons";
import { UnderlineInput } from "@/app/component/inputs";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function InputForm(){

    const [studentName, setStudentName] = useState("");
    const [email, setEmail] = useState(""); 
    const [gender, setGender]  = useState("m");
    const [deptNo, setDeptNo] = useState("");

    const router = useRouter();

    const deptList = [
        {deptNo: 101, dname: "정보통신"},
        {deptNo: 102, dname: "컴퓨터공학"},
        {deptNo: 103, dname: "전기전자"},
        {deptNo: 104, dname: "디지털미디어학"},
    ];
    
    const listPage = () => {
        router.push("/student/list");
    };

    const handleChangeGender = (e:ChangeEvent<HTMLInputElement>) => {
        setGender(e.target.value);
    };

    const submitAdd = async () => {

        if(studentName.trim().length == 0){
            alert("학생 이름을 입력해주세요");
            return;
        }

        if(email.trim().length == 0){
            alert("이메일을 입력해주세요");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            alert("잘못된 이메일 형식입니다");
            return;
        }

        if(gender == null || gender == "" || gender == undefined){
            alert("성별을 입력해주세요");
            return;
        }

        if(deptNo == null || deptNo == "" || deptNo == undefined){
            alert("학과를 선택해주세요");
            return;
        }

        const apiResponse = await fetch("/api/student/add", {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                studentName,
                email,
                gender,
                deptNo
            })
        });

        if(apiResponse.ok){
            const data = apiResponse.json();
            console.log(data);
        }else{
            console.log("오류");
            console.log(apiResponse.status);
            console.log(apiResponse.statusText);
        }


    };


    return (
        <section>
            <h1 className="hidden">학생 추가 양식</h1>

            <div className="mt-10 flex flex-col gap-5 text-center">
                <span className="text-2xl font-bold">
                    학생 추가
                </span>

                <div>
                    <label htmlFor="student-name">
                        학생이름
                    </label>
                    <UnderlineInput 
                        id="student-name"
                        value={studentName}
                        onChange={e => setStudentName(e.target.value)}
                        placeholder="학생 이름 입력"
                    />
                </div>
                
                <div>
                    <label htmlFor="student-email">
                        이메일
                    </label>
                    <UnderlineInput 
                        placeholder="학생 이름 입력"
                        id="student-email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                
                <div className="flex gap-2 justify-center">
                    <span className="inline-block mr-5">
                        성별
                    </span>
                    <input type="radio" id="gender-m" name="gender" checked={gender === 'm'} onChange={handleChangeGender}  value="m" />
                    <label htmlFor="gender-m" >
                        남
                    </label>
                    
                    <input type="radio" id="gender-f" name="gender"  checked={gender === 'f'} onChange={handleChangeGender} value="f" />
                    <label htmlFor="gender-f">
                        여
                    </label>
                </div>

                <div>
                    <select 
                        name="" 
                        id=""
                        className="border-1"
                        value={deptNo}
                        onChange={ e => setDeptNo(e.target.value)}
                    >
                        <option value="">학과 선택</option>
                        {deptList.map((dept, idx) => (
                            <option 
                                key={idx}
                                value={dept.deptNo}>
                                {dept.dname}
                            </option>
                        ))}
                    </select>
                </div>

              
                <div className="flex gap-2 justify-center">
                    <BlueButton
                        onClick={submitAdd}
                        value="추가하기"
                    />
                    <BlackButton 
                        onClick={listPage}
                        value="리스트로 이동"
                    />
                </div>

            </div>
            

        </section>
    );

}