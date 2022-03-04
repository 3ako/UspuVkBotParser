class Para {
    constructor(paraPage) {
        this.paraPage = paraPage;
        // console.log(this.getTime(),this.getName())
        var page = this.paraPage.querySelector('.rasp-desc').getElementsByTagName('p');
        var descPage = this.paraPage.querySelector('.rasp-desc').getElementsByTagName('span')
        // console.log(descPage.toString())
        // console.log(page[0].innerHTML)

        page = page[0].innerHTML
        var data = page.match('(.*)<br> <span>')
        this.name = data[1]
        this.desc = descPage[0].innerHTML.replace(/<!.*>|<br>|\n/gi,'');
    }
    getTime(){
        // console.log(this.paraPage.querySelector('.para-time'))
        return this.paraPage.querySelector('.para-time').innerHTML
    }
    getName(){
        // page.match('(.*) <span>')[0]
        return this.name
    }
    getDesc(){
        return this.desc
    }
}
module .exports = Para;