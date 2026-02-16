

"use server"

import { userService } from "@/services/user.service"


export async function getSession(){
    const session = await userService.getSession();
    return session;
}