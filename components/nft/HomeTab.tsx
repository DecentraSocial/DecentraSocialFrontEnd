"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import axios from 'axios';
import { useNFTMarketplace } from '@/context/NftContext';

const HomeTab = () => {
    const { state, dispatch } = useNFTMarketplace();
    const { contract, web3, account, marketItems } = state;
    const [loading, setLoading] = useState(false);

    async function loadMarketItems () {
        setLoading(true);
        if (!contract) return;
        const items = await contract.methods.fetchMarketItems().call();

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
        dispatch({ type: "SET_MARKET_ITEMS", marketItems: itemsWithMetadata });
        setLoading(false);
    }

    async function buyNFT (tokenId: number, price: string) {
        if (!contract || !account) return alert("Connect wallet first");
        try {
            await contract.methods.createMarketSale(tokenId).send({ from: account, value: price });
            alert("NFT bought!");
            await loadMarketItems();
        } catch (err) {
            alert("Purchase failed");
            console.error(err);
        }
    }

    useEffect(() => {
        loadMarketItems();
    }, [contract]);

    if (loading)
        return (
            <div>
                <p className="text-3xl px-20 py-10 text-white">Loading...</p>
            </div>
        );

    return (
        <div>
            {marketItems.length === 0 && <p className='text-white'>No NFTs listed for sale</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {marketItems.map((nft, i) => (
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
                                {web3?.utils.fromWei(nft.price, "ether")} ETH
                            </p>
                            <button
                                className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
                                onClick={() => buyNFT(nft.tokenId, nft.price)}
                            >
                                Buy now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomeTab
