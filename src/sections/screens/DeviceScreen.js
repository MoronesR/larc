import React, {useEffect} from 'react';
import AddDevice from '../device/AddDevice';
import ListDevice from '../device/ListDevices';
import handlePermission from '../permissions/index';
const DeviceScreen = ({navigation}) => {
  useEffect(() => {
    handlePermission();
  }, []);
  return (
    <>
      <ListDevice navigation={navigation} />
      <AddDevice />
    </>
  );
};

export default DeviceScreen;
