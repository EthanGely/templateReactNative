import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Text, Alert, Linking } from 'react-native';
import { useAppContext } from '../appContext';

export default function Dog() {
  const { incrementDogClicks, bgColor } = useAppContext();

  const [dogImage, setDogImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch a random dog image from the Dog API
    const fetchDogImage = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        if (data.status === 'success') {
          setDogImage(data.message);
        } else {
          throw new Error('Failed to fetch dog image');
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDogImage();
  }, []);

  const prepareSms = async () => {
    incrementDogClicks();
    const phoneNumber = '0606060606'; // Replace with the desired phone number
    const message = 'Je n\'aime pas les chats.';

    const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;

    try {
      const supported = await Linking.canOpenURL(smsUrl);
      if (supported) {
        await Linking.openURL(smsUrl);
      } else {
        Alert.alert('Error', 'SMS is not supported on this device.');
      }
    } catch (error) {
      console.error('Error preparing SMS:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  if (loading) {
    return (
      <View style={{...styles.container, backgroundColor: bgColor}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{...styles.container, backgroundColor: bgColor}}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={{...styles.container, backgroundColor: bgColor}}>
      <TouchableOpacity onPress={prepareSms}>
        {dogImage && (
          <Image
            source={{ uri: dogImage }}
            style={styles.dogImage}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  text: {
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  dogImage: {
    width: 200,
    height: 200,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
