"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import CartModal from "./CartModal";
import { wixClientServer } from "@/lib/wixClientServer";
import { useWixClient } from "@/hooks/useWixClient";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const pathName = usePathname();

  const wixClient = useWixClient();

  const isLoggedIn = wixClient.auth.loggedIn();

  // Temporary
  // const isLoggedIn = false;

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };

  // AUTH WITH WIX-MANAGED AUTH
  // const wixClient = useWixClient();
  // const login = async () => {
  //   const loginRequestData = wixClient.auth.generateOAuthData(
  //     "http://localhost:3000",
  //     "https://huhamanhig-f0er--3000--e7ca9335.local-credentialless.webcontainer.io"
  //   );
  //   console.log(loginRequestData);

  //   localStorage.setItem("oAuthRedirectData", JSON.stringify(loginRequestData));
  //   const { authUrl } = await wixClient.auth.getAuthUrl(loginRequestData);
  //   window.location.href = authUrl;
  // };

  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    setIsLoading(false);
    setIsProfileOpen(false)
    router.push(logoutUrl);
  }

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        src="/profile.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={handleProfile}
        // onClick={login}
      ></Image>
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 left-0 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          <Link href="/">Profile</Link>
          <div className="mt-2 cursor-pointer" onClick={handleLogout}>{isLoading ? "Logging out" : "Logout"}</div>
        </div>
      )}

      <Image
        src="/notification.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
      ></Image>

      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <Image src="/cart.png" alt="" width={22} height={22}></Image>
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-theme1 rounded-full text-white text-sm flex items-center justify-center">
          2
        </div>
      </div>

      {isCartOpen && <CartModal />}
    </div>
  );
};

export default NavIcons;
