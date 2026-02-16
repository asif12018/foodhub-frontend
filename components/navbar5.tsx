"use client";

import {  MenuIcon } from "lucide-react";
import Link from 'next/link'
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getSession } from "@/server action/auth.action";

interface Navbar5Props {
  className?: string;
}

const Navbar = ({ className }: Navbar5Props) => {
  const router = useRouter();
 
  const [response, setResponse] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);


  const load = async()=>{
    const res = await getSession();
    setSession(res?.data ?? null);
    setLoading(false);

  }

  //first load
  useEffect(()=>{
       load();
  },[])

  //refresh when user comes back to tab
  useEffect(()=>{
    window.addEventListener("focus", load);
    return ()=> window.removeEventListener("focus", load);
  },[])
  const handleLogout = async ()=>{
    setIsPending(true);
    const toastId = toast("Signing out....");
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/sign-out`,{
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        credentials:"include"
      })
      const data = await res.json();
      setResponse(data);
      toast.success("User Signout successfully", {id: toastId});
      await load();        
    router.refresh(); 
    }catch(err){
       toast.error("Something went wrong", {id: toastId});
    }finally{
      setIsPending(false);
    }
  }

  return (
    <section className={cn("py-4", className)}>
      <div className="container">
        <nav className="flex items-center justify-between">
          <a
            href="https://www.shadcnblocks.com"
            className="flex items-center gap-2"
          >
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
              className="max-h-8"
              alt="Shadcn UI Navbar"
            />
            <span className="text-lg font-semibold tracking-tighter">
              Shadcnblocks.com
            </span>
          </a>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                {/* <NavigationMenuLink
                  href="#"
                  className={navigationMenuTriggerStyle()}
                >
                  Products
                </NavigationMenuLink> */}
                <Link href="/" className={navigationMenuTriggerStyle()}>home</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className={navigationMenuTriggerStyle()}
                >
                  Resources
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className={navigationMenuTriggerStyle()}
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden items-center gap-4 lg:flex">
            {/* <Button asChild variant="outline"><Link href={"/signin"} >Sign in</Link></Button>
            <Button onClick={()=>handleLogout()} disabled={isPending} variant="outline">{isPending ? "Signing out..." : "Sign out"}</Button> */}

              {loading ? null : session ? (
    // USER LOGGED IN
    <Button
      onClick={handleLogout}
      disabled={isPending}
      variant="outline"
    >
      {isPending ? "Signing out..." : "Sign out"}
    </Button>
  ) : (
    // USER NOT LOGGED IN
    <Button asChild variant="outline">
      <Link href="/signin">Sign in</Link>
    </Button>
    
  )}

       
         {
           !session && <Button>Start for free</Button>
         }
            
          </div>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <a
                    href="https://www.shadcnblocks.com"
                    className="flex items-center gap-2"
                  >
                    <img
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
                      className="max-h-8"
                      alt="Shadcn UI Navbar"
                    />
                    <span className="text-lg font-semibold tracking-tighter">
                      Shadcnblocks.com
                    </span>
                  </a>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <div className="flex flex-col gap-6">
                  <a href="#" className="font-medium">
                    Templates
                  </a>
                  <a href="#" className="font-medium">
                    Blog
                  </a>
                  <a href="#" className="font-medium">
                    Pricing
                  </a>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <Link href="/signin"  className="bg-[#171717] text-white p-2 rounded-md text-center font-semibold">Sign in</Link>
                  <Button>Start for free</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export { Navbar };
