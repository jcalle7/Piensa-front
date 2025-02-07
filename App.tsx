import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/Home';
import RegisterScreen from './src/screens/Register';
import LoginScreen from './src/screens/Login';
import DashboardScreen from './src/screens/Dashboard';
import AccountScreen from './src/screens/AccountScreen';
import ConsumptionHistory from './src/screens/ConsumptionHistory';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Sistema de Gestión Inteligente del Agua' }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Registro de Usuario' }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Iniciar Sesión' }}
        />
          <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: 'Inicio' }}
        />
          <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={{ title: 'Cuenta' }}
        />
          <Stack.Screen
          name="History"
          component={ConsumptionHistory}
          options={{ title: 'Historial de Consumo' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
