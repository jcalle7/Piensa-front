import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { loginUser } from '../Api/Api'; 

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await loginUser(username, email, password); 
      const {username: realUserName, email: realEmail} = response.user;
      Alert.alert('Login exitoso');
      navigation.navigate('Dashboard', {
        username: realUserName,
        email: realEmail,
      }); 
    } catch (error) {
      Alert.alert('Error', 'No se pudo iniciar sesión');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Iniciar sesión</Text>
      <TextInput
        placeholder="Usuario"
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
      <Button title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginBottom: 50,
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

export default LoginScreen;
