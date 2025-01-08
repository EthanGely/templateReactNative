import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapViewComponent() {
  const [region, setRegion] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  // Selected coordinates (e.g., Paris and Toulon)
  const selectedCoordinates = [
    { latitude: 49.5000, longitude: 1.8000, title: 'Paris' },
    { latitude: 43.116669, longitude: 5.93333, title: 'Toulon' },
  ];

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const userCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setUserLocation(userCoords);

      // Set initial region centered on user location
      const initialRegion = {
        latitude: userCoords.latitude,
        longitude: userCoords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setRegion(initialRegion);

      // Calculate the bounding region (if you need to show cities too)
      const calculatedRegion = calculateRegion([userCoords, ...selectedCoordinates]);
      setRegion((prevRegion) => ({
        ...prevRegion,
        latitude: calculatedRegion.latitude,
        longitude: calculatedRegion.longitude,
        latitudeDelta: calculatedRegion.latitudeDelta,
        longitudeDelta: calculatedRegion.longitudeDelta,
      }));
    })();
  }, []);

  const calculateRegion = (points) => {
    const latitudes = points.map((point) => point.latitude);
    const longitudes = points.map((point) => point.longitude);

    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLon = Math.min(...longitudes);
    const maxLon = Math.max(...longitudes);

    const latitudeDelta = maxLat - minLat + 0.1; // Add some padding
    const longitudeDelta = maxLon - minLon + 0.1;

    return {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLon + maxLon) / 2,
      latitudeDelta,
      longitudeDelta,
    };
  };

  if (!region) {
    return null; // Or a loading indicator
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} showsUserLocation>
        {/* User's Location as a Dot */}
        {userLocation && (
          <Circle
            center={userLocation}
            radius={10} // Adjust size of the dot
            fillColor="blue" // Color of the dot
            strokeColor="transparent" // No border
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
