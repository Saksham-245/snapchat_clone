import React, {useRef, useState} from 'react';
import {
  Button,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/native';
import {useCallback, useEffect} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const CameraScreen = ({navigation}) => {
  const devices = useCameraDevices();
  let device = devices.back;
  const isFocused = useIsFocused();
  const [cameraPermission, setCameraPermission] = useState(false);
  const [flashMode, setFlashMode] = React.useState('off');

  const camera = React.useRef(null);

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

  const flipCamera = () => {
    if (device === devices.back) {
    } else {
      console.log('back');
    }
  };

  if (cameraPermission === 'denied' || cameraPermission === 'undetermined') {
    return (
      <View>
        <StatusBar barStyle="transparent" />
        <Text style={styles.cameraPermissionText}>
          {cameraPermission === 'denied'
            ? 'Camera permission denied. Please enable it in your settings.'
            : 'Please grant camera permission.'}
        </Text>
        <Button title="Grant permission" onPress={grantCameraPermission} />
      </View>
    );
  }

  return (
    <View style={styles.cameraContainer}>
      {cameraPermission === 'authorized' && device && isFocused && (
        <>
          <Camera
            device={device}
            style={StyleSheet.absoluteFill}
            isActive={isFocused}
            ref={camera}
            photo
          />
          <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={flipCamera} style={styles.cameraBtn} />
          </View>
        </>
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
  topButtons: {
    position: 'absolute',
    top: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topButtonList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
  },
  rightButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    height: '100%',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 10,
  },
});
