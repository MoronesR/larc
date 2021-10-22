//Este componente muestra los dispositivos de automatizacion agregados en forma de lista
//boton de borrar dispositivo
//boton de editar dispositivo
//los anteriores botones se encuentran ubicados en cada elemento de la lista
import React, {Component} from 'react';
import {FlatList, View, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import ListItem from './ListItem';
import Separator from '../../utils/horizontalPaddingSeparator';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {color} from 'react-native-reanimated';
class ListaDispositivos extends Component {
  renderItem({item}) {
    return (
      <ListItem
        navigation={this.props.navigation}
        theme={this.props.theme}
        screen={this.props.overlay_Screen}
        item={{
          phoneNumber: item.phoneNumber,
          name: item.name,
        }}
      />
    );
  }
  keyExtractor(item) {
    return item.phoneNumber + item.name;
  }
  renderSeparator() {
    return <Separator />;
  }
  renderEmptyComponent() {
    return (
      <View style={style.emptyContainer}>
        <Text style={[{color: this.props.theme.header_title}]}>
          {this.props.general.empty_devices}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View
        style={[
          style.container,
          {backgroundColor: this.props.theme.body_background},
        ]}>
        <View style={style.flatList_container}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.props.device_list}
            renderItem={this.renderItem.bind(this)}
            ItemSeparatorComponent={this.renderSeparator}
            ListEmptyComponent={this.renderEmptyComponent.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  flatList_container: {
    width: '90%',
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
    device_list: state.devices,
    theme: state.themes[state.currentTheme],
    overlay_Screen: state.screens.device[state.currentLanguage],
    general: state.screens.general[state.currentLanguage],
  };
};
export default connect(mapStateToProps)(ListaDispositivos);
