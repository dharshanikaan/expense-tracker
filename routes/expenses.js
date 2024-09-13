const express = require('express');
const router = express.Router();
const Expense = require('../models/expense'); // Adjust the path as necessary

// Create a new expense
router.post('/expenses', async (req, res) => {
    try {
        const { expenseamount, description, category } = req.body;
        const expense = await Expense.create({ expenseamount, description, category });
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all expenses
router.get('/expenses', async (req, res) => {
    try {
        const expenses = await Expense.findAll();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single expense by ID
router.get('/expenses/:id', async (req, res) => {
    try {
        const expense = await Expense.findByPk(req.params.id);
        if (expense) {
            res.status(200).json(expense);
        } else {
            res.status(404).json({ error: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an expense by ID
router.put('/expenses/:id', async (req, res) => {
    try {
        const [updated] = await Expense.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedExpense = await Expense.findByPk(req.params.id);
            res.status(200).json(updatedExpense);
        } else {
            res.status(404).json({ error: 'Expense not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete an expense by ID
router.delete('/expenses/:id', async (req, res) => {
    try {
        const deleted = await Expense.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({});
        } else {
            res.status(404).json({ error: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;