"use client";

import React from "react";
import Hero from "./Hero";
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

const CrowdFundingMain = () => {
  return (
    <div className="ml-10 md:ml-20 p-8 md:p-10 rounded-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-6 flex-1 w-[90%] md:w-[93%] h-full">
      <h1 className="text-2xl font-bold text-white">Crowd Funding</h1>
      <div className='relative'>
        <span className='coverLine'></span>
        <div className='relative bg-opacity-75 backgroundMain'>
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
    </div>
  );
};

export default CrowdFundingMain;
