/*Este componente solo se visualiza si elusuario da tap al boton de agregar dispositivo
Es una especie de over layout que recibe un formulario que debe ser completado todos sus campos
ademas despues de confirmarlo este se debe agregar ala memoria
*/
import React, {useState} from 'react';
import {Button, Overlay, Input} from 'react-native-elements';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {addNewDevice} from '../../../Actions';
import Toast from 'react-native-simple-toast';
import {State} from 'react-native-gesture-handler';

const AddDevice = (props) => {
  const [state, set] = useState({
    visible: false,
    phoneNumber: '',
    name: '',
  });
  const toggleOverlay = () => {
    set({...state, visible: !state.visible});
  };
  const isAvailable = (phoneNumber) => {
    const exists = props.devices.find(
      (device) => device.phoneNumber == phoneNumber,
    );
    if (exists) {
      return false;
    } else {
      return true;
    }
  };
  const handleAddDevice = () => {
    if (state.phoneNumber !== '' && state.name !== '') {
      if (state.phoneNumber.match(/^[0-9]+$/)) {
        if (state.phoneNumber.length !== 10) {
          Toast.show(props.general_screen.missing_numbers_label);
        } else {
          if (isAvailable(state.phoneNumber)) {
            props.addNewDevice({
              name: state.name,
              phoneNumber: state.phoneNumber,
            });
            Toast.show(props.device_screen.toasts.add);
            state.name = '';
            state.phoneNumber = '';
            toggleOverlay();
          } else {
            Toast.show(props.device_screen.toasts.add_repitation);
          }
        }
      } else {
        Toast.show(props.device_screen.toasts.only_numbers);
      }
    } else {
      Toast.show(props.device_screen.toasts.add_fail);
    }
  };
  return (
    <View
      style={{
        backgroundColor: props.theme.device_add_background,
      }}>
      <Button
        title={props.device_screen.add}
        buttonStyle={{
          backgroundColor: props.theme.device_add_background,
        }}
        titleStyle={{color: props.theme.device_add_title}}
        onPress={toggleOverlay}
      />

      <Overlay
        overlayStyle={[
          style.Overlay,
          {backgroundColor: props.theme.overlay_background},
        ]}
        isVisible={state.visible}
        onBackdropPress={toggleOverlay}>
        <View style={[style.container]}>
          <Text style={[style.addTitle, {color: props.theme.overlay_title}]}>
            {props.device_screen.add}
          </Text>
          <View style={style.container_form}>
            <Text style={[style.label, {color: props.theme.overlay_title}]}>
              {props.device_screen.name_label}
            </Text>
            <Input
              inputContainerStyle={style.input_container_style}
              containerStyle={style.input_container}
              placeholder={props.device_screen.name_placeholder_label}
              inputStyle={{color: props.theme.overlay_title}}
              onChangeText={(text) => {
                set({
                  ...state,
                  name: text,
                });
              }}
            />
          </View>
          <View style={style.container_form}>
            <Text style={[style.label, {color: props.theme.overlay_title}]}>
              {props.device_screen.cel_label}
            </Text>
            <Input
              keyboardType="number-pad"
              inputContainerStyle={style.input_container_style}
              containerStyle={style.input_container}
              placeholder="664*******"
              inputStyle={{color: props.theme.overlay_title}}
              onChangeText={(text) => {
                set({
                  ...state,
                  phoneNumber: text,
                });
              }}
              maxLength={10}
            />
          </View>
          <View style={style.container_buttons}>
            <Button
              title={props.device_screen.add_cancel_label}
              buttonStyle={[
                style.button_cancel,
                {backgroundColor: props.theme.overlay_button_regular},
              ]}
              onPress={toggleOverlay}
              titleStyle={{color: props.theme.overlay_button_title}}
            />
            <Button
              title={props.device_screen.add_confirm_label}
              buttonStyle={[
                style.button_confirm,
                {backgroundColor: props.theme.overlay_button_primary},
              ]}
              titleStyle={{color: props.theme.overlay_button_title}}
              onPress={handleAddDevice}
            />
          </View>
        </View>
      </Overlay>
    </View>
  );
};

const style = StyleSheet.create({
  Overlay: {
    height: 350,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    width: '80%',
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  addTitle: {
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

const mapStateToProps = (state) => {
  return {
    theme: state.themes[state.currentTheme],
    device_screen: state.screens.device[state.currentLanguage],
    general_screen: state.screens.general[state.currentLanguage],
    devices: state.devices,
  };
};
const mapDispatchToProps = {
  addNewDevice,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddDevice);
