import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { AppHeader } from '../components';
import HabitCards from '../components/cards/HabitCards';

const HabitTrackingScreen = ({ navigation }) => {
    const handleChainPress = (index) => {
        console.log(`Chain ${index + 1} pressed!`);
      };
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader 
        title="Alışkanlık Takibi" 
        onBackPress={() => navigation.goBack()} 
      />
      <View style={styles.content}>
        {/* <Text style={styles.title}>Alışkanlık Takibi</Text> */}
        <HabitCards
        title="Uyku"
        image={require('../assets/sleep.png')} // Kendi görsel yolunu ekle
        progress={33}
        onChainPress={handleChainPress}
      />
      </View>
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
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
  },
});

export default HabitTrackingScreen;
