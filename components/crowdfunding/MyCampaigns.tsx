"use client";
import { useCrowdFunding } from '@/context/CrowdFundingProvider';
import React from 'react'

const MyCampaigns = ({ title, setOpenModal }: { title: string, setOpenModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [{ user }, dispatch] = useCrowdFunding();
    const userCard = user;

    interface DaysLeftFunction {
        (deadline: string | number | Date): string;
    }

    const daysLeft: DaysLeftFunction = (deadline) => {
        const diff = new Date(deadline).getTime() - Date.now();
        const remaingDays = diff / (1000 * 60 * 60 * 24);
        return remaingDays.toFixed(0);
    };

    const set = async (e: React.FormEvent, title: string, pid: number) => {
        e.preventDefault();

        setOpenModal(true);
        dispatch({
            type: 'SET_DONATE',
            donate: pid
        })

        dispatch({
            type: 'SET_TITLE',
            title: title
        })
    }
    return (
        <div className='px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl mdLpx-24 lg:px-8'>
            <p className='py-12 text-2xl font-bold leading-5 text-white'>{title}</p>
            <div className='grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full'>
                {
                    userCard.map((item, i) => (
                        <div
                            // onClick={()=>(setOpenModal(true),setDonate(item.pid))}
                            onClick={(e) => (set(e, item.title, item.pid))}
                            key={i + 1}
                            className='cursor-pointer border overflow-hidden transition-shadow duration-300 bg-white rounded'
                        >
                            {/* <img
              src="https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260" className='absolute inset-0 object-cover w-full h-64'
              alt=""
            /> */}

                            <div className='py-5 pl-2'>
                                <p className='mb-2 text-xs font-semibold text-gray-600 uppercase'>
                                    Days Left: {daysLeft(item.deadline)}
                                </p>
                                <a
                                    href="/"
                                    aria-label="Article"
                                    className='inline-block mb-3 text-blck transitions-colors duration-200 hover:text-deep-purple-accent-400'
                                >
                                    <p className='text-2xl font-bold leading-5'>{item.title}</p>
                                </a>
                                <p className='mb-4 text-gray-700'>{item.description}</p>
                                <div className='flex space-x-4'>
                                    <p className='font-semibold'>
                                        Target:{item.target} ETH
                                    </p>
                                    {/* <p className='font-semibold'>
                  Raised:{item.raised} ETH
                </p> */}
                                </div>
                            </div>

                        </div>
                    )
                    )}
            </div>
        </div>
    )
}

export default MyCampaigns
