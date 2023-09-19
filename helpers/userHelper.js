const users = [];

//join user to the chat

function newUser(id, username, room) {
  const user = {
    id,
    username,
    room,
  };

  users.push(user);
  return user;
}


function getIndividualRoomUsers(room)
{

   return users.filter(user=>user.room===room) 
}

function exitRoom(id){


    const index= users.findIndex(user=>user.id===id);

    if(index!==-1){
        return users.splice(index,1)[0]// splice returns the removed items if any in an array hence we return the first item in the array
        //we remove the user from the array of users when he exits
    
    }
}


function getActiveUser(id)
{

    return users.find(user=>user.id==id);
}

module.exports={

    newUser,getActiveUser,getIndividualRoomUsers,exitRoom
}