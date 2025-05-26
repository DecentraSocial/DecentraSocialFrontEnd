"use client";
import React, { useState } from "react";
import { useNFTMarketplace } from "@/context/NftContext";

const MintNFTTab = () => {
    const { mintNFT } = useNFTMarketplace();
    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState(false);

    // Upload file to Pinata API route
    async function uploadToIPFS (): Promise<string | null> {
        if (!file) return null;
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/pinFileToIPFS", { method: "POST", body: formData });
        const data = await res.json();
        if (data.IpfsHash) return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
        return null;
    }

    // Upload JSON metadata to Pinata
    async function uploadMetadataToIPFS (metadata: object): Promise<string | null> {
        const res = await fetch("/api/pinJSONToIPFS", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(metadata),
        });
        const data = await res.json();
        if (data.IpfsHash) return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
        return null;
    }

    async function handleMint () {
        if (!file || !name || !description || !price) return alert("Please fill all fields and select a file");

        setLoading(true);
        try {
            const imageURI = await uploadToIPFS();
            if (!imageURI) throw new Error("Image upload failed");

            const metadata = { name, description, image: imageURI };
            const metadataURI = await uploadMetadataToIPFS(metadata);
            if (!metadataURI) throw new Error("Metadata upload failed");

            const success = await mintNFT(metadataURI, price);
            if (success) alert("NFT minted and listed!");
            else alert("Minting failed");
        } catch (err: any) {
            alert(err.message || "Error minting NFT");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto text-white">
            <input type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} className="mb-4" />
            <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="mb-4 p-2 w-full text-black rounded" />
            <input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mb-4 p-2 w-full text-black rounded"
            />
            <input
                placeholder="Price in ETH"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mb-4 p-2 w-full text-black rounded"
            />
            <button
                disabled={loading}
                onClick={handleMint}
                className="w-full py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-600"
            >
                {loading ? "Minting..." : "Mint NFT"}
            </button>
        </div>
    );
};

export default MintNFTTab;
