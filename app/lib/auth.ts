
export async function checkDuplicatedId(userId : string){
    
    const response = await fetch(`http://localhost:8080/auth/dup-check-id?userId=${userId}`,{
        method:"get"
    });

    if(!response.ok){
        console.log(response.statusText);
        console.log(response.status);
        return false;
    }

    // console.log("checkDuplicatedId() .. param("+userId+")");

    const data = await response.json();
    // console.log(data);
    return data;
}

export async function joinUser(userId : string, userPwd : string, nickname : string, email : string){

    const response = await fetch("http://localhost:8080/auth/join-user", {
        method: "post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId,
            userPwd,
            nickname,
            email
        })
    });

    if(!response.ok){
        console.log(response.status);
        console.log(response.statusText);
        return null;
    }


    console.log("lib/auth joinUser() 호출되었음.");
    const data = await response.json();
    return data;
}