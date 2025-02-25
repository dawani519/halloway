"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClientComponentClient();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    async function verifyEmail() {
      const token = searchParams.get("token");
      const email = searchParams.get("email");
      const type = searchParams.get("type");

      if (!token || !email || type !== "signup") {
        setStatus("error");
        return;
      }

      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "signup",
      });

      if (error) {
        console.error("❌ Verification error:", error);
        setStatus("error");
        toast.error(error.message);
      } else {
        setStatus("success");
        toast.success("Email verified! Redirecting...");
        setTimeout(() => router.push("/dashboard"), 3000);
      }
    }

    verifyEmail();
  }, [searchParams, router, supabase]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg text-center">
        {status === "loading" && (
          <>
            <Loader2 className="h-10 w-10 animate-spin mx-auto text-gray-600" />
            <p className="text-gray-600 mt-4">Verifying your email...</p>
          </>
        )}
        {status === "success" && (
          <>
            <CheckCircle className="h-10 w-10 text-green-500 mx-auto" />
            <p className="text-green-600 mt-4">Email verified successfully!</p>
            <Button onClick={() => router.push("/dashboard")} className="mt-4">
              Go to Dashboard
            </Button>
          </>
        )}
        {status === "error" && (
          <>
            <XCircle className="h-10 w-10 text-red-500 mx-auto" />
            <p className="text-red-600 mt-4">Email verification failed.</p>
            <Button onClick={() => router.push("/auth/register")} variant="outline" className="mt-4">
              Try Again
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
