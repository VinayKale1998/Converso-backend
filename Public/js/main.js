


const chatForm = document.getElementById('chat-form');
const chatMessages= document.querySelector('.chat-messages');
const roomName= document.getElementById('room-name');
const userList= document.getElementById("users");

const io = require("socket.io");




const{username,room}=Qs.parse(location.search,{ignoreQueryPrefix:true});

const socket = io();

socket.emit("joinRoom",{username,room});

socket.on("message",(message)=>{

    outMessage(message)

})

socket.on("roomusers",({room,activeUsers})=>{

    outputRoomName(room);
    outputActiveUsers(activeUsers);
})

