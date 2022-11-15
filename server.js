const app = require('./app');

// Pull port from args file
const port = process.env.PORT || 8001;

// Start listening for network traffic
app.listen(port, () => {
    console.log(`INFO - App running on port ${port}...`);
});