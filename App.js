import React from "react";
import { StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NewsList from "./NewsList";
import Search from "./Search";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.nav}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        >
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="NewsList" component={NewsList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screenHead: {
    backgroundColor: "green"
  }
});
