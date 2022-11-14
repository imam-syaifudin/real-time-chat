// Import Modules
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { userJoin, getCurrentUser, getUserInRoom } = require('./utils/user');


// Port
const port = 3000;


// Inilization
const app = express(); 
const server = http.createServer(app);
const io = new Server(server );
const messageFormater = require('./utils/messageFormater');

const author = 'ChatBot'

// Set static folder
app.use(express.static('public'));

io.on('connection', socket => {

    // Listening join room
    socket.on('joinRoom', ({username,room }) => {

        const user = userJoin(socket.id, username, room);
        socket.join(user.room);
        
        // Ucapan Selamat Untuk Client Pribadi
        socket.emit('message',messageFormater(author,`Welcome To Room ${room} Room`));
        
        // Untuk Siaran ke semua pengguna
        // socket.broadcast
        // .to(user.room)
        // .emit('message',messageFormater(author,`${username} telah gabung ke dalam obrolan`));
        
        io.to(user.room)
          .emit('getUserInRoom',getUserInRoom(user.room));  

        // Mengambil pesan
        socket.on('pesan',(pesan) => {
            socket.broadcast
                  .to(user.room)
                  .emit('pesan', messageFormater(user.username,pesan));
        });
    });





    // User dicconnect
    // socket.on('disconnect',() => {
    //     io.emit('message',messageFormater(author,'User telah meninggalkan obrolan'));
    // });



});




server.listen(port, () => console.log(`Server start on port ${port}`));





