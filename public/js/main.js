const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');  
const chatcord = document.getElementById('chatcord');
const socket = io();
const userList = document.getElementById('users');

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
}); 

// Join chat room
socket.emit('joinRoom',({username, room}));
chatcord.innerText = username;

socket.on('message',(msg,user) => {

    tampilkanPesan(msg);
    console.log(user);
    for( let i = 0; i < user.length; i++ ){
        let li = document.createElement('li');
        li.innerHTML = `${user[i].username}`;
        userList.appendChild(li);
    }
    

    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // document.querySelector('.message').childNodes[2].style.textAlign = 'right';
});

socket.on('pesan',(pesan) => {
    const div = document.createElement('div');
   
    div.classList.add('message');
    div.style.color = 'black';
    div.style.backgroundColor = '#f5f6f7';
    div.style.textAlign = 'left';
    div.style.marginRight = 'auto';
    div.style.borderRadius = '20px';
    div.style.boxShadow = 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px';
    div.innerHTML = `<p class="meta" style="color: black;">${pesan.username} <span style="display: inline-block; margin-right: auto;">${pesan.time}</span></p>
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
    div.style.color = 'white';
    div.style.borderRadius = '20px';
    div.style.boxShadow = 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px';
    // div.style.backgroundImage = 'linear-gradient(105deg, rgba(102,122,255,1) 44%, rgba(0,0,0,1) 100%, rgba(0,0,0,1) 100%)';
    div.style.backgroundColor = '#667aff';
    div.style.marginLeft = 'auto';
    div.style.borderRadius = '10px / 30px;';
    div.innerHTML = `<p class="meta" style="color: white;">You  <span style="color: white;">${jamSekarang}</span></p>
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
    div.style.color = 'white';
    div.style.backgroundImage = 'linear-gradient(105deg, rgba(102,122,255,1) 44%, rgba(0,0,0,1) 100%, rgba(0,0,0,1) 100%)';
    div.style.width = '100%';
    div.style.textAlign = 'center';
    div.style.borderRadius = '20px';
    div.innerHTML = `<p class="meta" style="color: white;">${pesan.username}</p>
    <p class="text">
    ${pesan.message}
    </p>`;
    
    document.querySelector('.chat-messages').appendChild(div);
    
}