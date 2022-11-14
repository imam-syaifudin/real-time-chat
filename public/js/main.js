const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');  
const chatcord = document.getElementById('chatcord');
const socket = io();


const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
}); 

// Join chat room
socket.emit('joinRoom',({username, room}));
chatcord.innerText = username;

socket.on('message',(msg) => {

    tampilkanPesan(msg);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // document.querySelector('.message').childNodes[2].style.textAlign = 'right';
});

socket.on('pesan',(pesan) => {
    const div = document.createElement('div');
   
    div.classList.add('message');
    div.style.backgroundColor = 'yellow';
    div.style.textAlign = 'left';
    div.style.color = 'black';
    div.style.marginRight = 'auto';
    div.innerHTML = `<p class="meta" style="color: black;">${pesan.username} <span>${pesan.time}</span></p>
    <p class="text">
    ${pesan.message}
    </p>`;
    
    document.querySelector('.chat-messages').appendChild(div);
    getScroll();
})
// Klik Submit

chatForm.addEventListener('submit',(e) => {
    e.preventDefault();

    const div = document.createElement('div');
    let date = new Date();
    let jamSekarang = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    
    div.classList.add('message');
    div.style.textAlign = 'right';
    div.style.backgroundColor = '#667aff';
    div.style.marginLeft = 'auto';
    div.innerHTML = `<p class="meta" style="color: white;">Me <span style="color: black;">${jamSekarang}</span></p>
    <p class="text">
    ${e.target.msg.value}
    </p>`;
    
    document.querySelector('.chat-messages').appendChild(div);

    socket.emit('pesan',e.target.msg.value);

    e.target.msg.value = '';
    e.target.msg.focus();
    getScroll();
});


function getScroll(){
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function tampilkanPesan(pesan){
    
    const div = document.createElement('div');
    div.classList.add('message');
    div.style.textAlign = 'left`';
    div.style.width = '100%';
    div.style.textAlign = 'center';
    div.innerHTML = `<p class="meta" style="color: black;">${pesan.username} <span>  
    
    ${pesan.time}</span></p>
    <p class="text" style="color: black;">
    ${pesan.message}
    </p>`;
    
    document.querySelector('.chat-messages').appendChild(div);
    
}