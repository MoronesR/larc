import React from 'react';
import {StyleSheet} from 'react-native';
import {ButtonGroup} from 'react-native-elements';
import {connect} from 'react-redux';

const ButtonGroupCustumized = (props) => {
  return (
    <ButtonGroup
      onPress={props.action}
      selectedIndex={props.index}
      buttons={props.buttons}
      containerStyle={[
        props.containerStyle,
        {height: parseFloat(props.height) || 50},
      ]}
      textStyle={[
        {
          color: props.theme.settings_button_group_title,
        },
        props.textStyle,
      ]}
      buttonStyle={{
        backgroundColor: props.theme.body_background,
        borderColor: props.theme.settings_button_group_border,
        borderWidth: 0.3,
      }}
      selectedButtonStyle={{
        backgroundColor: props.theme.settings_button_group_background_selected,
      }}
      selectedTextStyle={{
        color: props.theme.settings_button_group_title,
        fontWeight: 'bold',
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.themes[state.currentTheme],
  };
};

export default connect(mapStateToProps)(ButtonGroupCustumized);
