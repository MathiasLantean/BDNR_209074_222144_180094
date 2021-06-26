const Server = require('./server');
require('./repositories/repository');

(async () => {
  try {
    await Server.initServer();
    console.log("Server init");
  } catch (err) {
    console.log(`Error initializing server: ${err}`);
    process.exit(1);
  }
})();