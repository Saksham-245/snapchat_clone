import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

function ImagePreview({route}) {
  const photoData = route.params.photoData;

  console.log(photoData?.path);
  return (
    <View>
      <FastImage
        source={{uri: photoData.path}}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

export default ImagePreview;
