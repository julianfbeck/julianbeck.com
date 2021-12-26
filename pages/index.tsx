import { NextPage } from "next";
import Head from "next/head";
import { motion, useViewportScroll, useTransform } from "framer-motion";

import { Project } from "../components/project";
import { Position } from "../components/position";

const Home: NextPage = () => {
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);

  return (
    <div className="container mt-10">
      <Head>
        <title>Julian Beck</title>
        <link rel="manifest" href="/static/manifest.json" />
        <meta
          name="description"
          content="Julian Beck, Student, FullStack and iOS Developer"
        />
      </Head>
      <div className="flex items-center justify-between">
        <h1 className="flex text-4xl font-bold ">Julian Beck</h1>
        <a target="_blank"  href="https://blog.julianbeck.com" className="p-1 text-blue-700	rounded shadow bg-white cursor-pointer flex text-2xl font-bold  justify-end	border-b border-gray-200">
          Visit my Blog
        </a>
      </div>
      <div className="mb-5 font-medium text-gray-600">
        Computer Science Student focusing on ML, iOS and Fullstack Development. Also
        interested in Cloud and Dev-Ops!
      </div>
      <h2 className="mt-8 mb-3 text-2xl font-bold">Projects</h2>
      <motion.div
        variants={{
          hidden: { opacity: 1, scale: 1 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              delay: 0,
              easings: "backOut",
              staggerChildren: 0.2,
            },
          },
        }}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-3 sm:grid-cols-3"
      >
        <Project
          name="LocalPDF"
          url="https://localpdf.tech"
          style={{ scale }}
          color="#2091c5"
          description="Web App to merge multiple PDF Files into one File, locally, using Webassembly and PDFCPU"
          logo={
            <img
              className="w-16 transition-transform duration-500 transform group-hover:scale-110"
              src="/PDFLogo.png"
              alt="Localpdf.tech Logo"
            />
          }
          tags={
            <div className="mt-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-gray-100 text-gray-800 mr-2">
                React
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-blue-100 text-blue-800 mr-2">
                Nextjs
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-indigo-100 text-indigo-800 mr-2">
                Webassembly
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-green-100 text-green-800 mr-2">
                Go
              </span>
            </div>
          }
        />

        <Project
          name="Score Tracker"
          url="https://apps.apple.com/de/app/score-tracking-and-statistics/id1497662306?l=en"
          style={{ scale }}
          color="rgba(180, 216, 165, 0.23)"
          description="Score Tracker to track all kind of Game Scores and generate Statistics"
          logo={
            <img
              className="w-16 rounded-lg transition-transform duration-500 transform group-hover:scale-110"
              src="/TournamentsLogo.png"
              alt="Tournaments Logo"
            />
          }
          tags={
            <div className="mt-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-gray-100 text-gray-800 mr-2">
                iOS
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-blue-100 text-blue-800 mr-2">
                SwiftUI
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-indigo-100 text-indigo-800 mr-2">
                CoreData
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-green-100 text-green-800 mr-2">
                CloudKit
              </span>
            </div>
          }
        />
        <Project
          name="IWI-Checker"
          url="https://github.com/jufabeck2202/HSKA-App"
          style={{ scale }}
          color="#fa8f87"
          description="Open Source App for my University to check Information and Grades using Widgets"
          logo={
            <img
              className="w-16 rounded-lg transition-transform duration-500 transform group-hover:scale-110"
              src="/CheckerLogo.png"
              alt="Checker Logo"
            />
          }
          tags={
            <div className="mt-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-gray-100 text-gray-800 mr-2">
                iOS
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-blue-100 text-blue-800 mr-2">
                Swift
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-indigo-100 text-indigo-800 mr-2">
                SwiftUI
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-green-100 text-green-800 mr-2">
                WidgetKit
              </span>
            </div>
          }
        />
        <Project
          name="WhatStat"
          color="#c5acfa"
          url="https://apps.apple.com/de/app/whatstats-chat-analyser/id1481007233?l=en"
          style={{ scale }}
          description="WhatStats is an app to analyse WhatsApp Chats locally on your device"
          logo={
            <img
              className="w-16 transition-transform rounded-lg duration-500 transform group-hover:scale-110"
              src="/WhatStatLogo.png"
              alt="WhatStat Logo"
            />
          }
          tags={
            <div className="mt-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-gray-100 text-gray-800 mr-2">
                iOS
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-blue-100 text-blue-800 mr-2">
                Swift
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-indigo-100 text-indigo-800 mr-2">
                SwiftUI
              </span>
            </div>
          }
        />
      </motion.div>
      <h2 className="mt-8 mb-3 text-2xl font-bold">Work Experience</h2>
      <div className="inline-block w-full max-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg last:border-b-0">
        <table className="w-full">
          <tbody className="bg-white">
             <Position
              company="Iteratec"
              position="Master Thesis"
              description="Remote Machine-Learning for Augmented-Reality Devices"
              url="https://www.iteratec.com/"
              from="May 2021"
              logo={
                <img
                  className="w-10 h-10"
                  src={`/IteratecLogo.jpeg`}
                  alt="Iteratec Logo"
                />
              }
            />
            <Position
              company="Iteratec"
              position="Working Student"
              description=""
              url="https://www.iteratec.com/"
              from="Mar 2021"
              to="May 2021"
              logo={
                <img
                  className="w-10 h-10"
                  src={`/IteratecLogo.jpeg`}
                  alt="Iteratec Logo"
                />
              }
            />
            <Position
              company="Daimler Trucks"
              position="Bachelor Thesis"
              description="Smart Charging using Reinforcement Learning"
              url=""
              from="Sep 2019"
              to="Feb 2020"
              logo={
                <img
                  className="w-10 h-10"
                  src={`/DaimlerLogo.svg`}
                  alt="Daimler Logo"
                />
              }
            />
            <Position
              company="Mitsubishi Fuso Tokyo"
              position="Internship"
              description="Full Stack, DevOps, IT Consulting and Project Management"
              url=""
              from="Mar 2018"
              to="Aug 2018"
              logo={
                <img
                  className="w-10 h-10"
                  src={`/FusoLogo.svg`}
                  alt="Mitsubishi logo"
                />
              }
            />
            <Position
              company="Bosch"
              position="Mechatronics Technician"
              description="Vocational Training as a Mechatronics Technician"
              url=""
              from="Sep 2013"
              to="Jun 2016"
              logo={
                <img
                  className="w-10 h-10"
                  src={`/BoschLogo.svg`}
                  alt="Bosch logo"
                />
              }
            />
          </tbody>
        </table>
      </div>
      <h2 className="mt-8 mb-3 text-2xl font-bold">Education</h2>
      <div className="inline-block w-full max-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg last:border-b-0">
        <table className="w-full">
          <tbody className="bg-white">
            <Position
              company="Karlsruhe University of Applied Sciences"
              position="Master of Science - Computer Science"
              description="Emphasis on Machine Learning"
              url="https://www.iteratec.com/"
              from="2020"
              logo={
                <img
                  className="w-10 h-10"
                  src={`/HSKALogo.svg`}
                  alt="Iteratec Logo"
                />
              }
            />
            <Position
              company="Karlsruhe University of Applied Sciences"
              position="Bachelor of Science - Computer Science"
              description=""
              url=""
              from="2016"
              to="2020"
              logo={
                <img
                  className="w-10 h-10"
                  src={`/HSKALogo.svg`}
                  alt="Daimler Logo"
                />
              }
            />
          </tbody>
        </table>
      </div>
      <h2 className="mt-8 mb-3 text-2xl font-bold">Contact</h2>
      <div className="text-base text-gray-900">
        If you are interested in contacting me, drop me a short email:{" "}
        <b>mail@julianbeck.com</b>
      </div>
      <div className="flex justify-center mt-8 mb-5 font-medium text-gray-600">
        <a target="_blank" href="https://github.com/jufabeck2202">
          GitHub
        </a>
        <span className="mx-2 font-bold">·</span>
        <a target="_blank" href="https://www.linkedin.com/in/julian-beck/">
          LinkedIn
        </a>
        <span className="mx-2 font-bold">·</span>
        <a target="_blank" href="https://twitter.com/Kickbeak">
          Twitter
        </a>
        <span className="mx-2 font-bold">·</span>
        <a target="_blank" href="https://blog.julianbeck.com">
          Blog
        </a>
      </div>
    </div>
  );
};

export default Home;
