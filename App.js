import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import RootNavigation from './navigation/RootNavigation';

enableScreens();

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
