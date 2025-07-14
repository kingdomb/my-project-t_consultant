import Geolocation from '@react-native-community/geolocation';

class LocationHelper {
  constructor () {
    console.log ('Location helper initialized');
  }

  getLocation = callback => {
    Geolocation.getCurrentPosition (position => {
      callback (position);
    });
  };

  trackLocation = callback => {
    const watchId = Geolocation.watchPosition (position => {
      callback (position);
    },(e)=>{
      console.log('location error',e)
    },{
      intervlaenableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
      interval:10000,
      enableHighAccuracy:true
    });
  };

  clearLocationListener = watchId => {
    Geolocation.clearWatch (watchId);
  };
}

export default new LocationHelper ();
