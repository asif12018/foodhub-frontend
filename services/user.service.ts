import { env } from "@/env";
import { cookies } from "next/headers";
import 'server-only';








//bussiness logic for auth


export const userService ={
    getSession: async function(){
        try{
            const AUTH_API = env.AUTH_URL;
            console.log("FETCHING SESSION FROM:", `${AUTH_API}/get-session`);
            
            const cookieStore = await cookies();
            const res = await fetch(`${AUTH_API}/get-session`, {
                headers: {
                    cookie: cookieStore.toString(),
                },
                cache:"no-store"
            });
            const session = await res.json();
            if(session === null){
                return {data:null, error:{message:"Session is missing"}}
            }
            return {data:session, error:null}
        }catch(err){
            return {data:null, error:{message:"Something went wrong"}}
        }
    }
}