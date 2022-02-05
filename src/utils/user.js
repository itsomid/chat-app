const users = []

const addUser = ({ id, username, room }) => {
    //clean th data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //validate the data
    if (!username || !room) {
        return {
            'error': 'Username and room are required!'
        }
    }

    // check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    //Validate username
    if (existingUser) {
        return {
            'error': 'Username is in use!'
        }
    }
    const user = { id, username, room }
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => {
        return user.id == id
    })
    if (index !== -1) {
        return users.splice(index, 1)
    }
}

const getUser = (id) => {
    const user = users.find((user) => {
        return user.id === id
    })
    if (!user) {
        return {
            'error': 'User not found!'
        }
    }
    return user
}

const getUserInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room )
}

addUser({
    id: 32,
    username: 'omid',
    room: 'Blockchain'
})
addUser({
    id: 33,
    username: 'reza',
    room: 'Blockchain'
})
addUser({
    id: 34,
    username: 'jafar',
    room: 'Programming'
})

const user = getUser(32)
console.log(user)

const userList = getUserInRoom('programming')

console.log(userList)
