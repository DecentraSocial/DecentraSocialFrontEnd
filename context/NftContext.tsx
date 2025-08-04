"use client";
import React, { createContext, useReducer, useContext, useEffect, ReactNode } from "react";
import Web3 from "web3";
import { nftABI, nftAddress } from "@/abis/NFTMarketplaceAbi";
import axios from "axios";

interface MarketItem {
    tokenId: number;
    seller: string;
    owner: string;
    price: string;      // wei, as string
    sold: boolean;
    image?: string;     // URL to the NFT image (optional because you may not always have it immediately)
    name?: string;      // NFT name from metadata
    description?: string; // NFT description from metadata
}


interface State {
    web3: Web3 | null;
    account: string;
    contract: any;
    marketItems: MarketItem[];
    myNFTs: MarketItem[];
    listedNFTs: MarketItem[];
}

type Action =
    | { type: "SET_WEB3"; web3: Web3 }
    | { type: "SET_ACCOUNT"; account: string }
    | { type: "SET_CONTRACT"; contract: any }
    | { type: "SET_MARKET_ITEMS"; marketItems: MarketItem[] }
    | { type: "SET_MY_NFTS"; myNFTs: MarketItem[] }
    | { type: "SET_LISTED_NFTS"; listedNFTs: MarketItem[] };

const initialState: State = {
    web3: null,
    account: "",
    contract: null,
    marketItems: [],
    myNFTs: [],
    listedNFTs: [],
};

interface NFTMarketplaceContextType {
    state: State;
    dispatch: React.Dispatch<Action>;
    mintNFT: (tokenURI: string, priceInEther: string) => Promise<boolean>;
}

export const pinJSONToIPFS = async (jsonData: object) => {
    try {
        const res = await axios.post("/api/pinJSONToIPFS", jsonData);
        return res.data.IpfsHash; // Return CID
    } catch (error) {
        console.error("Failed to pin JSON", error);
        return null;
    }
};

const NFTMarketplaceContext = createContext<NFTMarketplaceContextType | undefined>(undefined);

function reducer (state: State, action: Action): State {
    switch (action.type) {
        case "SET_WEB3":
            return { ...state, web3: action.web3 };
        case "SET_ACCOUNT":
            return { ...state, account: action.account };
        case "SET_CONTRACT":
            return { ...state, contract: action.contract };
        case "SET_MARKET_ITEMS":
            return { ...state, marketItems: action.marketItems };
        case "SET_MY_NFTS":
            return { ...state, myNFTs: action.myNFTs };
        case "SET_LISTED_NFTS":
            return { ...state, listedNFTs: action.listedNFTs };
        default:
            return state;
    }
}

export const NFTMarketplaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        async function init () {
            if (typeof window !== "undefined" && window.ethereum) {
                try {
                    const web3 = new Web3(window.ethereum);
                    await window.ethereum.request({ method: "eth_requestAccounts" });
                    const accounts = await web3.eth.getAccounts();

                    const contractAddress = nftAddress;
                    const contract = new web3.eth.Contract(nftABI as any, contractAddress);

                    dispatch({ type: "SET_WEB3", web3 });
                    dispatch({ type: "SET_ACCOUNT", account: accounts[0] });
                    dispatch({ type: "SET_CONTRACT", contract });
                } catch (err) {
                    console.error("Web3 init failed", err);
                }
            }
        }
        init();
    }, []);

    const mintNFT = async (
        tokenURI: string,
        priceInEther: string
    ): Promise<boolean> => {
        if (!state.contract || !state.account) throw new Error("Wallet or contract not ready");
        const listingPrice = await state.contract.methods.getListingPrice().call();
        try {
            await state.contract.methods
                .createToken(tokenURI, Web3.utils.toWei(priceInEther, "ether"))
                .send({ from: state.account, value: listingPrice });
            return true;
        } catch (err) {
            console.error("Minting failed", err);
            return false;
        }
    };

    return (
        <NFTMarketplaceContext.Provider value={{ state, dispatch, mintNFT }}>
            {children}
        </NFTMarketplaceContext.Provider>
    );
};

export function useNFTMarketplace () {
    const context = useContext(NFTMarketplaceContext);
    if (!context) {
        throw new Error("useNFTMarketplace must be used within NFTMarketplaceProvider");
    }
    return context;
}
