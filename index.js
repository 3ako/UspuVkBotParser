
const https = require('https')
var VkBot = require('./VkBot')
const UspuPage = require('./Расписание/UspuPage')
const vkBot = new VkBot('token');
const fs = require('fs');
const {JSDOM} = require("jsdom");
var cron = require('node-cron');

//Первая загрузка
loadWebData()

//Загрузка каждые 10 минут
cron.schedule('*/10 * * * *', () => {
    loadWebData();
});


function readURL(url) {

    // возвращаем Promise - так как операция чтения может длиться достаточно долго
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            // получаем статус ответа сервера посредством деструктуризации объекта
            const { statusCode } = res;
            let error;
            if (statusCode !== 200) {
                error = new Error(`Ошибка запроса. Код ответа: ${statusCode}`);
            }


            // при ошибке очищаем память и выходим
            if (error) {

                reject(error);
                res.resume();
                return;
            }


            // устанавливаем кодировку
            // res.setEncoding('utf8');

            // собираем данные в строку
            let rawData = '';
            res.on('data', chunk => rawData += chunk);

            // после получения всех данных успешно завершаем Промис
            res.on('end', () => resolve(rawData));



        }).on('error', (e) => reject(e)); // ошибка -> отклоняем Промис
    })
}
function loadWebData(){
    readURL('https://uspu.ru/education/eios/schedule/?group_name=%D0%9D%D0%90-2131')
    .then(data => {
            const { document } = new JSDOM(data).window
            // console.log(body)
            vkBot.setUspuPage(new UspuPage(document))
        }
    )
}