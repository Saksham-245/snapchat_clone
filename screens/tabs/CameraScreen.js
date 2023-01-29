import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const CameraScreen = ({navigation}) => {
  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();
  const [cameraPermission, setCameraPermission] = useState(false);
  const camera = React.useRef(null);
  const [flashMode, setFlashMode] = useState('off');

  const grantCameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();

    if (permission === 'denied') {
      await Linking.openSettings();
    }
    setCameraPermission(permission);
  }, []);

  useEffect(() => {
    if (isFocused) {
      grantCameraPermission();
    }
  }, [isFocused, grantCameraPermission]);

  const takeCameraPhoto = useCallback(async () => {
    if (camera.current) {
      const photo = await camera.current.takePhoto({
        flash: flashMode,
        quality: 100,
        orientation: 'portrait',
      });
      navigation.navigate('Preview', {photoData: photo});
    }
  }, [navigation, flashMode]);

  return (
    <View style={styles.cameraContainer}>
      {cameraPermission === 'authorized' && device && isFocused ? (
        <>
          <Camera
            device={device}
            style={StyleSheet.absoluteFill}
            isActive={true}
          />
          <View>
            <TouchableOpacity
              onPress={() => {
                setFlashMode(flashMode === 'off' ? 'on' : 'off');
              }}>
              <MaterialCommunityIcons
                name={flashMode === 'off' ? 'flash-off' : 'flash'}
                size={30}
                color={flashMode === 'off' ? 'white' : 'yellow'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              onPress={takeCameraPhoto}
              style={styles.cameraBtn}
            />
          </View>
        </>
      ) : (
        <View>
          <Text style={styles.cameraPermissionText}>
            {cameraPermission === 'denied'
              ? 'Camera permission denied. Please enable it in your settings.'
              : 'Please grant camera permission.'}
          </Text>
          <Button title="Grant permission" onPress={grantCameraPermission} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
  cameraPermissionText: {
    textAlign: 'center',
    marginBottom: 10,
    color: 'black',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  cameraBtn: {
    backgroundColor: 'transparent',
    borderRadius: 50,
    width: 60,
    borderColor: 'white',
    height: 60,
    borderWidth: 5,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 10,
  },
});
