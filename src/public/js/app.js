const socket = io()


Swal.fire({
    title: 'Identificate',
    input: 'text',
    text: 'Ingrese su nombre en el chat',
    inputValidator: (value) => {
        return !value && 'Necesitas un nombre de usuario para continuar'
    },
    allowOutsideClick: false,
}).then(res => {
    user = res.value

    socket.emit('authenticated', user)
})


chatBox.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        if(chatBox.value.trim().length > 0) {
            socket.emit('message', { user, message: chatBox.value })
            chatBox.value = ''
        }
    }
})

socket.on('messageLogs', async (data) => {
    if(!user) return;
    let m = ''

    await data.forEach(d => {
        m += `
            <p class="text-sm">
                <span class="text-orange-500">${d.user}: </span>
                <span>${d.message}</span>
            </p>
        `
    })
    messageLogs.innerHTML = m
})

socket.on('newUserConnected', data => {
    if(!user) return;

    Swal.fire({
        title: `Se conectó ${data}`,
        toast: true,
        position: 'bottom-right',
        showConfirmButton: false,
        timer: 4000,
        icon: 'success'
    })
})