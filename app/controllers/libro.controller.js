const db = require('../config/db.config.js');
const Libro = db.Libro;

// '/api/libro/create'
exports.create = (req, res) => {
    let libro = {};

    try {
        libro.codigo_libro = req.body.codigo_libro;
        libro.nombre_del_libro = req.body.nombre_del_libro;
        libro.editorial = req.body.editorial;
        libro.autor = req.body.autor;
        libro.genero = req.body.genero;
        libro.numero_de_paginas = req.body.numero_de_paginas;
        libro.anio_de_edicion = req.body.anio_de_edicion;
        libro.precio_del_libro = req.body.precio_del_libro;

        Libro.create(libro).then(result => {
            res.status(200).json({
                message: "Upload Successfully a Libro with id = " + result.codigo_libro,
                libro: result,
            });
        });    
    } catch (error) {
        res.status(500).json({
            message: 'Fail',
            error: error.message
        }); 
    };
};

// '/api/libro/all'
exports.retrieveAllLibros = (req, res) => {
    Libro.findAll()
    .then(librosInfo => {
        res.status(200).json({
            message: "Get all libros. Infos Succesfully!",
            libro: librosInfo
        });
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: 'Error!',
            error: error
        });
    });
};

// '/api/libro/onebyid/:id'
exports.getLibroById = (req, res) => {
    let idLibro = req.params.codigo_libro;

    Libro.findByPk(idLibro)
        .then(libro => {
            res.status(200).json({
                message: "Succesfully Get a Libro with id = " + idLibro,
                libro: libro
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Error!',
                error: error
            });
        });
};

// '/api/libro/update/:id'
exports.updateLibroById = async (req, res) => {
    try {
        let idLibro = req.params.codigo_libro;
        let libro = await Libro.findByPk(idLibro);

        if (!libro) {
            res.status(404).json({
                message: 'Not Found for updating a libro with id = ' + idLibro,
                libro: '',
                error: '404'
            });
        } else {    
            let updatedObject = {
                nombre_del_libro: req.body.nombre_del_libro,
                editorial: req.body.editorial,
                autor: req.body.autor,
                genero: req.body.genero,
                numero_de_paginas: req.body.numero_de_paginas,
                anio_de_edicion: req.body.anio_de_edicion,
                precio_del_libro: req.body.precio_del_libro
            }
            Libro.update(updatedObject, {returning: true, where: {codigo_libro: idLibro}})
            .then(result => {
                res.status(200).json({
                    message: 'Updated successfully a Libro with id = ' + idLibro,
                    libro: updatedObject
                });
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error -> Can NOT update a libro with id = ' + req.params.id,
            error: error.message
        });
    };
};

// '/api/libro/delete/:id'
exports.deleteLibroById = async (req, res) => {
    try {
        let idLibro = req.params.codigo_libro;
        let libro = await Libro.findByPk(idLibro);

        if (!libro) {
            res.status(404).json({
                message: 'Not Found for deleting a libro with id = ' + idLibro,
                libro: '',
                error: '404'
            });
        } else {
            await Libro.destroy({where: {codigo_libro: idLibro}});
            res.status(200).json({
                message: 'Deleted successfully a Libro with id = ' + idLibro,
                libro: libro
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error -> Can NOT delete a libro with id = ' + req.params.id,
            error: error.message
        });
    };
};