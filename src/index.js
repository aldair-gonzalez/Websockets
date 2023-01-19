import { Server } from 'socket.io'


import app from './app.js'

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})



const io = new Server(server)

const messages = []

io.on('connection', socket => {
    console.log('Cliente conectado')

    socket.on('message', data => {
        messages.push(data)
        io.emit('messageLogs', messages)
    })

    socket.on('authenticated', data => {
        socket.broadcast.emit('newUserConnected', data)
    })
})