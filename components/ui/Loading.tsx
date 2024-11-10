import React from 'react'

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen -m-10">
            <div className="pyramid-loader">
                <div className="wrapper">
                    <span className="side side1"></span>
                    <span className="side side2"></span>
                    <span className="side side3"></span>
                    <span className="side side4"></span>
                    <span className="shadow"></span>
                </div>
            </div>
            <p className="text-2xl md:text-3xl text-white">Loading...</p>
        </div>
    )
}

export default Loading
