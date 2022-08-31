import axios from 'axios';
import { SHIPPINGIN } from './constants';

export const getAlldataFromServer = async () => {
    
    try {
      const { data } = await axios.get(SHIPPINGIN);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  export const postAllDatatoServer = async (formData) => {
    
    try {
      const { data } = await axios.post(SHIPPINGIN,formData);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

