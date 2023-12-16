const express = require('express');
const app = express();
const port = process.env.PORT || 3001; // Use the PORT environment variable or 3000 if it's not set

// Serve static files from the 'public' directory
app.use(express.static('public'));

// A simple route for the root ('/') path
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Add this line to help diagnose any errors
console.log("Server started successfully");
