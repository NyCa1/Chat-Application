const socket=io()

const clientsTotal = document.getElementById('client-total')
const messageContainer = document.getElementById('message-container')
const nameInput = document.getElementById('nameInput')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')

messageForm.addEventListener('submit',(e) => {
    e.preventDefault()
    sendMessage()
})

socket.on('client-total',(data) => {
    clientsTotal.innerText = `Total Clients: ${data}`
})

function sendMessage () {
    if (messageInput.value === '') return
    console.log(messageInput.value)
    const data = {
        name:nameInput.value,
        message:messageInput.value,
        dateTime:new Date()

    }
    socket.emit('message',data)
    AddMessageToUI(true,data)
    messageInput.value=''

    socket.on('chat-message',(data) => {
        console.log(data)
        AddMessageToUI(false,data)
    })
}

function AddMessageToUI (isOwnMessage,data)
{
    const element = `
    <li class="${isOwnMessage ? "message-right" : "message-left"}">
        <p class="message">
            ${data.message}
            <span> ${data.name} | ${data.dateTime}</span>
        </p>
    </li>`

    messageContainer.innerHTML += element
    ScrollToBottom()
}

function ScrollToBottom() {
    messageContainer.scrollTo(0,messageContainer.scrollHeight)
}