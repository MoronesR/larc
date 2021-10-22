import React from 'react';
import {Platform} from 'react-native';
import {PERMISSIONS, check, request, RESULTS} from 'react-native-permissions';

async function isSMSPermissionGranted() {
  let result;
  if (Platform.OS == 'android') {
    result = await check(PERMISSIONS.ANDROID.SEND_SMS);
  }
  if (Platform.OS == 'ios') {
    // result = await check(PERMISSIONS.IOS);
    return true;
  }

  if (result === RESULTS.GRANTED) {
    return true;
  } else if (result === RESULTS.DENIED) {
    const askedResult = await request(PERMISSIONS.ANDROID.SEND_SMS);
    if (askedResult === RESULTS.GRANTED) return true;
  }
}
async function isCallPermissionGranted() {
  let result;
  if (Platform.OS == 'android') {
    result = await check(PERMISSIONS.ANDROID.CALL_PHONE);
  }
  if (Platform.OS == 'ios') {
    // result = await check(PERMISSIONS.IOS);
    return true;
  }

  if (result === RESULTS.GRANTED) {
    return true;
  } else if (result === RESULTS.DENIED) {
    const askedResult = await request(PERMISSIONS.ANDROID.CALL_PHONE);
    if (askedResult === RESULTS.GRANTED) return true;
  }
}

async function handlePermissions() {
  if (await isSMSPermissionGranted()) {
    console.log('SMS permission granted');
  }
  if (await isCallPermissionGranted()) {
    console.log('Phone Call permission granted');
  }
}

export default handlePermissions;
