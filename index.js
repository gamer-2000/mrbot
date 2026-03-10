const mineflayer = require('mineflayer')
const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req,res)=>{
  res.send('AFK Bot Running')
})

app.listen(PORT, () => {
  console.log('Web server running')
})

const bot = mineflayer.createBot({
  host: 'spydimc.falix.me',
  username: 'AFK_Bot',
  version: '1.21',
  auth: 'offline'
})

bot.on('spawn', () => {
  console.log('Bot joined server')

  // wait before doing anything
  setTimeout(() => {

    // random movement every 15 sec
    setInterval(() => {

      const actions = ['forward','back','left','right','jump']
      const action = actions[Math.floor(Math.random()*actions.length)]

      bot.setControlState(action,true)

      setTimeout(()=>{
        bot.setControlState(action,false)
      },2000)

    },15000)

    // look around every 20 sec
    setInterval(()=>{
      const yaw = Math.random() * Math.PI * 2
      const pitch = (Math.random() - 0.5) * Math.PI
      bot.look(yaw,pitch)
    },20000)

    // chat sometimes so server thinks player is real
    setInterval(()=>{
      const msgs = ['hello','hi','lol','afk','hmm']
      const msg = msgs[Math.floor(Math.random()*msgs.length)]
      bot.chat(msg)
    },180000)

  },10000)

})

bot.on('kicked', reason=>{
  console.log('Kicked:',reason)
})

bot.on('error', err=>{
  console.log('Error:',err)
})

bot.on('end', ()=>{
  console.log('Disconnected, reconnecting...')
  setTimeout(()=>{
    process.exit()
  },5000)
})
