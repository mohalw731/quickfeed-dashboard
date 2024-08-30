import React from "react";
import { Button } from "../ui/button";
import { CheckCircle2 } from "lucide-react";

export default function Pricing() {
  return (
    <main className="flex flex-col items-center py-12" id="pricing"> 
      <h2 className="md:text-4xl text-xl mb-12">
        Level up your <span className="text-blue-500">feedback</span> experience
      </h2>
      <section className=" flex gap-4 md:flex-row flex-col w-full">
      <div className="bg-white p-8  rounded-xl max-w-sm w-full shadow-md">
          <header className="flex flex-col gap-1 mb-4">
            <h2 className="text-3xl text-blue-500 font-bold ">Free</h2>
            <p>No credit card required</p>
          </header>

          <div className="flex flex-col gap-2">
            <h2 className="text-5xl font-semibold">
              $0 <span className="text-slate-400">/ mo</span>
            </h2>
          </div>
          <hr  className="my-4 rounded-full"/>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2"><CheckCircle2  className="text-slate-400"/> 1 project</li>
            <li className="flex items-center gap-2"><CheckCircle2  className="text-slate-400"/> 1 project</li>
            <li className="flex items-center gap-2"><CheckCircle2  className="text-slate-400"/> 1 project</li>
            <li className="flex items-center gap-2"><CheckCircle2  className="text-slate-400"/> 1 project</li>
          </ul>

          <Button variant={"outline"} className="hover:scale-105 w-full mt-4 border-2 border-blue-300">
            Get Started
          </Button>
        </div>  
        
        <div className="bg-white p-8  rounded-xl max-w-sm w-full shadow-md">
          <header className="flex flex-col gap-1 mb-4">
            <h2 className="text-3xl text-blue-500 font-bold ">Free</h2>
            <p>No credit card required</p>
          </header>

          <div className="flex flex-col gap-2">
            <h2 className="text-5xl font-semibold">
              $0 <span className="text-slate-400">/ mo</span>
            </h2>
          </div>
          <hr  className="my-4 rounded-full"/>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2"><CheckCircle2  className="text-slate-400"/> 1 project</li>
            <li className="flex items-center gap-2"><CheckCircle2  className="text-slate-400"/> 1 project</li>
            <li className="flex items-center gap-2"><CheckCircle2  className="text-slate-400"/> 1 project</li>
            <li className="flex items-center gap-2"><CheckCircle2  className="text-slate-400"/> 1 project</li>
          </ul>

          <Button variant={"outline"} className="hover:scale-105 w-full mt-4 border-2 border-blue-300">
            Get Started
          </Button>
        </div> 
        
         <div className="bg-white p-8  rounded-xl max-w-sm w-full shadow-md">
          <header className="flex flex-col gap-1 mb-4">
            <h2 className="text-3xl text-blue-500 font-bold ">Free</h2>
            <p>No credit card required</p>
          </header>

          <div className="flex flex-col gap-2">
            <h2 className="text-5xl font-semibold">
              $0 <span className="text-slate-400">/ mo</span>
            </h2>
          </div>
          <hr  className="my-4 rounded-full"/>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2"><CheckCircle2  className="text-slate-400"/> 1 project</li>
            <li className="flex items-center gap-2"><CheckCircle2  className="text-slate-400"/> 1 project</li>
            <li className="flex items-center gap-2"><CheckCircle2  className="text-slate-400"/> 1 project</li>
            <li className="flex items-center gap-2"><CheckCircle2  className="text-slate-400"/> 1 project</li>
          </ul>

          <Button variant={"outline"} className="hover:scale-105 w-full mt-4 border-2 border-blue-300">
            Get Started
          </Button>
        </div>
      </section>
      
    </main>
  );
}
