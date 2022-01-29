const generateMessage = (text)=>{
    return {
        text,
        createdAt: new Date().getTime()
    }
}
const generateLocationMessage = (locationUrl)=>{
    return {
        url: locationUrl,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}