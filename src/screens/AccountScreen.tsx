// src/screens/AccountScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
 // Si no lo usas, puedes reemplazar con tus propios estilos

const AccountScreen = ({ route, navigation }: any) => {
  const { username, email } = route.params || {};

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Card style={styles.userCard}>
        <Card.Content style={styles.cardContent}>
          <MaterialCommunityIcons name="account-circle" size={50} color="#007AFF" />
          <View style={styles.userInfo}>
            <Text style={styles.nameText}>{username || 'Nombre de Usuario'}</Text>
            <Text style={styles.emailText}>{email || 'correo@ejemplo.com'}</Text>
          </View>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000', 
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 15,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  emailText: {
    fontSize: 16,
    color: '#555',
  },
  buttonContainer: {
    marginTop: 400, // para que los botones queden al final
  },
  outlinedButton: {
    marginBottom: 16,
  },
  logoutButton: {
    width: 180, // Menos ancho
    height: 50, // Más alto
    justifyContent: 'center',
    borderRadius: 10,
  },
});
