import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";

export default function EmailVerified() {
    return (
        <>
            <PageMeta
                title="Email Verified Successfully | TailAdmin - React.js Admin Dashboard Template"
                description="This is email verified page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
                <GridShape />
                <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
                    <h1 className="mb-8 font-bold text-green-600 text-title-md dark:text-green-400 xl:text-title-2xl">
                        Email Verified!
                    </h1>

                    <img src="/images/success/email-verified.svg" alt="Email Verified" className="dark:hidden" />
                    <img src="/images/success/email-verified-dark.svg" alt="Email Verified" className="hidden dark:block" />

                    <p className="mt-10 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
                        Your email has been successfully verified. You can now login!
                    </p>

                    <Link
                        to="/signin"
                        className="inline-flex items-center justify-center rounded-lg border border-green-500 bg-green-500 px-5 py-3.5 text-sm font-medium text-white shadow-theme-xs hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                    >
                        Go to Login
                    </Link>
                </div>
                <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} - TailAdmin
                </p>
            </div>
        </>
    );
}
