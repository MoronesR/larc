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
        {height: parseFloat(props.height) || 50,
          backgroundColor: props.theme.settings_button_group_background_selected},
        
      ]}
      textStyle={[
        {
          color: props.theme.settings_button_group_title,
        },
        props.textStyle,
      ]}
      buttonStyle={{
        backgroundColor: props.theme.body_background, 
      }}
      selectedButtonStyle={{
        backgroundColor: props.theme.items_drawer,
      }}
      selectedTextStyle={{
        color: props.theme.overlay_button_regular,
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
