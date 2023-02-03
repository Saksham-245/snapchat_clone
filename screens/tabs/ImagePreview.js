import React from 'react';
import {Image, PanResponder, StyleSheet, View} from 'react-native';

function ImagePreview({route}) {
  const photoData = route.params?.photoData;
  const panResponder = PanResponder?.create({
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
        style={styles.imagePreview}
      />
    </View>
  );
}
const styles = StyleSheet?.create({
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  bottomContainer: {
    backgroundColor: 'black',
    height: '10%',
  },
});
export default ImagePreview;
