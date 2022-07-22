const express = require('express');
const { ItemController, FourController } = require('./controllers');
const router = express.Router();


router.post('/playerName', FourController.insert);
// router.post('/playerWin', FourController.insert);
// router.post('/playerLose', FourController.insert);
// router.post('/playerDraw', FourController.insert);
// router.delete('/items/:id', ItemController.delete);
module.exports = router;

// router.get('/items', ItemController.browse);
// router.get('/items/:id', ItemController.read);
// router.put('/items/:id', ItemController.edit);