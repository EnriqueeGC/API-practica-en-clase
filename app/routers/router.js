
let express = require('express');
let router = express.Router();
 
const libro = require('../controllers/libro.controller.js');

// CRUD 
router.post('/api/libro/create', libro.create);
router.get('/api/libro/all', libro.retrieveAllLibros);
router.get('/api/libro/onebyid/:id', libro.getLibroById);
router.put('/api/libro/update/:id', libro.updateLibroById);
/*
router.put('/api/music/update/:id', music.updateMusicById);
router.delete('/api/music/delete/:id', music.deleteMusicById);
 */

module.exports = router;