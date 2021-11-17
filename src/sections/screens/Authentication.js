import React from 'react';
import { StyleSheet, Text, View,Button,TouchableOpacity } from 'react-native';
import { GoogleSigninButton } from '@react-native-community/google-signin';
import Icon from '../../utils/Icon';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';

const Authentication = (props) => {
  return (
    <View style={[styles.container, {backgroundColor: props.theme.header_background}]}>
      <View style={[styles.header, {backgroundColor: props.theme.body_background}]}>
        <Icon style={styles.icon} name="logo" width='180' height='180'/>
      </View>
      <View style={[styles.footer, {backgroundColor: props.theme.header_background}]}>
        <Text style={{fontSize: 30, fontWeight: 'bold', color: props.theme.header_title}}>Log In</Text>
        {/* <GoogleSigninButton style={[styles.button]} onPress={} /> */}
        <TouchableOpacity
              style={styles.button}
              onPress={props.onGoogleButtonPress}
            >
            <Icon  style={{ marginLeft:10, marginRight:20}} name="google_icon" width='30' height='30'/>
            <Text style={styles.button_text}>Log In With Google</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 20,fontWeight: 'bold', color: props.theme.header_title}}>Or</Text>
        <TouchableOpacity
              style={[styles.button, {
                backgroundColor: props.theme.settings_button_group_background_selected,
                shadowColor: props.theme.settings_button_group_border
              }]}
              onPress={() => props.onAnonymousPress()}
            >
            <FontAwesome5 name={'user-secret'}  style={[styles.button_icon,{color:props.theme.device_list_title}]}/>
            <Text style={[styles.button_text,{color:props.theme.device_list_title}]}>Log In anonymous</Text>
        </TouchableOpacity>
      </View>
     </View>
    
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  header:{
    flex:2,
    justifyContent:'center',
    alignItems:'center',
    borderBottomRightRadius: 90
  },
  footer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:25,
  },
  button:{
    borderRadius:50,
    backgroundColor:'#F6F4E6',
    margin: 15,
    padding:10,
    flexDirection:'row',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.50,
    shadowRadius: 1,

    elevation: 7,
  },
  button_icon:{
    fontSize:30,
    marginLeft:10,
    marginRight:20,
    color: '#333'
  },
  button_text:{
    marginTop:2.5,
    fontFamily: 'Open Sans',
    fontSize:20,
    marginRight: 20,
    color: '#000000'
  }
});

const mapStateToProps = (state) => {
  return {
    //design    
    theme: state.themes[state.currentTheme],
    device_screen: state.screens.device[state.currentLanguage],
    general_screen: state.screens.general[state.currentLanguage],
  };
};

export default connect(mapStateToProps)(Authentication)