import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem,DrawerItemList } from '@react-navigation/drawer';
import StackApp from './StackApp';
import InfoScreen from './sections/screens/InfoScreen';
import { View, Text,Image, Button } from 'react-native';
import auth from '@react-native-firebase/auth';


const Drawer = createDrawerNavigator();

function DrawerContent(props) {
  const user = auth().currentUser;
  return (
    <DrawerContentScrollView {...props}>
      <View>
      <Image source={{ uri: user?.photoURL }} style={{ width:60, height:60, borderRadius:30}}/>
      <Text>{user?.displayName}</Text>
      <Text>{user?.email}</Text>
      </View>
      <DrawerItemList {...props} />
      <View style={{ marginTop: 30 }}>
        <Button title="Signout" onPress={() => auth().signOut()} />
      </View>
    </DrawerContentScrollView>
  );
}

const MyDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        drawerType="slide"
        initialRouteName="Home"
        drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={StackApp} />
        <Drawer.Screen name="Infomation" component={InfoScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default MyDrawer;