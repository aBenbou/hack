import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';

// Color palette
const CHART_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];

const TEST_DATA = [
  { name: 'Food', amount: 300, color: CHART_COLORS[0] },
  { name: 'Transport', amount: 200, color: CHART_COLORS[1] },
  { name: 'Shopping', amount: 250, color: CHART_COLORS[2] },
  { name: 'Entertainment', amount: 150, color: CHART_COLORS[3] }
];

const Chart = ({ data = null }) => {
  const { width } = useWindowDimensions();
  const displayData = data || TEST_DATA;
  const totalAmount = displayData.reduce((sum, item) => sum + item.amount, 0);

  const chartData = displayData.map(item => ({
    ...item,
    name: '',
    legendFontSize: 12,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <LinearGradient colors={['#ffffff', '#f7f9fc']} style={styles.gradientBackground}>
          <Text style={styles.title}>Spending Overview</Text>
          <Text style={styles.subtitle}>Total: ${totalAmount}</Text>
          
          <View style={styles.chartContainer}>
            <PieChart
              data={chartData}
              width={width - 60}
              height={220}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="amount"
              backgroundColor="transparent"
              center={[(width - 60) / 4, 0]}
              absolute
              hasLegend={false}
            />
          </View>
          
          <View style={styles.legendContainer}>
            {displayData.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                {/* Left side: Category */}
                <View style={styles.legendLeftSection}>
                  <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                  <Text style={styles.legendCategoryText}>{item.name}</Text>
                </View>
                
                {/* Right side: Amount and Percentage */}
                <View style={styles.legendRightSection}>
                  <Text style={styles.legendAmountText}>${item.amount}</Text>
                  <Text style={styles.legendPercentageText}>
                    {((item.amount / totalAmount) * 100).toFixed(0)}%
                  </Text>
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
  legendContainer: {
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
  },
  legendPercentageText: {
    fontSize: 14,
    color: '#636E72',
    minWidth: 35,
    textAlign: 'right',
  }
});

export default Chart;