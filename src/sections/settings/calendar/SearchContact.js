import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, Alert} from 'react-native';
import {OverLay, Button, Input} from 'react-native-elements';
import {connect} from 'react-redux';
import FormWrapper from '../../../utils/FormWrapperHorizontal';
import ButtonGroupCustumized from '../../../utils/ButtonComponentStyle';
import {setCalendarIndex,editFb,} from '../../../../Actions';
import SmsAndroid from 'react-native-get-sms-android';
import SendSMS from 'react-native-sms';
import Toast from 'react-native-simple-toast';
class Calendar extends Component {
  constructor() {
    super();
    this.updateSearchIndex = this.updateSearchIndex.bind(this);
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
        Toast.show(this.props.calendar.toasts.sms_fail);
      },
      (success) => {
        Toast.show(this.props.calendar.toasts.sms);
      },
    );
  }
  updateSearchIndex(searchMessageIndex) {
    Alert.alert(
      this.props.calendar.alerts.confirmation,
      this.props.calendar.alerts.searchBy,
      [
        {
          text: this.props.calendar.alerts.cancel,
          onPress: () => {
            console.log('cancel');
          },
        },
        {
          text: this.props.calendar.alerts.ok,
          onPress: () => {
            this.props.setCalendarIndex({
              phoneNumber: this.phoneNumber,
              index: searchMessageIndex,
            });
            if(!this.props.user.anonymous){
              this.props.editFb({
                id: this.device.id,
                rute: 'device_default.calendar',
                data: this.device.calendar,
              });
            }   
          },
        },
      ],
    );
   
  }
  verifyLength() {
    if (this.searchIndex == 0 && this.inputSearch.length == 10) return true;
    if (this.searchIndex == 1 && this.inputSearch.length == 3) return true;
    return false;
  }
  handleSearchMessage() {
    if (this.inputSearch == '') {
      Toast.show(this.props.calendar.toasts.void);
    } else {
      if (this.verifyLength()) {
        Alert.alert(
          this.props.calendar.alerts.confirmation,
          `${this.props.calendar.alerts.message_search} ${this.inputSearch}?`,
          [
            {
              text: this.props.calendar.alerts.cancel,
              onPress: () => {
                console.log('cancel');
              },
            },
            {
              text: this.props.calendar.alerts.ok,
              onPress: () => {
                if (Platform.OS === 'ios') {
                  if (this.searchIndex == 0) {
                    this.sendMessageIOS(
                      `${this.prefix}${this.password}${this.searchCmd.phoneNumber}=${this.inputSearch}`,
                      this.phoneNumber,
                    );
                  } else {
                    this.sendMessageIOS(
                      `${this.prefix}${this.password}${this.searchCmd.serial}${this.inputSearch}`,
                      this.phoneNumber,
                    );
                  }
                }
                if (Platform.OS === 'android') {
                  if (this.searchIndex == 0) {
                    this.sendMessageAndroid(
                      `${this.prefix}${this.password}${this.searchCmd.phoneNumber}=${this.inputSearch}`,
                      this.phoneNumber,
                    );
                  } else {
                    this.sendMessageAndroid(
                      `${this.prefix}${this.password}${this.searchCmd.serial}${this.inputSearch}`,
                      this.phoneNumber,
                    );
                  }
                }

                this.inputSearch = '';
              },
            },
          ],
        );
      } else {
        Toast.show(this.props.calendar.toasts.check_length);
      }
    }
  }
  findDevices() {
    this.device = this.props.devices.filter((device) => {
      if (device.phoneNumber == this.phoneNumber) {
        return device;
      }
    });
    this.device = this.device[0];
    this.password = this.device.password;
    this.prefix = this.device.prefix;
    this.searchCmd = this.device.calendar.search;
    this.searchIndex = this.searchCmd.index;
  }
  render() {
    this.phoneNumber = this.props.cellphone;
    this.findDevices();
    const searchOptions = [
      this.props.calendar.searchBy.phoneNumber,
      this.props.calendar.searchBy.serial,
    ];
    const searchMessageIndex = this.searchIndex;
    this.inputSearch = '';
    return (
      <View style={style.container_search}>
        <FormWrapper
          theme={this.props.theme}
          title={this.props.calendar.searchButtonLabel}>
          <ButtonGroupCustumized
            action={this.updateSearchIndex}
            index={searchMessageIndex}
            buttons={searchOptions}
            textStyle={{fontSize: 12}}
          />
        </FormWrapper>
        <Input
          keyboardType="numeric"
          containerStyle={style.container_style}
          placeholder={
            searchMessageIndex == 0
              ? this.props.calendar.placeholder_search_phoneNumber
              : this.props.calendar.placeholder_search_serial
          }
          inputContainerStyle={style.input_container_style}
          inputStyle={{color: this.props.theme.settings_calendar_title}}
          maxLength={searchMessageIndex == 0 ? 10 : 3}
          style={{
            fontSize: 14,
          }}
          onChangeText={(Text) => {
            this.inputSearch = Text;
          }}
          onSubmitEditing={this.handleSearchMessage.bind(this)}
        />
      </View>
    );
  }
}
const style = StyleSheet.create({
  container_search: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  container_style: {
    height: 60,
    paddingBottom: 50,
  },
  label_search: {
    fontFamily: 'Roboto_Bold',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input_container_style: {
    width: '100%',
  },
});
const mapStateToProps = (state) => {
  return {
    theme: state.themes[state.currentTheme],
    calendar: state.screens.settings_calendar[state.currentLanguage],
    devices: state.devices,
    user:state.login,
  };
};

const mapDistpatchToProps = {
  setCalendarIndex,editFb,
};
export default connect(mapStateToProps, mapDistpatchToProps)(Calendar);
