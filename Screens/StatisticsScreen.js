import React from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Platform, 
  StatusBar,
  Text 
} from 'react-native';
import { useSelector } from 'react-redux';
import { AppHeader } from '../components';
import { selectTestCevaplari } from '../redux/slices/testSonuclariSlice';
import TestResultCard from '../components/cards/TestResultCard';

const StatisticsScreen = ({ navigation }) => {
  // Tüm testlerin sonuçlarını al
  const testler = [
    'Depresyon',
    'Anksiyete',
    'Sosyal Anksiyete',
    'Özgüven',
    'Öfke',
    'Fobi',
    'Borderline',
    'Dikkat Dağınıklığı'
  ];

  const handleTestPress = (testAdi) => {
    navigation.navigate('TestDetailScreen', { testAdi });
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader 
        title="Test Sonuçları" 
        onBackPress={() => navigation.goBack()} 
      />
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsContainer}>
          <Text style={styles.title}>Psikolojik Test Sonuçlarınız</Text>
          
          {testler.map(testAdi => {
            const testSonucu = useSelector(state => selectTestCevaplari(state, testAdi));
            return (
              <TestResultCard
                key={testAdi}
                testAdi={testAdi}
                tamamlandi={testSonucu?.tamamlandi || false}
                toplamPuan={testSonucu?.toplamPuan || 0}
                onPress={() => handleTestPress(testAdi)}
              />
            );
          })}
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
  statsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  }
});

export default StatisticsScreen;