import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import { SparklesCore } from "../components/ui/sparkles";

export default function Footer() {
  return (
    <div className="flex flex-col items-center pt-10 mt-8 bg-black">
      <div className="flex flex-col items-center justify-center w-full overflow-hidden bg-black rounded-md">
        <h1 className="relative z-20 text-3xl mb-4 font-bold text-center text-white md:text-3xl lg:text-3xl">
          CoLab
        </h1>
        <div className="w-[40rem] h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute top-0 w-3/4 h-px inset-x-20 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute top-0 w-1/4 h-px inset-x-60 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-4/5 pb-4 mx-5 text-white border-b border-gray-300">
        <div className="md:w-2/5">
          <p className="md:w-4/5 text-center pb-10">
            Empower remote teamwork, streamline success together.
          </p>
        </div>
        <div className="flex flex-row md:flex-row md:w-3/5 justify-around">
          <div className="flex flex-col md:flex-col md:w-3/5">
            <h1 className="text-xl font-bold ">Routes</h1>
            <p className="my-1 text-sm">About us</p>
            <p className="my-1 text-sm">Features</p>
            <p className="my-1 text-sm">Projects</p>
            <p className="my-1 text-sm">Dashboard</p>
            <p className="my-1 text-sm">Sign Up</p>
          </div>
          <div className="flex flex-col md:flex-col md:w-3/5 ">
            <h1 className="text-xl font-bold ">Others</h1>
            <p className="my-1 text-sm">Testimonials</p>
            <p className="my-1 text-sm">Feedback</p>
          </div>
          
        </div>
        <div className="flex flex-col pt-4 md:pt-0">
            <h1 className="text-xl font-bold text-center md:text-left pb-2 pt-4">Get In Touch</h1>
            <div className="flex justify-around md:w-2/5 my-2">
              <GitHubIcon />
              <WhatsAppIcon />
              <InstagramIcon />
            </div>
          </div>
      </div>
      <div className="flex items-center justify-center w-full pt-2 pb-8 text-white">
        <p>© 2024 CoLab. All rights reserved</p>
      </div>
    </div>
  );
}
