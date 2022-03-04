const Bot = require('node-vk-bot-api');
const Markup = require('node-vk-bot-api/lib/markup')
var kb = Markup.keyboard([
    [Markup.button("Расписание","primary")],
    [
        Markup.button("Сегодня",'secondary'),
        Markup.button("Завтра",'secondary')
    ]])

class VkBot {
    constructor(token) {
        this.token = token;
        this.setOn();
        this.uspuPage = null;
    }
    setOn(){
        this.bot = new Bot(this.token)
        this.registerCommand();
        this.bot.startPolling();
    }
    registerCommand(){
        this.bot.command("Ку",async (data)=>{
            try{
                await data.reply("&#127878; Салют",null,kb)

            } catch (e){
                console.log(e)
            }
            // console.log()
        })
        this.bot.command('Расписание',async  (data)=>{
            for (const day of this.uspuPage.days) {
                    // console.log(day.getTime())
                    var text = ""
                    text += "📅 "+day.getTime()+"\n"
                    day.paraList.forEach(para=>{
                        text+="📚 "+para.getTime()+" - "+para.getName()+"\n"+para.getDesc()+"\n";
                    })
                try{
                    await this.bot.sendMessage(data.message.from_id,text)
                } catch (e){console.log(e)
                }
            }
        })
        this.bot.command("Сегодня",async (data)=>{
            var day = this.uspuPage.days[0]
            var text = ""
            text += "📅 "+day.getTime()+"\n"
            day.paraList.forEach(para=>{
                text+="📚 "+para.getTime()+" - "+para.getName()+"\n"+para.getDesc()+"\n";
            })
            try{
                await this.bot.sendMessage(data.message.from_id,text)
            } catch (e){console.log(e)}
        })
        this.bot.command("Завтра",async (data)=>{
            var day = this.uspuPage.days[1]
            var text = ""
            text += "📅 "+day.getTime()+"\n"
            day.paraList.forEach(para=>{
                text+="📚 "+para.getTime()+" - "+para.getName()+"\n"+para.getDesc()+"\n";
            })
            try{
                await this.bot.sendMessage(data.message.from_id,text)
            } catch (e){console.log(e)}
        })
    }
    setUspuPage(uspuPage){
        this.uspuPage = uspuPage;
        console.log('Vk бот загружен')

    }
}
module.exports = VkBot;