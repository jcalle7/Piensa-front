import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { registerUser } from '../Api/Api'; 

const RegisterScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    try {
      await registerUser({username, email, password}); 
      Alert.alert('Registrado con éxito');
      navigation.navigate('Login'); 
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el usuario');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleRegister}>Registro de Usuario</Text>

      <View style={styles.inputContainerRegister}>
        <MaterialCommunityIcons name="account" size={24} color="#007BFF" style={styles.iconRegister} />
        <TextInput
          placeholder="Nombre de Usuario"
          value={username}
          onChangeText={setUsername}
          style={styles.inputR}
          placeholderTextColor="#555"
        />
      </View>

      <View style={styles.inputContainerRegister}>
        <MaterialCommunityIcons name="email" size={24} color="#007BFF" style={styles.iconRegister} />
        <TextInput
          placeholder="Correo"
          value={email}
          onChangeText={setEmail}
          style={styles.inputR}
          placeholderTextColor="#555"
        />
      </View>    
      
      <View style={styles.inputContainerRegister}>
      <MaterialCommunityIcons name="lock" size={24} color="#007BFF" style={styles.iconRegister} />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        style={styles.inputR}
        placeholderTextColor="#555"
      />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <MaterialCommunityIcons 
            name={showPassword ? 'eye-off' : 'eye'} 
            size={24} 
            color="#007BFF" 
            style={styles.iconRegister} 
          />
        </TouchableOpacity>
      </View>

    <TouchableOpacity style={styles.buttonRegister} onPress={handleRegister}>
      <Text style={styles.buttonTextRegister}>Registrarse</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ADB1B4',
    padding: 16,
    marginBottom: 0,
  },
  titleRegister: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 30, 
  },
  inputContainerRegister: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  iconRegister: {
    marginRight: 10,
  },
  inputR: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
  buttonRegister: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonTextRegister: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
