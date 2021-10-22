import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {connect} from 'react-redux';
import ItemGroup from './ItemGroup';
import Separator from '../../../utils/horizontalPaddingSeparator';

class ListGroup extends Component {
  renderItem({item}) {
    return (
      <ItemGroup
        navigation={this.props.navigation}
        phoneNumber={this.device.phoneNumber}
        item={item}
        theme={this.props.theme}
        screen={this.props.device_screen}
        contacts={this.data}
      />
    );
  }
  keyExtractor(item) {
    return item.group_name + item.id;
  }
  renderSeparator() {
    return <Separator />;
  }
  findDevice() {
    this.device = this.props.devices.filter(
      (device) => device.phoneNumber == this.phoneNumber,
    );
    this.device = this.device[0];
  }
  renderEmptyComponent() {
    return (
      <View style={style.emptyContainer}>
        <Text style={[{color: this.props.theme.header_title}]}>
          {this.props.general.empty_groups}
        </Text>
      </View>
    );
  }
  render() {
    this.phoneNumber = this.props.cellPhone;

    this.findDevice();

    return (
      <View style={[style.FlatList_container]}>
        <FlatList
          style={style.FlatList}
          data={this.device.calendar.groups}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.renderSeparator}
          ListEmptyComponent={this.renderEmptyComponent.bind(this)}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  FlatList_container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyContainer: {
    flex: 1,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const mapStateToProps = (state) => {
  return {
    theme: state.themes[state.currentTheme],
    devices: state.devices,
    device_screen: state.screens.settings_calendar[state.currentLanguage],
    general: state.screens.general[state.currentLanguage],
  };
};

export default connect(mapStateToProps)(ListGroup);
