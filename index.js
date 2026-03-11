const mineflayer = require('mineflayer');

const botArgs = {
  host: 'spydimc.falix.me',
  username: 'AFK_Bot', 
  version: '1.21.1', // Use 1.21.1 based on your error
  auth: 'offline'
};

function createBot() {
  console.log('--- Attempting to connect... ---');
  const bot = mineflayer.createBot(botArgs);

  bot.on('spawn', () => {
    console.log('Success! Bot is in the server.');
    
    // Movement Loop
    setInterval(() => {
      bot.setControlState('forward', true);
      bot.setControlState('jump', true);
      setTimeout(() => {
        bot.setControlState('forward', false);
        bot.setControlState('jump', false);
      }, 1000);
    }, 5000); // 5-second gap between jumps
  });

  // If the bot gets kicked or the connection resets
  bot.on('end', () => {
    const waitTime = 60000; // Wait 1 full minute
    console.log(`Disconnected. Waiting ${waitTime/1000}s before trying again to avoid throttling...`);
    setTimeout(createBot, waitTime);
  });

  bot.on('error', (err) => {
    if (err.code === 'ECONNRESET') {
      console.log('Connection reset by server. This usually means we are throttled.');
    } else {
      console.log('Error:', err);
    }
  });

  bot.on('kicked', (reason) => {
    console.log('Kicked for:', reason);
  });
}

createBot();
