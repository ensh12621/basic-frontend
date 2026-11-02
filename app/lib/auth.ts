
export async function checkDuplicatedId(userId : string){
    
    const response = await fetch(`http://localhost:8080/auth/dup-check-id?userId=${userId}`,{
        method:"get"
    });

    if(!response.ok){
        console.log(response.statusText);
        console.log(response.status);
        return false;
    }

    console.log("checkDuplicatedId() .. param("+userId+")");

    const data = await response.json();
    console.log(data);
    return false;
}