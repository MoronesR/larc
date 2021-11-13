export const setCurrentChannel = (payLoad) => ({
  type: 'SET_CURRENT_CHANNEL',
  payLoad,
});
export const setChannelOutName = (payLoad) => ({
  type: 'SET_CHANNEL_OUT_NAME',
  payLoad,
});
export const setActivationType = (payLoad) => ({
  type: 'SET_ACTIVATION_TYPE',
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

/****************HISTORY********************* */
export const setHistoryIndex = (payLoad) => ({
  type: 'SET_HISTORY_INDEX',
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
/****************DEVICE********************* */
export const addNewDevice = (payLoad) => ({
  type: 'ADD_DEVICE',
  payLoad,
});

export const deleteDevice = (payLoad) => ({
  type: 'DELETE_DEVICE',
  payLoad,
});

export const editDevice = (payLoad) => ({
  type: 'EDIT_DEVICE',
  payLoad,
});
export const setTheme = (payLoad) => ({
  type: 'SET_THEME',
  payLoad,
});
export const setLanguage = (payLoad) => ({
  type: 'SET_LANGUAGE',
  payLoad,
});


/****************LOGIN********************* */

export const addNewUser = (payLoad) =>({
  type: 'ADD_NEW_USER',
  payLoad,
});