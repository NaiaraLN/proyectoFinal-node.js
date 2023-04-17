const username = document.getElementById('username').value;
const socket = io.connect('http://localhost:8080/chat',{
    auth:{
        username: username
    }
});

function showMessages(messages){
    const message = messages.map(({mail,message}) => {
        return `<li class="rounded-2 list-group-item mb-2 shadow-sm bg-body">${mail} | ${message}</li>`
    })
    const html = `
        <ul class="list-group">
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
        text: text.value,
    };
    socket.emit('newMessage', message);
    return false;
}