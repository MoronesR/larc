import React, {useEffect, useState}from 'react';
import {View,Text, TextInput, Button} from 'react-native';
import { connect } from 'react-redux';
import {getPersonFromFb} from './Actions';

const TestScreen = (props) =>{
    const [state, setState] = useState({
        name: '',
        email: '',
        verified: ''
    });
    const saveData = () =>{
        console.log(state);
    }
    
    return(<View>
        <Text>{props.nameApp}</Text>
        <View>
            <TextInput placeholder="Name user" onChangeText={(value) => setState({...state, name: value})}/>
        </View>
        <View>
            <TextInput placeholder="Email user" onChangeText={(value) =>  setState({...state, email: value})}/>
        </View>
        <View>
            <TextInput placeholder="verified user" onChangeText={(value) =>  setState({...state, verified: value})}/>
        </View>
        <View>
            <Button title="save" onPress={() => saveData()}/>
        </View>
    </View>)
}

const mapStateToProps = (state) => {
    // console.log(state);
  return state;
}
const mapDispatchToProps = (dispatch) =>{
    return{
        getPersonFromFb: () =>{ dispatch(getPersonFromFb())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TestScreen)