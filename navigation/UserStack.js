import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, StyleSheet, TouchableOpacity, Vibration, Animated } from 'react-native';

// Screens
import HomeScreen from '../Screens/HomeScreen';
import MessageScreen from '../Screens/MessageScreen';
import FavoriteScreen from '../Screens/FavoriteScreen';
import PersonalFollowScreen from '../Screens/PersonalFollowScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import BlogDetailScreen from '../Screens/BlogDetailScreen';
import HabitTrackingScreen from '../Screens/HabitTrackingScreen';
import AITherapistScreen from '../Screens/AITherapistScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigators
const MessageStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MessagesMain" component={MessageScreen} />
  </Stack.Navigator>
);

const FavoriteStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="FavoritesMain" component={FavoriteScreen} />
    <Stack.Screen name="BlogDetail" component={BlogDetailScreen} />
  </Stack.Navigator>
);

const PersonalFollowStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PersonalFollowMain" component={PersonalFollowScreen} />
    <Stack.Screen name="HabitTracking" component={HabitTrackingScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileMain" component={ProfileScreen} />
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen name="BlogDetail" component={BlogDetailScreen} />
    <Stack.Screen name="AITherapist" component={AITherapistScreen} />
  </Stack.Navigator>
);

// Custom Tab Bar Component
const CustomTabBar = ({ state, descriptors, navigation }) => {
  const [scaleAnim] = React.useState(new Animated.Value(1));

  const handleLongPress = (routeName) => {
    if (routeName === 'Home') {
      // Titreşim efekti
      Vibration.vibrate(400);

      // Animasyon efekti
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Animasyon bittikten sonra AI Terapist ekranına git
        navigation.navigate('Home', { 
          screen: 'AITherapist' 
        });
      });
    }
  };

  return (
    <View style={styles.tabBarWrapper}>
      <View style={styles.tabBarContainer}>
        <View style={styles.tabBar}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            let iconName;
            switch (route.name) {
              case 'Messages':
                iconName = 'message-text';
                break;
              case 'Favorites':
                iconName = 'heart';
                break;
              case 'Home':
                iconName = 'home';
                break;
              case 'PersonalFollow':
                iconName = 'trending-up';
                break;
              case 'Profile':
                iconName = 'account';
                break;
              default:
                iconName = 'circle';
            }

            const isHome = route.name === 'Home';

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                onLongPress={() => handleLongPress(route.name)}
                style={[
                  styles.tabItem,
                  isHome && styles.homeTab,
                  isFocused && !isHome && styles.focusedTab,
                ]}
                activeOpacity={isHome ? 0.9 : 1}
              >
                <Animated.View
                  style={[
                    isHome && {
                      transform: [{ scale: scaleAnim }],
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={iconName}
                    size={isHome ? 28 : 24}
                    color={isFocused || false ? '#00C853' : '#999'}
                  />
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

// Main Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator
    tabBar={(props) => <CustomTabBar {...props} />}
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Home"
  >
    <Tab.Screen name="Messages" component={MessageStack} />
    <Tab.Screen name="Favorites" component={FavoriteStack} />
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="PersonalFollow" component={PersonalFollowStack} />
    <Tab.Screen name="Profile" component={ProfileStack} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: -6,
    right: -6,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  homeTab: {
    backgroundColor: '#001845',
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: -30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    opacity: 1,
  },
  focusedTab: {
    borderRadius: 20,
  },
});

export default TabNavigator;
