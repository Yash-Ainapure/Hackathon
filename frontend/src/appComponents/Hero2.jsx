import React from 'react'
import banner from '../assets/banner.jpg'
function Hero2() {
    return (
        <div className='mt-[150px] px-40 m-5 '>

            <div className='overflow-hidden border border-2 bg-white text-white bg-gradient-to-br from-blue-800 to-purple-900 flex items-center rounded-xl'>
                <p className='text-md px-8'><span className='font-bold'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span> A aperiam officia, maiores ipsam ratione repellat reiciendis veritatis, vero eveniet quibusdam quisquam alias debitis id? Officiis sunt numquam, eos neque in atque animi molestiae obcaecati doloribus laudantium alias? Hic nisi placeat molestias obcaecati veritatis pariatur, sint sunt laudantium totam, maiores ex.
                </p>
                <img src={banner} className='w-[500px] rounded-r-md' alt="" />
            </div>

            <div className='overflow-hidden my-8 border border-2 bg-white p-4 flex items-center  rounded-xl gap-2 '>
                <img src={banner} className='w-[500px] rounded-md' alt="" />
                <p className='text-md px-8'><span className='font-bold'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span> A aperiam officia, maiores ipsam ratione repellat reiciendis veritatis, vero eveniet quibusdam quisquam alias debitis id? Officiis sunt numquam, eos neque in atque animi molestiae obcaecati doloribus laudantium alias? Hic nisi placeat molestias obcaecati veritatis pariatur, sint sunt laudantium totam, maiores ex.
                </p>
                
            </div>

            <div className='overflow-hidden border bg-white text-white bg-gradient-to-br from-blue-800 to-purple-900 flex items-center rounded-xl'>
                <p className='text-md px-8'><span className='font-bold'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span> A aperiam officia, maiores ipsam ratione repellat reiciendis veritatis, vero eveniet quibusdam quisquam alias debitis id? Officiis sunt numquam, eos neque in atque animi molestiae obcaecati doloribus laudantium alias? Hic nisi placeat molestias obcaecati veritatis pariatur, sint sunt laudantium totam, maiores ex.
                </p>
                <img src={banner} className='w-[500px] rounded-r-md' alt="" />
            </div>
        </div>
    )
}

export default Hero2