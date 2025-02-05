import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Form validasyonu
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      // Kayıtlı kullanıcı bilgilerini alalım
      const userDataString = await AsyncStorage.getItem('userData');
      
      if (userDataString) {
        const userData = JSON.parse(userDataString);

        // Kullanıcı bilgilerini kontrol edelim
        if (userData.email === email && userData.password === password) {
          // Giriş durumunu kaydet
          await AsyncStorage.setItem('isAuthenticated', 'true');
          // NOT: Artık burada navigate etmiyoruz
          // RootNavigation otomatik olarak yönlendirecek
        } else {
          Alert.alert('Hata', 'Email veya şifre hatalı.');
        }
      } else {
        Alert.alert('Hata', 'Kayıtlı kullanıcı bulunamadı.');
      }
    } catch (error) {
      Alert.alert('Hata', 'Giriş işlemi sırasında bir hata oluştu.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.decorativeContainer}>
        {/* Sol üst köşedeki dekoratif elementler */}
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.logo}>Mentrack</Text>
        
        {/* {Email-INPUT} */}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* {Password-INPUT} */}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>PASSWORD</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* {Login-BUTTON} */}

        <TouchableOpacity 
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

        <View style={styles.bottomLinks}>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupLink}>Signup !</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  decorativeContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 200,
    height: 200,
  },
  decorativeElement: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#2ECC71',
    borderRadius: 5,
    transform: [{ rotate: '45deg' }],
  },
  formContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2ECC71',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#6930c3',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  forgotPassword: {
    color: '#666',
    fontSize: 14,
  },
  signupLink: {
    color: '#666',
    fontSize: 14,
  },
});

export default LoginScreen;
