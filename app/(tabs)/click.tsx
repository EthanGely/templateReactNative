import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { useAppContext } from '../appContext';

const Click = () => {
  const { catClicks, dogClicks, resetClicks, bgColor } = useAppContext();

  return (
    <View style={{...styles.container, backgroundColor: bgColor}}>
      <Text style={styles.text}>Cat Button Clicked: {catClicks} times</Text>
      <Text style={styles.text}>Dog Button Clicked: {dogClicks} times</Text>
      <Button title="Reset Counts" onPress={resetClicks} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // Centers content vertically
    alignItems: 'center',      // Centers content horizontally
    padding: 20,               // Add padding if needed
  },
  text: {
    color: 'black',
    fontSize: 18,
    marginBottom: 10,          // Spacing between text elements
  },
});

export default Click;
