import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import { AppHeader } from '../components';
import SurveyCard from '../components/cards/SurveyCard';
import TopCard from '../components/cards/TopCard';

const PersonalFollowScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Gelişim" onBackPress={() => navigation.navigate('Home')} />

      {/* Alt Kısım - Anketler-Sonuçlar-  Değerlendirmeler */}
      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.surveysContainer}>
          <View style={styles.topSection}>
            {/* Top 3 Card bileşenler*/}
            <TopCard icon="chart-line" />
            <TopCard icon="lightbulb-on" />
            <TopCard 
              icon="link-variant" 
              onPress={() => navigation.navigate('HabitTracking')}
            />
          </View>
          <Text style={styles.sectionTitle}>Psikolojik Testler</Text>
          <View style={styles.bottomSection}>
            <View style={styles.row}>
              <View style={styles.cardContainer}>
                <SurveyCard 
                  title="Anksiyete" 
                  icon={require('../assets/icons/Anksiyete-icon.png')} 
                />
              </View>
              <View style={styles.cardContainer}>
                <SurveyCard 
                  title="Depresyon" 
                  icon={require('../assets/icons/Depresyon-icon.png')} 
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cardContainer}>
                <SurveyCard 
                  title="Sosyal Anksiyete" 
                  icon={require('../assets/icons/SosyalAnksiyete-icon.png')} 
                />
              </View>
              <View style={styles.cardContainer}>
                <SurveyCard 
                  title="Özgüven" 
                  icon={require('../assets/icons/Özgüven-icon.png')} 
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cardContainer}>
                <SurveyCard 
                  title="Öfke" 
                  icon={require('../assets/icons/Öfke-icon.png')} 
                />
              </View>
              <View style={styles.cardContainer}>
                <SurveyCard 
                  title="Fobi" 
                  icon={require('../assets/icons/Fobi-icon.png')} 
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cardContainer}>
                <SurveyCard 
                  title="Borderline" 
                  icon={require('../assets/icons/Borderline-icon.png')} 
                />
              </View>
              <View style={styles.cardContainer}>
                <SurveyCard 
                  title="Dikkat Dağınıklığı" 
                  icon={require('../assets/icons/DikkatDagınıklıgı-icon.png')} 
                />
              </View>
            </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  topSection: {
    flexDirection: 'row',
    paddingHorizontal: 50,
    paddingBottom: 20,
    gap: 50,
  },
  content: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  surveysContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    marginTop: 8,
  },
  bottomSection: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  cardContainer: {
    flex: 1,
    maxWidth: '48%',
  },
  scrollContent: {
    paddingBottom: 120,
  },
});

export default PersonalFollowScreen; 