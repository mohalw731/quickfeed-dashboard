import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import ReactMarkdown from "react-markdown";
import React from 'react';

export default function Analysis({ formatDate, analysis }: { formatDate: any, analysis: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <div className="text-black dark:text-white rounded-xl dark:bg-[#171717] bg-gray-200 p-5 mt-4">
          <h2 className="text-xl font-semibold mb-2">
            Latest Analysis Result
          </h2>
          <hr className="my-2" />
          <ReactMarkdown className="prose prose-lg prose-h2:mb-4 prose-li:mb-2 prose-p:mb-4">
            {analysis.text}
          </ReactMarkdown>
          <p className="text-sm text-gray-500 mt-4">
            Generated on: {formatDate(analysis.timestamp)}
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="md:w-full max-h-[600px] w-[90%] rounded-xl overflow-auto custom-scrollbar bg-gray-200 text-black">
        <DialogHeader>
          <DialogTitle>Latest Analysis Result ✨</DialogTitle>
        </DialogHeader>
        <div className="text-black  rounded-xl ">
          <hr className="my-2" />
          <ReactMarkdown className="prose prose-lg prose-h2:mb-4 prose-li:mb-2 prose-p:mb-4">
            {analysis.text}
          </ReactMarkdown>
          <p className="text-sm text-gray-500 mt-4">
            Generated on: {formatDate(analysis.timestamp)}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
