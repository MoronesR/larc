//Header es el componete que siempre se renderiza en la parte superior de la app
//Ayuda a la navegacion de la aplicacion
//Contiene algunas ocaciones un retroceder y algunas otras tiene un signo de configuraciones
import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
const Header = () => {
  return (
    <View style={style.container}>
      <TouchableOpacity>
        <Image source={import(`../../../assets/back.png`)} />
      </TouchableOpacity>
      <View>
        <Text>LARC</Text>
      </View>
      <TouchableOpacity>
        <Image />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'yellow',
  },
});
export default Header;
