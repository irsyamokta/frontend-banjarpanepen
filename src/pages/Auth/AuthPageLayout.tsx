import React from "react";
import { Link } from "react-router";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-primary dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            {/* <!-- ===== Common Grid Shape Start ===== --> */}
            <div className="flex flex-col items-center max-w-sm">
              <Link to="/" className="block mb-4">
                <img
                  width={600}
                  height={48}
                  src="/src/assets/logo/logo-white.png"
                  alt="Logo"
                />
              </Link>
              <p className="text-sm text-center text-gray-100 dark:text-white/60">
                Tuhan menciptakan keindahan alam dengan segala pesonanya sebagai anugerah yang patut kita syukuri, renungi, dan nikmati dalam kehidupan sehari-hari sebagai bentuk penghargaan atas ciptaan-Nya.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
