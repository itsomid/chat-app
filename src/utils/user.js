const users = []

const addUser = ({id, username, room}) => {
    //clean th data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //validate the data
    if(!username || !room){
        return{
            'error': 'Username and room are required!'
        }
    }

    // check for existing user
    const existingUser = users.find((user)=>{
        return user.room === room && user.username === username
    })

    //Validate username
    if(existingUser){
        return {
            'error' : 'Username is in use!'
        }
    }
    const user = {id , username, room}
    users.push(user)
    return {user}
}

const removeUser = (id)=>{
    const index = users.findIndex((user)=>{
        return user.id == id
    })
    if(index !== -1){
        return users.splice(index,1)
    }
}

addUser({
    id: 56,
    username: 'omid',
    room: 'Blockchain'
})
// console.log(users)

const result = addUser({
    id: 24,
    username: 'Elahe',
    room: 'Blockchain'
})

// console.log(result)

const removedUser = removeUser(56)

console.log(removedUser)
console.log(users)