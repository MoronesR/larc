import React, {Component, } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Overlay, Input} from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import {editDeviceFb, editDeviceStore} from '../../../Actions';
class EditDevice extends Component {
  constructor() {
    super();
    this.state = {
      visible: true,
      phoneEdit: '',
      nameEdit: '',
    };
    this.handleEditDevice = this.handleEditDevice.bind(this);
    this.goBack = this.goBack.bind(this);
  }
  verifyEmptyValues() {
    this.state = {
      visible: true,
      phoneEdit: this.state.phoneEdit || this.props.route.params.phoneNumber,
      nameEdit: this.state.nameEdit || this.props.route.params.name,
    };
    if (this.state.phoneEdit !== '' && this.state.nameEdit !== '') {
      return true;
    }
    return false;
  }

  isAvailable(phoneNumber){
      const exists = this.props.devices.find(
        (device) => device.phoneNumber == phoneNumber,
      );
      if (exists) {
        return true;
      }
    };
  handleEditDevice = () => {
    if (this.verifyEmptyValues()) {
      if (this.state.phoneEdit.length !== 10) {
        Toast.show(this.props.screen_general.missing_numbers_label);
      } else {
        if (this.state.phoneEdit.match(/^[0-9]+$/)) {
          if (!this.isAvailable(this.state.phoneEdit)) {
            if(!this.props.user.anonymous){
              this.props.editDeviceFb({
                id: this.props.route.params.id,
                author: this.props.user.email,
                phoneEdit: this.state.phoneEdit,
                nameEdit: this.state.nameEdit,
              });
            }else{
              this.props.editDeviceStore({
                phoneNumber: this.props.route.params.phoneNumber,
                name: this.props.route.params.name,
                phoneEdit: this.state.phoneEdit,
                nameEdit: this.state.nameEdit,
              });
            }
            Toast.show(this.props.screen.toasts.edit);
            this.goBack();
          }else{
            Toast.show(this.props.device_screen.toasts.add_repitation);
          }
        } else {
          Toast.show(this.props.screen.toasts.only_numbers);
        }
      }
    } else {
      Toast.show(this.props.screen.toasts.edit_fail);
    }
  };
  goBack() {
    this.setState({
      ...this.state,
      visible: false,
    });
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View
        style={{
          flex:1,
          backgroundColor: this.props.theme.device_add_background,
        }}>
        <Overlay
          overlayStyle={[
            styles.Overlay,
            {backgroundColor: this.props.theme.overlay_background},
          ]}
          isVisible={this.state.visible}
          onBackdropPress={this.goBack}>
          <View style={[styles.container]}>
            <Text
              style={[
                styles.editTitle,
                {color: this.props.theme.overlay_title},
              ]}>
              {this.props.screen.edit}
            </Text>
            <View style={styles.container_form}>
              <Text
                style={[styles.label, {color: this.props.theme.overlay_title}]}>
                {this.props.screen.name_label}
              </Text>
              <Input
                inputContainerStyle={styles.input_container_style}
                containerStyle={styles.input_container}
                defaultValue={this.props.route.params.name}
                inputStyle={{color: this.props.theme.overlay_title}}
                onChangeText={(text) => {
                  this.setState({
                    nameEdit: text,
                  });
                }}
              />
            </View>
            <View style={styles.container_form}>
              <Text
                style={[styles.label, {color: this.props.theme.overlay_title}]}>
                {this.props.screen.cel_label}
              </Text>
              <Input
                keyboardType="numeric"
                inputContainerStyle={styles.input_container_style}
                containerStyle={styles.input_container}
                defaultValue={this.props.route.params.phoneNumber}
                inputStyle={{color: this.props.theme.overlay_title}}
                onChangeText={(text) => {
                  this.setState({
                    phoneEdit: text,
                  });
                }}
                maxLength={10}
              />
            </View>
            <View style={styles.container_buttons}>
              <Button
                title={this.props.screen.add_cancel_label}
                buttonStyle={[
                  styles.button_cancel,
                  {backgroundColor: this.props.theme.overlay_button_regular},
                ]}
                onPress={this.goBack}
                titleStyle={{color: this.props.theme.overlay_button_title}}
              />
              <Button
                title={this.props.screen.add_confirm_label}
                buttonStyle={[
                  styles.button_confirm,
                  {backgroundColor: this.props.theme.overlay_button_primary},
                ]}
                titleStyle={{color: this.props.theme.overlay_button_title}}
                onPress={this.handleEditDevice}
              />
            </View>
          </View>
        </Overlay>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Overlay: {
    height: 350,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    width: '90%',
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  editTitle: {
    fontFamily: 'Roboto_Regular',
    fontSize: 25,
    fontWeight: 'bold',
  },
  container_form: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  container_buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'Roboto_Regular',
    fontSize: 17,
  },
  button_cancel: {
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button_confirm: {
    borderRadius: 5,
    paddingHorizontal: 20,
    marginLeft: 15,
  },
  input_container_style: {
    marginTop: 20,
  },
  input_container: {
    width: '70%',
  },
});
const mapDispatchToProps = {
  editDeviceFb,
  editDeviceStore
};
const mapStateToProps = (state) => {
  return {
    theme: state.themes[state.currentTheme],
    screen: state.screens.device[state.currentLanguage],
    screen_general: state.screens.general[state.currentLanguage],
    devices: state.devices,
    device_screen: state.screens.device[state.currentLanguage],
    user: state.login,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditDevice);
