const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
const cors = require('cors');
app.use(cors());


app.use(bodyParser.json());

const inventory = [];

app.post('/add-item', (req, res) => {
  const newItem = req.body;
  inventory.push(newItem);
  res.status(201).json({ message: 'Item added successfully' });
});

app.get('/inventory-items', (req, res) => {
  res.status(200).json(inventory);
});

app.delete('/clear-items', (req, res) => {
  inventory.length = 0;
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
