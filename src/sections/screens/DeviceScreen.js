import React, {useEffect} from 'react';
import AddDevice from '../device/AddDevice';
import ListDevice from '../device/ListDevices';
import ControlSettings from '../device/ControlSettings';
import handlePermission from '../permissions/index';
const DeviceScreen = ({navigation}) => {
  useEffect(() => {
    handlePermission();
  }, []);
  return (
    <>
      <ControlSettings />
      <ListDevice navigation={navigation} />
      <AddDevice />
    </>
  );
};

export default DeviceScreen;
