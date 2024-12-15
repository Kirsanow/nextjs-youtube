"use client";
import SVGLogo from "@/components/svg-logo";
import Link from "next/link";
import { config } from "@/config";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const AppHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="sticky -top-16 z-20 border-b border-slate-200 bg-slate-50">
      <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a className="hidden transition-all sm:block" href="/app">
              <div className="flex max-w-fit items-center gap-2">
                <SVGLogo />
                <span className="text-lg font-bold text-slate-800">
                  Quillminds
                </span>
              </div>
            </a>
          </div>
          <div className="flex items-center space-x-6">
            <a
              className="transition-all duration-75 active:scale-95"
              href="/upgrade"
            >
              <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-sm text-transparent">
                Upgrade
              </span>
            </a>
            <a
              href="#"
              className="hidden text-sm text-slate-500 transition-colors hover:text-slate-700 sm:block"
              target="_blank"
            >
              Help
            </a>
            <button
              onClick={() => {
                const supabase = createClient();
                supabase.auth.signOut();
                router.push("/login");
              }}
              className="hidden text-sm text-slate-500 transition-colors hover:text-slate-700 sm:block"
            >
              Sign Out
            </button>
            <Link href="/app/settings" className="relative inline-block pt-1.5">
              <button className="group relative sm:inline-flex" type="button">
                <img
                  alt="Avatar for Artem Kirsanov"
                  width={36}
                  height={36}
                  src={"https://api.dicebear.com/9.x/micah/svg?seed=Felix"}
                  className="h-9 w-9 rounded-full border border-slate-300 transition-all duration-75 group-focus:outline-none group-active:scale-95 sm:h-10 sm:w-10"
                  draggable="false"
                />
                <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-white bg-blue-500"></div>
              </button>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="scrollbar-hide relative flex gap-x-2 overflow-x-auto transition-all">
            {Object.entries(config.routes).map(([key, route]) => (
              <a key={key} className="relative" href={route}>
                <div
                  className={`mx-1 my-1.5 rounded-md px-3 py-1.5 transition-all duration-75 ${
                    pathname.startsWith(route)
                      ? "bg-transparent"
                      : "hover:bg-slate-100 active:bg-slate-200"
                  } group`}
                >
                  <p
                    className={`text-sm ${
                      pathname.startsWith(route)
                        ? "text-black"
                        : "text-slate-600 hover:text-black group-hover:text-black"
                    }`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </p>
                </div>
                {pathname.startsWith(route) && (
                  <div
                    className="absolute bottom-0 w-full px-1.5"
                    style={{
                      transform: "none",
                      transformOrigin: "50% 50% 0px",
                    }}
                  >
                    <div className="h-0.5 bg-black"></div>
                  </div>
                )}
              </a>
            ))}
          </div>

          <div className="mt-2 flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-medium">Tokens</h3>
            </div>
            <p className="text-sm text-slate-600">20 / 50 tokens</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
