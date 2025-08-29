import React from 'react';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import PostThread from '@/components/forms/PostThread';
import { fetchUser } from '@/lib/actions/user.actions';

async function CreateThread() {
  const user = await currentUser();
  
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  console.log("UserInfo: ", userInfo)
  
  if (!userInfo?.onboard) redirect('/onboarding');

  return (
    <>
    <main className="main-section">
      <h1 className="section-header">
        Post Thread
      </h1>
      <div className="post-thread">
        <PostThread userId={userInfo.id} btnTitle="Post Thread"/>
      </div>
    </main>
    </>
  )
}

export default CreateThread;