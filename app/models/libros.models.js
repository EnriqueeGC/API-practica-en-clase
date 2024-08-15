
module.exports = (sequelize, Sequelize) => {
    const Libros = sequelize.define("libros", {
        codigo_libro: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_del_libro: {
            type: Sequelize.STRING(60)
        },
        editorial: {
            type: Sequelize.STRING(25)
        },
        autor: {
            type: Sequelize.STRING(25)
        },
        genero: {
            type: Sequelize.STRING(25)
        },
        numero_de_paginas: {
            type: Sequelize.INTEGER
        },
        anio_de_edicion: {
            type: Sequelize.DATE
        },
        precio_del_libro: {
            type: Sequelize.INTEGER
        }
    });
    return Libros;
};