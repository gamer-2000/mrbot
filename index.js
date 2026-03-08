const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'spydimc.falix.me',
  username: 'AFK_Bot', // Keep this simple
  version: '1.21',     // Ensure this matches the server's current version exactly
  auth: 'offline'      // Required for cracked servers
});

bot.on('spawn', () => {
  console.log('Bot has spawned! Attempting to authenticate...');
  
  // IF your server uses a password plugin (like /login), uncomment the line below:
  // bot.chat('/login YOUR_PASSWORD_HERE');
  
  // Continuous Movement Loop
  setInterval(() => {
    bot.setControlState('forward', true);
    bot.setControlState('jump', true);
    
    setTimeout(() => {
      bot.setControlState('forward', false);
      bot.setControlState('jump', false);
    }, 1000);
  }, 3000);
});

// Handle Login Kicks (if it kicks you for being "unverified")
bot.on('kicked', (reason) => {
  console.log('Bot was kicked: ' + reason);
});

// Handle Connection Errors
bot.on('error', (err) => {
  console.log('Bot encountered an error: ' + err);
});
