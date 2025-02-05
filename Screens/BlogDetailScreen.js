import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text, Image, Platform, StatusBar } from 'react-native';
import { AppHeader } from '../components';

const BlogDetailScreen = ({ navigation, route }) => {
  const { title, description, icon } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Blog Detay" onBackPress={() => navigation.goBack()} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Image source={icon} style={styles.image} resizeMode="cover" />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
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
  image: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});

export default BlogDetailScreen; 