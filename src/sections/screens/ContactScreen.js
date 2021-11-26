import React, {Component} from 'react';
import {View,TouchableOpacity, Text} from 'react-native';
import ListContact from '../settings/calendar/ListContacts';
import AddContact from '../settings/calendar/AddContact';
import {connect} from 'react-redux'
import {editFb} from '../../../Actions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
class ContactScreen extends Component {
  save = () =>{
    let device = this.props.devices.filter((device) => {
      if (device.phoneNumber == this.props.route.params.cellphone) {
        return device;
      }
    });
    device = device[0];  
    if(!this.props.user.anonymous){
      this.props.editFb({
        id: device.id,
        rute: 'device_default.calendar',
        data: device.calendar,
      });
    }  
  }
  render() {
  //principal
    return (
      <>
        <View style={{flex: 1, paddingHorizontal: 20,backgroundColor:this.props.theme.body_background}}>
          <ListContact
            cellphone={this.props.route.params.cellphone}
            group_id={this.props.route.params.group_id}
            navigation={this.props.navigation}
            position={this.props.route.params.position}
          />
        </View>
        <TouchableOpacity
          onPress={this.save}
            style={{
                borderWidth:1,
                borderColor:'rgba(0,0,0,0.2)',
                alignItems:'center',
                justifyContent:'center',
                width:70,
                position: 'absolute',                                          
                bottom: 50,                                                    
                right: 10,
                height:70,
                backgroundColor: this.props.theme.header_background,
                borderRadius:100,
              }}
          ><FontAwesome5 name={'save'} size={40} style={{color:this.props.theme.device_list_title}}/>
          </TouchableOpacity>
        <AddContact
          group_id={this.props.route.params.group_id}
          cellphone={this.props.route.params.cellphone}
          position={this.props.route.params.position}
        />
      </>
    );
  }
}


const mapStateToProps =(state)=>{
  return{
    theme:state.themes[state.currentTheme],
    user:state.login,
    devices: state.devices,
    calendar: state.screens.settings_calendar[state.currentLanguage],
  }
}
const mapDistpatchToProps = {
  editFb,
};
export default connect(mapStateToProps,mapDistpatchToProps)(ContactScreen);
