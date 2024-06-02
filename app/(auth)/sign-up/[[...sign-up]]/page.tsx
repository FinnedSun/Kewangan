import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
    title: "Sign-up"
};

export default function Page() {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            <div className="h-full lg:flex flex-col items-center justify-center px-4">
                <div className="text-center space-y-4 pt-16">
                    <h1 className="font-bold text-3xl text-[#2E2A47]">
                        Welcome Back!
                    </h1>
                    <p className="text-base text-[#7E8CA0]">
                        Log in or Create account to get back to your dashboard!
                    </p>
                </div>
                <div className="flex items-center justify-center mt-8">
                    <ClerkLoaded>
                        <SignUp path="/sign-up" />
                    </ClerkLoaded>
                    <ClerkLoading>
                        <Skeleton className="h-[450px] w-[400px] rounded-xl" />
                    </ClerkLoading>
                </div>
            </div>
            <div className="h-full bg-emerald-600 hidden lg:flex items-center justify-center">
                <Image src={"/logo.svg"} alt="Logo" width={100} height={100} />
            </div>
        </div>
    )
}