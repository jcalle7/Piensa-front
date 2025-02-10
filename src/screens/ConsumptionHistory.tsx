import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Card } from "react-native-paper";
import { ArrowLeft, Download } from "lucide-react-native"; // Importa correctamente los íconos

const screenWidth = Dimensions.get("window").width;

const ConsumptionHistory = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("day");

  const readingsData = {
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    datasets: [
      {
        data: [5.2, 3.1, 12.5, 8.7, 15.3, 10.1],
        strokeWidth: 2
      }
    ]
  };

  const detailedReadings = [
    { id: 1, timestamp: "2025-01-14 08:30:15", location: "Baño Principal", consumption: 12.5, status: "normal" },
    { id: 2, timestamp: "2025-01-14 09:00:00", location: "Baño Principal", consumption: 18.3, status: "alto" }
  ];

  return (
    <View style={styles.container}>

      {/* Gráfico de Consumo */}
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Consumo de Agua</Text>
        <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Día</Text>
        </TouchableOpacity>
        </View>
        <LineChart
          data={readingsData}
          width={screenWidth - 65}
          height={220}
          yAxisSuffix="L"
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: { r: "4", strokeWidth: "3", stroke: "#2563eb" }
          }}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      </Card>

      {/* Resumen de Estadísticas */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Text style={styles.statLabel}>Consumo Total</Text>
          <Text style={styles.statValue}>54.9 L</Text>
          <Text style={styles.statSubtitle}>Último día</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statLabel}>Promedio</Text>
          <Text style={styles.statValue}>9.15 L/h</Text>
          <Text style={styles.statSubtitle}>Último día</Text>
        </Card>
      </View>

      {/* Lecturas Detalladas */}
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Lecturas Detalladas</Text>
        {detailedReadings.map((reading) => (
          <View key={reading.id} style={styles.readingItem}>
            <View>
              <Text style={styles.readingLocation}>{reading.location}</Text>
              <Text style={styles.readingTimestamp}>{reading.timestamp}</Text>
            </View>
            <View style={[styles.statusBadge, reading.status === "normal" ? styles.normalStatus : styles.highStatus]}>
              <Text style={styles.statusText}>
                {reading.status.charAt(0).toUpperCase() + reading.status.slice(1)}
              </Text>
            </View>
            <View>
              <Text style={styles.readingLabel}>Consumo</Text>
              <Text style={styles.readingValue}>{reading.consumption}L</Text>
            </View>
          </View>
        ))}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 16
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  iconButton: {
    padding: 8
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold"
  },
  filterContainer: {
    alignItems: "flex-start",
    marginBottom: 16
  },
  filterButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    justifyContent: "flex-start", 
  },
  filterText: {
    color: "#fff",
    fontSize: 14
  },
  card: {
    padding: 18,
    marginBottom: 18
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16
  },
  statCard: {
    flex: 1,
    alignItems: "flex-start",
    padding: 16,
    marginHorizontal: 4
  },
  statLabel: {
    fontSize: 18,
    color: "#555"
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2563eb",
    marginVertical: 4
  },
  statSubtitle: {
    fontSize: 12,
    color: "#777"
  },
  readingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 12
  },
  readingLocation: {
    fontSize: 16,
    fontWeight: "bold"
  },
  readingTimestamp: {
    fontSize: 12,
    color: "#777"
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12
  },
  normalStatus: {
    backgroundColor: "#d1fae5"
  },
  highStatus: {
    backgroundColor: "#fee2e2"
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold"
  },
  readingLabel: {
    fontSize: 12,
    color: "#777"
  },
  readingValue: {
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default ConsumptionHistory;
