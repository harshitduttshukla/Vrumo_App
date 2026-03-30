import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';

interface LocationPickerProps {
  onLocationSelect: (location: { latitude: number; longitude: number; address?: string }) => void;
  initialLocation?: { latitude: number; longitude: number };
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect, initialLocation }) => {
  const [region, setRegion] = useState({
    latitude: initialLocation?.latitude || 26.8467, // Default to Lucknow
    longitude: initialLocation?.longitude || 80.9462,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [markerPosition, setMarkerPosition] = useState({
    latitude: initialLocation?.latitude || 26.8467,
    longitude: initialLocation?.longitude || 80.9462,
  });

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      if (!initialLocation) {
        try {
          let location = await Location.getCurrentPositionAsync({});
          const newPos = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          setRegion({
            ...newPos,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          setMarkerPosition(newPos);
          onLocationSelect(newPos);
        } catch (err) {
          setErrorMsg('Could not fetch current location');
        }
      }
      setLoading(false);
    })();
  }, []);

  const handleMapPress = (e: any) => {
    const newPos = e?.nativeEvent?.coordinate;
    if (newPos) {
      setMarkerPosition(newPos);
      onLocationSelect(newPos);
    }
  };

  const handleMarkerDragEnd = (e: any) => {
    const newPos = e?.nativeEvent?.coordinate;
    if (newPos) {
      setMarkerPosition(newPos);
      onLocationSelect(newPos);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Fetching Location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onPress={handleMapPress}
        showsUserLocation={true}
        loadingEnabled={true}
      >
        {/* Using OpenStreetMap tiles via UrlTile */}
        <UrlTile
          urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />
        <Marker
          coordinate={markerPosition}
          draggable
          onDragEnd={handleMarkerDragEnd}
          title="Service Location"
          description="Drag to adjust exactly"
          pinColor="#2563EB"
        />
      </MapView>
      <View style={styles.hintContainer}>
        <Text style={styles.hintText}>Tap or drag marker to set precise location</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  map: {
    flex: 1,
  },
  center: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    marginBottom: 16,
  },
  loadingText: {
    marginTop: 12,
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },
  hintContainer: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  hintText: {
    fontSize: 11,
    color: '#1E293B',
    fontWeight: 'bold',
  },
});

export default LocationPicker;
