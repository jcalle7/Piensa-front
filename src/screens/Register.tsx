import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { registerUser } from '../Api/Api'; 

const RegisterScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      <Text>Registro de Usuario</Text>
      <TextInput
        placeholder="Nombre de Usuario"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginBottom: 100,
  },
  input: {
    width: '80%',
    padding: 15,
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default RegisterScreen;
