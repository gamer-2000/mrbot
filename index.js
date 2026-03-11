const mineflayer = require('mineflayer');
const http = require('http');

// --- 1. Keep Render/GitHub alive ---
const port = process.env.PORT || 10000;
http.createServer((req, res) => res.end('Bot is running!')).listen(port);

// --- 2. Configuration ---
const botNames = ['AFK_Player', 'Survivor_Bot', 'Idle_Guy', 'Steve_AFK'];
const serverConfig = {
  host: 'spydimc.falix.me',
  port: 25565, 
  version: false, // Auto-detect version
  auth: 'offline'
};

function getRandomName() {
  return botNames[Math.floor(Math.random() * botNames.length)] + Math.floor(Math.random() * 99);
}

// --- 3. The Bot Logic ---
function createBot() {
  const bot = mineflayer.createBot({
    ...serverConfig,
    username: getRandomName()
  });

  bot.on('spawn', () => {
    console.log(`✅ Joined as ${bot.username}`);
    
    // Auto-login (Uncomment if your server needs /login)
    // setTimeout(() => bot.chat('/login YOUR_PASSWORD'), 2000);

    // Human-like Jittery Movement
    const moveInterval = setInterval(() => {
      const action = Math.random() > 0.5 ? 'jump' : 'forward';
      bot.setControlState(action, true);
      setTimeout(() => bot.clearControlStates(), 500 + Math.random() * 1000);
    }, 8000 + Math.random() * 5000);

    bot.on('end', (reason) => {
      clearInterval(moveInterval);
      console.log(`❌ Disconnected: ${reason}. Retrying...`);
      setTimeout(createBot, 60000); // 1 minute wait to avoid throttling
    });
  });

  bot.on('error', (err) => console.log('⚠️ Error:', err.message));
}

createBot();
