import React from 'react';
import {View} from 'react-native';
import HomeStack from './src/navigation';
import styles from './src/resources/styles';
import AppProvider from './src/stores';

const App = () => {
  return (
    <View style={styles.container}>
      <AppProvider>
        <HomeStack />
      </AppProvider>
    </View>
  );
};

export default App;
