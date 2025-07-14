import firestore from '@react-native-firebase/firestore';

export const addDataToFirestore = async (collectionName, data) => {
  try {
    await firestore ().collection (collectionName).add (data);
    return {success: true, message: 'Data added!'};
  } catch (e) {
    console.log (e);
    return {success: false, message: e};
  }
};

export const getDataFromFirestoreCollection = async callback => {
  try {
    let data = [];
    const usersQuerySnapshot = await firestore ().collection ('Users').get ();
    usersQuerySnapshot.forEach (documentSnapshot => {
      console.log (documentSnapshot.data ());
      data.push (documentSnapshot.data ());
    });
    return {success: true, message: 'Data fetched!', data};
  } catch (e) {
    console.log (e);
    return {success: false, message: e, data: null};
  }
};

export const listenDataFromFirestoreCollection = (collectionName, callback) => {
  const subscriber = firestore ()
    .collection (collectionName)
    .onSnapshot (documentSnapshot => {
      let data = [];
      documentSnapshot.forEach (result => {
        data.push (result.data ());
      });
      callback (data);
    });
  return subscriber;
};
