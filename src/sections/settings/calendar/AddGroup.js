/*Este componente solo se visualiza si elusuario da tap al boton de agregar dispositivo
Es una especie de over layout que recibe un formulario que debe ser completado todos sus campos
ademas despues de confirmarlo este se debe agregar ala memoria
*/
import React, {Component} from 'react';
import {Button, Overlay, Input} from 'react-native-elements';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {addGroup,editFb} from '../../../../Actions';
import Toast from 'react-native-simple-toast';

class AddContact extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: false,
      input_name: '',
    };
  }

  toggleOverlay = () => {
    this.setState({
      ...this.state,
      isVisible: !this.state.isVisible,
    });
  };
  fullValues = () => {
    if (this.state.input_name !== '') {
      return true;
    }
    return false;
  };
  addGroup = () => {
    if (this.fullValues()) {
      this.props.addGroup({
        name: this.state.input_name,
        phoneNumber: this.props.phoneNumber,
      });
      setTimeout(() => {
        if(!this.props.user.anonymous){
          this.props.editFb({
            id: this.device.id,
            rute: 'device_default.calendar',
            data: this.device.calendar,
          });
        }   
      }, 100);
      
      this.state.input_name='';
      Toast.show(this.props.device_screen.toasts.addGroup)
      this.toggleOverlay()
    }else {
      Toast.show(this.props.screen_general.missing_fields);
    }
  }
  findDevice = () => {
    this.device = this.props.devices.filter(
      (device) => device.phoneNumber == this.props.phoneNumber,
    );
    this.device = this.device[0];
  }
  render() {
    this.findDevice();
    return (
      <View
        style={{
          backgroundColor: this.props.theme.overlay_background,
        }}>
        <Button
          title={this.props.device_screen.add_group}
          buttonStyle={{
            backgroundColor: this.props.theme.overlay_background,
          }}
          titleStyle={{color: this.props.theme.overlay_title}}
          onPress={this.toggleOverlay}
        />
        <Overlay
          overlayStyle={[
            style.Overlay,
            {backgroundColor: this.props.theme.overlay_background},
          ]}
          isVisible={this.state.isVisible}
          onBackdropPress={this.toggleOverlay}>
          <View style={[style.container]}>
            <View style={style.container_form}>
              <Text style={[style.label, {color: this.props.theme.overlay_title}]}>
                {this.props.device_screen.name_label} :
              </Text>
              <Input
                inputContainerStyle={style.input_container_style}
                containerStyle={style.input_container}
                placeholder={this.props.device_screen.name_group_placeholder_label}
                inputStyle={{color: this.props.theme.overlay_title}}
                onChangeText={(text) => {
                  this.setState({
                    ...this.state,
                    input_name: text,
                  });
                }}
              />
            </View>
            <View style={style.container_buttons}>
              <Button
                title={this.props.device_screen.add_cancel_label}
                buttonStyle={[
                  style.button_cancel,
                  {backgroundColor: this.props.theme.overlay_button_regular},
                ]}
                titleStyle={{color: this.props.theme.overlay_button_title}}
                onPress={this.toggleOverlay}
              />
              <Button
                title={this.props.device_screen.add_confirm_label}
                buttonStyle={[
                  style.button_confirm,
                  {backgroundColor: this.props.theme.overlay_button_primary},
                ]}
                titleStyle={{color: this.props.theme.overlay_button_title}}
                onPress={this.addGroup}
              />
            </View>
          </View>
        </Overlay>
      </View>
    );
  }
}

const style = StyleSheet.create({
  Overlay: {
    height: 250,
    borderRadius: 0,
  },
  container: {
    flex: 1,
    width: '80%',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  container_form: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  container_buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
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
const mapStateToProps = (state) => {
  return {
    theme: state.themes[state.currentTheme],
    device_screen: state.screens.settings_calendar[state.currentLanguage],
    screen_general: state.screens.general[state.currentLanguage],
    devices: state.devices,
    user:state.login,
    calendar: state.screens.settings_calendar[state.currentLanguage],
  };
};
const mapDispatchToProps = {
  addGroup,editFb,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddContact);
