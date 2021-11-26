import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Icon from '../../../utils/Icon';
import {connect} from 'react-redux';
import {
  deleteContact,
  suspendContact,
  activateContact,
} from '../../../../Actions';
import SmsAndroid from 'react-native-get-sms-android';
import SendSMS from 'react-native-sms';
import Toast from 'react-native-simple-toast';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
class ListItem extends Component {
  constructor() {
    super();
    this.width = 20;
    this.height = 24;
    this.handleDeleteContact = this.handleDeleteContact.bind(this);
    this.handleSuspendContact = this.handleSuspendContact.bind(this);
    this.handleActivateContact = this.handleActivateContact.bind(this);
  }
  sendMessageIOS(msg, phone) {
    SendSMS.send(
      {
        body: msg,
        recipients: [phone],
        successTypes: ['sent', 'queued'],
        allowAndroidSendWithoutReadPermission: true,
      },
      (completed, cancelled, error) => {
        console.log(
          'SMS Callback: completed: ' +
            completed +
            ' cancelled: ' +
            cancelled +
            'error: ' +
            error,
        );
      },
    );
  }
  sendMessageAndroid(msg, phone) {
    SmsAndroid.autoSend(
      phone,
      msg,
      (fail) => {
        Toast.show(this.props.screen.toasts.sms_fail);
      },
      (success) => {
        Toast.show(this.props.screen.toasts.sms);
      },
    );
  }
  handleDeleteContact() {
    Alert.alert(
      this.props.screen.alerts.confirmation,
      `${this.props.screen.alerts.delete_contact} ${this.props.item.number}?`,
      [
        {
          text: this.props.screen.alerts.cancel,
          onPress: () => {
            console.log('cancel');
          },
        },
        {
          text: this.props.screen.alerts.ok,
          onPress: () => {
            this.props.deleteContact({
              phoneNumber: this.props.phoneNumber,
              id: this.props.group_id,
              number: this.props.item.number,
            });
            Platform.OS === 'ios' &&
              this.sendMessageIOS(
                `${this.prefix}${this.password}${this.deletePrefix}${this.props.item.number}=00`,
                this.props.phoneNumber,
              );
            Platform.OS === 'android' &&
              this.sendMessageAndroid(
                `${this.prefix}${this.password}${this.deletePrefix}${this.props.item.number}=00`,
                this.props.phoneNumber,
              );
          },
        },
      ],
    );
  }
  handleSuspendContact() {
    Alert.alert(
      this.props.screen.alerts.confirmation,
      `${this.props.screen.alerts.suspend_contact} ${this.props.item.number}?`,
      [
        {
          text: this.props.screen.alerts.cancel,
          onPress: () => {
            console.log('cancel');
          },
        },
        {
          text: this.props.screen.alerts.ok,
          onPress: () => {
            this.props.suspendContact({
              phoneNumber: this.props.phoneNumber,
              id: this.props.group_id,
              isSuspended: true,
              number: this.props.item.number,
            });
            Platform.OS === 'ios' &&
              this.sendMessageIOS(
                `${this.prefix}${this.password}${this.deletePrefix}${this.props.item.number}=00`,
                this.props.phoneNumber,
              );
            Platform.OS === 'android' &&
              this.sendMessageAndroid(
                `${this.prefix}${this.password}${this.deletePrefix}${this.props.item.number}=00`,
                this.props.phoneNumber,
              );
          },
        },
      ],
    );
  }
  handleActivateContact() {
    Alert.alert(
      this.props.screen.alerts.confirmation,
      `${this.props.screen.alerts.activate_contact} ${this.props.item.number}?`,
      [
        {
          text: this.props.screen.alerts.cancel,
          onPress: () => {
            console.log('cancel');
          },
        },
        {
          text: this.props.screen.alerts.ok,
          onPress: () => {
            this.props.activateContact({
              phoneNumber: this.props.phoneNumber,
              id: this.props.group_id,
              isSuspended: false,
              number: this.props.item.number,
            });
            Platform.OS === 'ios' &&
              this.sendMessageIOS(
                `${this.prefix}${this.password}${this.deletePrefix}${this.props.item.number}=${this.props.item.phoneNumber}`,
                this.props.phoneNumber,
              );
            Platform.OS === 'android' &&
              this.sendMessageAndroid(
                `${this.prefix}${this.password}${this.deletePrefix}${this.props.item.number}=${this.props.item.phoneNumber}`,
                this.props.phoneNumber,
              );
          },
        },
      ],
    );
  }
  findDevice() {
    this.device = this.props.devices.filter((device) => {
      if (device.phoneNumber == this.props.phoneNumber) {
        return device;
      }
    });

    this.device = this.device[0];

    this.password = this.device.password;
    this.prefix = this.device.prefix;
    this.deletePrefix = this.device.calendar.calendar_prefix;
  }
  render() {
    this.findDevice();

    return (
      <View
        style={[
          this.props.item.isSuspended == false
            ? [style.container]
            : [
                style.container,
                {backgroundColor: this.props.theme.body_background_isSuspended},
              ],
          {
            borderColor: this.props.theme.settings_border,
          },
        ]}>
        <View
          style={
            this.props.item.isSuspended == false
              ? [
                  style.picture_name_container,
                  {backgroundColor: this.props.theme.body_background},
                ]
              : [
                  style.picture_name_container,
                  {
                    backgroundColor: this.props.theme
                      .body_background_isSuspended,
                  },
                ]
          }>
          <Icon width="37" height="38" name="profile" />
          <View style={style.name_phone_container}>
            <Text
              style={[
                style.name_device,
                {color: this.props.theme.settings_calendar_title},
              ]}>
              {this.props.item.name}
            </Text>
            <View style={style.cellphone_serial_container}>
              <Text
                style={[
                  style.serial_device,
                  {color: this.props.theme.settings_calendar_title},
                ]}>
                #{this.props.item.number}
              </Text>
              <Text
                style={[
                  style.phone_device,
                  {color: this.props.theme.settings_calendar_subtitle},
                ]}>
                {this.props.item.phoneNumber}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            this.props.item.isSuspended == false
              ? [{backgroundColor: this.props.theme.body_background}]
              : [
                  {
                    backgroundColor: this.props.theme
                      .body_background_isSuspended,
                  },
                ],
            style.icons_container,
          ]}>
          <TouchableOpacity
            style={style.icon}
            onPress={this.handleActivateContact}>
            <FontAwesome5 name={'check'} size={20} style={{color:this.props.theme.device_list_title}}/>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.icon}
            onPress={this.handleSuspendContact}>
            <FontAwesome5 name={'ban'} size={20} style={{color:this.props.theme.device_list_title}}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleDeleteContact}
            style={style.icon}>
            <FontAwesome5 name={'trash-alt'} size={20} style={{color:this.props.theme.device_list_title}}/>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.icon}
            onPress={() => {
              this.props.navigation.navigate('EditContact', {
                cellPhone: this.props.phoneNumber,
                phoneNumber: this.props.item.phoneNumber,
                name: this.props.item.name,
                number: this.props.item.number,
                id: this.props.group_id,
              });
            }}>
            <FontAwesome5 name={'edit'} size={20} style={{color:this.props.theme.device_list_title}}/>
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
    height: 65,
    borderWidth: 1,
    
    
  },
  picture_name_container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '62%',
    padding: 10,
  },
  cellphone_serial_container: {
    flexDirection: 'row',
    marginTop: 5,
  },
  name_phone_container: {
    padding: 10,
  },
  name_device: {
    fontSize: 18,
    fontFamily: 'Roboto_Bold',
    fontWeight: 'bold',
  },
  serial_device: {
    fontSize: 14,
    fontFamily: 'Roboto_Regular',
    fontWeight: 'bold',
    marginRight: 20,
  },
  phone_device: {
    fontSize: 14,
    fontFamily: 'Roboto_Regular',
  },
  icons_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '38%',
  },
  icon: {
    paddingHorizontal: 7,
  },
});
const mapStateToProps = (state) => {
  return {
    devices: state.devices,
    screen: state.screens.settings_calendar[state.currentLanguage],
  };
};
const mapDistpatchToProps = {
  deleteContact,
  suspendContact,
  activateContact,
};
export default connect(mapStateToProps, mapDistpatchToProps)(ListItem);
