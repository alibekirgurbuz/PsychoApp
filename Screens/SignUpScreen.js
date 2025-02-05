import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppHeader from '../components/headers/AppHeader';

const { width, height } = Dimensions.get('window');

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSignUp = async () => {
    // Form validasyonu
    if (!name || !email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      // Kullanıcı bilgilerini bir obje olarak saklayalım
      const userData = {
        name,
        email,
        password
      };

      // AsyncStorage'a kaydedelim
      await AsyncStorage.setItem('userData', JSON.stringify(userData));

      // Başarılı kayıt mesajı
      Alert.alert(
        'Başarılı',
        'Kayıt işlemi tamamlandı. Giriş yapabilirsiniz.',
        [
          {
            text: 'Tamam',
            onPress: () => navigation.navigate('Login')
          }
        ]
      );
    } catch (error) {
      Alert.alert('Hata', 'Kayıt işlemi sırasında bir hata oluştu.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.headerBackground}>
        <View style={styles.headerContainer}>
          <AppHeader 
            title="Sign Up" 
            onBackPress={handleBackPress}
          />
        </View>
        <View style={styles.headerCurve} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create new{'\n'}Account</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.subtitle}>Already Registered? Log in here</Text>
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>NAME</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>EMAIL</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>PASSWORD</Text>
            <TextInput
              style={styles.input}
              placeholder="Create password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#999"
            />
          </View>

          {/* <View style={styles.inputContainer}>
            <Text style={styles.label}>DATE OF BIRTH</Text>
            <TouchableOpacity style={styles.input}>
              <Text style={styles.dateText}>Select</Text>
            </TouchableOpacity>
          </View> */}

          <TouchableOpacity 
            style={styles.signupButton}
            onPress={handleSignUp}
          >
            <Text style={styles.signupButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBackground: {
    backgroundColor: '#2ECC71',
    height: height * 0.19,
  },
  headerContainer: {
    paddingTop: Platform.OS === 'android' ? 50 : 0,
  },
  headerCurve: {
    position: 'absolute',
    bottom: -30,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2ECC71',
    marginBottom: 10,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#333',
  },
  signupButton: {
    backgroundColor: '#6930c3',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
