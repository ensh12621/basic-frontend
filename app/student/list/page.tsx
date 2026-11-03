
import StudentList from "./studentList";

export default async function Page(){
    
    return  (
        <div>
            <h1 className="hidden">학생 목록 페이지</h1>
            <StudentList />
        </div>
    );
}
