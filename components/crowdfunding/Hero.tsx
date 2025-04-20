"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BanIcon, MoreHorizontalIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CreateCampaign from './CreateCampaign';

const followers = [
  { username: "jane_doe", fullName: "Jane Doe" },
  { username: "tech_guru", fullName: "Alex Thompson" },
  { username: "nature_lover", fullName: "Emma Green" },
  { username: "photogirl", fullName: "Sophia Martinez" },
  { username: "code_master", fullName: "Liam Patel" },
];
const following = [
  { username: "startup_guy", fullName: "James Lee" },
  { username: "design_dreamer", fullName: "Mia Wilson" },
  { username: "art_addict", fullName: "Benjamin White" },
  { username: "web_wizard", fullName: "Lucas Nguyen" },
  { username: "health_nut", fullName: "Ella Singh" },
];
const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
const UserList = ({ users }: { users: typeof following }) => (
  <AnimatePresence>
    <motion.div
      className="space-y-4"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={listVariants}
    >
      {users.map(({ username, fullName }) => (
        <motion.div
          key={username}
          className="flex items-center gap-2 justify-between"
          variants={itemVariants}
          transition={{ type: "tween" }}
        >
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-secondary" />
            <div>
              <span className="block text-sm leading-none font-semibold">
                {fullName}
              </span>
              <span className="text-xs leading-none">@{username}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="outline">
              <MoreHorizontalIcon className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="outline" className="text-destructive">
              <BanIcon className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </AnimatePresence>
);

function Hero (createCampaign: any) {

  return (
    <div className='relative'>
      <span className='coverLine'></span>
      {/* <img
      src="https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260" className='absolute inset-0 object-cover w-full h-full'
      alt=""
      /> */}
      <div className='relative bg-opacity-75 backgroundMain'>
        {/* <svg
          className='absolute inset-x-0 bottom-0 text-white'
          viewBox="0 0 1160 163"
        >
          <path
            fill="currentColor"
            d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
          />
        </svg>
        <div className='w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12'>
          <h2 className='max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-none'>
            Crypto Exchange <br className='hidden:md:block' />
            Crowd Funding CE
          </h2>
          <p className='max-w-xl mb-4 text-base text-gray-200 md:text-lg'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, quod officia! Voluptate tempore error deserunt?
          </p>
          <a
            href="/"
            aria-label=""
            className='inline-flex items-center font-semibold tracking-wider text-white transition-colors duration-200 hover:text-violet-400'
          >Learn More
            <svg className='inline-block w-3 ml-2'
              fill="currentColor"
              viewBox='0 0 12 12'>
            </svg>
          </a>
        </div> */}


        <Tabs defaultValue="followers" className=" w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="all-campaigns">All Campaigns</TabsTrigger>
            <TabsTrigger value="my-campaigns">My Campaigns</TabsTrigger>
            <TabsTrigger value="create-campaign">Create Campaign</TabsTrigger>
          </TabsList>
          <div className="mt-2 p-4 rounded-md">
            <TabsContent value="all-campaigns">
              <UserList users={followers} />
            </TabsContent>
            <TabsContent value="my-campaigns">
              <UserList users={following} />
            </TabsContent>
            <TabsContent value="create-campaign">
              <AnimatePresence>
                <motion.div
                  className="space-y-4"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={listVariants}
                >
                  <CreateCampaign />
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default Hero
