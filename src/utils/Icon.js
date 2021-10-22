import React from 'react';
import {Image} from 'react-native';
import {connect} from 'react-redux';
import Images from '../../assets/index';

const Icon = (props) => {
  return (
    <Image
      style={[
        {
          width: parseInt(props.width) || 100,
          height: parseInt(props.height) || 100,
          resizeMode: 'contain',
        },
        props.style,
      ]}
      source={Images[props.theme][props.name]}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.currentTheme,
  };
};

export default connect(mapStateToProps)(Icon);
