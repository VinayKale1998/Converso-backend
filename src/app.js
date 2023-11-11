import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import http from "http";
import { rejects } from "assert";
import {
  addUser,
  newUser,
  getIndividualGroupUsers,
  users,
} from "./helpers/helper.js";

import AWS from "aws-sdk";

AWS.config;

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`Socket is connected to ${socket.id}`);

  socket.on("login", (data) => {
    console.log("login event received", data);
    if (!addUser(data)) {
      io.emit("loginError", { message: "User already present" });
    } else {
      const user = newUser(socket.id, data.userName, data.group);
      socket.join(user.group);
      io.emit("loggedIn", { message: "user logged in", user: user });
      socket.broadcast.to(user.group).emit("entered", {
        message: `${user.userName} has entered the chat`,
        group: user.group,
        userName: "Admin",
      });

      io.to(user.group).emit("groupUsers", getIndividualGroupUsers(user.group));
    }
  });

  socket.on("message", (data) => {
    console.log("message received is ", data.message);

    io.to(data.group).emit("message", data);
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, (err) => {
  console.log("Server is running");
});
