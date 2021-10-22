import React, {Component, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Text,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import SmsAndroid from 'react-native-get-sms-android';
import SendSMS from 'react-native-sms';
import Toast from 'react-native-simple-toast';

class SettingsCheck extends Component {
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

  findDevices() {
    this.device = this.props.devices.filter(
      (device) => device.phoneNumber == this.phoneNumber,
    );
    this.device = this.device[0];
    this.password = this.device.password;
    this.prefix = this.device.prefix;
    this.status = this.device.check_system_status;
  }

  render() {
    this.phoneNumber = this.props.route.params.cellphone;
    this.findDevices();

    return (
      <>
        <View
          style={{
            flex: 1,
            backgroundColor: this.props.theme.body_background,
          }}></View>
        {Alert.alert(this.props.screen.status, this.props.screen.check, [
          {
            text: this.props.screen.cancel,
            onPress: () => {
              console.log('cancel');
              this.props.navigation.goBack();
            },
          },
          {
            text: this.props.screen.ok,
            onPress: () => {
              Platform.OS === 'ios' &&
                this.sendMessageIOS(
                  `${this.prefix}${this.password}${this.status}`,
                  this.phoneNumber,
                );
              Platform.OS === 'android' &&
                this.sendMessageAndroid(
                  `${this.prefix}${this.password}${this.status}`,
                  this.phoneNumber,
                );
              this.props.navigation.goBack();
            },
          },
        ])}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    screen: state.screens.settings_check_system[state.currentLanguage],
    theme: state.themes[state.currentTheme],
    devices: state.devices,
  };
};
export default connect(mapStateToProps)(SettingsCheck);
