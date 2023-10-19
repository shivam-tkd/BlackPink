//Node Server
const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', pop =>{
        console.log("New user", pop)
        users[socket.id] = pop;
        socket.broadcast.emit('user-joined', pop);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, pop: users[socket.id]})
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});