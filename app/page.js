"use client";
import React, { useState, useEffect } from 'react';
import PostureCard from '@/components/PostureCard';
import { faHeart, faHand, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AOS from "aos";
import "aos/dist/aos.css";
import Webcam from 'react-webcam';
const Page = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const [postureData, setPostureData] = useState([]);
  const [currentPosture, setCurrentPosture] = useState(0);
  const [startTime] = useState(Date.now());

  const webcamRef = React.useRef(null);
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://34.66.120.146:8000/get_data');
        const jsonData = await response.json();
        const postureArray = jsonData.data;
        
        // Get the latest posture value
        const latestPosture = postureArray[postureArray.length - 1];
        setCurrentPosture(latestPosture);

        // Create time series data for the chart
        const newData = postureArray.map((value, index) => ({
          time: index,
          value: value
        }));

        setPostureData(newData.slice(-60)); // Keep last 60 data points
      } catch (error) {
        console.error('Error fetching posture data:', error);
      }
    };

    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const getPostureCard = () => {
    if (currentPosture >= 0.6) {
      return (
        <PostureCard
          title="Great Posture!"
          color="bg-green-600"
          icon={faHeart}
          description="Your current posture decreases the chance of backpain when middle aged according to the CDC. 
          However, we still recommend 5 minutes of activity for every half hour of sedentary activity."
        />
      );
    } else if (currentPosture >= 0.3) {
      return (
        <PostureCard
          title="Ok Posture"
          color="bg-yellow-600"
          icon={faHand}
          description="Your posture may not be ideal according to the latest medical research compiled by the NIH.
          However, everyone has different back shapes and lengths, so it may be fine according to your body-type!"
        />
      );
    } else {
      return (
        <PostureCard
          title="Bad Posture!"
          color="bg-red-600"
          icon={faTriangleExclamation}
          description="Your are hunching your back - this increases stress on your back joints, leading to back pain 
          later down in life! Please consder straighting your back when sitting! Visit the CDC on sitting posture for more information."
        />
      );
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-200 via-pink-200 to-orange-200 px-10 pt-20">
        <h1 
          data-aos="fade-in" 
          className="py-10 text-center text-6xl font-bold drop-shadow-md text-transparent bg-clip-text bg-gradient-to-r from-red-600 from-30% to-purple-800"
        >
          CU Better Habits
        </h1>
      
        <div className="items-center justify-center grid grid-cols-2 gap-8 justify-items-center">
          <div data-aos="fade-right"> 
            <img src="/default.png" alt="default" className="w-full object-contain rounded-lg" />
          </div>

          <div data-aos="fade-left" className="bg-blue-100 bg-gradient-to-r from-slate-100 to-blue-100 drop-shadow-lg rounded-lg p-6">
            <p className="text-black drop-shadow-md pb-4 text-xl font-bold">
              Automatically corrects your posture so you can live a long and healthy life. We CU!
            </p>
            {/* Bullet list with check marks */}
            <ul className="list-none space-y-2 text-black pl-6">
              <li className="flex items-center">
                ✅ Improves spinal alignment
              </li>
              <li className="flex items-center">
                ✅ Reduces back and neck pain
              </li>
              <li className="flex items-center">
                ✅ Boosts confidence and presence
              </li>
              <li className="flex items-center">
                ✅ Enhances overall well-being
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-5 mb-20 px-5 md:px-20">
        <h1 className="py-10 text-center text-5xl font-bold drop-shadow-md text-transparent bg-clip-text bg-gradient-to-r from-slate-100 from-30% to-purple-800">
          My Dashboard
        </h1>
        <div className="w-full p-4">
          <div className="h-96 mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={postureData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 60,
                  bottom: 60
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis 
                  dataKey="time" 
                  axisLine={{ stroke: '#000' }}
                  tickLine={{ stroke: '#000' }}
                  tick={{ fill: '#000', fontSize: 12 }}
                  label={{ 
                    value: 'Time (seconds)', 
                    position: 'insideBottom', 
                    dy: 30 
                  }}
                />

                <YAxis 
                  domain={[0, 1]}
                  ticks={[0.0, 0.2, 0.4, 0.6, 0.8, 1.0]}
                  axisLine={{ stroke: '#000' }}
                  tickLine={{ stroke: '#000' }}
                  tick={{ fill: '#000', fontSize: 12 }}
                  label={{ 
                    value: 'Posture Score', 
                    angle: -90, 
                    position: 'insideLeft', 
                    dx: -20 
                  }}
                />

                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8884d8" 
                  dot={false} 
                  isAnimationActive={true} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="col-span-1">
              {getPostureCard()}
            </div>
            
            <div className="col-span-1 bg-gray-100 rounded-lg overflow-hidden shadow-xl">
              <div className="relative aspect-video">
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="p-4 bg-white">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Live Camera Feed</h2>
                <p className="text-gray-600">Monitoring your posture in real-time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative">
        <video
          suppressHydrationWarning
          src="/cu.mp4"
          className="rounded-lg shadow-lg pointer-events-none"
          autoPlay
          playsInline
          loop
          muted
          style={{ width: "100%", height: "auto" }}
        />
        <div className="absolute inset-0 flex items-center">
          <div className="w-1/2 px-5 md:px-20">
            <h1 className="flex items-center drop-shadow-xl font-extrabold text-md md:text-2xl text-white">
              <span className="bg-red-400 px-2 py-2 md:px-8 md:py-2 inline-block whitespace-nowrap rounded-md drop-shadow-xl">
                Questions? Please email us at: betterhabits@cornell.edu
              </span>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;



// "use client"
// import React, {useState, useEffect} from 'react';
// import PostureCard from '@/components/PostureCard';
// import { faHeart, faHand, faAlert } from '@fortawesome/free-solid-svg-icons'
// import AOS from "aos";
// import "aos/dist/aos.css";

// const page = () => {
//   useEffect(() => {
//     AOS.init({ duration: 2000 }); // Initialize AOS with optional settings
// }, []);
//   return (
//     <>
//       <div classname="h-min-screen">
//         <h1 className="py-10 text-center text-5xl font-bold drop-shadow-md text-transparent bg-clip-text bg-gradient-to-r from-red-800 from-30% to-purple-800"> CU Better Habits </h1>
      
//         <div className="grid grid-cols-2 gap-8">
//             <div data-aos="fade-right"> 
//               <img src="/default.jpeg" alt="default" className="w-full h-full object-cover rounded-lg " />
//             </div>

//             <div data-aos="fade-left" className="bg-blue-100 bg-gradient-r from-slate-100 to-blue-100 drop-shadow-lg rounded-lg p-6">
//               <p className="text-thin text-black drop-shadow-md items-start"> 
//                 Automatically corrects your posture so you can live a long and healthy life. We CU! 
//               </p>
//             </div>
//         </div>
        
//       </div>

//       <div className="h-min-screen space-y-10">
//         <h1 className="py-10 text-center text-5xl font-bold drop-shadow-md text-transparent bg-clip-text bg-gradient-to-r from-slate-100 from-30% to-purple-800"> My Dashboard </h1>

        
//         <PostureCard
//           title="Great Posture!"
//           color="bg-green-600"
//           icon={faHeart}
//           description="Your current posture decreases the chance of backpain when middle aged according to the CDC. 
//           However, we still recommend 5 minutes of activity for every half hour of sedentary activity."
//         />

                
//       <PostureCard
//           title="Ok Posture"
//           color="bg-yellow-600"
//           icon={faHand}
//           description="Your posture may not be ideal according to the latest medical research compiled by the NIH, 
//           but everyone has different back shapes and lengths, so it may be fine according to your body-type"
//         />

//       <PostureCard
//           title="Bad Posture!"
//           color="bg-red-600"
//           icon={faAlert}
//           description="Your are hunching your back - this increases stress on your back joints, leading to a wear down of its cartaldige and will lead to back pain 
//           later down in life! Please consder straighting your back when sitting! Please visit the CDC for more information"
//         />
       
      
//       </div>
//     </>
//   )
// }

// export default page