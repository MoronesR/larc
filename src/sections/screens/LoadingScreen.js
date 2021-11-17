import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import Icon from '../../utils/Icon';
import Spinner from 'react-native-spinkit';

const Loading = (props) => {
  return (
    <View
      style={[style.container, {backgroundColor: props.theme.body_background}]}>
        <View style={{ flex:2, justifyContent: 'center'}}>
        <Icon style={style.img} name="logo"/>
        </View>      
      <View style={style.container2}>
      <Spinner type={'ThreeBounce'} size={60} color={props.theme.device_list_title}/>
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
    flex:1,
    alignItems: 'center',
    justifyContent: 'flex-end'
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
  };
};
export default connect(mapStateToProps)(Loading);
