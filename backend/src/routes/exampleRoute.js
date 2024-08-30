const express = require('express');
const router = express.Router();
const { getTables, addUser, getUsers } = require('../controllers/exampleController');

router.get('/tables', getTables);
router.post('/addUser', addUser);
router.get('/users', getUsers);
module.exports = router;
