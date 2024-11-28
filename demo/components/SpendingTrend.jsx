import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';

const TEST_DATA = {
  actual: [
    { month: 'Jan', amount: 900 },
    { month: 'Feb', amount: 850 },
    { month: 'Mar', amount: 1200 },
    { month: 'Apr', amount: 750 },
    { month: 'May', amount: 900 },
    { month: 'Jun', amount: 800 }
  ],
  predicted: [
    { month: 'Jul', amount: 950 },
    { month: 'Aug', amount: 1000 },
    { month: 'Sep', amount: 1100 }
  ]
};

const SpendingTrend = ({ data = null }) => {
  const { width } = useWindowDimensions();
  const displayData = data || TEST_DATA;
  const totalActual = displayData.actual.reduce((sum, item) => sum + item.amount, 0);

  const chartData = {
    labels: [...displayData.actual.map(d => d.month), ...displayData.predicted.map(d => d.month)],
    datasets: [
      {
        data: displayData.actual.map(d => d.amount),
        color: (opacity = 1) => `rgba(71, 126, 232, ${opacity})`,
        strokeWidth: 2
      },
      {
        data: [...Array(displayData.actual.length).fill(null), ...displayData.predicted.map(d => d.amount)],
        color: (opacity = 1) => `rgba(86, 192, 146, ${opacity})`,
        strokeWidth: 2,
        strokeDasharray: [5, 5]
      }
    ]
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <LinearGradient
          colors={['#ffffff', '#f7f9fc']}
          style={styles.gradientBackground}
        >
          <Text style={styles.title}>Spending Overview</Text>
          <Text style={styles.subtitle}>Total: ${totalActual}</Text>
          
          <View style={styles.chartContainer}>
            <LineChart
              data={chartData}
              width={width - 60}
              height={220}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(45, 52, 54, ${opacity})`,
                propsForLabels: {
                  fontSize: 12,
                  fontWeight: '500',
                },
                strokeWidth: 2,
                propsForDots: {
                  r: '4',
                  strokeWidth: '2',
                  stroke: '#fff'
                },
              }}
              withInnerLines={false}
              withOuterLines={true}
              withVerticalLines={false}
              withHorizontalLines={true}
              withDots={true}
              withShadow={false}
              bezier
              style={styles.chart}
            />
          </View>

          <View style={styles.legendContainer}>
            {[
              { label: 'Actual', color: 'rgba(71, 126, 232, 1)', isDashed: false },
              { label: 'Predicted', color: 'rgba(86, 192, 146, 1)', isDashed: true }
            ].map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={styles.legendLeftSection}>
                  <View style={[styles.legendColor, 
                    { backgroundColor: item.color },
                    item.isDashed && styles.dashedLine
                  ]} />
                  <Text style={styles.legendText}>{item.label}</Text>
                </View>
              </View>
            ))}
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: '#fff',
  },
  card: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  gradientBackground: {
    padding: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#636E72',
    marginBottom: 20,
    textAlign: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  chart: {
    borderRadius: 16,
    paddingRight: 40,
  },
  legendContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  legendLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 20,
    height: 3,
    borderRadius: 1.5,
    marginRight: 8,
  },
  dashedLine: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'rgba(86, 192, 146, 1)',
    backgroundColor: 'transparent',
  },
  legendText: {
    fontSize: 14,
    color: '#636E72',
    fontWeight: '500',
  }
});

export default SpendingTrend;