const mineflayer = require('mineflayer');
const http = require('http');

// 1. Web server for Render
const port = process.env.PORT || 10000;
http.createServer((req, res) => res.end('Bot is running!')).listen(port);

// 2. Configuration (Define this before usage)
const serverConfig = {
  host: 'spydimc.falix.me',
  port: 25565,
  version: false,
  auth: 'offline'
};

const botNames = ['DragonSlayer', 'PixelKnight', 'ShadowWalker', 'EnderCreeper', 'BlueMist', 'IronMiner'];

function getRandomName() {
  return botNames[Math.floor(Math.random() * botNames.length)] + Math.floor(Math.random() * 99);
}

// 3. Bot Logic
function createBot() {
  const bot = mineflayer.createBot({
    ...serverConfig,
    username: getRandomName()
  });

  bot.on('spawn', () => {
    console.log(`✅ Joined as ${bot.username}`);
    
    // Optional: Auto-login
    // setTimeout(() => bot.chat('/login YOUR_PASSWORD'), 2000);

    const moveInterval = setInterval(() => {
      const action = Math.random() > 0.5 ? 'jump' : 'forward';
      bot.setControlState(action, true);
      setTimeout(() => bot.clearControlStates(), 800 + Math.random() * 500);
    }, 10000);

    bot.on('end', (reason) => {
      clearInterval(moveInterval);
      console.log(`❌ Disconnected: ${reason}. Retrying in 60s...`);
      setTimeout(createBot, 60000);
    });
  });

  bot.on('error', (err) => console.log('⚠️ Error:', err.message));
}

createBot();
