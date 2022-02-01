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