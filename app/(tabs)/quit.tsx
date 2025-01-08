import React, { useEffect } from 'react';
import { BackHandler, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useAppContext } from '../appContext';

export default function Quit() {
  const quitApp = () => {
    BackHandler.exitApp();
  };

  const { bgColor } = useAppContext();

  useEffect(() => {
    // Optionally handle BackHandler to quit directly when navigating to this screen
    const backAction = () => {
      quitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  return (
    <View style={{...styles.container, backgroundColor: bgColor}}>
      <Text style={styles.text}>Are you sure you want to quit?</Text>
      <TouchableOpacity onPress={quitApp} style={styles.quitButton}>
        <Text style={styles.quitButtonText}>Quit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  quitButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  quitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
