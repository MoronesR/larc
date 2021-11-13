import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem,DrawerItemList } from '@react-navigation/drawer';
import StackApp from './StackApp';
import InfoScreen from './sections/screens/InfoScreen';
import {View,Text,Image,StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ControlSettings from './sections/device/ControlSettings';

const Drawer = createDrawerNavigator();

function DrawerContent(props) {
  const user = auth().currentUser;
  return (
    // backgroundColor: this.props.theme.body_background
    <View style={{ flex:1}}>
      <DrawerContentScrollView {...props}>
      <View style={stylesDrawer.drawerContent}>
        {/* information */}
        <View style={stylesDrawer.userInfo}>
          <View style={{ flexDirection: 'row', marginTop:15,}}>
            <Image source={{ uri: user?.photoURL }} style={ stylesDrawer.avatar}/>
            <View style={{flexDirection:'column', marginLeft:15, marginTop:10}}>
              <Text style={stylesDrawer.title}>{user?.displayName}</Text>
              <Text style={stylesDrawer.caption}>{user?.email}</Text>
            </View> 
          </View>
        </View>
        {/* list menu */}
        <DrawerItemList {...props}/>
        {/* preferences */}
        <View style={stylesDrawer.pref}>
          <Text style={stylesDrawer.prefTitle}>Preferences</Text>
          <ControlSettings />
        </View>
      </View>      
      </DrawerContentScrollView>
      <View style={stylesDrawer.bottomDrawerView}>
        <DrawerItem
          icon={() =><FontAwesome5 name={'sign-out-alt'} solid /> }
          label="Sing Out"
          onPress={() => auth().signOut()}
          />
      </View>
    </View>


  );
}

const MyDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        drawerType="slide"
        initialRouteName="Home"
        drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" 
          component={StackApp} 
          options={{   
            drawerIcon: () => <FontAwesome5 name={'home'} solid />
          }}/>
        <Drawer.Screen name="Infomation" 
        component={InfoScreen}
        options={{   
          drawerIcon: () => <FontAwesome5 name={'info-circle'} solid />
        }}/>       
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default MyDrawer;

const stylesDrawer = StyleSheet.create({
  drawerContent:{
    flex: 1,
  },
  userInfo:{
    paddingLeft:20,
    marginBottom:15
  },
  avatar:{
    width:50,
    height:50,
    borderRadius:30
  },
  title:{
    fontSize:16,
    marginTop:3,
    fontWeight: 'bold',
  },
  caption:{
    fontSize:11,
    lineHeight:11,
    color: '#666'
  },
  pref:{
    marginTop:15,
    paddingTop:5,
    marginLeft:15,
    borderTopColor: '#ddd',
    borderTopWidth:1
  },
  prefTitle:{
    fontSize:14,
    color: '#666'
  },
  bottomDrawerView:{
    marginBottom:15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
})