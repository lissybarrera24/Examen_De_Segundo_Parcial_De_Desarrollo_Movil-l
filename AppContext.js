import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [pantallaActual, setPantallaActual] = useState('FORMULARIO'); 
  
  const API_URL = 'http://localhost:3000'; 

  const cargarProductos = async () => {
    try {
      const response = await fetch(`${API_URL}/productos`);
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  };

  const guardarProducto = async (producto) => {
    try {
      const response = await fetch(`${API_URL}/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
      });
      if (response.ok) {
        Alert.alert('Éxito', 'Producto guardado exitosamente');
        await cargarProductos();
        setPantallaActual('LISTA');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  const eliminarProducto = async (id) => {
    try {
      const response = await fetch(`${API_URL}/items/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        Alert.alert('Eliminado', 'El producto ha sido eliminado');
        await cargarProductos();
        setPantallaActual('LISTA');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el producto');
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <AppContext.Provider value={{
      productos,
      productoSeleccionado,
      setProductoSeleccionado,
      pantallaActual,
      setPantallaActual,
      guardarProducto,
      eliminarProducto
    }}>
      {children}
    </AppContext.Provider>
  );
};
