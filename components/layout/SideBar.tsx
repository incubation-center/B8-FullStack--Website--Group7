/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

import { HomePageTab } from "@/utils/enum";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { AuthAtom } from "@/service/recoil";
import { HTMLAttributes, useEffect } from "react";
import HomeSvg from "../icon/side-nav/Home";
import SavedSvg from "../icon/side-nav/Saved";
import RequestStatusSvg from "../icon/side-nav/RequestStatus";
import ProfileSvg from "../icon/side-nav/Profile";

import LocaleSwitching from "../LocaleSwitching";
import { useTranslation } from "next-i18next";
import { useLocale } from "@/utils/function";
import { useRouter } from "next/router";
import ThemeSwitching from "../ThemeSwitching";

function SideBar({
  currentTab,
  handlePageRouting,
  isMobile = false,
}: {
  currentTab: HomePageTab;
  handlePageRouting: (tab: HomePageTab) => void;
  isMobile?: boolean;
}) {
  const authStore = useRecoilValue(AuthAtom);
  const router = useRouter();
  const { t } = useTranslation("homepage");

  const handleTranslate = () => {
    switch (currentTab) {
      case HomePageTab.HOME:
        return "translate-y-0";
      case HomePageTab.SAVED:
        return "translate-y-12";
      case HomePageTab.REQUEST_STATUS:
        return "translate-y-24";
      case HomePageTab.PROFILE:
        return "translate-y-[9rem]";
    }
  };

  return (
    <div
      className={`
        w-[250px] h-full px-[16px] 
        ${isMobile ? "flex bg-primary py-10 z-50" : "hidden md:flex"}
         flex-col
         space-y-4
      `}
    >
      {/* logo */}
      {isMobile && (
        <div className='flex justify-center items-center mb-10'>
          <img src='/bootcamp-logo.png' alt='logo' className='w-2/3 h-auto' />
        </div>
      )}

      <div className='relative'>
        <div className='z-10 px-2'>
          <NavbarBtn
            title={t("homepage-tab.sidebar.home", "Home")}
            Icon={HomeSvg}
            isCurrentTab={currentTab === HomePageTab.HOME}
            onClick={() => handlePageRouting(HomePageTab.HOME)}
          />
          <NavbarBtn
            title={t("homepage-tab.sidebar.save", "Saved")}
            Icon={SavedSvg}
            isCurrentTab={currentTab === HomePageTab.SAVED}
            onClick={() => handlePageRouting(HomePageTab.SAVED)}
          />
          <NavbarBtn
            title={t("homepage-tab.sidebar.request", "Request Status")}
            Icon={RequestStatusSvg}
            isCurrentTab={currentTab === HomePageTab.REQUEST_STATUS}
            onClick={() => handlePageRouting(HomePageTab.REQUEST_STATUS)}
          />
          <NavbarBtn
            title={t("homepage-tab.sidebar.profile", "Profile")}
            Icon={ProfileSvg}
            isCurrentTab={currentTab === HomePageTab.PROFILE}
            onClick={() => handlePageRouting(HomePageTab.PROFILE)}
          />
        </div>

        {/* slide active button */}
        <div
          className={`
            z-0 w-full h-12 rounded-full bg-white
            absolute top-0 right-0
            transition-all duration-300
            transform ${handleTranslate()}
          `}
        ></div>
      </div>

      <div className='flex-1'></div>

      <ThemeSwitching />

      {/* switching locale */}
      <LocaleSwitching />

      {/* admin */}
      {!authStore.isLoggedIn && (
        <Link
          href='/auth'
          className='
              px-4 py-2 rounded-full
              bg-alt-secondary text-primary font-medium
              transition-colors
              box-border border-2 border-alt-secondary hover:border-action
              whitespace-nowrap md:hidden
            '
          locale={router.locale}
        >
          {t("homepage-tab.sidebar.login-btn", "Login")}
        </Link>
      )}
      {authStore.isAdmin && (
        <Link
          href='/admin'
          className='
            w-full bg-action text-primary font-bold
            rounded-full p-2 px-4
            flex items-center justify-center cursor-pointer 
            hover:shadow-xl
          '
          locale={router.locale}
        >
          {t("homepage-tab.sidebar.admin-btn", "Admin")}
        </Link>
      )}
    </div>
  );
}

export default SideBar;

function NavbarBtn({
  title,
  Icon,
  isCurrentTab,
  onClick,
}: {
  title: string;
  isCurrentTab?: boolean;
  Icon: ({
    className,
  }: {
    className?: HTMLAttributes<HTMLElement>["className"];
  }) => JSX.Element;
  onClick: () => void;
}) {
  const { isKhmer } = useLocale();

  return (
    <div
      className={`flex items-center justify-start cursor-pointer rounded-xl 
      ${isCurrentTab ? "text-primary delay-400" : "text-alt-secondary"}
      p-2 px-4
      transition-all 
      h-12 z-10 
      `}
      onClick={onClick}
    >
      <Icon
        className={`
        h-6 w-6 z-10 ${
          isCurrentTab ? "fill-primary delay-400" : "fill-alt-secondary"
        }
        transition-all
        `}
      />
      <div
        className={`ml-[12px] ${
          isKhmer ? "font-medium" : "font-bold"
        } z-10 align-baseline`}
      >
        {title}
      </div>
    </div>
  );
}
