import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  Alert
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import styles from "../styles";

export default function AgregarProducto({ navigation }) {

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [estado, setEstado] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fotografia, setFotografia] = useState("");

  const URL = "http://TU_IP:3000";


  const abrirCamara = async () => {

    const permiso = await ImagePicker.requestCameraPermissionsAsync();

    if (!permiso.granted) {
      Alert.alert("Debe permitir el acceso a la cámara");
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1
    });

    if (!resultado.canceled) {
      setFotografia(resultado.assets[0].uri);
    }

  };

  const guardarProducto = async () => {

    if (
      nombre === "" ||
      descripcion === "" ||
      precio === "" ||
      estado === "" ||
      categoria === ""
    ) {
      Alert.alert("Complete todos los campos");
      return;
    }

    try {

      await fetch(`${URL}/productos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre,
          descripcion,
          precio,
          estado,
          categoria,
          fotografia
        })
      });

      Alert.alert("Producto agregado");

      navigation.goBack();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <View style={styles.container}>

      <TextInput
        placeholder="Nombre"
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        placeholder="Descripción"
        style={styles.input}
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <TextInput
        placeholder="Precio"
        style={styles.input}
        keyboardType="numeric"
        value={precio}
        onChangeText={setPrecio}
      />

      <TextInput
        placeholder="Estado"
        style={styles.input}
        value={estado}
        onChangeText={setEstado}
      />

      <TextInput
        placeholder="Categoría"
        style={styles.input}
        value={categoria}
        onChangeText={setCategoria}
      />

      <TouchableOpacity
        style={styles.boton}
        onPress={abrirCamara}
      >
        <Text style={styles.textoBoton}>
          Tomar Fotografía
        </Text>
      </TouchableOpacity>

      {
        fotografia !== "" &&
        <Image
          source={{ uri: fotografia }}
          style={styles.imagen}
        />
      }

      <TouchableOpacity
        style={styles.boton}
        onPress={guardarProducto}
      >
        <Text style={styles.textoBoton}>
          Guardar Producto
        </Text>
      </TouchableOpacity>

    </View>

  );

}
