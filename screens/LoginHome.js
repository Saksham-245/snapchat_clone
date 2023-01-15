import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SnapchatLogo} from '../icons/snapchat_logo';
import {Button} from 'react-native-paper';

export const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <SnapchatLogo width={200} height={200} />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonContainer2}>
          <Button
            mode="contained"
            buttonColor="#fff"
            textColor="#000"
            onPress={() => console.log('Pressed')}
            style={styles.buttonOne}>
            <Text style={styles.buttonText}>Log In</Text>
          </Button>
          <Button
            mode="contained"
            buttonColor="#2196F3"
            textColor="#fff"
            onPress={() => console.log('Pressed')}
            style={styles.buttonTwo}>
            <Text style={styles.buttonText2}>Sign Up</Text>
          </Button>
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
    borderRadius: 50,
    borderWidth: 2,
    paddingHorizontal: 20,
  },
  buttonTwo: {
    borderRadius: 25,
    borderWidth: 2,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    opacity: 1,
  },
});
