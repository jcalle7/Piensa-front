// src/screens/AccountScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper'; // Si no lo usas, puedes reemplazar con tus propios estilos

// Tip: Si obtienes los datos de usuario (username, email) desde
// algún contexto, Redux o AsyncStorage, ajústalo según tu lógica.
// Aquí, por simplicidad, se asume que los recibimos vía route.params.
const AccountScreen = ({ route, navigation }: any) => {
  const { username, email } = route.params || {};

  const handleLogout = () => {
    // Lógica de logout: limpiar tokens, etc.
    // Después, navegas al Login o a la pantalla que prefieras:
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Card style={styles.userCard}>
        <Card.Content>
          <Text style={styles.nameText}>{username || 'Nombre de Usuario'}</Text>
          <Text style={styles.emailText}>{email || 'correo@ejemplo.com'}</Text>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>

        {/* Botón rojo de "Cerrar Sesión" */}
        <Button
          mode="contained"
          onPress={handleLogout}
          style={styles.logoutButton}
          buttonColor="red"
          textColor="#fff"
        >
          Cerrar Sesión
        </Button>
      </View>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  userCard: {
    marginBottom: 20,
    padding: 16,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  emailText: {
    fontSize: 16,
    color: '#555',
  },
  buttonContainer: {
    marginTop: 'auto', // para que los botones queden al final
  },
  outlinedButton: {
    marginBottom: 16,
  },
  logoutButton: {
    // Se ajusta con buttonColor="red" y textColor="#fff"
  },
});
