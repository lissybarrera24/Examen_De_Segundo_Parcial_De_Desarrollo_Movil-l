import React, { useEffect, useState } from "react";
import {
View,
Text,
FlatList,
TouchableOpacity,
Alert
} from "react-native";

import styles from "../styles";

export default function Home({ navigation }) {

const [productos, setProductos] = useState([]);

const URL = "http://TU_IP:3000";


useEffect(() => {
obtenerProductos();
}, []);

const obtenerProductos = async () => {

try {

const respuesta = await fetch(`${URL}/productos`);

const datos = await respuesta.json();

setProductos(datos);

} catch (error) {

console.log(error);

}

};

const eliminarProducto = async (id) => {

try {

await fetch(`${URL}/items/${id}`, {
method: "DELETE"
});

Alert.alert("Producto eliminado");

obtenerProductos();

} catch (error) {

console.log(error);

}

};

const mostrarProducto = ({ item }) => (

<View style={styles.card}>

<Text style={styles.titulo}>{item.nombre}</Text>

<Text style={styles.texto}>
L. {item.precio}
</Text>

<Text style={styles.texto}>
{item.categoria}
</Text>

<TouchableOpacity
style={styles.boton}
onPress={() =>
navigation.navigate("Detalle", {
id: item.id
})
}
>

<Text style={styles.textoBoton}>
Detalle
</Text>

</TouchableOpacity>

<TouchableOpacity
style={styles.boton}
onPress={() => eliminarProducto(item.id)}
>

<Text style={styles.textoBoton}>
Eliminar
</Text>

</TouchableOpacity>

</View>

);

return (

<View style={styles.container}>

<TouchableOpacity
style={styles.boton}
onPress={() => navigation.navigate("Agregar")}
>

<Text style={styles.textoBoton}>
Agregar Producto
</Text>

</TouchableOpacity>

<FlatList
data={productos}
keyExtractor={(item) => item.id.toString()}
renderItem={mostrarProducto}
/>

</View>

);

}
