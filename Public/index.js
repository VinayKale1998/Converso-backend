const http = require("http");
const express = require("express");
const path = require("path");
const  socketio= require("socket.io")
const { newUser,getActiveUser,getIndividualRoomUsers,exitRoom} = require("../helpers/userHelper");
const formatMessage = require("../helpers/formatDate");


const app = express();
const server = http.createServer(app);
const io= socketio(server);

app.use(express.static(path.join(__dirname,'public')));
//whenever client tries to connect

io.on("connection",socket=>{
    socket.on("joinRoom",({username,room})=>{
        const user =newUser(socket.id, username,room);
        socket.join(user.room);
        socket.emit("message",formatMessage("AirTribe",'messages are limited to this room'));
        //now all the users expect this one should get a joining message about this user//
        // so lets use the socket.io broadcast method which does the same for us
        // ff

        socket.broadcast.to(user.room).emit("message",formatMessage("Airtribe", `${user.username} has joined the room!`));

        //but io.to sends it to everyone in the r oom 
        io.to(user.room).emit('roomusers',{
            room:user.room ,  
            users:getIndividualRoomUsers(user.room)

        })
    })
})

const PORT = process.env.PORT || 3000;

server.listen(PORT,()=>{
    console.log(`server listening to the poer ${PORT}`)
})

