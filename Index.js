const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Producto = require('./models/Producto');

const app = express();
app.use(cors());
app.use(express.json());

// GET /productos: Obtener lista [cite: 13]
app.get('/productos', async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// POST /productos: Registrar producto [cite: 13]
app.post('/productos', async (req, res) => {
  try {
    const { nombre, descripcion, precio, estado, categoria, url_fotografia } = req.body;
    const nuevoProducto = await Producto.create({
      nombre,
      descripcion,
      precio,
      estado,
      categoria,
      url_fotografia
    });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

// DELETE /items/:id: Eliminar producto [cite: 14]
app.delete('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await Producto.destroy({ where: { id } });
    if (eliminado) {
      res.json({ mensaje: 'Producto eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

const PORT = 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
