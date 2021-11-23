// In App.js in a new project

import React from 'react';
import {createStackNavigator, } from '@react-navigation/stack';
import {connect} from 'react-redux';
import Header from './sections/header/header';
import InfoScreen from './sections/screens/InfoScreen';

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
        initialRouteName={'InfoScreen'}>
        <Stack.Screen 
          name="InfoScreen" 
          component={InfoScreen}
          options={({navigation}) => {
            return {
              headerLeft: () => { return <Header navigation={ navigation }/>},
            };
          }}
        />
      </Stack.Navigator>
  );
}

const mapStateToProps = (state) => {
  return {
    theme: state.themes[state.currentTheme],
    nameApp: state.nameApp,
  };
};

export default connect(mapStateToProps)(App);