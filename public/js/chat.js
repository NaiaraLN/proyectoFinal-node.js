const socket = io.connect();

function showMessages(messages){
    const message = messages.map(({mail,message}) => {
        return `<li>${mail}</li> <li>${message}</li>`
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
    const mail = document.getElementById('mail');
    const text = document.getElementById('text');
    const message = {
        mail: mail.value,
        message: text.value,
    };
    socket.emit('newMessage', message);
    return false;
}