const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING, // Disponible o No disponible
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url_fotografia: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = Producto;
