import React from 'react';
import {View, StyleSheet} from 'react-native';

const HorizontalSeparator = (props) => {
  return <View style={[styles.separator, props.style]}></View>;
};

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    marginVertical: 15,
  },
});
export default HorizontalSeparator;
