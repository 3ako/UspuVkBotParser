const Para = require('./Para')
class Day {
    constructor(dayPage) {
        this.paraList = []
        this.dayPage = dayPage;
        // console.log(dayPage.querySelector('.rasp-day').innerHTML)

        dayPage.querySelectorAll('.rasp-para').forEach(el=>{
            this.paraList.push(new Para(el))
        })
    }
    getTime(){
        // console.log(this.dayPage)
        return this.dayPage.querySelector('.rasp-day').innerHTML;
    }
}
module.exports = Day;