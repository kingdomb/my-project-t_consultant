import {PermissionsAndroid, Platform} from 'react-native';

class Permissions {
  constructor () {
    console.log ('Permissions class initialized');
  }

  requestLocationPermissionForAndroid = () => {
    return new Promise (async (resolve, reject) => {
      try {
        const result = await PermissionsAndroid.request (
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        console.log ('Location permission status:', result);
        if (result === PermissionsAndroid.RESULTS.GRANTED) {
          resolve (true, 'Location permission granted');
          console.log ('Location permission granted');
        } else {
          reject (new Error ('Location permission denied'));
          console.log ('Location permission denied');
        }
      } catch (err) {
        reject (new Error ('Location permission denied'));
        console.error ('Error requesting location permission:', err);
      }
    });
  };
  requsestPermissionForNotifications = () => {
    return new Promise (async (resolve, reject) => {
      try {
        const result = await PermissionsAndroid.request (
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        console.log ('Notification permission status:', result);
        if (result === PermissionsAndroid.RESULTS.GRANTED) {
          resolve (true, 'Notification permission granted');
          console.log ('Notification permission granted');
        } else {
          reject (new Error ('Notification permission denied'));
          console.log ('Notification permission denied');
        }
      } catch (err) {
        reject (new Error ('Notification permission denied'));
        console.error ('Error requesting Notification permission:', err);
      }
    });
  };
}

export default new Permissions ();
