import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import Icon from '../../utils/Icon';

const Loading = (props) => {
  useEffect(() => {
    // Run! Like go get some data from an API.
    setTimeout(() => {
      const {navigation} = props;
      navigation.navigate('DevicesScreen');
    }, 1500);
  });
  return (
    <View
      style={[style.container, {backgroundColor: props.theme.body_background}]}>
      <Icon style={style.img} name="logo" />
      <View style={style.container2}>
        <ActivityIndicator color={props.theme.header_title} size="large" />
        <Text style={[style.title, {color: props.theme.header_title}]}>
          {props.title}
        </Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 50,
  },
  container2: {
    width: '100%',
    paddingTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 20,
    fontSize: 23,
    fontFamily: 'Roboto_Regular',
  },
});
const mapStateToProps = (state) => {
  return {
    theme: state.themes[state.currentTheme],
    title: state.loading[state.currentLanguage],
  };
};
export default connect(mapStateToProps)(Loading);
