import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
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
    <ScrollView style={{ flex: 1, backgroundColor: '#f8f8f8', padding: 16 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{currentTime}</Text>
          <Text style={{ fontSize: 14, color: 'gray' }}>{currentDate}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Feather name="bell" size={24} color="gray" />
          <TouchableOpacity
            onPress={() => 
              navigation.navigate('Account', {
              username,
              email,
              })
            }
          >
          <Feather name="user" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Estado General */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Title title="Estado General" />
        <Card.Content>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <MaterialCommunityIcons
                name="water"
                size={32}
                color={valveStatus ? 'blue' : 'gray'}
              />
              <View>
                <Text style={{ fontWeight: '500' }}>Suministro de Agua</Text>
                <Text style={{ color: 'gray' }}>{valveStatus ? 'Activo' : 'Desactivado'}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={toggleValve} accessibilityLabel="Toggle Water Valve">
              <MaterialCommunityIcons
                name="power"
                size={32}
                color={valveStatus ? 'green' : 'red'}
              />
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>

      {/* Alertas */}
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Alertas Activas</Text>
      <Card style={{ backgroundColor: '#FFCDD2', marginBottom: 8 }}>
        <Card.Content>
          <MaterialIcons name="error" size={24} color="red" />
          <Text style={{ fontWeight: 'bold' }}>Fuga Detectada</Text>
          <Text>Se detectó una fuga en el baño principal</Text>
          <Text>Consumo anormal: 15L/min</Text>
          <Text style={{ color: 'gray' }}>Detectado el: 12/01/2025 - 15:23:45</Text>
        </Card.Content>
      </Card>

      <Card style={{ backgroundColor: '#FFF9C4', marginBottom: 16 }}>
        <Card.Content>
          <MaterialIcons name="warning" size={24} color="orange" />
          <Text style={{ fontWeight: 'bold' }}>Consumo Elevado</Text>
          <Text>Consumo superior al promedio en el baño principal</Text>
          <Text>Consumo actual: 25L/hora </Text>
          <Text style={{ color: 'gray' }}>Detectado el: 12/01/2025 - 16:45:12</Text>
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
        <Card style={{ flex: 1 }}>
          <Card.Content style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'blue' }}>4.5K L</Text>
            <Text style={{ color: 'gray' }}>Consumo Mensual</Text>
          </Card.Content>
        </Card>
      </View>

      {/* Menú de Opciones */}
      {["Historial de Consumo"].map((item, index) => (
        <Card key={index} style={{ marginBottom: 8 }}>
          <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>{item}</Text>
            <Feather name="chevron-right" size={24} color="gray" />
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

export default DashboardScreen;
