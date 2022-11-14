import axios from 'axios';
import { SHIPPINGIN,SHIPPINGOUT,admin } from './constants';

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

  export const getAlldataFromServershipOut = async ()=>{
    try{
      const {data}=await axios.get(SHIPPINGOUT);
      return data;
    }
    catch (error){
      console.log(error);
    }
  };
  
  export const postAllDatatoServerShipOut = async (formData) =>{
    try{
      const {data}=await axios.post(SHIPPINGOUT,formData);
      return data;
    }
    catch{
      console.log(error);
    }
  }
  
  export const getAlldatafromHSD = async ()=>{
    try{
      const {data}=await axios.get(admin,{data:{"id":1,"product":"pete"}});
      return data;
    }
    catch (error){
      console.log(error);
    }
  };

  export const getAlldatafromPMG = async ()=>{
    try{
      const {data}=await axios.get(PMG);
      return data;
    }
    catch (error){
      console.log(error);
    }
  };

  export const getAlldatafromFO = async ()=>{
    try{
      const {data}=await axios.get(FO);
      return data;
    }
    catch (error){
      console.log(error);
    }
  };
  export const getAlldatafromLPG = async ()=>{
    try{
      const {data}=await axios.get(LPG);
      return data;
    }
    catch (error){
      console.log(error);
    }
  };