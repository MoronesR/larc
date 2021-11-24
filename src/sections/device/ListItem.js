import React, {useState, Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import {deleteDeviceFb,deleteDevice} from '../../../Actions';
import Icon from '../../utils/Icon';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class ListItem extends Component {
  constructor() {
    super();
    this.width = 20;
    this.height = 24;
    this.handleDeleteDevice = this.handleDeleteDevice.bind(this);
  }

  handleDeleteDevice = () => {
    Alert.alert(
      this.props.screen.alerts.delete,
      this.props.screen.alerts.deleteAsk,
      [
        {
          text: this.props.screen.alerts.add_cancel_label,
          onPress: () => {
            Toast.show(this.props.screen.toasts.delete_cancel);
          },
        },
        {
          text: this.props.screen.alerts.add_confirm_label,
          onPress: () => {
            //here delete verifique if is anonimous
            
            if(!this.props.user.anonymous){
              this.props.deleteDeviceFb({
                id: this.props.item.id,
                phoneNumber: this.props.item.phoneNumber,
              });
            }else{
              this.props.deleteDevice({
                phoneNumber: this.props.item.phoneNumber,
              });
            }
            Toast.show(this.props.screen.toasts.delete);
          },
        },
      ],
    );
  };

  render() {
    return (
      <View
        style={[
          style.container,
          {borderColor: this.props.theme.device_list_border},
        ]}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('DeviceControl', {
              phone: this.props.item.phoneNumber,
            })
          }
          style={[
            style.picture_name_container,
            {backgroundColor: this.props.theme.body_background},
          ]}>
          <Icon width="37" height="38" name="profile" />
          <View style={style.name_phone_container}>
            <Text
              style={[
                style.name_device,
                {color: this.props.theme.device_list_title},
              ]}>
              {this.props.item.name}
            </Text>
            <Text
              style={[
                style.phone_device,
                {color: this.props.theme.device_list_subtitle},
              ]}>
              {this.props.item.phoneNumber}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={style.icons_container}>
          <TouchableOpacity
            onPress={this.handleDeleteDevice}
            style={style.icon}>
             <FontAwesome5 name={'trash-alt'} size={25} style={{color:this.props.theme.device_list_title}}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('EditDevice', {
                id: this.props.item.id,
                phoneNumber: this.props.item.phoneNumber,
                name: this.props.item.name,
              })
            }
            style={style.icon}>
              <FontAwesome5 name={'edit'} size={25} style={{color:this.props.theme.device_list_title}} />
              {/**/}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 50,
    borderWidth: 1,
    borderRadius: 2,
  },
  picture_name_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F4E6',
    width: '75%',
    padding: 10,
  },
  name_phone_container: {
    padding: 10,
  },
  name_device: {
    fontSize: 18,
    fontFamily: 'Roboto_Bold',
    fontWeight: 'bold',
  },
  phone_device: {
    fontSize: 14,
    fontFamily: 'Roboto_Regular',
  },
  icons_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
  },
  icon: {
    paddingRight:20,
  },
});

const mapDispatchToProps = {
  deleteDeviceFb,
  deleteDevice
};
const mapStateToProps = (state) => {
  return {
    //design    
    theme: state.themes[state.currentTheme],
    user:state.login,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
