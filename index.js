const mineflayer = require('mineflayer');
const http = require('http');

// --- DUMMY WEB SERVER FOR RENDER ---
const port = process.env.PORT || 10000;
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is running!\n');
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Render web server listening on port ${port}`);
});
// -----------------------------------

const botArgs = {
  host: 'spydimc.falix.me',
  port: 25565, // Use your Minecraft server port here
  username: 'AFK_Bot',
  version: '1.21.1',
  auth: 'offline'
};

function createBot() {
  const bot = mineflayer.createBot(botArgs);

  bot.on('spawn', () => {
    console.log('✅ Bot joined the Minecraft server!');
    
    // Movement logic
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 10000);
  });

  bot.on('end', () => {
    console.log('❌ Disconnected from MC. Reconnecting in 30s...');
    setTimeout(createBot, 30000);
  });

  bot.on('error', (err) => console.log('⚠️ MC Error:', err.message));
}

createBot();
