import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="h-screen flex items-center justify-center">
              <div className="bg-blue-500 size-48 md:size-64 blur-[120px] rotate-[-45deg] absolute top-[0%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:top-8 md:left-28 md:translate-x-0 md:translate-y-0 -z-10" />

              <div className="bg-blue-500 size-64 blur-[180px] right-28 bottom-44 rotate-[-45deg]   absolute md:block hidden" />
        <SignIn />
    </div>
  )
}