"use client"
import Image from "next/image";
import { sideBarLinks } from '@/constants';
import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";

function LeftSidebar() {
  const pathname = usePathname()
  console.log("PATHNAME: ", pathname)
  const {userId} = useAuth()

  console.log("UserID: ", userId)

  return (
    <section className="leftsidebar ">
      <div className='flex flex-col gap-2.5 my-20'>
        {
          sideBarLinks.map( (link) => {
            const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname == link.route;

            if (link.route === "/profile") link.route = `${link.route}/${userId}`;

            return (
              <Link href={link.route}
                    key={link.label}
                    className={`${isActive && "rounded-md bg-blue-400"}`}
              >
              <div className='flex gap-5 h-15 p-5 rounded-md items-center hover:bg-blue-400'>
              <Image
              src={link.imgUrl}
              alt={link.label}
              width={24}
              height={24}
              />
              <p className="route">
                {link.label}
              </p>
              </div>
              </Link>
            )
          } )
        }
      </div>

      <div className='mt-10 px-6'>
        <SignedIn>
          <SignOutButton>
            <div className='flex cursor-pointer gap-4 p-4'>
              <Image
                src='/assets/logout.svg'
                alt='logout'
                width={24}
                height={24}
              />

              <p className='text-light-2 max-lg:hidden'>Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  )
}

export default LeftSidebar