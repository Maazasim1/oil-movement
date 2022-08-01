import axios from 'axios';
import { SHIPPINGIN } from './constants';

export const getAlldataFromServer = async () => {
    //   get all posts from Server
    try {
      const { data } = await axios.get(SHIPPINGIN);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  export const postAllDatatoServer = async (formData) => {
    //   get all posts from Server
    try {
      const { data } = await axios.post(POSTS_API_URL,formData);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

