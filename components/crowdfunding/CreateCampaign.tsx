"use client"
import React, { useState } from 'react'
import ExpandingButton from '../ui/ExpandingButton'

const CreateCampaign = (createCampaign: any) => {
    const [campaign, setCampaign] = useState({
        title: "",
        decription: "",
        amount: "",
        deadline: ""
    })
    const createNewCampaign = async (e: any) => {
        e.preventDefault();
        try {
            const data = await createCampaign(campaign)
            // console.log("add camapiangn",data);
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='relative'>
            <span className='coverLine'></span>
            {/* <img
                src="https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260" className='absolute inset-0 object-cover w-full h-full'
                alt=""
            /> */}
            <div className='relative bg-opacity-75 backgroundMain'>
                <div className='relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 flex flex-col md:flex-row justify-evenly'>
                    <div className='w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12'>
                        <h2 className='max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-none'>
                            Crypto Exchange <br className='hidden:md:block' />
                            Crowd Funding
                        </h2>
                        <p className='font-semibold text-white mb-4'>Raise and Contribute with Crypto</p>
                        <p className='max-w-xl mb-4 text-base text-gray-200 md:text-lg'>
                            Our decentralized platform lets you easily raise funds for your ideas—or support the ones you believe in. Secure, transparent, and powered by the blockchain, it&apos;s crowdfunding reimagined for the Web3 world.
                        </p>
                        {/* <a
                            href="/"
                            aria-label=""
                            className='inline-flex items-center font-semibold tracking-wider text-white transition-colors duration-200 hover:text-violet-400'
                        >Learn More
                        </a> */}
                        <img
                            src="/crowd-funding.png" className='w-full'
                            alt="crowd-funding"
                        />
                    </div>
                    <div className='w-full max-w-xl xl:px-8 xl:w-5/12'>
                        <div className='rounded shadow-2xl p-7 sm:p-10'>
                            <h3 className='mb-4 text-xl text-white font-semibold sm:text-center sm:mb-6 sm:text-2xl'>
                                Create Campaign
                            </h3>
                            <form>

                                <div className='mb-1 sm:mb-2'>
                                    <label htmlFor="firstname" className='inline-block text-white mb-1 font-medium'>Title</label>
                                    <input onChange={(e) => setCampaign({
                                        ...campaign,
                                        title: e.target.value
                                    })} type="text" name="firstname" placeholder="Enter title" className='flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outine' id="firstname" required />
                                </div>

                                <div className='mb-1 sm:mb-2'>
                                    <label htmlFor="description" className='inline-block text-white mb-1 font-medium'>Description</label>
                                    <input onChange={(e) => setCampaign({
                                        ...campaign,
                                        decription: e.target.value
                                    })} type="text" name="decription" placeholder="Enter description" className='flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outine' id="decription" required />
                                </div>

                                <div className='mb-1 sm:mb-2'>
                                    <label htmlFor="amount" className='inline-block text-white mb-1 font-medium'>Amount</label>
                                    <input onChange={(e) => setCampaign({
                                        ...campaign,
                                        amount: e.target.value
                                    })} type="text" name="amount" placeholder="Enter amount" className='flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outine' id="amount" required />
                                </div>

                                <div className='mb-1 sm:mb-2'>
                                    <label htmlFor="deadline" className='inline-block text-white mb-1 font-medium'>Deadline</label>
                                    <input onChange={(e) => setCampaign({
                                        ...campaign,
                                        deadline: e.target.value
                                    })} type="date" name="deadline" placeholder="Enter deadline" className='flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outine' id="deadline" required />
                                </div>

                                <div className='mt-4 mb-2 sm:mb-4'>
                                    <ExpandingButton onClick={(e: any) => createNewCampaign(e)} label="Create Campaign" />
                                    {/* <button onClick={(e) => createNewComapign(e)}
                                        type="submit"
                                        className='inline-flex items-center justify-center h-12 px-6 font-semibold tracking-wide text-white transition duration-200 bg-teal-accent-400 rounded shadow-md hover:bg-violet-700 focus:shadow-outline focus:outline-none newColor'>
                                        Create Campaign
                                    </button> */}
                                </div>
                                <p className='text-xs text-gray600 sm:text-sm'>Create Your Campaign For Raising Funds</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCampaign
