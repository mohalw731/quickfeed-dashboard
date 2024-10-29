// import SubscribeBtn from '@/app/(user)/payments/subscribeButton'
// import { Button } from '@/components/ui/button'
// import { Dialog, DialogContent, DialogHeader, DialogTrigger,DialogTitle } from '@/components/ui/dialog'
// import { Textarea } from '@/components/ui/textarea'
// import { monthlyPlanId } from '@/lib/payments'
// import React from 'react'

// export default function Settings( {
//     isSettingsOpen,
//     setIsSettingsOpen,
//     customPrompt,
//     setCustomPrompt,
//     tokenCount,
//     setTokenCount,
//   }: any) {
//   return (
//     <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
//     <DialogTrigger asChild>
//       <Button variant="ghost" size="icon" className="rounded-full">
//         <Settings className="h-6 w-6" />
//       </Button>
//     </DialogTrigger>
//     <DialogContent className="sm:max-w-[425px] max-w-[90%] rounded-xl">
//       <DialogHeader>
//         <DialogTitle>Analysis Settings</DialogTitle>
//       </DialogHeader>
//       <div className="space-y-4 py-4">
//         <Textarea
//           placeholder="Enter custom prompt..."
//           value={customPrompt}
//           onChange={(e) => setCustomPrompt(e.target.value)}
//           className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         />
//         <div className="space-y-2">
//           <div className="flex justify-between text-sm text-gray-600">
//             <span>Tokens: {tokenCount}</span>
//             <span>Max: 1000</span>
//           </div>
//           <Slider
//             value={[tokenCount]}
//             onValueChange={(value: any) => setTokenCount(value[0])}
//             min={100}
//             max={1000}
//             step={1}
//             className="w-full"
//           />
//         </div>
//         {subscribed ? (
//           <Button
//             onClick={() => handleAnalyze(true)}
//             disabled={
//               isAnalyzing ||
//               !customPrompt ||
//               isButtonDisabled ||
//               !feedbackMessages.length
//             }
//             className="w-full h-10 bg-gray-800 hover:bg-gray-900 text-white rounded-xl transition-all duration-200 ease-in-out transform hover:scale-105"
//           >
//             Run Custom Analysis
//           </Button>
//         ) : (
//           <div className="w-full flex justify-center">
//             <SubscribeBtn price={monthlyPlanId} />
//           </div>
//         )}
//       </div>
//     </DialogContent>
//   </Dialog>
//   )
// }
