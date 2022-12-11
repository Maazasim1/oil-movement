import executeQuery from "../../../lib/shipping-in/loginDB/db";
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {

  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });


    switch (req.method) {
      case "GET":
        return await getCredentials(req, res);
      case "POST":
        return await newCredentials(req, res);
      case "PUT":
        return await newPassword(req, res);
      default:
        return res.status(400).send("Method not allowed");
    }
  }

  const newCredentials = async (req, res) => {
    try {
      const { userName, password, access } = req.body;
      const result = await executeQuery(`INSERT INTO credentials VALUES ("${userName}","${password}","${access}")`);
      console.log(result)
      return result
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };

  const getCredentials=async(res)=>{
    try{
      const result=await executeQuery("SELECT * FROM credentials");

      return result;
    }
    catch (error){
      console.log(error);
      return res.status(500).json({message:error.message});

    }
  }

  const newPassword=async(req,res)=>{
    try{
      const {userName,password}=req.body
      const result=await executeQuery(`UPDATE credentials SET password="${password}" WHERE userName="${userName}"`)
      console.log(result)
      return result;
    }
    catch(error){
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }


