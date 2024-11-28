import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';

const CHART_COLORS = ['#4E7BEE', '#52C49B'];

const TEST_DATA = {
  actual: [
    { month: 'Apr', amount: 750 },
    { month: 'May', amount: 900 },
    { month: 'Jun', amount: 800 },
    { month: 'Jul', amount: 850 },
    { month: 'Aug', amount: 950 },
    { month: 'Sep', amount: 1000 },
    { month: 'Oct', amount: 880 },
    { month: 'Nov', amount: 920 }
  ]
};

const PREDICTION_DATA = [
  { month: 'Nov', amount: 920 },
  { month: 'Dec', amount: 966 }
];

const SpendingTrend = ({ data = null }) => {
  const { width } = useWindowDimensions();
  const displayData = data || TEST_DATA;
  const totalActual = displayData.actual.reduce((sum, item) => sum + item.amount, 0);

  const predictionData = displayData.actual.map((_, index) => {
    if (index === displayData.actual.length - 1) {
      return PREDICTION_DATA[0].amount;
    } else if (index === displayData.actual.length) {
      return PREDICTION_DATA[1].amount;
    }
    return null;
  });
  
  predictionData.push(PREDICTION_DATA[1].amount);

  const chartData = {
    labels: [...displayData.actual.map(d => d.month), 'Dec'],
    datasets: [
      {
        data: displayData.actual.map(d => d.amount),
        color: (opacity = 1) => CHART_COLORS[0],
        strokeWidth: 2
      },
      {
        data: predictionData,
        color: (opacity = 1) => CHART_COLORS[1],
        strokeWidth: 2,
        strokeDasharray: [5, 5]
      }
    ]
  };

  // Legend data
  const legendItems = [
    { name: 'Actual', color: CHART_COLORS[0], amount: totalActual },
    { name: 'Predicted (n+1)', color: CHART_COLORS[1], amount: PREDICTION_DATA[1].amount }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <LinearGradient colors={['#ffffff', '#f7f9fc']} style={styles.gradientBackground}>
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
            {legendItems.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={styles.legendLeftSection}>
                  <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                  <Text style={styles.legendCategoryText}>{item.name}</Text>
                </View>
                <View style={styles.legendRightSection}>
                  <Text style={styles.legendAmountText}>${item.amount}</Text>
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
    height: 210,
    justifyContent: 'center',
  },
  chart: {
    borderRadius: 16,
  },
  legendContainer: {
    marginTop: 10,
    minHeight: 180,
  },
  legendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    height: 50,
  },
  legendLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  legendRightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 120,
    justifyContent: 'flex-end',
  },
  legendColor: {
    width: 15,
    height: 15,
    borderRadius: 15,
    marginRight: 10,
  },
  legendCategoryText: {
    fontSize: 15,
    color: '#2D3436',
  },
  legendAmountText: {
    fontSize: 15,
    color: '#2D3436',
    marginRight: 15,
  }
});

export default SpendingTrend;