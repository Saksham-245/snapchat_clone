import * as React from 'react';
import {Button, Linking, StyleSheet, Text, View} from 'react-native';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/native';
import {useCallback, useEffect} from 'react';
export const CameraScreen = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();
  const [cameraPermission, setCameraPermission] = React.useState(false);

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

  return (
    <View style={styles.cameraContainer}>
      {cameraPermission === 'authorized' && device && isFocused ? (
        <>
          <Camera
            device={device}
            style={StyleSheet.absoluteFill}
            isActive={true}
          />
          <View style={styles.buttons}>
            <Button title="Take photo" />
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
  buttons: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
});
