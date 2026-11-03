"use client";

import { GreenButton } from "@/app/component/buttons";
import { useRouter } from "next/navigation";


export default function StudentList(){

    const router = useRouter();


    const addNewStudentPage = () => {
        router.push("/student/add");
    };

    return (
        <section>
            <h1 className="hidden">학생 목록 조회</h1>

            <GreenButton
                    value="학생 추가"
                    onClick={addNewStudentPage} />

        </section>
    );
}