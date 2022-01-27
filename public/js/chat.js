const socket = io()

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormBtn = $messageForm.querySelector('button')

socket.on('message', (message) => {
    console.log(message)
})

$messageForm.addEventListener("submit", (e) => {
    e.preventDefault()

    $messageFormBtn.setAttribute('disabled','disabled')
 
    const message = e.target.elements.message.value
    socket.emit('sendMessage',message,(error)=>{

        $messageFormBtn.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()
        if(error){
            return console.log(error)
        } 
        console.log('Message delivered!')
    })
})

const $sendLocationBtn = document.querySelector('#send-location');

$locationBtn.addEventListener("click",()=>{
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser')
    }
    $locationBtn.setAttribute('disabled','disabled')
    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('sendLocation',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        },()=>{
            $locationBtn.removeAttribute('disabled')
            console.log('Location shared!')
        })
    })

  

})
