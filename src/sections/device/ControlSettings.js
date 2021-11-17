import React, {Component} from 'react';
import {View, StyleSheet, Switch, Text, ActivityIndicator} from 'react-native';
import ButtonGroupCustumized from '../../utils/ButtonComponentStyle';
import {connect} from 'react-redux';
import {setTheme, setLanguage} from '../../../Actions';
import {Overlay} from 'react-native-elements';
class ControlSettings extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: false,
    };
  }

  setTheme = () => {
    if (this.props.currentTheme == 'dark') this.props.setTheme('light');
    if (this.props.currentTheme == 'light') this.props.setTheme('dark');
    this.handleOverLay();
  };
  setLanguage = () => {
    if (this.props.currentLanguage == 'eng') this.props.setLanguage('esp');
    if (this.props.currentLanguage == 'esp') this.props.setLanguage('eng');
    this.handleOverLay();
  };

  mapVariables() {
    //dark mode
    this.isDarkMode = this.props.currentTheme == 'dark';
    this.availableLanguages = [this.props.screen.eng, this.props.screen.esp];
    this.selectedLanguage = this.props.currentLanguage == 'eng' ? 0 : 1;
  }

  handleOverLay() {
    this.setState({
      isVisible: true,
    });
    setTimeout(() => {
      this.setState({
        isVisible: false,
      });
    }, 1500);
  }

  render() {
    this.mapVariables();
    return (
      <View
        style={[
          style.container,
        ]}>
        {/* tema */}
        <View style={style.container_control}>
          <Text style={[style.text, {color: this.props.theme.header_title}]}>
            {this.props.screen.dark_mode}
          </Text>
          <Switch
            trackColor={{false: '#767577', true: '#999999'}}
            thumbColor={this.isDarkMode ? '#555555' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={this.setTheme}
            value={this.isDarkMode}
            style={{ marginEnd: 10}}
          />
        </View>
        {/* idioma */}
        <View style={style.container_control}>
          <Text style={[style.text, {color: this.props.theme.header_title}]}>
            {this.props.screen.language}
          </Text>
          <ButtonGroupCustumized
            action={this.setLanguage}
            index={this.selectedLanguage}
            buttons={this.availableLanguages}
            containerStyle={{width: 100}}
            textStyle={{fontSize: 12}}
            height={45}
          />
        </View>
        <Overlay
          overlayStyle={[
            overlayStyle.overlay,
            {backgroundColor: this.props.theme.overlay_background},
          ]}
          isVisible={this.state.isVisible}
          onBackdropPress={this.goBack}>
          <View>
            <ActivityIndicator size="large" color={'#ffffff'} />
            <Text
              style={{
                color: '#ffffff',
                fontSize: 15,
                paddingTop: 20,
              }}>
              {this.props.general.change_configuration_label}
            </Text>
          </View>
        </Overlay>
      </View>
    );
  }
}
const overlayStyle = StyleSheet.create({
  overlay: {
    height: 200,
    width: '70%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const style = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex:1
  },
  container_control:{
    flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center',
    paddingBottom:20,
  }, 
  text: {
    fontSize: 16,
  },
});

const mapStateToProps = (state) => {
  return {
    currentLanguage: state.currentLanguage,
    currentTheme: state.currentTheme,
    screen: state.screens.device_control[state.currentLanguage],
    theme: state.themes[state.currentTheme],
    general: state.screens.general[state.currentLanguage],
  };
};
const mapDispatchToProps = {
  setTheme,
  setLanguage,
};
export default connect(mapStateToProps, mapDispatchToProps)(ControlSettings);
