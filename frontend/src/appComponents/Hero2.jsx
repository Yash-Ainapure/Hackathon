import React from 'react'
import banner from '../assets/banner.jpg'
import Ilustration from '../assets/illustration_1.jpg'
import Ilustration2 from '../assets/illustration_2.jpg'
import Ilustration3 from '../assets/illustration_3.jpg'
function Hero2() {
    return (
        <div className='mt-[100px] px-40 m-5 '>

            <div className='flex items-center overflow-hidden text-xl text-white bg-white border border-2 bg-gradient-to-br from-blue-800 to-purple-900 rounded-xl'>
                <p className='px-8 text-md'>Welcome to CoLab , your ultimate platform for seamless remote project collaboration. Whether youre a small team or a large enterprise, our platform is designed to enhance productivity and streamline communication across all stages of your projects.
                </p>
                <img src={Ilustration} className='w-[500px] max-h-[350px] rounded-r-md' alt="" />
            </div>

            <div className='flex items-center gap-2 p-4 my-8 overflow-hidden bg-white border border-2 rounded-xl '>
                <img src={Ilustration3} className='w-[500px] rounded-md' alt="" />
                <p className='px-8 text-md'>
                    <p className='text-xl font-bold'>Features:</p>
                    <ul>
                        <li>
                            <strong>Video Calling:</strong> Conduct face-to-face meetings and discussions with high-definition video calls. Stay connected effortlessly, no matter where your team members are located.
                        </li>
                        <li>
                            <strong>Chat System:</strong> Real-time messaging ensures instant communication. Share ideas, updates, and feedback instantly within your team or specific project groups.
                        </li>
                        <li>
                            <strong>Task Assigning:</strong> Assign tasks, set deadlines, and track progress effortlessly. Keep everyone aligned with clear responsibilities and milestones.
                        </li>
                        <li>
                            <strong>Project Dashboard:</strong> Gain insights into project progress with an intuitive dashboard. Track timelines, milestones, and team performance metrics at a glance.
                        </li>
                        <li>
                            <strong>Customizable Workflows:</strong> Tailor workflows to fit your teams unique processes. From agile sprints to traditional project management, adapt our platform to suit your needs.
                        </li>
                        <li>
                            <strong>Integration Ready:</strong> Seamlessly integrate with your favorite tools such as Google Workspace, Slack, and more. Enhance efficiency by connecting all your essential apps in one place.
                        </li>
                    </ul>

                </p>

            </div>

            <div className='flex items-center overflow-hidden text-white bg-white border bg-gradient-to-br from-blue-800 to-purple-900 rounded-xl'>
                <p className='px-8 text-md'>
                    <h1 className='font-bold'>Why Choose Us:</h1>
                    <ul>
                        <li>
                            <strong>Secure and Reliable:</strong> Your data security is our priority. We use state-of-the-art encryption and security protocols to keep your information safe.
                        </li>
                        <li>
                            <strong>User-Friendly Interface:</strong> Designed for ease of use, our platform ensures that even complex tasks are simple to manage and execute.
                        </li>
                        <li>
                            <strong>Scalable Solutions:</strong> Whether youre a startup or a Fortune 500 company, our platform scales with your business, accommodating growing teams and projects.
                        </li>
                        <li>
                            <strong>Get Started Today:</strong> Sign up now to transform how your team collaborates remotely. Experience seamless communication, enhanced productivity, and project success like never before.
                        </li>
                    </ul>

                </p>
                <img src={Ilustration2} className='w-[500px] rounded-r-md' alt="" />
            </div>
        </div>
    )
}

export default Hero2