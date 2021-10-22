import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from '../../utils/Icon';
import {connect} from 'react-redux';

class InfoScreen extends Component {
  constructor() {
    super();
    this.openFB = this.openFB.bind(this);
    this.openWebPage = this.openWebPage.bind(this);
  }
  openFB = async () => {
    try {
      await Linking.openURL(
        'https://www.facebook.com/Larc-gsm-access-517092142115235',
      );
    } catch (error) {
      console.log(error);
    }
  };
  openWebPage = async () => {
    try {
      await Linking.openURL('https://larc-gsm-access.negocio.site/');
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View
        style={{backgroundColor: this.props.theme.body_background, flex: 1}}>
        <View style={[style.image_container]}>
          <Icon name={'logo'} height={100} width={100} />
          <View style={style.version_name_container}>
            <Text
              style={[
                style.company_name,
                {
                  color: this.props.theme.company_name_color,
                },
              ]}>
              LARC GSM ACCESS
            </Text>
            <Text
              style={[
                style.version,
                {
                  color: this.props.theme.version_color,
                },
              ]}>
              Version: 1.0.0
            </Text>
          </View>
        </View>
        <View style={[style.contact_us_container]}>
          <Text
            style={[
              style.title_contact,
              {color: this.props.theme.header_title},
            ]}>
            Contactanos
          </Text>
          <View style={style.container_icons}>
            <View style={style.container_item}>
              <TouchableOpacity onPress={this.openFB}>
                <Image
                  style={[style.icon_container, {resizeMode: 'contain'}]}
                  source={require('../../../assets/images/fb.png')}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: this.props.theme.header_title,
                  fontSize: 10,
                }}>
                LARC GSM ACCESS
              </Text>
            </View>

            <View style={style.container_item}>
              <Image
                style={[style.icon_container, {resizeMode: 'contain'}]}
                source={require('../../../assets/images/email.png')}
              />
              <Text
                selectable={true}
                style={{
                  color: this.props.theme.header_title,
                  fontSize: 10,
                }}>
                larc.gsm.access{'\n'}@gmail.com
              </Text>
            </View>

            <View style={style.container_item}>
              <TouchableOpacity onPress={this.openWebPage}>
                <Image
                  style={[style.icon_container, {resizeMode: 'contain'}]}
                  source={require('../../../assets/images/web.png')}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: this.props.theme.header_title,
                  fontSize: 12,
                }}>
                LARC
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  image_container: {
    height: 150,
    padding: 20,
    flexDirection: 'row',
  },
  version_name_container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 250,
  },
  company_name: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  version: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: 10,
  },
  contact_us_container: {
    height: 150,
    padding: 10,
    flexDirection: 'column',
  },
  title_contact: {
    width: '100%',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container_icons: {
    width: '100%',
    height: 100,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon_container: {
    width: 40,
    height: 50,
  },
  container_item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const mapStateToProps = (state) => {
  return {
    theme: state.themes[state.currentTheme],
  };
};
export default connect(mapStateToProps)(InfoScreen);
