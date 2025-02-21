import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress'; // İlerleme barı için

const HabitCard = ({ title, image, progress, onChainPress }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={image} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Progress.Bar 
        progress={progress / 100} 
        width={null} 
        color="#4CAF50" 
        style={styles.progressBar}
      />
      <View style={styles.chainContainer}>
        {Array(10).fill(0).map((_, index) => (
          <TouchableOpacity key={index} onPress={() => onChainPress(index)}>
            <Text style={[styles.chainLink, index < progress / 10 ? styles.activeChain : null]}>🔗</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBar: {
    marginBottom: 12,
  },
  chainContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chainLink: {
    fontSize: 24,
    margin: 4,
  },
  activeChain: {
    color: '#4CAF50',
  },
});

export default HabitCard;
