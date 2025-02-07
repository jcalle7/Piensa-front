import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="water" size={100} color="#007BFF" />

      <Text style={styles.title}>Sistema de Gestión Inteligente del Agua</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  title: {
    fontSize: 24, // Tamaño grande
    fontWeight: 'bold',
    color: '#007BFF', // Azul
    textAlign: 'center',
    marginVertical: 50,
    margin:25,
  },
  button: {
    backgroundColor: '#007BFF', // Fondo transparente
    borderColor: '#007BFF', // Borde azul
    borderWidth: 3,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Texto azul
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
