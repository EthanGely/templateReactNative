import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Cat from "./index";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => <FontAwesome5 name="cat" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="dog"
        options={{
          title: "Chien",
          tabBarIcon: ({ color }) => <FontAwesome5 name="dog" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Carte",
          tabBarIcon: ({ color }) => <FontAwesome5 name="map-marked" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="click"
        options={{
          title: "Compteur",
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="decimal-increase" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="quit"
        options={{
          title: "Quitter",
          tabBarIcon: ({ color }) => <FontAwesome6 name="circle-stop" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
