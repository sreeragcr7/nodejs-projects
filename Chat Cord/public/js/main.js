const socket = io();

//Get username and room from URL
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix:true,
})

//Join Chat Room
socket.emit('joinRoom', { username, room })

//Get room and users
socket.on('roomUsers', ({room, users}) => {
    outputRoomName(room),
    outputUsers(users)
});

//Message from server
socket.on('message' , message => {
    console.log(message)
    outputMessage(message);

    //Scroll down
    const chatMessages = document.querySelector('.chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;

})

const chatForm = document.getElementById('chat-form');
//Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get value of input
    const msg = e.target.elements.msg.value;
    
    //Emit message to the server
    socket.emit('chatMessage', msg);

    //Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

//Output message to  DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML =`<p class="meta">${message.username}<span>${message.time}</span></p>
	<p class="text">${message.text}</p>`
    document.querySelector('.chat-messages').appendChild(div);
}

//Add room name to DOM
const roomName = document.getElementById('room-name');
function outputRoomName(room){
    roomName.innerHTML = room;
    
}

//Add users to the DOM
const userList = document.getElementById('users');
function outputUsers(users){
    userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}

