import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import {Input, ButtonGroup} from 'react-native-elements';
import FormWrapper from '../../../utils/FormWrapper';
import {connect} from 'react-redux';
import ButtonGroupCustumized from '../../../utils/ButtonComponentStyle';
import {
  setCurrentChannel,
  setActivationType,
  setBaseTime,
  setActivationTime,
  setActivationMessage,
  setFeedBMessage,
  setChannelOutName,
  setCurrentStatus,
} from '../../../../Actions';
import SmsAndroid from 'react-native-get-sms-android';
import SendSMS from 'react-native-sms';
import Toast from 'react-native-simple-toast';

// import {ScrollView} from 'react-native-gesture-handler';

//FALTAN LOS LABELS EN ENG Y ESP
class ChannelOut extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      OffOnIndex: 0,
    };
    this.updateOffOnIndex = this.updateOffOnIndex.bind(this);
    this.updateTimeBase = this.updateTimeBase.bind(this);
    this.updateIndex = this.updateIndex.bind(this);
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
        Toast.show(this.props.screen_settings_out.toasts.sms_fail);
      },
      (success) => {
        Toast.show(this.props.screen_settings_out.toasts.sms);
      },
    );
  }
  updateTimeBase(timeBaseIndex) {
    const cmds = [this.time.minutes, this.time.seconds, this.time.milliseconds];
    Alert.alert(
      this.props.screen_settings_out.alerts.confirmation,
      this.props.screen_settings_out.alerts.change_baseTime,
      [
        {
          text: this.props.screen_settings_out.alerts.cancel,
          onPress: () => {
            console.log('Canceled');
          },
        },
        {
          text: this.props.screen_settings_out.alerts.ok,
          onPress: () => {
            Platform.OS === 'ios' &&
              this.sendMessageIOS(
                `${this.prefix}${this.password}#${cmds[timeBaseIndex]}`,
                this.phoneNumber,
              );
            Platform.OS === 'android' &&
              this.sendMessageAndroid(
                `${this.prefix}${this.password}#${cmds[timeBaseIndex]}`,
                this.phoneNumber,
              );
            this.props.setBaseTime({
              phoneNumber: this.phoneNumber,
              value: this.currentChannel,
              index: timeBaseIndex,
            });
          },
        },
      ],
      {cancelable: true},
    );
  }
  updateIndex(selectedIndex) {
    this.props.setCurrentChannel({
      currentChannel: selectedIndex + 1,
      phoneNumber: this.phoneNumber,
    });
  }
  updateOffOnIndex(OffOnIndex) {
    this.props.setCurrentStatus({
      phoneNumber: this.phoneNumber,
      value: this.currentChannel,
      currentStatus: OffOnIndex,
    });
  }
  findDevices() {
    this.device = this.props.devices.filter(
      (device) => device.phoneNumber == this.phoneNumber,
    );

    this.device = this.device[0];
    this.currentChannel = this.device.currentChannel;
    this.password = this.device.password;
    this.channel = this.device.channels[this.device.currentChannel - 1];
    this.prefix = this.device.prefix;
    this.currentOnOff = this.channel.configs.channel_out.currentStatus;

    this.time = this.channel.configs.channel_out.base_time;

    this.actType = this.channel.configs.channel_out.activation_type;

    this.name = this.channel.configs.channel_out.name;

    this.activationType = this.channel.configs.channel_out.activation_type;

    this.baseTime = this.channel.configs.channel_out.base_time;

    this.activationTime = this.channel.configs.channel_out.activation_time;

    this.placeHolderActivationMessage = this.channel.configs.channel_out.on_off[
      this.currentOnOff
    ].activation_message.value;
    this.ActivationMessageCmd = this.channel.configs.channel_out.on_off[
      this.currentOnOff
    ].activation_message.command;

    this.placeHolderFeedBMessage = this.channel.configs.channel_out.on_off[
      this.currentOnOff
    ].feedBMessage.value;
    this.feedBMessageCmd = this.channel.configs.channel_out.on_off[
      this.currentOnOff
    ].feedBMessage.command;
  }
  handleChannelNameChange() {
    Alert.alert(
      this.props.screen_settings_out.alerts.confirmation,
      this.props.screen_settings_out.alerts.change_name,
      [
        {
          text: this.props.screen_settings_out.alerts.cancel,
          onPress: () => {
            console.log('cancel');
          },
        },
        {
          text: this.props.screen_settings_out.alerts.ok,
          onPress: () => {
            this.props.setChannelOutName({
              phoneNumber: this.phoneNumber,
              value: this.currentChannel,
              name: this.channel_name_input,
            });
          },
        },
      ],
    );
  }
  handleActivationTimeChange() {
    this.props.setActivationTime({
      phoneNumber: this.phoneNumber,
      value: this.currentChannel,
      activation_time: this.activation_time_input,
    });
  }

  handleActivationSmsChange() {
    Alert.alert(
      this.props.screen_settings_out.alerts.confirmation,
      this.props.screen_settings_out.alerts.change_activationTime,
      [
        {
          text: this.props.screen_settings_out.alerts.cancel,
          onPress: () => {
            console.log('cancel');
          },
        },
        {
          text: this.props.screen_settings_out.alerts.ok,
          onPress: () => {
            this.props.setActivationMessage({
              phoneNumber: this.phoneNumber,
              value: this.currentChannel,
              currentStatus: this.currentOnOff,
              activation_message: this.activation_message_input,
            });
            Platform.OS === 'ios' &&
              this.sendMessageIOS(
                `${this.prefix}${this.password}#OUT${this.currentChannel}${this.ActivationMessageCmd}${this.activation_message_input}`,
                this.phoneNumber,
              );
            Platform.OS === 'android' &&
              this.sendMessageAndroid(
                `${this.prefix}${this.password}#OUT${this.currentChannel}${this.ActivationMessageCmd}${this.activation_message_input}`,
                this.phoneNumber,
              );
          },
        },
      ],
    );
  }

  handleFeedBMessage() {
    Alert.alert(
      this.props.screen_settings_out.alerts.confirmation,
      this.props.screen_settings_out.alerts.change_feedbackMessage,
      [
        {
          text: this.props.screen_settings_out.alerts.cancel,
          onPress: () => {
            console.log('cancel');
          },
        },
        {
          text: this.props.screen_settings_out.alerts.ok,
          onPress: () => {
            this.props.setFeedBMessage({
              phoneNumber: this.phoneNumber,
              value: this.currentChannel,
              currentStatus: this.currentOnOff,
              feedBMessage: this.feedBMessageInput,
            });
            Platform.OS === 'ios' &&
              this.sendMessageIOS(
                `${this.prefix}${this.password}#OUT${this.currentChannel}${this.feedBMessageCmd}${this.feedBMessageInput}`,
                this.phoneNumber,
              );
            Platform.OS === 'android' &&
              this.sendMessageAndroid(
                `${this.prefix}${this.password}#OUT${this.currentChannel}${this.feedBMessageCmd}${this.feedBMessageInput}`,
                this.phoneNumber,
              );
          },
        },
      ],
    );
  }

  render() {
    this.phoneNumber = this.props.route.params.cellphone;
    this.findDevices();

    /*Time Base*/
    const timeBaseButtons = [
      this.props.screen_settings_out.btime_minutes,
      this.props.screen_settings_out.btime_seconds,
      this.props.screen_settings_out.btime_miliseconds,
    ];
    const timeBaseIndex = this.device.channels[this.currentChannel - 1].configs
      .channel_out.base_time.index;

    const OffOnIndex = this.currentOnOff;
    const offOnButtons = [
      this.props.screen_settings_out.on,
      this.props.screen_settings_out.off,
    ];
    const buttons = [1, 2, 3, 4];
    return (
      <SafeAreaView
        style={[
          {flex: 1},
          {
            backgroundColor: this.props.theme.body_background,
          },
        ]}>
        <ScrollView>
          <View style={[style.container]}>
            <View style={style.container_control}>
              <Text
                style={[
                  style.labelChannel,
                  {color: this.props.theme.control_title},
                ]}>
                {this.props.screen_channel.title} :
              </Text>

              <ButtonGroupCustumized
                action={this.updateIndex}
                index={this.currentChannel - 1}
                buttons={buttons}
                containerStyle={{
                  width: 150,
                  margin: 0,
                }}
                height="40"
              />
            </View>
            <FormWrapper title={this.props.screen_settings_out.channel_name}>
              <Input
                containerStyle={{paddingHorizontal: 0}}
                placeholder={this.props.screen_settings_out.channel_holder}
                defaultValue={this.name}
                style={{fontSize: 13}}
                inputStyle={{color: this.props.theme.settings_out_subtitle}}
                onSubmitEditing={this.handleChannelNameChange.bind(this)}
                onChangeText={(text) => {
                  this.channel_name_input = text;
                }}
              />
            </FormWrapper>
            <FormWrapper title={this.props.screen_settings_out.base_time}>
              <ButtonGroupCustumized
                action={this.updateTimeBase}
                index={timeBaseIndex}
                buttons={timeBaseButtons}
              />
            </FormWrapper>
            <FormWrapper title={this.props.screen_settings_out.activation_time}>
              <Input
                keyboardType={'numeric'}
                containerStyle={{paddingHorizontal: 0}}
                placeholder={
                  this.props.screen_settings_out.activation_time_placeholder
                }
                defaultValue={this.activationTime}
                style={{fontSize: 13}}
                inputStyle={{color: this.props.theme.settings_out_subtitle}}
                onChangeText={(text) => {
                  this.activation_time_input = text;
                }}
                onEndEditing={this.handleActivationTimeChange.bind(this)}
              />
            </FormWrapper>
            <FormWrapper
              title={this.props.screen_settings_out.personalized_command_title}>
              <ButtonGroupCustumized
                action={this.updateOffOnIndex}
                index={OffOnIndex}
                buttons={offOnButtons}
              />
            </FormWrapper>
            <FormWrapper
              title={this.props.screen_settings_out.activation_message}>
              <Input
                containerStyle={{paddingHorizontal: 0}}
                placeholder={this.props.screen_settings_out.activation_holder}
                defaultValue={this.placeHolderActivationMessage}
                style={{fontSize: 13}}
                inputStyle={{color: this.props.theme.settings_out_subtitle}}
                onChangeText={(text) => {
                  this.activation_message_input = text;
                }}
                onSubmitEditing={this.handleActivationSmsChange.bind(this)}
              />
            </FormWrapper>

            <FormWrapper
              title={this.props.screen_settings_out.feedback_message}>
              <Input
                containerStyle={{paddingHorizontal: 0}}
                placeholder={this.props.screen_settings_out.feedback_holder}
                defaultValue={this.placeHolderFeedBMessage}
                style={{fontSize: 13}}
                inputStyle={{color: this.props.theme.settings_out_subtitle}}
                onChangeText={(text) => {
                  this.feedBMessageInput = text;
                }}
                onSubmitEditing={this.handleFeedBMessage.bind(this)}
              />
            </FormWrapper>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const style = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flex: 1,
  },
  container_control: {
    paddingHorizontal: 20,
    // paddingVertical: 5,
  },
  labelChannel: {
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state) => {
  return {
    theme: state.themes[state.currentTheme],
    screen_settings_out:
      state.screens.settings_channel_out[state.currentLanguage],
    screen_channel: state.screens.device_control[state.currentLanguage],
    devices: state.devices,
  };
};

const mapDispatchToProps = {
  setCurrentChannel,
  setActivationType,
  setBaseTime,
  setActivationTime,
  setActivationMessage,
  setFeedBMessage,
  setChannelOutName,
  setCurrentStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelOut);
