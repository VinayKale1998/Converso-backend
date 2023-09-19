

export const users =[];


export function newUser(id, userName, group) {
    const user = {
      id,
      userName,
      group,
    };
    users.push(user);
    return user;
}

export function getIndividualGroupUsers(group)
{

   return users.filter(user=>user.group===group) 
}

 export function addUser(data){

    const present = users.some(user=>user.userName===data.userName);
    console.log(`user trying to login is ${data.userName}`)

    if(!present) 
    {
    
        return true;
    }

    else {
        console.log("user already present")
        return false
    }

}






