import React, { useState, useEffect } from "react";
import { GOOGLE_API } from "@env";
import { Text, StyleSheet } from "react-native";
import * as Location from "expo-location";

const LocationView = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      Location.setGoogleApiKey(GOOGLE_API);

      let location = await Location.getCurrentPositionAsync({});

      let x = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setLocation(`${x[0].city}, ${x[0].region} ${x[0].postalCode}`);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = location;
  }

  return (
    <Text style={styles.paragraph}>{text}</Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 2,
  },
  paragraph: {
    fontSize: 14,
    fontFamily: "open-sans-bold",
  },
});

export default LocationView;
