"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Web3 from "web3";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { BanIcon, MoreHorizontalIcon } from "lucide-react";
import { ABI, ADDRESS } from "@/abis/crowdfundingAbi";
import { useCrowdFunding } from "@/context/CrowdFundingProvider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateCampaign from "./CreateCampaignPage";
import AllCampaigns from "./AllCampaigns";
import DonationPopup from "./DonationPopup";
import MyCampaigns from "./MyCampaigns";

declare global {
  interface Window {
    ethereum?: any;
  }
}

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
  const [{
    providers,
    accounts,
    id
  }, dispatch] = useCrowdFunding();
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState("");
  const [getAll, setAll] = useState<any[]>([]);
  const [userAll, setUserAll] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState<{ decription?: string }>({
    decription: "Crowd Funding Contract"
  });

  const provider = typeof window !== "undefined" && (window.ethereum as any);

  useEffect(() => {
    connect();
    allcampaign();
    usercampaign();
  }, [userAll, getAll]);

  const connect = async () => {
    try {
      if (!provider) {
        toast.success('Please install MetaMask', {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: 'yellow',
          },
          iconTheme: {
            primary: 'yellow',
            secondary: 'brown',
          },
        });
        alert("Please install MetaMask");
        return;
      }

      const accountsList = await provider.request({ method: "eth_requestAccounts" });

      if (accountsList.length) {
        setWalletAddress(accountsList[0]);
        dispatch({
          type: "SET_ACCOUNT",
          account: accounts[0],
        });
      }

      dispatch({
        type: "SET_PROVIDER",
        providers: provider,
      });
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  const getContract = async () => {
    const web3 = new Web3(provider);
    const contractInstance = new web3.eth.Contract(ABI, ADDRESS);
    dispatch({
      type: "SET_CONTRACT",
      contract: contractInstance,
    });
    return contractInstance;
  };

  const createCampaign = async (campaign: {
    title: string;
    decription: string;
    amount: string;
    deadline: string;
  }) => {
    const { title, decription, amount, deadline } = campaign;
    const contract = await getContract();
    console.log("Accounts:", accounts);
    console.log("amount in wei: ", Web3.utils.toWei(amount, "ether"))
    try {
      const tx = await contract.methods
        .createCampaign(
          accounts,
          title,
          decription,
          Web3.utils.toWei(amount, "ether"),
          new Date(deadline).getTime()
        )
        .send({ from: accounts });
      toast.success("Campaign created successfully!");
      console.log("Campaign created successfully:", tx);
      router.push("/crowdfunding")
    } catch (error) {
      toast.error("Failed to create campaign. Please try again.");
      console.error("Failed to create campaign:", error);
    }
  };

  const allcampaign = async (): Promise<any[]> => {
    const contract = await getContract();
    const res = await contract.methods.getCompaigns().call();
    const campaignsArray = Array.isArray(res) ? res : [];
    const parsed = campaignsArray.map((item: any, i: number) => ({
      owner: item.owner,
      title: item.title,
      description: item.decription,
      target: Web3.utils.fromWei(item.target.toString(), "ether"),
      deadline: parseInt(item.deadline),
      amountCollected: Web3.utils.fromWei(item.amountCollected.toString(), "ether"),
      pid: i,
    }));

    dispatch({
      type: "GET_ALL_COMPAIGN",
      get: parsed,
    });
    // setGet(parsed); // global state
    setAll(parsed); // local copy
    return parsed;
  };

  const usercampaign = async () => {
    const campaigns = await allcampaign();

    const filtered = campaigns.filter(
      (item: any) => item.owner.toLowerCase().toString() === accounts.toLowerCase()
    );

    dispatch({
      type: "SET_USER_CAMPAIGN",
      user: filtered,
    });
    // setUser(filtered); // global
    setUserAll(filtered); // local
    return filtered;
  };

  const donate = async (campaignId: number, amount: string) => {
    const contract = await getContract();
    const valueInWei = Web3.utils.toWei(amount, "ether");

    const tx = await contract.methods
      .donateToCompaign(campaignId, {
        value: valueInWei
      })
      .send({ from: accounts });
    // const tx = await contract.methods
    //   .donateToCompaign(campaignId)
    //   .send({ from: accounts, value: valueInWei });

    console.log("Donation success:", tx);
    return tx;
  };

  const getDonations = async (): Promise<{ donator: string; donation: string }[]> => {
    const contract = await getContract();
    console.log("Getting donations for ID:", id);

    const donations: [string[], string[]] = await contract.methods.getDonaters(id).call();

    const lengths = donations[0].length;
    const parsedDonations = [];

    for (let i = 0; i < lengths; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: Web3.utils.fromWei(donations[1][i], "ether"),
      });
    }

    console.log("Parsed donations:", parsedDonations);
    return parsedDonations;
  };

  return (
    <div className="ml-10 md:ml-20 p-8 md:p-10 rounded-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-6 flex-1 w-[90%] md:w-[93%] h-full">
      <h1 className="text-2xl font-bold text-white">Crowd Funding</h1>
      <div className='relative'>
        <span className='coverLine'></span>
        <div className='relative bg-opacity-75 backgroundMain'>
          <Tabs defaultValue="all-campaigns" className=" w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="all-campaigns">All Campaigns</TabsTrigger>
              <TabsTrigger value="my-campaigns">My Campaigns</TabsTrigger>
              <TabsTrigger value="create-campaign">Create Campaign</TabsTrigger>
            </TabsList>
            <div className="mt-2 p-4 rounded-md">
              <TabsContent value="all-campaigns">
                <AllCampaigns title="All Listed Campaigns" setOpenModal={setOpenModal} />
              </TabsContent>
              <TabsContent value="my-campaigns">
                <MyCampaigns title="Your Created Campaigns" setOpenModal={setOpenModal} />
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
                    <CreateCampaign createCampaign={createCampaign} />
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
            </div>
          </Tabs>
        </div>
        {openModal && (
          <DonationPopup
            setOpenModal={setOpenModal}
            getDonations={getDonations}
            donate={donateCampaign}
            donateFunction={donate}
          />
        )}
      </div>
    </div>
  );
};

export default CrowdFundingMain;
