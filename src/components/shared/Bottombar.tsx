"use client"
import Image from "next/image";
import { sideBarLinks } from '@/constants';
import Link from 'next/link';
import { usePathname } from "next/navigation";

function Bottombar() {
  const pathname = usePathname();
  
  return (
    <footer className="bottombar">
      {/* Safe area for notches */}
      <div className="pb-env-safe-bottom">
        <div className="flex justify-around items-center px-1 py-2">
          {sideBarLinks.map((link) => {
            const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
            
            return (
              <Link 
                href={link.route}
                key={link.label}
                className={`flex flex-col items-center justify-center w-24 h-14 rounded-lg transition-all duration-200 ease-in-out ${
                  isActive 
                    ? "bg-blue-500 text-white shadow-md" 
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Image
                  src={link.imgUrl}
                  alt={link.label}
                  width={18}
                  height={18}
                  className={`${isActive ? "brightness-0 invert" : "filter-none"} transition-all duration-200`}
                />
                <p className="text-[10px] font-medium mt-0.5 text-center leading-tight">
                  {link.label}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

export default Bottombar;