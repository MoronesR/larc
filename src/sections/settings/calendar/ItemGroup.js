import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';

import Icon from '../../../utils/Icon';
import {connect} from 'react-redux';
import {deleteGroup,editFb,} from '../../../../Actions';
import Toast from 'react-native-simple-toast';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class ItemGroup extends Component {
  constructor() {
    super();
    this.redirect = this.redirect.bind(this);
    this.editGroup = this.editGroup.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
  }
  redirect() {
    this.props.navigation.navigate('contactScreen', {
      cellphone: this.props.phoneNumber,
      group_id: this.props.item.id,
      position: this.props.position
    });
  }
  deleteGroup() {
    this.props.deleteGroup({
      phoneNumber: this.props.phoneNumber,
      id: this.props.item.id,
    });
    Toast.show(this.props.screen.toasts.deleteGroup);
  }
  editGroup() {
    this.props.navigation.navigate('EditGroup', {
      cellphone: this.props.phoneNumber,
      group_id: this.props.item.id,
      group_name: this.props.item.group_name,
    });
  }
  render() {
    return (
      <TouchableOpacity
        style={[
          style.container,
          {borderColor: this.props.theme.settings_border},
        ]}
        onPress={this.redirect}>
        <View style={style.icon_title_container}>
          <FontAwesome5 name={'users'} size={40} style={{color:this.props.theme.device_list_title}}/>
          <Text
            style={[
              style.title,
              {color: this.props.theme.settings_calendar_group_title},
            ]}>
            {this.props.item.group_name}
          </Text>
        </View>
        <View style={style.delete_container}>
          {this.props.item.contacts.length == 0 && (
            <TouchableOpacity onPress={
              this.deleteGroup
             }
             onPressIn={
              this.findDevice
            }>
               <FontAwesome5 name={'trash'} size={30} style={{color:this.props.theme.device_list_title}}/>
            </TouchableOpacity>
          )}
        </View>
        <View style={style.edit_container}>
          <TouchableOpacity onPress={this.editGroup}>
          <FontAwesome5 name={'edit'} size={30} style={{color:this.props.theme.device_list_title}}/>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 65,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  icon_title_container: {
    flexDirection: 'row',
    width: '60%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  delete_container: {
    width: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  edit_container: {
    width: '15%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 6,
  },
  title: {
    fontSize: 18,
    paddingLeft: 10,
  },
});
const mapStateToProps = (state) => {
  return {
    user:state.login,
    devices: state.devices,
    calendar: state.screens.settings_calendar[state.currentLanguage],
  };
};
const mapDistpatchToProps = {
  deleteGroup,editFb,
};
export default connect(mapStateToProps, mapDistpatchToProps)(ItemGroup);
