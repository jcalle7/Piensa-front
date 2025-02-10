import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { loginUser } from '../Api/Api'; 

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await loginUser(username, password); 
      const {username: realUserName} = response.user;
      Alert.alert('Login exitoso');
      navigation.navigate('Dashboard', {
        username: realUserName
      }); 
    } catch (error) {
      Alert.alert('Error', 'No se pudo iniciar sesión');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleLogin}>Iniciar sesión</Text>

      <View style={styles.inputContainerLogin}>
      <MaterialCommunityIcons name="account" size={24} color="#007BFF" style={styles.iconLogin} />
        <TextInput
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
          style={styles.inputL}
          placeholderTextColor="#555"
        />
      </View>

    <View style={styles.inputContainerLogin}>
      <MaterialCommunityIcons name="lock" size={24} color="#007BFF" style={styles.iconLogin} />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        style={styles.inputL}
        placeholderTextColor="#555"
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <MaterialCommunityIcons 
          name={showPassword ? 'eye-off' : 'eye'} 
          size={24} 
          color="#007BFF" 
          style={styles.iconLogin} 
        />
      </TouchableOpacity>
    </View>
 
    <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
      <Text style={styles.buttonTextLogin}>Iniciar Sesión</Text>
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
  titleLogin: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 30, 
  },
  inputContainerLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  iconLogin: {
    marginRight: 10,
  },
  inputL: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
  buttonLogin: {
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
  buttonTextLogin: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
