const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'spydimc.falix.me',
  username: 'AFK_Bot', // Change this to your bot's name or email
  version: '1.20.1',    // Change to the server's specific version
});

// Logic to move continuously once logged in
bot.on('spawn', () => {
  console.log('Bot has spawned! Starting movement...');
  
  // Set a loop to jump and walk
  setInterval(() => {
    bot.setControlState('forward', true);
    bot.setControlState('jump', true);
    
    // Stop moving after 1 second, then repeat
    setTimeout(() => {
      bot.setControlState('forward', false);
      bot.setControlState('jump', false);
    }, 1000);
    
  }, 3000); // Repeat every 3 seconds
});

// Log errors and kick reasons
bot.on('kicked', console.log);
bot.on('error', console.log);
