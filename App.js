import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AppProvider, AppContext } from './AppContext';

function MainApp() {
  const { 
    productos, 
    productoSeleccionado, 
    setProductoSeleccionado, 
    pantallaActual, 
    setPantallaActual, 
    guardarProducto, 
    eliminarProducto 
  } = useContext(AppContext);

  // Inputs del Formulario 
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [estado, setEstado] = useState('Disponible'); 
  const [categoria, setCategoria] = useState('');
  const [foto, setFoto] = useState(null);

  // Plugin de Cámara 
  const tomarFotografia = async () => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();
    if (!permiso.granted) {
      alert('Se necesitan permisos de cámara para continuar');
      return;
    }
    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!resultado.canceled) {
      setFoto(resultado.assets[0].uri);
    }
  };

  const handleGuardar = () => {
    if (!nombre || !descripcion || !precio || !categoria) {
      alert('Todos los campos obligatorios deben completarse');
      return;
    }
    guardarProducto({
      nombre,
      descripcion,
      precio: parseFloat(precio),
      estado,
      categoria,
      url_fotografia: foto || 'https://via.placeholder.com/150'
    });
    
    // Resetear campos
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setCategoria('');
    setFoto(null);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.appTitle}>Panel de Administración</Text>

      {/* INTERFAZ 1: FORMULARIO (Mockup Izquierdo) [cite: 25] */}
      {pantallaActual === 'FORMULARIO' && (
        <View style={styles.card}>
          <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
          <TextInput style={styles.input} placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} />
          
          <TouchableOpacity style={styles.input} onPress={() => setEstado(estado === 'Disponible' ? 'No disponible' : 'Disponible')}>
            <Text style={{ color: '#333' }}>Estado: {estado} ▾</Text>
          </TouchableOpacity>

          <TextInput style={styles.input} placeholder="Categoría" value={categoria} onChangeText={setCategoria} />
          <TextInput style={styles.input} placeholder="Precio" keyboardType="numeric" value={precio} onChangeText={setPrecio} />
          
          <TouchableOpacity style={styles.areaFoto} onPress={tomarFotografia}>
            {foto ? (
              <Image source={{ uri: foto }} style={styles.fotoPreview} />
            ) : (
              <Text style={{ color: '#777', textAlign: 'center' }}>📸 [ Fotografía Item ]{"\n"}Presiona para activar cámara</Text>
            )}
          </TouchableOpacity>

          <View style={styles.wrapperBtn}><Button title="Guardar" color="#0056b3" onPress={handleGuardar} /></View>
          <View style={styles.wrapperBtn}><Button title="Detalle Items" color="#28a745" onPress={() => setPantallaActual('LISTA')} /></View>
        </View>
      )}

      {/* INTERFAZ 2: LISTA DE PRODUCTOS (Tabla Mockup Derecho) [cite: 25] */}
      {pantallaActual === 'LISTA' && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Item</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, styles.bold]}>Nombre</Text>
            <Text style={[styles.tableCell, styles.bold]}>Precio</Text>
            <Text style={[styles.tableCell, styles.bold]}>Descripción</Text>
            <Text style={[styles.tableCell, { flex: 0.5 }]}></Text>
          </View>
          
          {productos.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.nombre}</Text>
              <Text style={styles.tableCell}>L. {item.precio}</Text>
              <Text style={styles.tableCell} numberOfLines={1}>{item.descripcion}</Text>
              <TouchableOpacity style={styles.btnVer} onPress={() => { setProductoSeleccionado(item); setPantallaActual('DETALLE'); }}>
                <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center' }}>Ver</Text>
              </TouchableOpacity>
            </View>
          ))}

          <View style={{ marginTop: 25 }}><Button title="Volver al Formulario" color="#6c757d" onPress={() => setPantallaActual('FORMULARIO')} /></View>
        </View>
      )}

      {/* INTERFAZ 3: PANTALLA DETALLE [cite: 21, 25] */}
      {pantallaActual === 'DETALLE' && productoSeleccionado && (
        <View style={styles.card}>
          <Text style={styles.detailTitle}>Detalle</Text>
          <Text style={styles.detailSubtitle}>Ver detalle del item</Text>

          <View style={styles.infoBloque}>
            <Text><Text style={styles.bold}>Nombre:</Text> {productoSeleccionado.nombre}</Text>
            <Text><Text style={styles.bold}>Categoría:</Text> {productoSeleccionado.categoria}</Text>
            <Text><Text style={styles.bold}>Estado:</Text> {productoSeleccionado.estado}</Text>
            <Text><Text style={styles.bold}>Precio:</Text> L. {productoSeleccionado.precio}</Text>
            <Text><Text style={styles.bold}>Descripción:</Text> {productoSeleccionado.descripcion}</Text>
          </View>

          <Image source={{ uri: productoSeleccionado.url_fotografia }} style={styles.fotoDetalle} />

          <TouchableOpacity style={styles.btnEliminar} onPress={() => eliminarProducto(productoSeleccionado.id)}>
            <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Eliminar</Text>
          </TouchableOpacity>

          <View style={{ marginTop: 15 }}><Button title="Regresar al Listado" color="#6c757d" onPress={() => setPantallaActual('LISTA')} /></View>
        </View>
      )}
    </ScrollView>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 15, paddingTop: 40 },
  appTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 15, color: '#333' },
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 15, borderWidth: 1, borderColor: '#e0e0e0', marginBottom: 20 },
  input: { height: 40, borderColor: '#cccccc', borderWidth: 1, borderRadius: 4, marginBottom: 10, paddingHorizontal: 10, backgroundColor: '#fff', justifyContent: 'center' },
  areaFoto: { height: 130, borderColor: '#bbb', borderWidth: 1, borderStyle: 'dashed', borderRadius: 4, justifyContent: 'center', alignItems: 'center', marginBottom: 15, backgroundColor: '#fafafa' },
  fotoPreview: { width: '100%', height: '100%', borderRadius: 4 },
  wrapperBtn: { marginVertical: 5 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  tableHeader: { flexDirection: 'row', borderBottomWidth: 1.5, borderBottomColor: '#333', paddingBottom: 6, marginBottom: 4 },
  tableRow: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#eeeeee', paddingVertical: 10 },
  tableCell: { flex: 1, fontSize: 13, color: '#444' },
  bold: { fontWeight: 'bold', color: '#000' },
  btnVer: { backgroundColor: '#28a745', paddingVertical: 5, paddingHorizontal: 12, borderRadius: 4, flex: 0.5 },
  detailTitle: { fontSize: 24, fontWeight: 'bold' },
  detailSubtitle: { fontSize: 14, color: '#666', marginBottom: 15 },
  infoBloque: { marginBottom: 20, rowGap: 6 },
  fotoDetalle: { width: '100%', height: 220, borderRadius: 6, resizeMode: 'cover', marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  btnEliminar: { backgroundColor: '#dc3545', padding: 12, borderRadius: 4, marginBottom: 5 }
});
