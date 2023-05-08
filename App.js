import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import React, {useEffect, useState } from 'react';

export default function App() {
    const [location, setLocation] = useState();
    const [currentLatitude, setCurrentLatitude] = useState();
    const [currentLongitude, setCurrentLongitude] = useState();
    const [currentAltitude, setCurrentAltitude] = useState();
    const [boilingTime, setBoilingTime] = useState();
    const [isMocked, setIsMocked] = useState();
    let Twater = 100.00 - 0.0033 * currentAltitude;
    
    React.useEffect(() => {
      (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log(location);
        
        const currentLatitude = JSON.stringify(location.coords.latitude);
        setCurrentLatitude(currentLatitude);
        const currentLongitude = JSON.stringify(location.coords.longitude);
        setCurrentLongitude(currentLongitude);
        const currentAltitude = JSON.stringify(location.coords.altitude);
        setCurrentAltitude(currentAltitude);
      })();
    }, []);

    //function
    function boilEggTimer( m, Tstart, Tfinal) { 
      // determine mass fraction of yolk and albumen
      let L = (0.517 + 0.45 * 2)/3;
      // Calculate the time required for the egg to reach the desired result
      const t = (Math.log((0.76 * (Tstart - Twater )) / (Tfinal -  Twater )) * (m ** (2 / 3))) * L;
      const boilingTime = t - t * 0.1;
      if (!isMocked) {
        setBoilingTime(boilingTime);
      } else {
        setBoilingTime("Cheater detected");
      }
      return console.log(t - t * 0.1);
    }
  
  return (
    <View style={styles.container}>
      <Text >Temperature of the water at {currentAltitude} meter is {Twater} degrees.</Text>
      <Text>Latitude: {currentLatitude}, Longitude: {currentLongitude}</Text>
      <Text backgroundColor="pink">Altitude: {currentAltitude}</Text>
      <StatusBar style="auto" />
      <Button title="Timer" onPress={() => boilEggTimer(50, 20, 67)}/>
      
      <Text>Boiling Time: {boilingTime}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
