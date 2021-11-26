// In App.js in a new project
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator, } from '@react-navigation/stack';
import DevicesScreen from './sections/screens/DeviceScreen';
import DeviceControl from './sections/device/ControlDevice';
import SettingsDevice from './sections/settings/SettingsDevice';
import SettingsCalendar from './sections/screens/ScreenCalendar';
import SettingHistory from './sections/settings/history/history';
import SettingOut from './sections/settings/channel_out/channel_out';
import SettingSystem from './sections/settings/system_settings/system_settings';
import SettingCheck from './sections/settings/SettingsCheck';
import EditDevice from './sections/device/EditDevice';
import EditContact from './sections/settings/calendar/EditContact';
import EditGroup from './sections/settings/calendar/EditGroup';
import contactScreen from './sections/screens/ContactScreen';
import SettingTime from './sections/settings/SettingsTime';
import {connect} from 'react-redux';
import Icon from './utils/Icon';
import Header from './sections/header/header'
const Stack = createStackNavigator();

function App(props) {
  return (
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          title: props.nameApp,
          headerStyle: {
            backgroundColor: props.theme.header_background,
            shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowOffset: { width: 0, height: 60},
            shadowRadius: 1,
            elevation: 15,
          },
          headerTitleStyle: {
            color: props.theme.header_title,
            fontFamily: 'Roboto_Bold',
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerLeftContainerStyle: {
            paddingLeft: 10,
          },
          headerRightContainerStyle:{
            paddingRight: 20,
          },
          headerBackImage: () => {
            return <Icon name="back" width="28" height="30"/>;
          },
        })}
        initialRouteName={'DevicesScreen'}>
        <Stack.Screen name="settings_history" component={SettingHistory} />
        <Stack.Screen name="settings_out" component={SettingOut} />

        <Stack.Screen name="settings_system" component={SettingSystem} />

        
        <Stack.Screen name="EditContact" component={EditContact} />
        
        
        
        {/* primera pantalla */}
        <Stack.Screen 
          name="DevicesScreen" 
          component={DevicesScreen}
          options={({route, navigation}) => {
            return {
              headerLeft: () => { return <Header navigation={ navigation }/>},
            };
          }}
        />
        <Stack.Screen name="EditDevice" component={EditDevice} options={{headerShown: false}} />
        {/* segunda pantalla */}
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
            };
          }}
        />
        <Stack.Screen name="SettingsDevice" component={SettingsDevice} />
         {/* Tercera pantalla */}
         <Stack.Screen name="settings_Time" component={SettingTime} options={{headerShown: false}} />
         <Stack.Screen name="settings_check" component={SettingCheck} options={{headerShown: false}}  />
         {/* calendar */}
         <Stack.Screen name="settings_calendar" component={SettingsCalendar} />
         <Stack.Screen name="EditGroup" component={EditGroup} options={{headerShown: false}} />
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
    nameApp: state.nameApp,
  };
};

export default connect(mapStateToProps)(App);