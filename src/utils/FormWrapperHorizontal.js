import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Wrapper = (props) => {
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: props.theme.body_background},
      ]}>
      <Text style={[styles.label, {color: props.theme.settings_history_title}]}>
        {props.title}
      </Text>
      <View style={styles.containerChildren}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: '100%',
    padding: 5,
  },
  label: {
    fontSize: 20,
    fontFamily: 'Roboto_Bold',
    fontWeight: 'bold',
    width: '35%',
    height: 100 - 10,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  containerChildren: {
    flex: 1,
    width: '50%',
  },
});

export default Wrapper;
