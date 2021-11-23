import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';

const Header = ( props ) => {
  const openMenu = () =>{
    props.navigation.openDrawer()
  };
  return (
        <FontAwesome5 name={'bars'} size={30} onPress={openMenu} style={{ marginLeft: 10, color: props.theme.header_title }}/>
  );
};


const mapStateToProps = (state) => {
  return {
    theme: state.themes[state.currentTheme],
  };
};

export default connect(mapStateToProps)(Header);
