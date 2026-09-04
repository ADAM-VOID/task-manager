const express = require('express');
const router = express.Router();
const {
    getTasks,
    createTask,
    updateTaskStatus,
    deleteTask,
} = require('../controllers/taskController');

router.get('/tasks', getTasks);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTaskStatus);
router.delete('/tasks/:id', deleteTask);

module.exports = router;