const socket = io.connect();

function showMessages(messages){
    const message = messages.map(({username,message}) => {
        return `<li>${username}</li> <li>${message}</li>`
    })
    const html = `
        <ul>
        ${message.join('\n')}
        </ul>`
    const allMessages = document.getElementById("messages");
    allMessages.innerHTML = html
}
socket.on('messages', messages => {
    showMessages(messages)
});

function addMessage(e){
    const username = document.getElementById('username');
    const mail = document.getElementById('mail');
    const text = document.getElementById('text');
    const message = {
        username: username.value,
        mail: mail.value,
        message: text.value,
    };
    socket.emit('newMessage', message);
    return false;
}