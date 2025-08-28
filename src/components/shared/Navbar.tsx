import React from 'react';
import { UserProfile, UserButton, OrganizationSwitcher } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';

function Navbar() {
  return (
    <>
      <nav className="main-header">
        <div className="logo">
          <Link href='/' className='flex items-center gap-4'>
            <Image src='/logo.svg' alt='logo' width={28} height={28} />
            <p className='text-heading3-bold text-light-1 max-xs:hidden'>Threads</p>
          </Link>
        </div>
        <div className="profileInfo flex items-center gap-3">
          <div className="switchCommunity">
            <OrganizationSwitcher 
                appearance={{
                  elements: {
                  organizeSwitcherTrigger: 'py-2 px-4'
                }
                }}
            />
          </div>
          <div className="userButton">
            <UserButton />
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar