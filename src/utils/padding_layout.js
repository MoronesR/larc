//Este component envuelve a todos y cada uno de los compontes que se renderizan enla parte del contenido (no el header)
//Ayuda a que haya bordes simetricos
import React from 'react';
import {View, StyleSheet} from 'react-native';
const PaddingLayout = (props) => {
  return <View style={style.container}>{props.children}</View>;
};
const style = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default PaddingLayout;
