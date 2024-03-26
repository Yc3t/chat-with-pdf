"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get('origin');

  const { data, isSuccess, isError } = trpc.authCallBack.useQuery(undefined, {
    retry: true,
    retryDelay: 500,
  });

  useEffect(() => {
    if (isSuccess && data.success) {
      // user is synced to db
      router.push(origin ? `/${origin}` : '/dashboard');
    }
  }, [isSuccess, data, origin, router]);

  useEffect(() => {
    if (isError) {
      router.push('/sign-in');
    }
  }, [isError, router]);

  return (
    <div className="w-full mt-25 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        <h3 className="font-semibold text-xl">Setting up your account</h3>
        <p>You will be redirect automatically.</p>
      </div>
    </div>
  );
};

export default Page;
