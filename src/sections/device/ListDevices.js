//Este componente muestra los dispositivos de automatizacion agregados en forma de lista
//boton de borrar dispositivo
//boton de editar dispositivo
//los anteriores botones se encuentran ubicados en cada elemento de la lista
import React, {Component} from 'react';
import {FlatList, View, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import ListItem from './ListItem';
import Separator from '../../utils/horizontalPaddingSeparator';
import Spinner from 'react-native-spinkit';
import {deviceListFb} from '../../../Actions'

class ListaDispositivos extends Component {
  constructor(props) {
    super(props);
    this.props.deviceListFb(this.props.user.email);
  }
  renderItem({item}) {
    return (
      <ListItem
        navigation={this.props.navigation}
        theme={this.props.theme}
        screen={this.props.overlay_Screen}
        item={{
          id: item.id,
          phoneNumber: item.phoneNumber,
          name: item.name,
        }}
      />
    );
  }
  keyExtractor(item) {
    return item.phoneNumber + item.name;
  }
  // separador entre los item
  renderSeparator() {
    return <Separator />;
  }
  //cuendo la lista esta vacia se mostrara este mensaje
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
        <Spinner style={{ marginTop: 20}} type="FadingCircleAlt" color={this.props.theme.header_title} isVisible={this.props.loadData}/>
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
    alignItems: 'center',
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
    user: state.login,
    loadData: state.loadData,
  };
};

const mapDispatchToProps = (dispatch) =>{
  return{
    deviceListFb: (a) =>{ dispatch(deviceListFb(a))}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ListaDispositivos);
