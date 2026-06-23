import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image
} from "react-native";

import styles from "../styles";

export default function DetalleProducto({ route }) {

  const { id } = route.params;

  const [producto, setProducto] = useState({});

  const URL = "http://TU_IP:3000";


  useEffect(() => {
    obtenerProducto();
  }, []);

  const obtenerProducto = async () => {

    try {

      const respuesta = await fetch(`${URL}/productos/${id}`);

      const datos = await respuesta.json();

      setProducto(datos);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <View style={styles.container}>

      {
        producto.fotografia ?

        <Image
          source={{ uri: producto.fotografia }}
          style={styles.imagen}
        />

        :

        null

      }

      <Text style={styles.titulo}>
        {producto.nombre}
      </Text>

      <Text style={styles.texto}>
        Descripción:
      </Text>

      <Text style={styles.texto}>
        {producto.descripcion}
      </Text>

      <Text style={styles.texto}>
        Precio: L. {producto.precio}
      </Text>

      <Text style={styles.texto}>
        Estado: {producto.estado}
      </Text>

      <Text style={styles.texto}>
        Categoría: {producto.categoria}
      </Text>

    </View>

  );

}
