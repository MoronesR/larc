// Este componente contiene la seleccion del canal output y el control de abrir, cerrar, por tiempo y por llamada.
//los controles anteriormente explicados solo controlaran el dispositivo seleccionado con su canal seleccionado.
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import {ButtonGroup} from 'react-native-elements';
import {connect} from 'react-redux';
import {setCurrentChannel} from '../../../Actions';
import Icon from '../../utils/Icon';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import SmsAndroid from 'react-native-get-sms-android';
import SendSMS from 'react-native-sms';
import Toast from 'react-native-simple-toast';

class Controll extends Component {
  constructor() {
    super();
    this.updateIndex = this.updateIndex.bind(this);
    this.makeCall = this.makeCall.bind(this);
    this.unlockDevice = this.unlockDevice.bind(this);
    this.lockDevice = this.lockDevice.bind(this);
    this.jogDevice = this.jogDevice.bind(this);
    this.state = {
      selectedIndex: null,
    };
  }

  updateIndex(selectedIndex) {
    this.props.setCurrentChannel({
      currentChannel: selectedIndex + 1,
      phoneNumber: this.phoneNumber,
    });
  }

  makeCall() {
    Alert.alert(
      this.props.screen.alert.confirmation,
      `${this.props.screen.alert.call} ${this.phoneNumber}?`,
      [
        {
          text: this.props.screen.alert.cancel,
          onPress: () => {
            Toast.show(this.props.screen.toasts.call_cancel);
          },
        },
        {
          text: this.props.screen.alert.ok,
          onPress: () => {
            RNImmediatePhoneCall.immediatePhoneCall(this.phoneNumber);
          },
        },
      ],
      {cancelable: true},
    );
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
  lockDevice() {
    Alert.alert(
      this.props.screen.alert.confirmation,
      this.props.screen.alert.close,
      [
        {
          text: this.props.screen.alert.cancel,
          onPress: () => {
            console.log('Canceled');
          },
        },
        {
          text: this.props.screen.alert.ok,
          onPress: () => {
            Platform.OS === 'ios' &&
              this.sendMessageIOS(
                `${this.prefix}${this.password}#OUT${this.currentChannel}=OFF`,
                this.phoneNumber,
              );
            Platform.OS === 'android' &&
              this.sendMessageAndroid(
                `${this.prefix}${this.password}#OUT${this.currentChannel}=OFF`,
                this.phoneNumber,
              );
          },
        },
      ],
      {cancelable: true},
    );
  }
  unlockDevice() {
    Alert.alert(
      this.props.screen.alert.confirmation,
      this.props.screen.alert.open,
      [
        {
          text: this.props.screen.alert.cancel,
          onPress: () => {
            console.log('Cancell');
          },
        },
        {
          text: this.props.screen.alert.ok,
          onPress: () => {
            Platform.OS === 'ios' &&
              this.sendMessageIOS(
                `${this.prefix}${this.password}#OUT${this.currentChannel}=ON`,
                this.phoneNumber,
              );
            Platform.OS === 'android' &&
              this.sendMessageAndroid(
                `${this.prefix}${this.password}#OUT${this.currentChannel}=ON`,
                this.phoneNumber,
              );
          },
        },
      ],
      {cancelable: true},
    );
  }
  jogDevice() {
    Alert.alert(
      this.props.screen.alert.confirmation,
      this.props.screen.alert.time,
      [
        {
          text: this.props.screen.alert.cancel,
          onPress: () => {
            console.log('Cancell');
          },
        },
        {
          text: this.props.screen.alert.ok,
          onPress: () => {
            Platform.OS === 'ios' &&
              this.sendMessageIOS(
                `${this.prefix}${this.password}#RLY${this.currentChannel}=${this.time}`,
                this.phoneNumber,
              );
            Platform.OS === 'android' &&
              this.sendMessageAndroid(
                `${this.prefix}${this.password}#RLY${this.currentChannel}=${this.time}`,
                this.phoneNumber,
              );
          },
        },
      ],
      {cancelable: true},
    );
  }
  findDevice() {
    this.device = this.props.devices.filter(
      (device) => device.phoneNumber == this.phoneNumber,
    );
    this.device = this.device[0];
    //varibles
    this.prefix = this.device.prefix;
    this.password = this.device.password;
    this.name = this.device.name;
    this.currentChannel = this.device.currentChannel;
    this.device.channels[this.currentChannel - 1];
    this.time = this.device.channels[
      this.currentChannel - 1
    ].configs.channel_out.activation_time;
    this.channel_out_name = this.device.channels[
      this.currentChannel - 1
    ].configs.channel_out.name;
  }
  render() {
    this.phoneNumber = this.props.route.params.phone;
    this.findDevice();
    const buttons = [1, 2, 3, 4];
    return (
      <View
        style={[
          style.container,
          {backgroundColor: this.props.theme.body_background},
        ]}>
        {/* Channel control */}
        <View style={style.container_control}>
          <Text
            style={[
              style.labelChannel,
              {color: this.props.theme.control_title},
            ]}>
            {this.props.screen.title} :
          </Text>

          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={this.currentChannel - 1}
            buttons={buttons}
            containerStyle={{
              height: 40,
              width: 150,
              margin: 0,
              backgroundColor: this.props.theme.body_background,
              borderColor: this.props.theme.control_channel_borders,
            }}
            innerBorderStyle={{
              color: this.props.theme.control_channel_borders,
            }}
            textStyle={{color: this.props.theme.control_channel_numbers}}
            selectedButtonStyle={{
              backgroundColor: this.props.theme.control_channel_selected,
            }}
            selectedTextStyle={{
              color: this.props.theme.control_channel_selected_title,
            }}
          />
        </View>
        {/* Device control */}
        <View style={style.deviceControl}>
          <View>
            <View style={style.namesTitles}>
              <Text
                style={[
                  style.nameDevice,
                  {color: this.props.theme.control_title},
                ]}>
                {this.name}
              </Text>

              <Text
                style={[
                  style.nameChannel,
                  {color: this.props.theme.control_title},
                ]}>
                {this.channel_out_name}
              </Text>
            </View>
            <Text
              style={[
                style.numberDevice,
                {color: this.props.theme.control_subtitle},
              ]}>
              {this.phoneNumber}
            </Text>
          </View>

          <View style={style.container_icons}>
            <TouchableOpacity
              style={style.container_action_button}
              onPress={this.unlockDevice}>
              <Icon name="unlock" />
            </TouchableOpacity>

            <TouchableOpacity
              style={style.container_action_button}
              onPress={this.lockDevice}>
              <Icon name="lock" />
            </TouchableOpacity>

            <TouchableOpacity
              style={style.container_action_button}
              onPress={this.jogDevice}>
              <Icon name="time" />
            </TouchableOpacity>

            <TouchableOpacity
              style={style.container_action_button}
              onPress={this.makeCall}>
              <Icon name="phone" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_control: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  container_control_buttons: {
    width: '80%',
  },
  control_button_label: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  deviceControl: {
    height: 500,
    paddingHorizontal: 20,
  },
  nameDevice: {
    fontSize: 30,
    fontFamily: 'Roboto-Bold',
  },
  nameChannel: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
  },
  numberDevice: {
    fontSize: 23,
    fontFamily: 'Roboto-Regular',
  },
  container_icons: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingTop: 25,
  },
  container_action_button: {
    padding: 20,
    width: '50%',
  },
  namesTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
const mapStateToProps = (state) => {
  return {
    state: state,
    theme: state.themes[state.currentTheme],
    screen: state.screens.device_control[state.currentLanguage],
    devices: state.devices,
  };
};
const mapDispatchToProps = {
  setCurrentChannel,
};
export default connect(mapStateToProps, mapDispatchToProps)(Controll);
