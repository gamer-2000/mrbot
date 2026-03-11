const mineflayer = require('mineflayer');

const botArgs = {
  host: 'spydimc.falix.me',
  username: 'AFK_Bot',
  version: '1.21.1', // Change this to '1.21.1' (Standard) or '1.21'
  auth: 'offline'
};

function createBot() {
  const bot = mineflayer.createBot(botArgs);

  bot.on('spawn', () => {
    console.log('Bot has spawned! Version: ' + bot.version);
    
    // Movement Loop
    setInterval(() => {
      bot.setControlState('forward', true);
      bot.setControlState('jump', true);
      setTimeout(() => {
        bot.setControlState('forward', false);
        bot.setControlState('jump', false);
      }, 1000);
    }, 3000);
  });

  // Automatic Reconnect Logic
  bot.on('end', () => {
    console.log('Disconnected. Reconnecting in 15s...');
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => console.log('Error:', err));
  bot.on('kicked', (reason) => console.log('Kicked:', reason));
}

createBot();
