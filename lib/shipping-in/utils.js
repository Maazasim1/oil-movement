import axios from 'axios';
import { SHIPPINGIN,SHIPPINGOUT,admin } from './constants';
import {error} from "next/dist/build/output/log";

const HSDdata={
  "id":"1",
  "product":"HSD"
}
const PMGdata={
  "id":"1",
  "product":"PMG"
}
const FOdata={
  "id":"1",
  "product":"FO"
}
const LPGdata={
  "id":"1",
  "product":"LPG"
}

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

  export const deleteDataShipin = async(serialNumber)=>{
    try{
      const res=await axios.delete(SHIPPINGIN,{data:{"serialNumber":serialNumber}});
      return res;
    }
    catch{
      console.log(error);
    }

  }


  export const updateDataShipin = async(updatedDate)=>{
    try{
      const {data}=await axios.put(SHIPPINGIN,updatedDate);
      return data;
    }
    catch{
      console.log(error)
    }
  }
  
  export const getAlldatafromHSD = async ()=>{
    try{
      const {data}=await axios.post(admin,HSDdata);
      return data;
    }
    catch (error){
      console.log(error);
    }
  };

  export const getAlldatafromPMG = async ()=>{
    try{
      const {data}=await axios.post(admin,PMGdata);
      return data;
    }
    catch (error){
      console.log(error);
    }
  };

  export const getAlldatafromFO = async ()=>{
    try{
      const {data}=await axios.post(admin,FOdata);
      return data;
    }
    catch (error){
      console.log(error);
    }
  };
  export const getAlldatafromLPG = async ()=>{
    try{
      const {data}=await axios.post(admin,LPGdata);
      return data;
    }
    catch (error){
      console.log(error);
    }
  };