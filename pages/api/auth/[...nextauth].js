import NextAuth from "next-auth/next";
import CredentialProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers:[
        CredentialProvider({
            name:"credentials",
            credentials:{
                level:{label:"Access-level",type:"text",placeholder:"shipping-in"},
                username:{label:"User",type:"text",placeholder:"name"},
                password:{label:"password",type:"password"},
            },
            authorize: (credentials)=>{
                //database look up
                if(credentials.username==="maaz"&&credentials.password==="testing"&&credentials.level==="Shipping In") {
                    return{
                        id:2,
                        name:"maaz",
                    
                    };
                
                }
                if(credentials.username==="admin"&&credentials.password==="testing"&&credentials.level==="Admin") {
                    return{
                        id:3,
                        name:"Admin",
                    
                    };
                    
                }
                if(credentials.username==="maaz"&&credentials.password==="testing"&&credentials.level==="Shipping Out") {
                    return{
                        id:3,
                        name:"maaz",
                    }
                };
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