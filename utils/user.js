const users = [];



function userJoin(id, username, room){
    const user = {id, username, room}
    users.push(user);

    return user;

}

function getCurrentUser(id){
 
    return users.find(id => user.id == id);


}

function getAllUser(room){

    const user = users.filter(user => user.room == room);
    users.push(user);

    return user;

}

module.exports = {
    userJoin, getCurrentUser, getAllUser
}