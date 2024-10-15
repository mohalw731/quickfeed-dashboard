'use client';

import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SignInWrapper() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect_url');

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.push('/dashboard');
      }
    }
  }, [isLoaded, isSignedIn, router, redirectUrl]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (isSignedIn) {
    return <div>Redirecting...</div>;
  }

  return <SignIn redirectUrl={redirectUrl || '/dashboard'} />;
}