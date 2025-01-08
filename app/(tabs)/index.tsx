import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import catImage from '../../assets/images/cat.webp';
import catNoise from '../../assets/sounds/cat.mp3';
import { Audio } from 'expo-av';
import { useAppContext } from '../appContext';

export default function Cat() {
    const sound = useRef<Audio.Sound | null>(null);
    const { incrementCatClicks, bgColor } = useAppContext();
    const [hasPlayed, setHasPlayed] = useState(false);

    const playSound = async () => {
        incrementCatClicks();
        if (sound.current) {
          // If the sound is already loaded, unload it first
          await sound.current.unloadAsync();
          sound.current = null;
        }
    
        sound.current = new Audio.Sound();
    
        try {
          await sound.current.loadAsync(catNoise);
          await sound.current.playAsync();
        } catch (error) {
          console.error('Error playing sound:', error);
        }
        setHasPlayed(true);
      };

      useEffect(() => {
        return () => {
          if (sound.current) {
            sound.current.unloadAsync();
          }
        };
      }, []);

      return (
        <View style={{backgroundColor: bgColor, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={playSound} style={styles.touchable}>
            <Text style={styles.text}>{hasPlayed ? 'Yup, you\'ve done it. Well done' : 'This is a cat, but don\'t click on it'}</Text>
            <Image
              source={catImage}
              style={styles.catImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      );
}

const styles = StyleSheet.create({
    touchable: {
      alignItems: 'center',
    },
    text: {
      marginBottom: 10,
      fontSize: 16,
      color: '#333',
    },
    catImage: {
      width: 200,
      height: 200,
    },
  });
