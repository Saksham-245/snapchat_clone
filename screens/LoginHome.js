import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SnapchatLogo} from '../icons/snapchat_logo';
import {Button} from 'react-native-paper';
import {useCallback} from 'react';

export const Home = ({navigation}) => {
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
          <Button
            mode="contained"
            buttonColor="#fff"
            textColor="#000"
            onPress={handleLogin}
            style={styles.buttonOne}>
            <Text style={styles.buttonText}>Log In</Text>
          </Button>
          <Button
            mode="contained"
            buttonColor="#2196F3"
            textColor="#fff"
            style={styles.buttonTwo}>
            <Text>Sign Up</Text>
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
