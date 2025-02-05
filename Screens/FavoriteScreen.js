import React from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Platform, StatusBar, Image, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { AppHeader } from '../components';

const FavoriteCard = ({ title, description, icon, onPress }) => (
  <TouchableOpacity style={styles.favoriteCard} onPress={onPress}>
    <View style={styles.favoriteIconContainer}>
      <Image source={icon} style={styles.favoriteIcon} resizeMode="contain" />
    </View>
    <View style={styles.favoriteContent}>
      <Text style={styles.favoriteTitle}>{title}</Text>
      <Text style={styles.favoriteDescription} numberOfLines={3}>
        {description}
      </Text>
    </View>
  </TouchableOpacity>
);

const FavoriteScreen = ({ navigation }) => {
  // Redux'tan favorileri al
  const favorites = useSelector(state => state.favorites.favorites);

  const handleBlogDetail = (blogData) => {
    navigation.navigate('BlogDetail', {
      title: blogData.title,
      description: blogData.description,
      icon: blogData.icon
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Favoriler" onBackPress={() => navigation.navigate('Home')} />

      {/* Content */}
      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {favorites.length > 0 ? (
          favorites.map((item, index) => (
            <FavoriteCard
              key={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
              onPress={() => handleBlogDetail(item)}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="heart-outline" size={64} color="#666" />
            <Text style={styles.emptyText}>Henüz favori blog yazınız yok</Text>
          </View>
        )}
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
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
  },
  favoriteCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  favoriteIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  favoriteIcon: {
    width: 50,
    height: 50,
  },
  favoriteContent: {
    flex: 1,
  },
  favoriteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  favoriteDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
});

export default FavoriteScreen; 