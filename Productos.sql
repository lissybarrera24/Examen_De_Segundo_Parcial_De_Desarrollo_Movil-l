CREATE DATABASE examen_movil;

USE examen_movil;

CREATE TABLE productos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2),
    estado VARCHAR(30),
    categoria VARCHAR(50),
    fotografia VARCHAR(255)
);

INSERT INTO productos(nombre,descripcion,precio,estado,categoria,fotografia)
VALUES
('Laptop Lenovo','Laptop Core i5 16GB RAM',18000,'Disponible','Computadoras','https://picsum.photos/200'),
('Mouse Logitech','Mouse inalámbrico',450,'Disponible','Accesorios','https://picsum.photos/201');
