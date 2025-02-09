import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const DashboardScreen = ({route, navigation} :any) => {

  const { username, email } = route.params || {};
  const [valveStatus, setValveStatus] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      setCurrentDate(new Date().toLocaleDateString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleValve = () => {
    setValveStatus((prevStatus) => !prevStatus);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f8f8f8', padding: 20 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{currentTime}</Text>
          <Text style={{ fontSize: 14, color: 'gray' }}>{currentDate}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <TouchableOpacity
            onPress={() => 
              navigation.navigate('Account', {
              username,
              email,
              })
            }
          >
          <Feather name="user" size={35} color="blue" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Estado General */}
      <Card style={{ marginBottom: 20 }}>
        <Card.Title title="Estado General" />
        <Card.Content>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <MaterialCommunityIcons
                name="water"
                size={45}
                color={valveStatus ? 'blue' : 'gray'}
              />
              <View>
                <Text style={{ fontWeight: '700' }}>Electroválvula</Text>
                <Text style={{ color: 'gray' }}>{valveStatus ? 'Activo' : 'Desactivado'}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={toggleValve} accessibilityLabel="Toggle Water Valve">
              <MaterialCommunityIcons
                name="power"
                size={50}
                color={valveStatus ? 'green' : 'red'}
              />
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>

      {/* Alertas */}
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 8 }}>Alertas Activas</Text>
      <Card style={[ styles.alertCard, { backgroundColor: '#DC3545' }]}>
        <Card.Content>
          <MaterialIcons name="warning" size={24} color="orange" />
          <Text style={{ fontWeight: 'bold', color: 'white'}}>Fuga Detectada</Text>
          <Text style={styles.alertText}>Se detectó una fuga en el baño principal</Text>
          <Text style={styles.alertText}>Consumo anormal: 15 L/min</Text>
          <Text style={{ color: '#D9D9D9' }}>Detectado el: 12/01/2025 - 15:23:45</Text>
        </Card.Content>
      </Card>

      <Card style={{ backgroundColor: '#D4C716', marginBottom: 16,     shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 5, }}>
        <Card.Content>
          <MaterialIcons name="error" size={24} color="red" />
          <Text style={{ fontWeight: 'bold', color: 'white' }}>Consumo Elevado</Text>
          <Text style={styles.alertText}>Consumo superior al promedio en el baño principal</Text>
          <Text style={styles.alertText}>Consumo actual: 25 L/hora </Text>
          <Text style={{ color: '#504A4A' }}>Detectado el: 12/01/2025 - 16:45:12</Text>
        </Card.Content>
      </Card>

      {/* Estadísticas */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
        <Card style={{ flex: 1, marginRight: 8 }}>
          <Card.Content style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'blue' }}>150L</Text>
            <Text style={{ color: 'gray' }}>Consumo Hoy</Text>
          </Card.Content>
        </Card>
      </View>

      {/* Menú de Opciones */}
      <TouchableOpacity onPress={() => navigation.navigate('History')}>
        <Card style={{ marginBottom: 8 }}>
          <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>Historial de Consumo</Text>
              <Feather name="chevron-right" size={24} color="gray" />
          </Card.Content>
        </Card>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  alertCard: {
    marginBottom: 15,
    shadowColor: '#000', 
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  alertText: {
    color: 'white'
  },
  alertDate: {
    color: '#D9D9D9',
  },
});

export default DashboardScreen;
