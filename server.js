// Import app instance
const app = require('./app');

// Start listening for network traffic
app.listen(port = 3000, () => {
    console.log(`INFO - App running on port ${port}...`);
});