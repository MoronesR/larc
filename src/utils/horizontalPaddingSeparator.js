import React from 'react';
import {View, StyleSheet} from 'react-native';

const VerticalSeparator = (props) => {
  return <View style={[styles.separator]}></View>;
};

const styles = StyleSheet.create({
  separator: {
    padding: 7,
  },
});
export default VerticalSeparator;
