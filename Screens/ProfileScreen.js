import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Switch, ScrollView, Platform, StatusBar } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppHeader } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingItem = ({ icon, title, subtitle, hasSwitch, hasArrow, onPress }) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.settingIconContainer}>
      <MaterialCommunityIcons name={icon} size={24} color="#333" />
    </View>
    <View style={styles.settingContent}>
      <Text style={styles.settingTitle}>{title}</Text>
      {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
    </View>
    {hasSwitch && <Switch value={false} onValueChange={() => {}} />}
    {hasArrow && <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />}
  </TouchableOpacity>
);

const SectionTitle = ({ title }) => (
  <View style={styles.sectionTitleContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

const ProfileScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      // Giriş durumunu false yap
      await AsyncStorage.setItem('isAuthenticated', 'false');
      // İsterseniz kullanıcı verilerini de temizleyebilirsiniz
      // await AsyncStorage.removeItem('userData');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Profil" onBackPress={() => navigation.navigate('Home')} />

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://example.com/placeholder.jpg' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editButton}>
              <MaterialCommunityIcons name="pencil" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>Jordan Peterson</Text>
          <Text style={styles.profileEmail}>peterson@reallygreatsite.com</Text>
        </View>

        {/* Settings */}
        <View style={styles.settingsContainer}>
          <SectionTitle title="Genel Ayarlar" />
          <SettingItem
            icon="theme-light-dark"
            title="Mod"
            subtitle="Karanlık&Aydınlık"
            hasSwitch
          />
          <SettingItem
            icon="lock"
            title="Şifre Değiştir"
            hasArrow
          />
          <SettingItem
            icon="translate"
            title="Diller"
            hasArrow
          />

          <SectionTitle title="Bilgiler" />
          <SettingItem
            icon="information"
            title="Uygulama Hakkında"
            hasArrow
          />
          <SettingItem
            icon="file-document"
            title="Yazarlık Başvurusu"
            hasArrow
          />
          <SettingItem
            icon="shield-check"
            title="Gizlilik Politikası"
            hasArrow
          />
          <SettingItem
            icon="share-variant"
            title="Uygulamayı Paylaş"
            hasArrow
          />
          <SettingItem
            icon="exit-to-app"
            title="Çıkış Yap"
            hasArrow
            onPress={handleLogout}
          />
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
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#00C853',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#333',
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  settingsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitleContainer: {
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
    marginHorizontal: -16,
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  scrollContent: {
    paddingBottom: 120,
  },
});

export default ProfileScreen; 