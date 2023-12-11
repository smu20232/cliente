
const socket = require('./socket')

const roomName = window.location.pathname.split('/')[2]


const get_user_data = (mode) => {
    var data = undefined
    const cookieValue = document.cookie.split('; ').find(cookie => cookie.startsWith('sessionData='));
    if (cookieValue) {
        const jsonString = decodeURIComponent(cookieValue.split('=')[1]);
        const sessionData = JSON.parse(jsonString);
        if (mode == 'text') {
            data = jsonString
        } else {
            data = sessionData
        }
    }
    console.log(data)
    return data
}



const sendMessage = () => {
    var messageInput = document.getElementById("message-input");
    let user_data = get_user_data();
    let nome = user_data.name

    // Get the user's message
    var message = messageInput.value.trim();

    // Check if the message is not empty
    if (message !== "") {
        // Create a new message element
        socket.emit('sendChat', { roomName, message, nome }, (response) => {
            console.log(response)
            if (response) {
                // Clear the input field
                messageInput.value = "";
            }
        })
    }
}


const sendbutton = document.getElementById('send-button')

sendbutton.addEventListener("click", sendMessage);



socket.on('receiveChat', ({ message, nome }) => {
    console.log(message)
    console.log(nome)
    var chatFeed = document.getElementById("chat-feed");
    var messageElement = document.createElement("div");
    messageElement.textContent = nome + message;

    // Append the message to the chat feed
    chatFeed.appendChild(messageElement);

    // Scroll to the bottom of the chat feed
    chatFeed.scrollTop = chatFeed.scrollHeight;
})

module.exports = {sendMessage: sendMessage};