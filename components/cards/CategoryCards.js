import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CategoryCard = ({ title, description, icon, onPress, onFavoritePress, isFavorite }) => (
  <TouchableOpacity style={styles.categoryCard} onPress={onPress}>
    <View style={styles.categoryIcon}>
      <Image source={icon} style={styles.categoryImage} resizeMode="contain" />
    </View>
    <View style={styles.categoryContent}>
      <Text style={styles.categoryTitle}>{title}</Text>
      <Text style={styles.categoryDescription} numberOfLines={2}>{description}</Text>
    </View>
    <TouchableOpacity onPress={onFavoritePress} style={styles.favoriteButton}>
      <MaterialCommunityIcons 
        name={isFavorite ? "heart" : "heart-outline"} 
        size={24} 
        color={isFavorite ? "red" : "#333"} 
      />
    </TouchableOpacity>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  categoryCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 8,
  },
  categoryImage: {
    width: 50,
    height: 50,
  },
});

export default CategoryCard;
