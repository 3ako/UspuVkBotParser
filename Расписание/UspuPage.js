const Day = require('./Day.js')
class UspuPage {
    constructor(body) {
        this.root = body;
        this.days = []
        // console.log(this.root.querySelector(".rasp-item").querySelector('.rasp-day').innerText)
        this.root.querySelectorAll('.rasp-item').forEach(el=>{
            // console.log(el.querySelector('.rasp-day').innerHTML)
            this.days.push(new Day(el))
        })
    }
    getRoot(){
        return this.root;
    }
    getGroup(){
        return this.root.querySelector(".rasp-zag-group").innerText;
    }
    getAllDays(){
        return this.root.querySelectorAll('.rasp-descr')
    }
}
module.exports = UspuPage;