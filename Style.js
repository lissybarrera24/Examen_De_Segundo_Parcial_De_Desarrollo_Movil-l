import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:15,
    backgroundColor:"#fff"
  },

  input:{
    borderWidth:1,
    borderColor:"#ccc",
    marginBottom:10,
    padding:10,
    borderRadius:5
  },

  card:{
    borderWidth:1,
    borderColor:"#ddd",
    padding:15,
    marginBottom:10,
    borderRadius:8,
    backgroundColor:"#f9f9f9"
  },

  titulo:{
    fontSize:18,
    fontWeight:"bold"
  },

  texto:{
    fontSize:15,
    marginTop:5
  },

  imagen:{
    width:120,
    height:120,
    alignSelf:"center",
    marginBottom:10
  },

  boton:{
    backgroundColor:"#1976D2",
    padding:10,
    borderRadius:5,
    marginTop:5
  },

  textoBoton:{
    color:"#fff",
    textAlign:"center",
    fontWeight:"bold"
  }

});

export default styles;
