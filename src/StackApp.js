// In App.js in a new project

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DevicesScreen from './sections/screens/DeviceScreen';
import DeviceControl from './sections/device/ControlDevice';
import SettingsDevice from './sections/settings/SettingsDevice';
import SettingsCalendar from './sections/screens/ScreenCalendar';
import SettingHistory from './sections/settings/history/history';
import SettingOut from './sections/settings/channel_out/channel_out';
// import SettingIn from './sections/settings/channel_in/channel_in';
import SettingSystem from './sections/settings/system_settings/system_settings';
import SettingCheck from './sections/settings/SettingsCheck';
import EditDevice from './sections/device/EditDevice';
import EditContact from './sections/settings/calendar/EditContact';
import EditGroup from './sections/settings/calendar/EditGroup';

import contactScreen from './sections/screens/ContactScreen';
import {connect} from 'react-redux';
import Icon from './utils/Icon';
const Stack = createStackNavigator();

function App(props) {
  return (
      <Stack.Navigator
        screenOptions={{
          title: 'LARC',
          headerStyle: {backgroundColor: props.theme.header_background},
          headerTitleStyle: {
            color: props.theme.header_title,
            fontFamily: 'Roboto_Bold',
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerBackImage: () => {
            return <Icon name="back" width="28" height="30" />;
          },
        }}
        initialRouteName={'DevicesScreen'}>
        <Stack.Screen
          name="DevicesScreen"
          component={DevicesScreen}
        />
        <Stack.Screen
          name="DeviceControl"
          component={DeviceControl}
          options={({route, navigation}) => {
            return {
              headerRight: () => {
                return (
                  <SettingsIcon
                    cellphone={route.params.phone}
                    navigation={navigation}
                  />
                );
              },
              headerRightContainerStyle: {
                padding: 10,
              },
            };
          }}
        />
        <Stack.Screen name="SettingsDevice" component={SettingsDevice} />
        <Stack.Screen name="settings_calendar" component={SettingsCalendar} />
        <Stack.Screen name="settings_history" component={SettingHistory} />
        <Stack.Screen name="settings_out" component={SettingOut} />
        {/* <Stack.Screen name="settings_in" component={SettingIn} /> */}
        <Stack.Screen name="settings_system" component={SettingSystem} />
        <Stack.Screen name="settings_check" component={SettingCheck} />
        <Stack.Screen name="EditDevice" component={EditDevice} />
        <Stack.Screen name="EditContact" component={EditContact} />
        <Stack.Screen name="EditGroup" component={EditGroup} />
        <Stack.Screen name="contactScreen" component={contactScreen} />
      </Stack.Navigator>
  );
}

const SettingsIcon = (props) => {
  const {navigation} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('SettingsDevice', {cellphone: props.cellphone});
      }}>
      <Icon name="settings" width="40" height="40" />
    </TouchableOpacity>
  );
};


const mapStateToProps = (state) => {
  return {
    theme: state.themes[state.currentTheme],
  };
};

export default connect(mapStateToProps)(App);
