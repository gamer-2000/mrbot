const mineflayer = require('mineflayer');

const botArgs = {
  host: 'spydimc.falix.me',
  username: `AFK_${Math.floor(Math.random() * 1000)}`, // Random name helps bypass some filters
  version: '1.21.1', 
  auth: 'offline',
  hideErrors: true, // Don't crash on small errors
  checkTimeoutInterval: 90000 // Give the server more time to respond
};

function createBot() {
  console.log('--- Starting Connection Attempt ---');
  const bot = mineflayer.createBot(botArgs);

  bot.once('spawn', () => {
    console.log('✅ Bot joined successfully!');
    
    // Random movement to look human
    setInterval(() => {
      const move = Math.random() > 0.5;
      if (move) {
        bot.setControlState('jump', true);
        bot.setControlState('forward', true);
        
        setTimeout(() => {
          bot.clearControlStates();
        }, 500 + Math.random() * 1000);
      }
    }, 10000 + Math.random() * 5000); // Moves every 10-15 seconds
  });

  bot.on('end', (reason) => {
    // Longer wait time (2 minutes) to let the "Throttle" expire
    console.log(`❌ Disconnected. Reason: ${reason}. Waiting 2 mins...`);
    setTimeout(createBot, 120000); 
  });

  bot.on('error', (err) => {
    if (err.code === 'ECONNRESET') {
      console.log('⚠️ Server closed the connection. (IP Blocked or Throttled)');
    } else {
      console.log('⚠️ Error:', err.message);
    }
  });
}

// Start with a random delay so you don't hit the throttle immediately
console.log('Waiting 10s to start...');
setTimeout(createBot, 10000);
