const mineflayer = require('mineflayer')
const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req,res)=>{
  res.send("AFK bot running")
})

app.listen(PORT,()=>{
  console.log("Web server running")
})

function createBot(){

  const bot = mineflayer.createBot({
    host: 'spydimc.falix.me',
    username: 'AFK_Bot',
    version: '1.21',
    auth: 'offline'
  })

  bot.on('spawn',()=>{
    console.log("Bot joined server")

    setTimeout(()=>{

      setInterval(()=>{

        const actions = ['forward','back','left','right','jump']
        const action = actions[Math.floor(Math.random()*actions.length)]

        bot.setControlState(action,true)

        setTimeout(()=>{
          bot.setControlState(action,false)
        },2000)

      },15000)

      setInterval(()=>{
        bot.look(Math.random()*Math.PI*2,(Math.random()-0.5)*Math.PI)
      },20000)

    },10000)

  })

  bot.on('kicked',(reason)=>{
    console.log("Kicked:",reason)
  })

  bot.on('end',()=>{
    console.log("Disconnected. Reconnecting in 15s...")
    setTimeout(createBot,15000)
  })

  bot.on('error',(err)=>{
    console.log("Error:",err)
  })

}

createBot()
