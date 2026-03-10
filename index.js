const mineflayer = require('mineflayer')
const {pathfinder, Movements, goals} = require('mineflayer-pathfinder')
const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req,res)=>res.send("bot running"))
app.listen(PORT, ()=>console.log("Web server running"))

const names = ["ShadowAxe","NovaPvP","PixelRaider","VoidCrafter","IronSpecter"]
const username = names[Math.floor(Math.random()*names.length)]

function createBot(){

const bot = mineflayer.createBot({
  host: 'spydimc.falix.me',
  username: username,
  version: '1.21',
  auth: 'offline'
})

bot.loadPlugin(pathfinder)

bot.once('spawn', () => {

  console.log("Bot joined as", username)

  const mcData = require('minecraft-data')(bot.version)
  const defaultMove = new Movements(bot, mcData)

  bot.pathfinder.setMovements(defaultMove)

  setInterval(() => {

    const x = bot.entity.position.x + (Math.random()*20 - 10)
    const z = bot.entity.position.z + (Math.random()*20 - 10)
    const y = bot.entity.position.y

    const goal = new goals.GoalBlock(Math.floor(x), Math.floor(y), Math.floor(z))

    bot.pathfinder.setGoal(goal)

  }, 30000)

  // look around sometimes
  setInterval(()=>{
    bot.look(Math.random()*Math.PI*2,(Math.random()-0.5)*Math.PI)
  },20000)

  // occasional chat
  setInterval(()=>{
    const msgs = ["hi","anyone here","hello","lol","hmm"]
    const msg = msgs[Math.floor(Math.random()*msgs.length)]
    bot.chat(msg)
  },300000)

})

bot.on('end',()=>{
  console.log("Disconnected, reconnecting...")
  setTimeout(createBot,15000)
})

bot.on('kicked',reason=>console.log("Kicked:",reason))
bot.on('error',err=>console.log("Error:",err))

}

createBot()
