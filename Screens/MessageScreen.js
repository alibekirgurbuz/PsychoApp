import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import { AppHeader, MessageItem } from '../components';

const MessageScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Mesajlar" onBackPress={() => navigation.navigate('Home')} />

      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <MessageItem
          name="Mark"
          message="Hi, Whtasapp?"
          time="Şimdi"
          avatar={require('../assets/profile1.jpg')}
          onPress={() => {/* Mesaj detayına git */}}
        />
        <MessageItem
          name="Elon"
          message="See u later"
          time="Şimdi"
          avatar={require('../assets/profile2.jpg')}
          onPress={() => {/* Mesaj detayına git */}}
        />
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
    paddingTop: 16,
  },
  scrollContent: {
    paddingBottom: 120,
  },
});

export default MessageScreen; 