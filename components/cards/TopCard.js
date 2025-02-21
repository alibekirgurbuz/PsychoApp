import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TopCard = ({ title, icon, onPress }) => (
  <TouchableOpacity style={styles.topCard} onPress={onPress}>
    <MaterialCommunityIcons name={icon} size={35} color="orange" />
    {title && <Text style={styles.topCardTitle}>{title}</Text>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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
});

export default TopCard;
