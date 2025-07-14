import LocalStorageHelper from '../helper/localStorage';
import {useEffect, useState} from 'react';

const useLocalStorage = key => {
  const [value, setValue] = useState (null);
  useEffect (
    () => {
      LocalStorageHelper.getItem (key).then (value => {
        if (value === null) {
          setValue (value);
        }
      });
    },
    [key]
  );

  return [value];
};
export default useLocalStorage;
