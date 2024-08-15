const db =  require('../config/db.config.js');
const Music = db.Music; 

// '/api/music/create'
exports.create = (req, res) => {
    let music = {};

    try {
        music.nombre_cancion = req.body.nombre_cancion;
        music.descripcion = req.body.descripcion;
        music.artista = req.body.artista;
        music.duracion = req.body.duracion;
        music.album = req.body.album;
        music.year = req.body.year;
        music.extension_audio = req.body.extension_audio;

        Music.create(music).then(result => {
            res.status(200).json({
                message: "Upload Successfully a Music with id = " + result.id_music,
                music: result,
            });
        });
    } catch(error) {
        res.status(500).json({
            message: 'Fail',
            error: error.message
        });
    };
}

// '/api/music/all'
exports.retrieveAllMusics = (req, res) => {
    Music.findAll()
    .then(musicsInfo => {
        res.status(200).json({
            message: "Get all musics. Infos Succesfully!",
            music: musicsInfo
        });
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: 'Error!',
            error: error
        });
    });
}

// '/api/music/onebyid/:id'
exports.getMusicById = (req, res) => {
    let idMusic = req.params.id;

    Music.findByPk(idMusic)
        .then(music => {
            res.status(200).json({
                message: "Succesfully Get a Music with id = " + idMusic,
                music: music
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error!',
                error: error
            });
        });
}

// '/api/music/update/:id'
exports.updateMusicById = async (req, res) => {
    try {
        let idMusic = req.params.id;
        let music = await Music.findByPk(idMusic);

        if (!music) {
            res.status(404).json({
                message: "Not Found for updating a music with id = " + idMusic,
                music: '',
                error: '404'
            });
        } else {
            let updatedObject = {
                nombre_cancion: req.body.nombre_cancion,
                descripcion: req.body.descripcion,
                artista: req.body.artista,
                duracion: req.body.duracion,
                album: req.body.album,
                year: req.body.year,
                extension_audio: req.body.extension_audio
            }
            Music.update(updatedObject, {returning: true, where: {id_music: idMusic} })
                .then(result => {
                    res.status(200).json({
                        message: "Update Successfully a Music with id = " + idMusic,
                        music: updatedObject,
                    });
                });
        }
    } catch(error) {
        res.status(500).json({
            message: 'Error -> Can not update a music with id = ' + req.params.id,
            error: error.message
        });
    }
}

// '/api/music/delete/:id'
exports.deleteMusicById = (req, res) => {
    let idMusic = req.params.id;

    Music.destroy({
        where: { id_music: idMusic }
    })
    .then(() => {
        res.status(200).json({
            message: 'Delete Successfully a Music with id = ' + idMusic,
            music: '',
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Error -> Can not delete a Music with id = ' + idMusic,
            error: error.message
        });
    });
}