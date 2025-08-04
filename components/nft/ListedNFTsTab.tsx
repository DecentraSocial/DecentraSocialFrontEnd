"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Web3 from "web3";
import axios from "axios";
import { useNFTMarketplace } from "@/context/NftContext";

const ListedNFTsTab = () => {
    const { state, dispatch } = useNFTMarketplace();
    const { contract, account, listedNFTs } = state;

    async function loadListedNFTs () {
        if (!contract || !account) return;
        const items = await contract.methods.fetchItemsListed().call({ from: account });
        const itemsWithMetadata = await Promise.all(
            items.map(async (item: any) => {
                try {
                    const tokenUri = await contract.methods.tokenURI(item.tokenId).call();
                    const meta = await axios.get(tokenUri);
                    return {
                        tokenId: Number(item.tokenId),
                        seller: item.seller,
                        owner: item.owner,
                        price: item.price,
                        sold: item.sold,
                        image: meta.data.image || "",
                        name: meta.data.name || "",
                        description: meta.data.description || "",
                    };
                } catch {
                    return { ...item, image: "", name: "", description: "" };
                }
            })
        );
        dispatch({ type: "SET_LISTED_NFTS", listedNFTs: itemsWithMetadata });
    }

    useEffect(() => {
        loadListedNFTs();
    }, [contract, account]);

    return (
        <div>
            {listedNFTs.length === 0 && <p className='text-white'>You haven&apos;t listed any NFTs for sale.</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {listedNFTs.map((nft, i) => (

                    <div
                        key={i}
                        className="border shadow rounded-xl overflow-hidden mx-3 my-7"
                    >
                        <div className="relative w-full h-72">
                            <Image
                                src={nft.image ? nft.image : "/placeholder.jpg"}
                                alt={nft.name || "NFT Image"}
                                placeholder="blur"
                                blurDataURL="/placeholder.jpg"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className="p-4">
                            <p
                                style={{ height: "5vw" }}
                                className="text-2xl font-semibold text-white"
                            >
                                {nft.name || "NFT Name"}
                            </p>
                            <div style={{ height: "70px", overflow: "hidden" }}>
                                <p className="text-gray-400">
                                    {nft.description || "NFT Description"}
                                </p>
                            </div>
                        </div>
                        <div className="p-4 bg-black">
                            <p className="text-2xl mb-4 font-bold text-white">
                                {Web3?.utils.fromWei(nft.price, "ether")} ETH
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListedNFTsTab;
