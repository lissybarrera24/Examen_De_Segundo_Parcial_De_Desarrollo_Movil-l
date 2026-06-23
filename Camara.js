import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Alert
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import styles from "../styles";

export default function Camara() {

  const [foto, setFoto] = useState("");

  const tomarFoto = async () => {

    const permiso =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permiso.granted) {

      Alert.alert("Debe permitir el acceso a la cámara");

      return;

    }

    const resultado =
      await ImagePicker.launchCameraAsync({

      quality:1

    });

    if (!resultado.canceled) {

      setFoto(resultado.assets[0].uri);

    }

  };

  return(

    <View style={styles.container}>

      <TouchableOpacity
        style={styles.boton}
        onPress={tomarFoto}
      >

        <Text style={styles.textoBoton}>
          Abrir Cámara
        </Text>

      </TouchableOpacity>

      {

        foto!="" &&

        <Image
          source={{uri:foto}}
          style={styles.imagen}
        />

      }

    </View>

  );

}
