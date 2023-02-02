import React, { useCallback, useEffect, useState } from "react";
import { Button, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { useIsFocused } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export const CameraScreen = ({navigation}) => {
  const devices = useCameraDevices();
  const [device, setDevice] = useState(null);
  const isFocused = useIsFocused();
  const [cameraPermission, setCameraPermission] = useState(false);
  const camera = React.useRef(null);
  const [flashMode, setFlashMode] = useState('off');

  useEffect(() => {
    setDevice(devices.back);
  }, [devices.back]);

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
      const photo = await camera.current?.takePhoto({
        flash: flashMode,
        quality: 100,
      });
      navigation.navigate('Preview', {photoData: photo});
    }
  }, [flashMode, navigation]);

  const flipCamera = useCallback(async () => {
    if (device?.position === 'back') {
      setDevice(devices.front);
    } else {
      setDevice(devices.back);
    }
  }, [device?.position, devices?.back, devices?.front]);

  return (
    <View style={styles.cameraContainer}>
      {cameraPermission === 'authorized' && device && isFocused && (
        <>
          <Camera
            ref={camera}
            device={device}
            style={StyleSheet.absoluteFill}
            isActive={isFocused}
            photo={true}
          />
          <View style={styles.topButtons}>
            <TouchableOpacity>
              <MaterialIcons name="face" color={'white'} size={32} />
            </TouchableOpacity>
            <View style={styles.topRightButtons}>
              <TouchableOpacity style={{marginBottom: 10}} onPress={flipCamera}>
                <MaterialIcons
                  name={
                    device.position === 'front' ? 'camera-rear' : 'camera-front'
                  }
                  size={32}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setFlashMode(
                    device.position === 'back' && flashMode === 'off'
                      ? 'on'
                      : 'off',
                  );
                }}>
                <MaterialIcons
                  name={
                    device.position === 'back' && flashMode === 'off'
                      ? 'flash-on'
                      : 'flash-off'
                  }
                  size={32}
                  color={'white'}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              onPress={takeCameraPhoto}
              style={styles.cameraBtn}
            />
          </View>
        </>
      )}
      {cameraPermission === 'denied' && (
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
  topButtons: {
    display: 'flex',
    position: 'absolute',
    top: 40,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  topRightButtons: {
    display: 'flex',
  },
});
