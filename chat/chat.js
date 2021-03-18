const server = require('http').createServer(app);
const io = require('socket.io')(server)

io.on('connection', socket => {
    console.log("Joined")
    const id = String(socket.handshake.query.email)
    console.log(id)
    socket.join(id);
    socket.on('username', username => {
        console.log(username)
        socket.username = username;
        console.log(id)
        socket.in(id).emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

    socket.on('send_message', function(msg){
      console.log(msg)
      socket.in(msg.recieverid).emit('recieve_message', msg);
    });

});