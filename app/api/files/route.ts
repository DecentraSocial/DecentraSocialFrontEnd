import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    console.log("Data: ", data);
    const res = await axios("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
      data: data,
    });
    const { IpfsHash } = await res.data;
    console.log("Ipfs hash:", IpfsHash);
    return NextResponse.json({ IpfsHash }, { status: 200 });
  } catch (e: any) {
    console.log("Error from backend:", e.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
