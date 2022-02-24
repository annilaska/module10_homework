
//----------------------------задание 3---------------------------

// Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.
// Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».
// При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.
// Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат.
// Добавить в чат механизм отправки гео-локации.
// При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат вывести ссылку 
// на https://www.openstreetmap.org/ с вашей гео-локацией. Сообщение, которое отправит обратно эхо-сервер, 
// не выводить.


const wsUri = "wss://echo-ws-service.herokuapp.com";


function pageLoaded() {

    const sendButton = document.querySelector('.sent_button');
    const geoButton = document.querySelector('.geo_button');
    const input = document.querySelector('.input');
    const chat = document.querySelector('.chat');

    let socket  = new WebSocket(wsUri);
    
    //Выводим сообщение в чат. С помощью классов определяем кто именно пишет(мы или сервер)

    function wrightToChat(message, isRecieved) {
        let messageHTML = `<div class="${isRecieved? "server_message" : "user_message"}">${message}</div>`;
        chat.innerHTML += messageHTML;
    }


    //Сервер отправляет сообщение для чата

    socket.onmessage = (event) => {
        wrightToChat(event.data, true);
    }

    socket.onerror = () => {
        chat.innerText = "При отправке данных произошла ошибка";
    }

    //Мы отправляем сообщение для чата

    sendButton.addEventListener('click', () => {

        if (!input.value)  return;
        socket.send(input.value);
        wrightToChat(input.value, false);  
        input.value = "";  
    })


//Получение геолокации

    geoButton.addEventListener('click', () => {

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
        } else {
            let banMessage = `<div class="geo">Ваш браузер не поддерживает функцию определения местоположения</div`;
            chat.innerHTML += banMessage;
        }
    })


    function sentToChat(message) {
        let geoMessage = `<div class="geo">${message}</div>`;
        chat.innerHTML += geoMessage;
    }

    function locationSuccess(position) {
        let link = `https://www.openstreetmap.org/#map=18/${position.coords.latitude}/${position.coords.longitude}`;
        sentToChat(`<a href="${link}" target="_blank" class="geo_link">Гео-локация</a>`);
    }


    function locationError() {
        let errorMessage = `<div class="geo">Не получено согласие на определение местоположения</div`;
        chat.innerHTML += errorMessage;
    }
}


document.addEventListener("DOMContentLoaded", pageLoaded);