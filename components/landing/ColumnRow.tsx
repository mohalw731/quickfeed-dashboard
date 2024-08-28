import React from "react";
import { Button } from "../ui/button";
import Code from "../ui/Code";
import { AnimatedListDemo } from "../ui/Animated";
import { AnimatedBeam } from "../magicui/animated-beam";
import { AnimatedBeamMultipleOutputDemo } from "../ui/Beam";


export default function ColumnRow() {
  return (
    <main className="md:my-20 my-12">
      <ul className="flex flex-col md:gap-32 gap-20">


        <li className="flex md:gap-12 md:flex-row flex-col gap-6 ">
          <div className="flex flex-col gap-4 max-w-lg h-full ">
            <h2 className="md:text-4xl text-2xl">
              {" "}
              Quick and <span className="text-blue-500">Simple</span>{" "}
              Integration
            </h2>
            <p className="text-slate-500 tracking-wide leading-6 md:text-base text-sm">
              Getting started with QuickFeed is a breeze. With just a few
              clicks, integrate our widget into your website—no coding skills
              needed. Start collecting valuable customer feedback immediately,
              and begin improving your business without any technical headaches.
              QuickFeed fits seamlessly with any platform, ensuring you can
              start fast and focus on growth.
            </p>
            <div className="flex items-end justify-between">
              <Button className="mt-4 bg-blue-500 hover:bg-blue-600 hover:scale-105 ">
                Get Started in Minutes
              </Button>
            </div>
          </div>
          <Code />
        </li>


        <li className="flex md:gap-12 md:flex-row-reverse flex-col gap-6 ">
          <div className="flex flex-col gap-4 max-w-lg h-full ">
            <h2 className="md:text-4xl text-2xl">
            Collect <span className="text-blue-500">Feedbacks</span>
            </h2>
            <p className="text-slate-500 tracking-wide leading-6 md:text-base text-sm">
            Empower your customers to share their opinions directly on your website with our easy-to-use widget. Collect real-time feedback, suggestions, and reviews that help you understand customer needs and improve your products and services. Build trust, engage your audience, and elevate your business through meaningful feedback.
            </p>
            <div className="flex items-end justify-between">
              <Button className="mt-4 bg-blue-500 hover:bg-blue-600 hover:scale-105 ">
              Start Collecting Feedback
              </Button>
            </div>
          </div>
          <AnimatedListDemo />
        </li>


        
        <li className="flex md:gap-12 md:flex-row flex-col gap-6 ">
          <div className="flex flex-col gap-4 max-w-lg h-full ">
            <h2 className="md:text-4xl text-2xl">
            <span className="text-blue-500">AI-Driven</span> Solutions
            </h2>
            <p className="text-slate-500 tracking-wide leading-6 md:text-base text-sm">
            Move beyond collecting feedback—understand it with our AI-driven analysis. QuickFeed automatically summarizes feedback, identifies key themes, and offers actionable solutions to address any issues. Use these insights to enhance your customer experience and accelerate your growth with confidence.
            </p>
            <div className="flex items-end justify-between">
              <Button className="mt-4 bg-blue-500 hover:bg-blue-600 hover:scale-105 ">
              Try AI Analysis Now
              </Button>
            </div>
          </div>
          <AnimatedBeamMultipleOutputDemo />
        </li>

        
      </ul>
    </main>
  );
}
