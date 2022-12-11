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
      //case "GET":
        //return await getCredentials(req, res);
      case "POST":
        return await getPass(req, res);
      //case "PUT":
        //return await newPassword(req, res);
      default:
        return res.status(400).send("Method not allowed");
    }
  }


  const getPass = async (req, res) => {
    try {
      const { userName } = req.body;
      const data = await executeQuery(`SELECT * from credentitals where userName="${userName}"`);
      console.log(data)
      return res.status(200).json({ data })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };


 


