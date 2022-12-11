import NextAuth from "next-auth/next";
import CredentialProvider from "next-auth/providers/credentials";
import executeQuery from '../../../lib/shipping-in/loginDB/db'
import { getPass } from "../../../lib/shipping-in/utils";
var data

export const validate = async (username) => {
    
    try {
        const data = await executeQuery(
            `SELECT * FROM credentials WHERE username = "${username}"`
            
        );
        console.log(data);
       
        return data;
    } catch (error) {
        console.log(error);
    }
    
}


export default NextAuth({
    providers:[
        CredentialProvider({
            name:"credentials",
            credentials:{
                level:{label:"Access-level",type:"text",placeholder:"shipping-in"},
                username:{label:"User",type:"text",placeholder:"name"},
                password:{label:"password",type:"password"},
            },
             async authorize(credentials,req){
                //database look up
                //const dbUser=await validate(credentials.username)
                // if(dbUser.length<1)
                // {
                    
                // }
                // else{
                //     console.log("user not found")
                //}
               

                const result=await validate(credentials.username)
                console.log(result[0].userName)
                
                
                

                    
                    if(credentials.username===result[0].userName&&credentials.password===result[0].password&&credentials.level===result[0].access) {
                        return{
                            id:2,
                            name:"Admin"
                            
                        };
                        
                    }
                    // if(credentials.username==="admin"&&credentials.password==="testing"&&credentials.level==="Admin") {
                    //     return{
                    //         id:3,
                    //         name:"Admin",
                            
                    //     };
                        
                    // }
                    // if(credentials.username==="maaz"&&credentials.password==="testing"&&credentials.level==="Shipping Out") {
                    //     return{
                    //         id:3,
                    //         name:"maaz",
                    //     }
                    // };
                    //login failed
                    return null;

            }
        })
    ],
    callbacks:{
        jwt: ({ token,user})=>{
            if(user){
                token.id=user.id;
            }
            return token;
        },
        session:({token,session})=>{
            if(token){
                session.id=token.id;
            }
            return session;
        },
    },
    secret:"test",
    jwt:{
            secret:"test",
            encryption:true,
        },

        pages:{
            signIn:'/'
        }
    

});