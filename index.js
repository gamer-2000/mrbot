const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => res.send("AFK bot running"))
app.listen(PORT, () => console.log("Web server running"))

const names = [
  "ShadowAxe",
  "NovaPvP",
  "PixelRaider",
  "VoidCrafter",
  "IronSpecter",
  "NightMiner"
]

function createBot() {

  const username = names[Math.floor(Math.random() * names.length)]

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

    // Walk randomly around
    setInterval(() => {

      const x = bot.entity.position.x + (Math.random() * 20 - 10)
      const z = bot.entity.position.z + (Math.random() * 20 - 10)
      const y = bot.entity.position.y

      const goal = new goals.GoalBlock(
        Math.floor(x),
        Math.floor(y),
        Math.floor(z)
      )

      bot.pathfinder.setGoal(goal)

    }, 30000)

    // Look around
    setInterval(() => {
      const yaw = Math.random() * Math.PI * 2
      const pitch = (Math.random() - 0.5) * Math.PI
      bot.look(yaw, pitch)
    }, 20000)

    // Random jump
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
    }, 25000)

    // Occasional chat
    setInterval(() => {
      const msgs = [
        "hi",
        "hello",
        "anyone here?",
        "lol",
        "hmm"
      ]
      const msg = msgs[Math.floor(Math.random() * msgs.length)]
      bot.chat(msg)
    }, 300000)

  })

  // Death detection
  bot.on('death', () => {
    console.log("Bot died 💀 waiting for respawn")
  })

  bot.on('respawn', () => {
    console.log("Bot respawned")
  })

  // Reconnect if disconnected
  bot.on('end', () => {
    console.log("Disconnected. Reconnecting in 15s...")
    setTimeout(createBot, 15000)
  })

  bot.on('kicked', (reason) => {
    console.log("Kicked:", reason)
  })

  bot.on('error', (err) => {
    console.log("Error:", err)
  })

}

createBot()
