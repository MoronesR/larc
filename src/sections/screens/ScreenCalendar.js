import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import Search from '../settings/calendar/SearchContact';
import AddGroup from '../settings/calendar/AddGroup';
import {connect} from 'react-redux';
import ListGroups from '../settings/calendar/ListGroup';
const ScreenCalendar = (props) => {
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={[
            style.container,
            {backgroundColor: props.theme.body_background},
          ]}>
          <Search cellphone={props.route.params.cellphone} />
          <ListGroups
            cellPhone={props.route.params.cellphone}
            navigation={props.navigation}
           
          />
        </View>
        <AddGroup phoneNumber={props.route.params.cellphone} />
      </SafeAreaView>
    </>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
const mapStateToProps = (state) => {
  return {
    theme: state.themes[state.currentTheme],
    

  };
};
export default connect(mapStateToProps)(ScreenCalendar);
