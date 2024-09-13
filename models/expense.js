const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Expense = sequelize.define('Expense', {
    expenseamount: {
        type: Sequelize.FLOAT, // Changed to FLOAT for numeric values
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Expense;