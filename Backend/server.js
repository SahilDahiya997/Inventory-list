const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
const cors = require('cors');
app.use(cors());


app.use(bodyParser.json());

const inventory = [];

// POST Endpoint for Adding Grocery Items
app.post('/add-item', (req, res) => {
  const newItem = req.body;
  inventory.push(newItem);
  res.status(201).json({ message: 'Item added successfully' });
});

// GET Endpoint for Retrieving All Items
app.get('/inventory-items', (req, res) => {
  res.status(200).json(inventory);
});

// Define a route to handle DELETE requests
// Define a route to handle DELETE requests
app.delete('/clear-items', (req, res) => {
  // Logic to clear the data
  // Clear the 'inventory' array of items
  inventory.length = 0; // Clear the array without reassigning it
  res.status(204).send(); // Respond with a 204 No Content status on success
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
