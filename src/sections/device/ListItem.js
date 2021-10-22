import React, {useState, Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import {deleteDevice} from '../../../Actions';
import Icon from '../../utils/Icon';

class ListItem extends Component {
  constructor() {
    super();
    this.width = 20;
    this.height = 24;
    this.handleDeleteDevice = this.handleDeleteDevice.bind(this);
  }

  handleDeleteDevice = () => {
    Alert.alert(
      this.props.screen.alerts.delete,
      this.props.screen.alerts.deleteAsk,
      [
        {
          text: this.props.screen.alerts.add_cancel_label,
          onPress: () => {
            Toast.show(this.props.screen.toasts.delete_cancel);
          },
        },
        {
          text: this.props.screen.alerts.add_confirm_label,
          onPress: () => {
            this.props.deleteDevice({
              phoneNumber: this.props.item.phoneNumber,
            });
            Toast.show(this.props.screen.toasts.delete);
          },
        },
      ],
    );
  };

  render() {
    return (
      <View
        style={[
          style.container,
          {borderColor: this.props.theme.device_list_border},
        ]}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('DeviceControl', {
              phone: this.props.item.phoneNumber,
            })
          }
          style={[
            style.picture_name_container,
            {backgroundColor: this.props.theme.body_background},
          ]}>
          <Icon width="37" height="38" name="profile" />
          <View style={style.name_phone_container}>
            <Text
              style={[
                style.name_device,
                {color: this.props.theme.device_list_title},
              ]}>
              {this.props.item.name}
            </Text>
            <Text
              style={[
                style.phone_device,
                {color: this.props.theme.device_list_subtitle},
              ]}>
              {this.props.item.phoneNumber}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={style.icons_container}>
          <TouchableOpacity
            onPress={this.handleDeleteDevice}
            style={style.icon}>
            <Icon width={this.width} height={this.height} name="delete" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('EditDevice', {
                phoneNumber: this.props.item.phoneNumber,
                name: this.props.item.name,
              })
            }
            style={style.icon}>
            <Icon width={this.width} height={this.height} name="edit" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 50,
    borderWidth: 1,
    borderRadius: 2,
  },
  picture_name_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F4E6',
    width: '75%',
    padding: 10,
  },
  name_phone_container: {
    padding: 10,
  },
  name_device: {
    fontSize: 18,
    fontFamily: 'Roboto_Bold',
    fontWeight: 'bold',
  },
  phone_device: {
    fontSize: 14,
    fontFamily: 'Roboto_Regular',
  },
  icons_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
  },
  icon: {
    paddingHorizontal: 7,
  },
});

const mapDispatchToProps = {
  deleteDevice,
};
export default connect(null, mapDispatchToProps)(ListItem);
