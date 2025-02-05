import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Image, Platform, StatusBar } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../redux/slices/FavoritesSlice';

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
      <MaterialCommunityIcons name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? "red" : "#333"} />
    </TouchableOpacity>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);

  const handleToggleFavorite = (blogData) => {
    dispatch(toggleFavorite(blogData));
  };

  const navigateToBlogDetail = (blogData) => {
    navigation.navigate('BlogDetail', blogData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons name="leaf" size={24} color="#00C853" />
            <Text style={styles.headerTitle}>Her gün daha iyiye</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <MaterialCommunityIcons name="account-circle" size={30} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity 
          style={styles.mainCard} 
          onPress={() => navigateToBlogDetail({
            title: 'Bağlanmanın Nöral Temelleri',
            description: 'İnsan neden bağlanmaya ihtiyaç duyar? Sosyal bağlanma nedir? Bağlanmanın temellerini nörolojik açıdan inceliyoruz!',
            icon: require('../assets/Blogicons/Baglanma.png')
          })}
        >
          <Image 
            source={require('../assets/Blogicons/Baglanma.png')} 
            style={styles.mainCardImage} 
            resizeMode="cover"
          />
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={() => handleToggleFavorite({
              title: 'Bağlanmanın Nöral Temelleri',
              description: 'İnsan neden bağlanmaya ihtiyaç duyar? Sosyal bağlanma nedir? Bağlanmanın temellerini nörolojik açıdan inceliyoruz!',
              icon: require('../assets/Blogicons/Baglanma.png')
            })}
          >
            <MaterialCommunityIcons 
              name={favorites.some(item => item.title === 'Bağlanmanın Nöral Temelleri') ? "heart" : "heart-outline"} 
              size={24} 
              color={favorites.some(item => item.title === 'Bağlanmanın Nöral Temelleri') ? "red" : "#333"} 
            />
          </TouchableOpacity>
          <View style={styles.mainCardContent}>
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>Sinirbilim Uzmanı Asena Himmetoğlu</Text>
              <Text style={styles.publishDate}>05.08.2024</Text>
            </View>
            <Text style={styles.mainCardTitle}>Bağlanmanın Nöral Temelleri</Text>
            <Text style={styles.mainCardDescription}>
              İnsan neden bağlanmaya ihtiyaç duyar? Sosyal bağlanma nedir? Bağlanmanın temellerini nörolojik açıdan inceliyoruz!
            </Text>
            <TouchableOpacity 
              style={styles.readMoreButton}
              onPress={() => navigateToBlogDetail({
                title: 'Bağlanmanın Nöral Temelleri',
                description: 'İnsan neden bağlanmaya ihtiyaç duyar? Sosyal bağlanma nedir? Bağlanmanın temellerini nörolojik açıdan inceliyoruz!',
                icon: require('../assets/Blogicons/Baglanma.png')
              })}
            >
              <Text style={styles.readMoreText}>Devamını Oku</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <MaterialCommunityIcons name="magnify" size={24} color="#666" />
            <TextInput 
              style={styles.searchInput}
              placeholder="Bir makale arayın"
              placeholderTextColor="#666"
            />
          </View>
        </View>

        <View style={styles.categoryCards}>
          <CategoryCard 
            title="Anksiyete"
            description="Anksiyete bozuklukları, belirgin ve kontrol edilemeyen anksiyete ve korku duyguları ile karakterize edilen bir grup ruhsal bozukluklardır."
            icon={require('../assets/Blogicons/BlogAnxiety.png')}
            onPress={() => navigateToBlogDetail({
              title: "Anksiyete",
              description: "Anksiyete bozuklukları, belirgin ve kontrol edilemeyen anksiyete ve korku duyguları ile karakterize edilen bir grup ruhsal bozukluklardır.",
              icon: require('../assets/Blogicons/BlogAnxiety.png')
            })}
            onFavoritePress={() => handleToggleFavorite({
              title: "Anksiyete",
              description: "Anksiyete bozuklukları, belirgin ve kontrol edilemeyen anksiyete ve korku duyguları ile karakterize edilen bir grup ruhsal bozukluklardır.",
              icon: require('../assets/Blogicons/BlogAnxiety.png')
            })}
            isFavorite={favorites.some(item => item.title === "Anksiyete")}
          />
          <CategoryCard 
            title="Kişilik Tipleri"
            description="Farklı kişilik tiplerini ve özelliklerini keşfedin."
            icon={require('../assets/Blogicons/BlogPersonalityTypes.png')}
            onPress={() => navigateToBlogDetail({
              title: "Kişilik Tipleri",
              description: "Farklı kişilik tiplerini ve özelliklerini keşfedin.",
              icon: require('../assets/Blogicons/BlogPersonalityTypes.png')
            })}
            onFavoritePress={() => handleToggleFavorite({
              title: "Kişilik Tipleri",
              description: "Farklı kişilik tiplerini ve özelliklerini keşfedin.",
              icon: require('../assets/Blogicons/BlogPersonalityTypes.png')
            })}
            isFavorite={favorites.some(item => item.title === "Kişilik Tipleri")}
          />
          <CategoryCard 
            title="Stoizm"
            description="Antik Yunan ve Roma felsefesinde önemli bir düşünce okulu."
            icon={require('../assets/Blogicons/BlogStoizm.jpg')}
            onPress={() => navigateToBlogDetail({
              title: "Stoizm",
              description: "Antik Yunan ve Roma felsefesinde önemli bir düşünce okulu.",
              icon: require('../assets/Blogicons/BlogStoizm.jpg')
            })}
            onFavoritePress={() => handleToggleFavorite({
              title: "Stoizm",
              description: "Antik Yunan ve Roma felsefesinde önemli bir düşünce okulu.",
              icon: require('../assets/Blogicons/BlogStoizm.jpg')
            })}
            isFavorite={favorites.some(item => item.title === "Stoizm")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'light-gray',
  },
  headerContainer: {
    paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight + 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120, // Navbar'ın yüksekliği + ekstra padding
  },
  mainCard: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mainCardImage: {
    width: '100%',
    height: 200,
  },
  mainCardContent: {
    padding: 16,
  },
  authorInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  authorName: {
    fontSize: 14,
    color: '#333',
  },
  publishDate: {
    fontSize: 14,
    color: '#666',
  },
  mainCardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  mainCardDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 16,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    fontSize: 16,
    color: '#007AFF',
    marginRight: 4,
  },
  searchBarContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  categoryCards: {
    padding: 16,
    gap: 16,
  },
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

export default HomeScreen; 