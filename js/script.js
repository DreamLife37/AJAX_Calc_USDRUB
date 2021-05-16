'use strict';
//052 AJAX и общение с сервером (аббревиатура от Asynchronous JavaScript And XML)
/* Технология AJAX используется к примеру в фильтрах на странице интернет каталога
Технология обращения к серверу без перезагрузки страницы.
те когда пользователь выбирает нужные параметры в фильтрах, страница полностью не перезагружается, а лишь обновляется та часть которая необходима.
Страница делает запрос к серверу и получает от него всего лишь часть страницы */

//XMLHttpRequest один из способов реализации AJAX (самый старый)
//XMLHttpRequest встроенный в браузер объект

//Создание калькулятора RUB-USD
const inputRub = document.querySelector('#rub'),
      inputUsd = document.querySelector('#usd');

      //current.json - мини сервер

inputRub.addEventListener('input', () => {
    const request = new XMLHttpRequest();
    //Методы:
    //request.open(method, url, async, login, pass);
    //method - GET(получение), POST(отправка, к примеру форма регистрации)
    //url по которому мы будем делать запрос
    //Синхронный код идет по порядку, те если какая то операция долго выполняется, то весь остальной код ниже будет ее ждать
    //Асинхронный код работает обратным методом (к примеру setTimeout, setInterval)
    //AJAX запросы являются по умолчанию асинхронным кодом
    request.open('GET', 'js/current.json'); //(этот метод не открывает соединение между backend и frontend, а собирает настройки)
    //HTTP заголовок: 
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();

  
    /* request.addEventListener('readystatechange', () => {
        if (request.readyState === 4 && request.status === 200) { */
    //Событие readystatechange возникает, когда изменяется свойство AJAX запроса - readyState. 


    request.addEventListener('load', () => { //событие load срабатывает один раз, когда запрос готов
        if (request.status === 200) {
            console.log(request.response);
           /*  { в консоли
                "current": {
                    "usd": 74
                }
            } */
            const data = JSON.parse(request.response); //конвертация данных от сервера в обычный JS объект
            inputUsd.value =  (+inputRub.value / data.current.usd).toFixed(2);
        } else {
            inputUsd.value = 'Что-то пошло не так';
        }
    });

    //Свойства:
    //1) status статус нашего запроса
  /* Код состояния HTTP (HTTP status code) — часть первой строки ответа сервера при запросах по протоколу HTTP. 
  Он представляет собой целое число из трёх десятичных цифр. Первая цифра указывает на класс состояния. 
    1xx: Informational (информационные)
    2xx: Success (успешно)
    3xx: Redirection (перенаправление)
    4xx: Client Error (ошибка клиента)
    5xx: Server Error (ошибка сервера) */

    //2) statusText поясняющая фраза на английском языке, 
    //которая разъясняет человеку причину именно такого ответа. 

    //3) response ответ от сервера
    //4) readyState текущее состояние нашего запроса (от 0 (UNSENT) до 4 (DONE))
});
