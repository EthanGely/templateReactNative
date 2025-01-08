import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Battery from "expo-battery";

// Create context for the click count
const ClickCountContext = createContext();

// Custom hook to use the app context
export const useAppContext = () => {
  return useContext(ClickCountContext);
};

// Provider component
export const ClickCountProvider = ({ children }) => {
  const [catClicks, setCatClicks] = useState(0);
  const [dogClicks, setDogClicks] = useState(0);
  const [bgColor, setBgColor] = useState('');

  const [batteryPercentage, setBatteryPercentage] = useState<number | null>(null);

  useEffect(() => {
      // Fetch battery level on mount
      const fetchBatteryLevel = async () => {
        const batteryLevel = await Battery.getBatteryLevelAsync();
        setBatteryPercentage(batteryLevel * 100); // Battery level is returned as a fraction (0.0 - 1.0)
        setBgColor(batteryLevel !== null && batteryLevel * 100 > 50 ? "lightblue" : "salmon")
      };
  
      fetchBatteryLevel();
  
      // Set up battery level listener for updates
      const subscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
        setBatteryPercentage(batteryLevel * 100);
        setBgColor(batteryLevel !== null && batteryLevel * 100 > 50 ? "lightblue" : "salmon")
      });
  
      return () => {
        subscription.remove(); // Clean up listener
      };
    }, []);

  // Load saved click counts from AsyncStorage when the app starts
  useEffect(() => {
    const loadClickCounts = async () => {
      try {
        const savedCatClicks = await AsyncStorage.getItem('catClicks');
        const savedDogClicks = await AsyncStorage.getItem('dogClicks');
        
        if (savedCatClicks !== null) setCatClicks(parseInt(savedCatClicks, 10));
        if (savedDogClicks !== null) setDogClicks(parseInt(savedDogClicks, 10));
      } catch (error) {
        console.error('Failed to load click counts from AsyncStorage', error);
      }
    };

    loadClickCounts();
  }, []);

  // Save click counts to AsyncStorage whenever they change
  useEffect(() => {
    const saveClickCounts = async () => {
      try {
        await AsyncStorage.setItem('catClicks', catClicks.toString());
        await AsyncStorage.setItem('dogClicks', dogClicks.toString());
      } catch (error) {
        console.error('Failed to save click counts to AsyncStorage', error);
      }
    };

    saveClickCounts();
  }, [catClicks, dogClicks]);

  const incrementCatClicks = () => setCatClicks((prev) => prev + 1);
  const incrementDogClicks = () => setDogClicks((prev) => prev + 1);
  const resetClicks = () => {
    setCatClicks(0);
    setDogClicks(0);
  };

  return (
    <ClickCountContext.Provider value={{ catClicks, dogClicks, incrementCatClicks, incrementDogClicks, resetClicks, bgColor }}>
      {children}
    </ClickCountContext.Provider>
  );
};

export default ClickCountProvider;
