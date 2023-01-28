import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SnapchatLogo} from '../icons/snapchat_logo';
import {useCallback} from 'react';

export const Intro = ({navigation}) => {
  const handleLogin = useCallback(() => {
    navigation.replace('Tabs');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <SnapchatLogo width={200} height={200} />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonContainer2}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={handleLogin}
            style={styles.buttonOne}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => console.log('Pressed')}
            style={styles.buttonTwo}>
            <Text style={styles.buttonText2}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFC00',
    justifyContent: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
    left: 50,
    right: 50,
  },
  buttonContainer2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '120%',
    gap: 10,
    justifyContent: 'space-evenly',
  },
  buttonOne: {
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: '#fff',
    opacity: 1,
  },
  buttonTwo: {
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 12,
    backgroundColor: '#2196F3',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    color: '#000',
  },
  buttonText2: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    color: '#fff',
  },
});
