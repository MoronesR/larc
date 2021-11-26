import firebase from './firebase/db'

/****************HISTORY********************* */
export const setHistoryIndex = (payLoad) => ({
  type: 'SET_HISTORY_INDEX',
  payLoad,
});
/****************System Settings********************* */
export const setFreeControl = (payLoad) => ({
  type: 'SET_FREE_CONTROL',
  payLoad,
});
export const setSystemFeedback = (payLoad) => ({
  type: 'SET_SYSTEM_FEEDBACK',
  payLoad,
});
export const setSystemReply = (payLoad) => ({
  type: 'SET_SYSTEM_REPLY',
  payLoad,
});
export const setCallOrRingtone = (payLoad) => ({
  type: 'SET_CALL_OR_RINGTONE',
  payLoad,
});
export const setWorkingMode = (payLoad) => ({
  type: 'SET_WORKING_MODE',
  payLoad,
});
export const setPassword = (payLoad) => ({
  type: 'SET_PASSWORD',
  payLoad,
});
/**********************Channel Out************************ */
export const setCurrentChannel = (payLoad) => ({
  type: 'SET_CURRENT_CHANNEL',
  payLoad,
});
export const setChannelOutName = (payLoad) => ({
  type: 'SET_CHANNEL_OUT_NAME',
  payLoad,
});
export const setBaseTime = (payLoad) => ({
  type: 'SET_BASE_TIME',
  payLoad,
});
export const setActivationTime = (payLoad) => ({
  type: 'SET_ACTIVATION_TIME',
  payLoad,
});
export const setCurrentStatus = (payLoad) => ({
  type: 'SET_CURRENT_STATUS',
  payLoad,
});
export const setActivationMessage = (payLoad) => ({
  type: 'SET_ACTIVATION_MESSAGE',
  payLoad,
});
export const setFeedBMessage = (payLoad) => ({
  type: 'SET_FEED_BACK_MESSAGE_OUT',
  payLoad,
});
/****************CALENDAR********************* */
export const setCalendarIndex = (payLoad) => ({
  type: 'SET_CALENDAR_INDEX',
  payLoad,
});
export const deleteContact = (payLoad) => ({
  type: 'DELETE_CONTACT',
  payLoad,
});
export const suspendContact = (payLoad) => ({
  type: 'SUSPEND_CONTACT',
  payLoad,
});
export const activateContact = (payLoad) => ({
  type: 'ACTIVATE_CONTACT',
  payLoad,
});
export const editContact = (payLoad) => ({
  type: 'EDIT_CONTACT',
  payLoad,
});
export const addContact = (payLoad) => ({
  type: 'ADD_CONTACT',
  payLoad,
});
/****************GROUP********************* */
export const addGroup = (payLoad) => ({
  type: 'ADD_GROUP',
  payLoad,
});
export const editGroup = (payLoad) => ({
  type: 'EDIT_GROUP',
  payLoad,
});
export const deleteGroup = (payLoad) => ({
  type: 'DELETE_GROUP',
  payLoad,
});
/****************THEME********************* */
export const setTheme = (payLoad) => ({
  type: 'SET_THEME',
  payLoad,
});
export const setLanguage = (payLoad) => ({
  type: 'SET_LANGUAGE',
  payLoad,
});
/****************CRUD FIREBASE NEW METHOD********************* */
export const editFb = (payLoad) => {
  return async function(dispatch) {    
    await firebase.db.collection('datos').doc(payLoad.id).
    update({
        [`${payLoad.rute}`]: payLoad.data
      })
  };
};


////////////////////////REVISAR EN UN FUTURO////////////////////////////////////////////////
/**********************Channel In************************ */
export const setCurrentChannelIn = (payLoad) => ({
  type: 'SET_CURRENT_CHANNEL_IN',
  payLoad,
});
export const setChannelInName = (payLoad) => ({
  type: 'SET_CHANNEL_IN_NAME',
  payLoad,
});
export const setChannelInEmergencyCall = (payLoad) => ({
  type: 'SET_CHANNEL_IN_EMERGENCY_CALL',
  payLoad,
});
export const setChannelInEmergencyNumber = (payLoad) => ({
  type: 'SET_CHANNEL_IN_EMERGENCY_NUMBER',
  payLoad,
});
export const setChannelInFeedbackMessage = (payLoad) => ({
  type: 'SET_CHANNEL_IN_FEEDBACK_MESSAGE',
  payLoad,
});
export const setActivationType = (payLoad) => ({
  type: 'SET_ACTIVATION_TYPE',
  payLoad,
});
/******CLEAR DEVICE******/
export const clerdataFromDevice = () => ({
  type: 'CLEAR_DATA_DEVICE',
});
// /****************DEVICE********************* */ verified
export const loadData = (payLoad) => ({
  type: 'LOAD_DATA',
  payLoad,
});
//get all devices from firebase
export const deviceListFb = (payLoad) =>{
  return async function(dispatch) {  
    dispatch(loadData(true))
    await firebase.db.collection('datos')
    .where("author", "==", payLoad)
    .onSnapshot((querySnapshot)=>{
      const datos = [];
      querySnapshot.docs.forEach((doc) =>{
        // console.log(doc.data());
          const {name, phoneNumber, device_default } = doc.data()
          const {
            currentChannel,currentChannelIn,prefix,password,check_system_status,
            calendar,channels,channel_in,settings_system,history,time_status
          } = device_default;
          datos.push({
           id:doc.id, name, phoneNumber,currentChannel,currentChannelIn,
           prefix,password,check_system_status,calendar,channels,
           channel_in,settings_system,history,time_status
          });
      })
      dispatch(addNewDevice(datos))
      dispatch(loadData(false))
    })
  };
};
export const addNewDeviceToState = (payLoad) => ({
  type: 'ADD_DEVICE_STATE',
  payLoad,
});
// add device to state from firebase
export const addNewDevice = (payLoad) => ({
  type: 'ADD_DEVICE',
  payLoad,
});
//add device to firebase
export const addNewDeviceFb = (payLoad) =>{
  return async function(dispatch) {    
    await firebase.db.collection('datos').add(payLoad);
  };
};
export const deleteDevice = (payLoad) => ({
  type: 'DELETE_DEVICE',
  payLoad,
});
//delete device from fb
export const deleteDeviceFb = (payLoad) => {
  return async function(dispatch) {    
    await firebase.db.collection('datos').doc(payLoad.id).delete();
  };
};
export const editDevice = (payLoad) => ({
  type: 'EDIT_DEVICE',
  payLoad,
});
//edit device to fb
export const editDeviceFb = (payLoad) => {
  return async function(dispatch) {    
    await firebase.db.collection('datos').doc(payLoad.id).
    update({
        name: payLoad.nameEdit,
        phoneNumber: payLoad.phoneEdit,
      })
  };
};
export const editDeviceStore = (payLoad) => ({
  type: 'EDIT_DEVICE',
  payLoad,
});

/****************LOGIN********************* */
export const addNewUser = (payLoad) =>({
  type: 'ADD_NEW_USER',
  payLoad,
});
/****************CRUD FIREBASE********************* */
export const updateFb = (payLoad) => {
  return async function(dispatch) {    
    await firebase.db.collection('datos').doc(payLoad.id).update(payLoad.data)
  };
};
export const addFb = (payLoad) => {
  return async function(dispatch) {    
    await firebase.db.collection('datos').doc(payLoad.id).
    update({
        'device_default.calendar.groups': firebase.firebase.firestore.FieldValue.arrayUnion(payLoad.data),
      })
  };
};
export const removeGroupFb = (payLoad) => {
  return async function(dispatch) { 
    let ref =firebase.db.collection('datos').doc(payLoad.id);
    ref.get().then(function(doc) {
      ref.update({
              "device_default.calendar.groups": firebase.firebase.firestore.FieldValue.arrayRemove(doc.data().device_default.calendar.groups[payLoad.position])
          });
    })
    .catch(function(error) {
        console.error(error.message);
    });
  };
};
export const updateGroupNameFb = (payLoad) => {
  return async function(dispatch) {    
    let ref =firebase.db.collection('datos').doc(payLoad.idDoc);
    ref.get().then(function(doc) {
      let groups = doc.data().device_default.calendar.groups;
      groups[payLoad.position].group_name = payLoad.name;
      ref.update({
              "device_default.calendar.groups": groups
          });
    })
    .catch(function(error) {
        console.error(error.message);
    });
  };
};
export const addContactGroupFb = (payLoad) => {
  return async function(dispatch) {    
    let ref =firebase.db.collection('datos').doc(payLoad.idDoc);
    ref.get().then(function(doc) {
      let groups = doc.data().device_default.calendar.groups[0];
      let contacts = groups.contacts
      let newObjet ={"isSuspended": false, "name": "jolette", "number": 123, "phoneNumber": 6656567610}
      contacts.push(newObjet)
      let newArray ={
        group_name: groups.group_name,
        id: groups.id,
        contacts: contacts
      }
      dispatch(removeGroupFb({id:payLoad.idDoc,position:0,}))
      dispatch(addFb({id:payLoad.idDoc,data:newArray,}))
     
    })
    .catch(function(error) {
        console.error(error.message);
    });
  };
};
