import React from 'react';
<<<<<<< HEAD
import {Image, PanResponder, StyleSheet, View} from 'react-native';
=======
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
>>>>>>> origin/master

function ImagePreview({route}) {
  const photoData = route.params.photoData;

<<<<<<< HEAD
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 50;
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dx > 0) {
        console.log('right');
      } else {
        console.log('left');
      }
    },
  });
  return (
    <View {...panResponder.panHandlers}>
      <Image
        source={{uri: `file://${photoData?.path}`}}
        style={[styles.imagePreview]}
=======
  console.log(photoData?.path);
  return (
    <View>
      <FastImage
        source={{uri: photoData.path}}
        style={StyleSheet.absoluteFill}
>>>>>>> origin/master
      />
    </View>
  );
}

<<<<<<< HEAD
const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  bottomContainer: {
    backgroundColor: 'black',
    height: '10%',
  },
});

=======
>>>>>>> origin/master
export default ImagePreview;
