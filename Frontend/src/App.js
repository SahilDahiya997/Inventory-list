import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [groceryItems, setGroceryItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [showAddedItems, setShowAddedItems] = useState(false);

  useEffect(() => {
    if (showAddedItems) {
      fetch('http://localhost:5000/inventory-items')
        .then((response) => response.json())
        .then((data) => setGroceryItems(data));
    }
  }, [showAddedItems]);

  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      fetch('http://localhost:5000/add-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newItem }),
      })
        .then((response) => response.json())
        .then(() => {
          setNewItem('');
          setShowAddedItems(false);
        });
    }
  };

  const handleFetchItems = () => {
    setShowAddedItems(true);
  };

  const handleClearList = () => {
    fetch('http://localhost:5000/clear-items', {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setGroceryItems([]);
          setShowAddedItems(false);
        } else {
          console.error('Failed to clear data');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    
    <div className="App">
      <h1 className="header">Grocery Inventory List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter item name"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          required
          className="input-field"
        />
        <button className="button add-button" onClick={handleAddItem}>
          Add Item
        </button>
        <button className="button fetch-button" onClick={handleFetchItems}>
          Fetch Items
        </button>
        <button className="button clear-button" onClick={handleClearList}>
          Clear List
        </button>
      </div>
      <ol className="item-list">
        {showAddedItems &&
          groceryItems.map((item, index) => (
            <li key={index} className="item">
              {item.name}
            </li>
          ))}
      </ol>
    </div>
  );
}

export default App;
