import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, ScrollView, TextInput, TouchableOpacity, Animated, Dimensions, Easing } from 'react-native';
import { AppHeader } from '../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { height, width } = Dimensions.get('window');

const AITherapistScreen = ({ navigation }) => {
  const contentScale = new Animated.Value(0.3);
  const contentTranslateY = new Animated.Value(height);
  const messageScale = new Animated.Value(0);
  const messageOpacity = new Animated.Value(0);
  const inputContainerTranslateY = new Animated.Value(100);

  useEffect(() => {
    // Tüm animasyonları sırayla başlat
    Animated.sequence([
      // İçeriği yukarı kaydır ve büyüt
      Animated.parallel([
        Animated.timing(contentTranslateY, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.bezier(0.2, 0.65, 0.4, 0.9),
        }),
        Animated.spring(contentScale, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      // Mesaj balonunu göster
      Animated.parallel([
        Animated.spring(messageScale, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(messageOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      // Input container'ı yukarı kaydır
      Animated.spring(inputContainerTranslateY, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader 
        title="AI Terapist" 
        onBackPress={() => navigation.goBack()} 
      />
      <Animated.View 
        style={[
          styles.content,
          {
            transform: [
              { translateY: contentTranslateY },
              { scale: contentScale }
            ],
          }
        ]}
      >
        <ScrollView 
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
        >
          <Animated.View 
            style={[
              styles.welcomeMessage,
              {
                opacity: messageOpacity,
                transform: [
                  { scale: messageScale },
                  { translateX: messageScale.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, 0]
                  })}
                ]
              }
            ]}
          >
            <Text style={styles.welcomeText}>
              Merhaba! Ben senin AI Terapistinim. Nasıl yardımcı olabilirim?
            </Text>
          </Animated.View>
        </ScrollView>
        
        <Animated.View 
          style={[
            styles.inputContainer,
            {
              transform: [{ translateY: inputContainerTranslateY }]
            }
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Mesajınızı yazın..."
            multiline
            placeholderTextColor="#666"
          />
          <TouchableOpacity style={styles.sendButton}>
            <MaterialCommunityIcons name="send" size={24} color="#00C853" />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
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
    overflow: 'hidden',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messagesContent: {
    paddingBottom: 16,
  },
  welcomeMessage: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  welcomeText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
    color: '#333',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AITherapistScreen;