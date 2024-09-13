const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expenseRoutes = require('./routes/expenses'); // Adjust the path if needed
const sequelize = require('./util/database');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Use the expense routes
app.use('/api', expenseRoutes); // Prefix routes with /api

// Error handling for unmatched routes
app.use((req, res) => {
    res.status(404).send('Not Found');
});

sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  })
  .catch(err => console.error('Unable to connect to the database:', err));