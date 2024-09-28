const express = require('express');
const http = require('http');
const socketio = require('socket.io');
require('dotenv').config();

const formateMsg = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');

const app = express();
const server = http.createServer(app);  
const io = socketio(server);
const PORT = 3000 || process.env.PORT;

//Serve static Folder
app.use(express.static('public'));

//Run when Client connects
io.on('connection', socket => { 

    socket.on('joinRoom', ({ username, room }) => {

        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        //Welcome current user
        const botName = 'ChatCord Bot ';
        socket.emit('message', formateMsg(botName, 'Welcome to ChatCord.'));

        //Broadcast when a user connects
        socket.broadcast.to(user.room).emit('message', formateMsg(botName, `${user.username} has joined.`));

        //Send User and Room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });

    });
    
    
    //Listen for chatMessage
    socket.on('chatMessage', (msg) => {

        const user = getCurrentUser(socket.id)

        io.to(user.room).emit('message', formateMsg(`${user.username} `, msg));
    });

     //Runs when client disconnects
     const botName = 'ChatCord Bot ';
     socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if(user){
            io.to(user.room).emit('message', formateMsg(botName, `${user.username} has left.`));
        }

         //Send User and Room info
         io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });

    }); 
});

server.listen(PORT, () => console.log(`Server Started at http://localhost:${PORT}`));
