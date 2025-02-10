import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import axios from 'axios';

const DashboardScreen = ({ route, navigation }: any) => {
  const { username, email } = route.params || {};
  const [valveStatus, setValveStatus] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
  const [sensorData, setSensorData] = useState({
    timestamp: '',
    leak_status: false,
    high_consumption: false,
    valve_status: true,
    location: '',
    user_id: 0,
    flowRate: 0,
    totalLiters: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      setCurrentDate(new Date().toLocaleDateString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.0.7.10:3000/sensor/latest');
        setSensorData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleValve = async () => {
    try {
      const response = await axios.post('http://10.0.7.10:3000/sensor/toggle-valve', { status: !valveStatus });
      setValveStatus(response.data.status);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f8f8f8', padding: 20 }}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.headerTime}>{currentTime}</Text>
          <Text style={styles.headerDate}>{currentDate}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Account', { username, email })}>
          <Feather name="user" size={35} color="blue" />
        </TouchableOpacity>
      </View>

      <Card style={styles.card}>
        <Card.Title title="Estado General" />
        <Card.Content style={styles.rowBetween}>
          <View style={styles.row}>
            <MaterialCommunityIcons name="water" size={45} color={sensorData.valve_status ? 'blue' : 'gray'} />
            <View>
              <Text style={styles.cardTitle}>Electroválvula</Text>
              <Text style={styles.cardSubtitle}>{sensorData.valve_status ? 'Activo' : 'Desactivado'}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={toggleValve}>
            <MaterialCommunityIcons name="power" size={50} color={sensorData.valve_status ? 'green' : 'red'} />
          </TouchableOpacity>
        </Card.Content>
      </Card>

      <Text style={styles.sectionTitle}>Alertas Activas</Text>
      <Card style={[styles.alertCard, { backgroundColor: sensorData.leak_status ? '#DC3545' : '#007BFF' }]}>
        <Card.Content>
          <MaterialIcons name={sensorData.leak_status ? 'warning' : 'check'} size={24} color="orange" />
          <Text style={styles.alertText}>{sensorData.leak_status ? 'Fuga Detectada' : 'No se detectaron fugas'}</Text>
          <Text style={styles.alertText}>Consumo actual: {sensorData.flowRate} L/min</Text>
          <Text style={styles.alertDate}>Detectado el: {sensorData.timestamp}</Text>
        </Card.Content>
      </Card>

      <Card style={[styles.alertCard, { backgroundColor: sensorData.high_consumption ? '#D4C716' : '#28A745' }]}>
        <Card.Content>
          <MaterialIcons name={sensorData.high_consumption ? 'error' : 'check'} size={24} color="red" />
          <Text style={styles.alertText}>{sensorData.high_consumption ? 'Consumo Elevado' : 'Consumo Normal'}</Text>
          <Text style={styles.alertText}>Consumo actual: {sensorData.flowRate} L/min</Text>
          <Text style={styles.alertDate}>Detectado el: {sensorData.timestamp}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.statCard}>
        <Card.Content style={styles.centerContent}>
          <Text style={styles.statValue}>{sensorData.totalLiters}L</Text>
          <Text style={styles.statLabel}>Consumo Hoy</Text>
        </Card.Content>
      </Card>

      <TouchableOpacity onPress={() => navigation.navigate('History')}>
        <Card style={styles.optionCard}>
          <Card.Content style={styles.rowBetween}>
            <Text>Historial de Consumo</Text>
            <Feather name="chevron-right" size={24} color="gray" />
          </Card.Content>
        </Card>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  headerTime: { fontSize: 20, fontWeight: 'bold' },
  headerDate: { fontSize: 14, color: 'gray' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  card: { marginBottom: 20 },
  cardTitle: { fontWeight: '700' },
  cardSubtitle: { color: 'gray' },
  sectionTitle: { fontWeight: 'bold', fontSize: 20, marginBottom: 8 },
  alertCard: { marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 5 },
  alertText: { color: 'white' },
  alertDate: { color: '#D9D9D9' },
  statCard: { flex: 1, marginBottom: 16 },
  centerContent: { alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: 'bold', color: 'blue' },
  statLabel: { color: 'gray' },
  optionCard: { marginBottom: 8 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});

export default DashboardScreen;
