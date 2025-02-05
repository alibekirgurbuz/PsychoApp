import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Platform, StatusBar, Image } from 'react-native';
import { AppHeader } from '../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TopCard = ({ title, icon }) => (
  <TouchableOpacity style={styles.topCard}>
    <MaterialCommunityIcons name={icon} size={35} color="orange" />
    {title && <Text style={styles.topCardTitle}>{title}</Text>}
  </TouchableOpacity>
);

const SurveyCard = ({ title, icon }) => (
  <TouchableOpacity style={styles.surveyCard}>
    <Image source={icon} style={styles.surveyIcon} resizeMode="contain" />
    <Text style={styles.surveyTitle}>{title}</Text>
  </TouchableOpacity>
);

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
            <TopCard icon="chart-line" />
            <TopCard icon="lightbulb-on" />
            <TopCard icon="link-variant" />
          </View>
          <Text style={styles.sectionTitle}>Psikolojik Testler</Text>
          <View style={styles.bottomSection}>
            <View style={styles.row}>
              <SurveyCard 
                title="Anksiyete" 
                icon={require('../assets/icons/Anksiyete-icon.png')} 
              />
              <SurveyCard 
                title="Depresyon" 
                icon={require('../assets/icons/Depresyon-icon.png')} 
              />
            </View>
            <View style={styles.row}>
              <SurveyCard 
                title="Sosyal Anksiyete" 
                icon={require('../assets/icons/SosyalAnksiyete-icon.png')} 
              />
              <SurveyCard 
                title="Özgüven" 
                icon={require('../assets/icons/Özgüven-icon.png')} 
              />
            </View>
            <View style={styles.row}>
              <SurveyCard 
                title="Öfke" 
                icon={require('../assets/icons/Öfke-icon.png')} 
              />
              <SurveyCard 
                title="Fobi" 
                icon={require('../assets/icons/Fobi-icon.png')} 
              />
            </View>
            <View style={styles.row}>
              <SurveyCard 
                title="Borderline" 
                icon={require('../assets/icons/Borderline-icon.png')} 
              />
              <SurveyCard 
                title="Dikkat Dağınıklığı" 
                icon={require('../assets/icons/DikkatDagınıklıgı-icon.png')} 
              />
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
  topCard: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 13,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topCardTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
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
  },
  surveyCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  surveyIcon: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  surveyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: 120,
  },
});

export default PersonalFollowScreen; 