import React, {useState} from 'react';
import {Button, Overlay, Input} from 'react-native-elements';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {editGroup} from '../../../../Actions';
import Toast from 'react-native-simple-toast';

const EditGroup = (props) => {
  let [state, setState] = useState({
    isVisible: true,
    
  });
  const toggleOverlay = () => {
    setState({
      ...state,
      isVisible: !state.isVisible,
    });
    props.navigation.goBack();
  };
  const fullValues = () => {
    if (state.input_name !== '') {
      return true;
    }
    return false;
  };

  const editGroup = () => {
    if (fullValues()) {
      props.editGroup({
        phoneNumber: props.route.params.cellphone,
        id:props.route.params.group_id,
        name: state.input_name || props.route.params.group_name,
        
      });
      Toast.show(props.device_screen.toasts.editGroup);

      toggleOverlay();
    } else {
      Toast.show(props.screen_general.missing_fields);
    }
  };

 
  return (
    
    <View
      style={{
        backgroundColor: props.theme.overlay_background,
      }}>
      <Overlay
        overlayStyle={[
          style.Overlay,
          {backgroundColor: props.theme.overlay_background},
        ]}
        isVisible={state.isVisible}
        onBackdropPress={toggleOverlay}>
        <View style={[style.container]}>
          <View style={style.container_form}>
            <Text style={[style.label, {color: props.theme.overlay_title}]}>
              {props.device_screen.name_label} :
            </Text>
            <Input
              inputContainerStyle={style.input_container_style}
              containerStyle={style.input_container}
              placeholder={props.device_screen.name_group_placeholder_label}
              defaultValue={props.route.params.group_name}
              inputStyle={{color: props.theme.overlay_title}}
              onChangeText={(text) => {
                setState({
                  ...state,
                  input_name: text,
                });
              }}
            />
          </View>
          <View style={style.container_buttons}>
            <Button
              title={props.device_screen.add_cancel_label}
              buttonStyle={[
                style.button_cancel,
                {backgroundColor: props.theme.overlay_button_regular},
              ]}
              titleStyle={{color: props.theme.overlay_button_title}}
              onPress={toggleOverlay}
            />
            <Button
              title={props.device_screen.add_confirm_label}
              buttonStyle={[
                style.button_confirm,
                {backgroundColor: props.theme.overlay_button_primary},
              ]}
              titleStyle={{color: props.theme.overlay_button_title}}
              onPress={editGroup}
            />
          </View>
        </View>
      </Overlay>
    </View>
  );
};

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
    
  };
};

const mapDispatchToProps = {
  editGroup,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditGroup);