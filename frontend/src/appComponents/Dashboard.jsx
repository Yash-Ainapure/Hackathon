"use client";
import { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import Banner from '../assets/banner.jpg'
import GridViewIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/List';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import GitHubIcon from '@mui/icons-material/GitHub';
import SearchIcon from '@mui/icons-material/Search';
import Navbar from "./Navbar";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

export default function Dashboard() {

  
  
  const links = [
    {
      label: "CoMeet",
      href: "/dashboard/CoMeet",
      icon: (
        <VideoCallIcon className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Board",
      href: "/dashboard/board",
      icon: (
        <GridViewIcon className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "List",
      href: "/dashboard/list",
      icon: (
        <ListIcon className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Chat",
      href: "/dashboard/messages",
      icon: (
        <ChatBubbleOutlineIcon className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Github Stats",
      href: "/dashboard/githubStats",
      icon: (
        <GitHubIcon className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "/",
      icon: (
        <IconArrowLeft className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    (
    
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 min-h-screen w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        // for your use case, use `h-screen` instead of `h-[60vh]`
        "h-[60vh]"
      )}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="flex flex-col gap-2 mt-8">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Pawan Malgavi",
                href: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="flex-shrink-0 rounded-full h-7 w-7"
                    width={50}
                    height={50}
                    alt="Avatar" />
                ),
              }} />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="w-full">
        {/* <div className="flex items-center justify-between w-full p-2 px-24 border-b">
          <div className="flex gap-4">
            <select name="" id="" className="font-semibold bg-transparent text-sky-800">
              <option value="">Projects</option>
              <option value="">Project 1</option>
              <option value="">Project 2</option>
            </select>
            <button className="px-4 py-2 font-semibold text-white rounded bg-sky-600">Create</button>
          </div>
          <div className="flex gap-4">
            <div className="flex p-[1px] pl-2 bg-white border rounded-md shadow items-center">
              <SearchIcon className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
              <input className="pl-2" placeholder="Search" type="text" ></input>
            </div>
            <div className="pr-2">
              <img className="w-12 h-12 rounded-full" src="https://assets.aceternity.com/manu.png" />
            </div>
            <CircleNotificationsIcon style={{ fontSize: '45px' }} />
          </div>
        </div> */}
        <DashboardInner />
      </div>
    </div>)
  );
}
export const Logo = () => {
  return (
    (<Link
      href="#"
      className="relative z-20 flex items-center py-1 space-x-2 text-sm font-normal text-black">
      <div
        className="flex-shrink-0 w-6 h-5 bg-black rounded-tl-lg rounded-tr-sm rounded-bl-sm rounded-br-lg dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black whitespace-pre dark:text-white">
        CoLab
      </motion.span>
    </Link>)
  );
};
export const LogoIcon = () => {
  return (
    (<Link
      href="#"
      className="relative z-20 flex items-center py-1 space-x-2 text-sm font-normal text-black">
      <div
        className="flex-shrink-0 w-6 h-5 bg-black rounded-tl-lg rounded-tr-sm rounded-bl-sm rounded-br-lg dark:bg-white" />
    </Link>)
  );
};

// Dummy dashboard component with content
const DashboardInner = () => {
  return (
    <div className="w-full min-h-screen overflow-scroll border-l">
      <Outlet />
    </div>
  );
};
