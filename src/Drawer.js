import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem,DrawerItemList } from '@react-navigation/drawer';
import {View,Text,Image,StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ControlSettings from './sections/device/ControlSettings';
import StackInfo from './StackInfo';
import StackApp from './StackApp';

import {connect} from 'react-redux';

const Drawer = createDrawerNavigator();

function DrawerContent(props) {
  const user = auth().currentUser;
  return (
    <View style={{ flex:1, backgroundColor:props.style.theme.header_background}}>
      <DrawerContentScrollView {...props}>
      <View style={stylesDrawer.drawerContent}>
        <View style={stylesDrawer.userInfo}>
          <View style={{ flexDirection: 'row', marginTop:15,}}>
            <View style={[stylesDrawer.avatarContainer, {backgroundColor: props.style.theme.body_background}]}>
              {(!user.isAnonymous)? 
                <Image source={{ uri: user.photoURL }} style={{ borderRadius:30, width:50, height:50}}/>
              :
                <FontAwesome5 style={{fontSize: 33, color:props.style.theme.header_title}} name={'user-secret'} />
              }
            </View>
            <View style={{flexDirection:'column', marginLeft:15, marginTop:10}}>
              <Text style={[stylesDrawer.title,{color:props.style.theme.header_title}]}>{(!user.isAnonymous)? user?.displayName : "Anonymous"}</Text>
              <Text style={[stylesDrawer.caption,{color:props.style.theme.header_title}]}>{user?.email}</Text>
            </View> 
          </View>
        </View>
        {/* list menu */}
        <DrawerItemList {...props}/>
        {/* preferences */}
        <View style={[stylesDrawer.pref,{borderTopColor: props.style.theme.header_title}]}>
          <Text style={[stylesDrawer.prefTitle, {color: props.style.theme.header_title}]}>Preferences</Text>
          <ControlSettings />
        </View>
      </View>      
      </DrawerContentScrollView>
      <View style={[stylesDrawer.bottomDrawerView, {borderBottomColor: props.style.theme.header_title}]}>
        <DrawerItem
          icon={({color, size}) =><FontAwesome5 name={'sign-out-alt'} size={size} color={color} /> }
          label="Sing Out"
          onPress={() => auth().signOut()}
          inactiveTintColor= { props.style.theme.device_list_title}
          labelStyle= {{ fontSize: 16} }
          />
      </View>
    </View>
  );
}

const MyDrawer = (prop) => {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        drawerType="slide"
        initialRouteName="Home"
        drawerContent={props => <DrawerContent {...props} style={prop} />}
        drawerContentOptions={{
          inactiveTintColor: prop.theme.device_list_title,
          activeTintColor: prop.theme.device_add_title,
          activeBackgroundColor: prop.theme.items_drawer,
          labelStyle: { fontSize:16 }
        }}
        >
        <Drawer.Screen name="Home" 
          component={StackApp} 
          options={{   
            drawerIcon: ({color, size}) => <FontAwesome5 name={'home'} size={size} color={color}/>
          }}/>
        <Drawer.Screen name="Infomation" 
        component={StackInfo}
        options={{   
          drawerIcon: ({color, size}) => <FontAwesome5 name={'info-circle'} size={size} color={color} />
        }}/>       
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const stylesDrawer = StyleSheet.create({
  drawerContent:{
    flex: 1,
  },
  userInfo:{
    paddingLeft:20,
    marginBottom:15
  },
  avatarContainer:{
    width:50,
    height:50,
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center',
  },
  title:{
    fontSize:16,
    marginTop:3,
    fontWeight: 'bold',
  },
  caption:{
    fontSize:11,
    lineHeight:11,
  },
  pref:{
    marginTop:15,
    paddingTop:8,
    paddingLeft:15,
    borderTopWidth:1,
  },
  prefTitle:{
    fontSize:20,
    color:'#fff',
    fontWeight: 'bold'
  },
  bottomDrawerView:{
    marginBottom:15,
    borderBottomWidth: 1
  },
})

const mapStateToProps = (state) => {
  return {
    //design    
    theme: state.themes[state.currentTheme],
  };
};

export default connect(mapStateToProps)(MyDrawer)