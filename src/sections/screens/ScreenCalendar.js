import React from 'react';
import {View, StyleSheet, SafeAreaView,TouchableOpacity, Text} from 'react-native';
import Search from '../settings/calendar/SearchContact';
import AddGroup from '../settings/calendar/AddGroup';
import {connect} from 'react-redux';
import ListGroups from '../settings/calendar/ListGroup';
import {editFb} from '../../../Actions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const ScreenCalendar = (props) => {
  const save = () =>{
    let device = props.devices.filter((device) => {
      if (device.phoneNumber == props.route.params.cellphone) {
        return device;
      }
    });
    device = device[0];  
    if(!props.user.anonymous){
      props.editFb({
        id: device.id,
        rute: 'device_default.calendar',
        data: device.calendar,
      });
    }  
  }

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={[
            style.container,
            {backgroundColor: props.theme.body_background},
          ]}>
          <Search cellphone={props.route.params.cellphone} />
          <ListGroups
            cellPhone={props.route.params.cellphone}
            navigation={props.navigation}
          />
          <TouchableOpacity
          onPress={save}
            style={{
                borderWidth:1,
                borderColor:'rgba(0,0,0,0.2)',
                alignItems:'center',
                justifyContent:'center',
                width:70,
                position: 'absolute',                                          
                bottom: 10,                                                    
                right: 10,
                height:70,
                backgroundColor:props.theme.header_background,
                borderRadius:100,
              }}
          >
            <FontAwesome5 name={'save'} size={40} style={{color:props.theme.device_list_title}}/>
            </TouchableOpacity>
        </View>
        <AddGroup phoneNumber={props.route.params.cellphone} />
      </SafeAreaView>
    </>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
const mapStateToProps = (state) => {
  return {
    theme: state.themes[state.currentTheme],
    user:state.login,
    devices: state.devices,
    calendar: state.screens.settings_calendar[state.currentLanguage],
  };
};
const mapDistpatchToProps = {
  editFb,
};
export default connect(mapStateToProps,mapDistpatchToProps)(ScreenCalendar);
