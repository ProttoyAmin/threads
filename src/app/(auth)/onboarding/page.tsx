import AccountProfile from '@/components/forms/AccountProfile';
import React from 'react';
import { currentUser } from "@clerk/nextjs/server";

async function Onboard() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = {}

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (
    <>
    <main className="mx-auto w-2xl">
      <h1 className="title-text text-center">
      Onboard
    </h1>
    <section className="account-form">
      <AccountProfile 
        user = {userData}
        btnTitle = "Continue"
      />
    </section>
    </main>
    </>
  )
}

export default Onboard;