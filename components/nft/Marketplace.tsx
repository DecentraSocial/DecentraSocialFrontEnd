import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NFTMarketplaceProvider } from "@/context/NftContext";
import HomeTab from './HomeTab';
import MyNFTsTab from './MyNFTsTab';
import ListedNFTsTab from './ListedNFTsTab';
import SellNFTTab from './SellNFTTab';

const Marketplace = () => {
    return (
        <NFTMarketplaceProvider>
            <div className="ml-10 md:ml-20 p-8 md:p-10 rounded-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-6 flex-1 w-[90%] md:w-[93%] h-full">
                <h1 className="text-2xl font-bold text-white">NFT Marketplace</h1>
                <div className='relative'>
                    <span className='coverLine'></span>
                    <div className='relative bg-opacity-75 backgroundMain'>
                        <Tabs defaultValue="home" className=" w-full">
                            <TabsList className="w-full grid grid-cols-4">
                                <TabsTrigger value="home">Home</TabsTrigger>
                                <TabsTrigger value="my">My NFTs</TabsTrigger>
                                <TabsTrigger value="listed">Listed NFTs</TabsTrigger>
                                <TabsTrigger value="sell">Sell NFT</TabsTrigger>
                            </TabsList>
                            <div className="mt-2 p-4 rounded-md">
                                <TabsContent value="home">
                                    <HomeTab />
                                </TabsContent>
                                <TabsContent value="my">
                                    <MyNFTsTab />
                                </TabsContent>
                                <TabsContent value="listed">
                                    <ListedNFTsTab />
                                </TabsContent>
                                <TabsContent value="sell">
                                    <SellNFTTab />
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </div>
        </NFTMarketplaceProvider>
    )
}

export default Marketplace
