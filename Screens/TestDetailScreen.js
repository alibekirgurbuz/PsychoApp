import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Platform, 
  StatusBar,
  Dimensions 
} from 'react-native';
import { useSelector } from 'react-redux';
import { LineChart } from 'react-native-chart-kit';
import { AppHeader } from '../components';
import { selectTestCevaplari, selectGecmisSonuclar } from '../redux/slices/testSonuclariSlice';

const TestDetailScreen = ({ navigation, route }) => {
  const { testAdi } = route.params;
  const testSonucu = useSelector(state => selectTestCevaplari(state, testAdi));
  const gecmisSonuclar = useSelector(state => selectGecmisSonuclar(state, testAdi));

  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 200, 83, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#00C853',
    },
  };

  // Son 5 test sonucunu al ve tarihleri formatla
  const sonSonuclar = gecmisSonuclar.slice(0, 5).reverse();
  const data = {
    labels: sonSonuclar.map(sonuc => {
      const tarih = new Date(sonuc.tarih);
      return `${tarih.getDate()}/${tarih.getMonth() + 1}`;
    }),
    datasets: [
      {
        data: sonSonuclar.map(sonuc => sonuc.toplamPuan),
        color: (opacity = 1) => `rgba(0, 200, 83, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const getSeverityText = (puan) => {
    if (puan <= 5) return { text: 'Normal seviye', color: '#4CAF50' };
    if (puan <= 10) return { text: 'Hafif seviye', color: '#FFC107' };
    if (puan <= 15) return { text: 'Orta seviye', color: '#FF9800' };
    return { text: 'Yüksek seviye', color: '#F44336' };
  };

  const severity = getSeverityText(testSonucu?.toplamPuan || 0);

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader 
        title={`${testAdi} Detayları`}
        onBackPress={() => navigation.goBack()} 
      />
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.detailContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Son Test Sonucu</Text>
            <Text style={styles.summaryText}>
              Toplam Puan: <Text style={styles.highlightText}>{testSonucu?.toplamPuan || 0}</Text>
            </Text>
            <Text style={styles.dateText}>
              Test Tarihi: {testSonucu?.tarih || 'Belirtilmemiş'}
            </Text>
            <Text style={[styles.severityText, { color: severity.color }]}>
              {severity.text}
            </Text>
          </View>

          {gecmisSonuclar.length > 1 && (
            <View style={styles.chartCard}>
              <Text style={styles.chartTitle}>Geçmiş Test Sonuçları</Text>
              <LineChart
                data={data}
                width={Dimensions.get('window').width - 40}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
                fromZero
                yAxisLabel=""
                yAxisSuffix=""
              />
              <Text style={styles.chartDescription}>
                Son 5 test sonucunuzun puan grafiği
              </Text>
            </View>
          )}

          <View style={styles.historyCard}>
            <Text style={styles.historyTitle}>Tüm Test Geçmişi</Text>
            {gecmisSonuclar.map((sonuc, index) => (
              <View key={index} style={styles.historyItem}>
                <Text style={styles.historyDate}>{sonuc.tarih}</Text>
                <Text style={styles.historyScore}>
                  Puan: <Text style={styles.scoreText}>{sonuc.toplamPuan}</Text>
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00C853',
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 20,
  },
  content: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  detailContainer: {
    padding: 16,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  highlightText: {
    fontWeight: '600',
    color: '#333',
  },
  severityText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 4,
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  chartDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
    fontStyle: 'italic',
  },
  historyCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  historyDate: {
    fontSize: 14,
    color: '#666',
  },
  historyScore: {
    fontSize: 14,
    color: '#666',
  },
  scoreText: {
    fontWeight: '600',
    color: '#333',
  },
});

export default TestDetailScreen; 