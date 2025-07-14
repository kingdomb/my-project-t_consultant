import React, {
  useEffect,
  useState,
  useContext,
  useReducer,
  useRef,
} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator,
  TextInput,
  View,
  Alert,
} from 'react-native';
import MapView, {Marker, Camera} from 'react-native-maps';
import locationHelper from '../helper/locationHelper';

function Maps (): React.JSX.Element {
  const mapRef = useRef ();
  const [location, setLocation] = useState (null);
  useEffect (() => {
    locationHelper.trackLocation (loc => {
      console.log (loc);
      setLocation (loc);
    });
  }, []);
  useEffect (
    () => {
      if (mapRef.current && location) {
        const newCamera: Camera = {
          center: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          zoom: 15,
          heading: 0,
          pitch: 0, 
          altitude: 5,
        };

        mapRef.current.animateCamera (newCamera, {duration: 500});
      }
    },
    [location]
  );
  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        style={{flex: 1}}
        showsMyLocationButton={true}
        showsUserLocation={true}
      >
        {location
          ? <Marker
              title="My Location"
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
            />
          : null}

      </MapView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    borderWidth: 1,
    margin: 10,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Maps;
