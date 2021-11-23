import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity, FlatList, View} from 'react-native';
import {connect} from 'react-redux';
import Icon from '../../utils/Icon';
import HorizontalSeparator from '../../utils/horizontalSeparator';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class SettingsDevice extends Component {
  renderItem({item}) {
    return (
      <TouchableOpacity
        style={style.container_settings}
        onPress={() => {
          this.props.navigation.navigate(item.route, {
            cellphone: this.props.route.params.cellphone,
          });
        }}>
           <FontAwesome5 name={item.logo} size={25}  style={{color:this.props.theme.device_list_title}}/>
        <Text
          style={[
            style.text_settings,
            {color: this.props.theme.settings_title},
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  }
  keyExtractor(item) {
    return item.title;
  }
  renderSeparator() {
    return (
      <HorizontalSeparator
        style={{borderColor: this.props.theme.settings_border}}
      />
    );
  }
  render() {
    return (
      <View
        style={[
          style.FlatList_container,
          {backgroundColor: this.props.theme.body_background},
        ]}>
        <FlatList
          style={style.FlatList}
          data={this.props.settings}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem.bind(this)}
          ItemSeparatorComponent={this.renderSeparator.bind(this)}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    settings: state.screens.device_settings[state.currentLanguage],
    theme: state.themes[state.currentTheme],
  };
};

const style = StyleSheet.create({
  FlatList_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  FlatList: {
    width: '90%',
  },
  container_settings: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text_settings: {
    fontFamily: 'Roboto_Bold',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
  },
});

export default connect(mapStateToProps)(SettingsDevice);
