import React from 'react'

export default function Code() {
  return (
    /* From Uiverse.io by emmanuelh-dev */ 
<div className="relative rounded-lg bg-slate-900 p-2 w-full">
  <div className="relative flex text-center">
    <div className="flex pl-3.5 pt-3"><svg viewBox="0 0 24 24" fill="currentColor" className="-ml-0.5 mr-1.5 h-3 w-3 text-red-500/20">
        <circle r="12" cy="12" cx="12"></circle>
      </svg><svg viewBox="0 0 24 24" fill="currentColor" className="-ml-0.75 mr-1.5 h-3 w-3 text-yellow-500/20">
        <circle r="12" cy="12" cx="12"></circle>
      </svg><svg viewBox="0 0 24 24" fill="currentColor" className="-ml-0.75 mr-1.5 h-3 w-3 text-green-500/20">
        <circle r="12" cy="12" cx="12"></circle>
      </svg></div><span className="absolute inset-x-0 top-2 text-xs text-slate-500">index.html</span>
  </div>
  <div className="mt-5 space-y-1.5 px-5 pb-10">
  <p className='mt-4 font-mono text-xs font-normal tracking-wide text-slate-500'>{'<head>'}</p>

<p className='mt-4 font-mono text-xs font-normal tracking-wide text-violet-400'>{'<my-widget project={id}></my-widget>'}
</p>


<p className='mt-4 font-mono text-xs font-normal tracking-wide text-violet-400'>{'  <script src="https://spectacular-axolotl-97165f.netlify.app/widget.umd.js"></script>'}
</p>


  <p className='mt-4 font-mono text-xs font-normal tracking-wide text-slate-500'>{'</head>'}</p>
  </div>
</div>
  )
}
