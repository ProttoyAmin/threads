import React from 'react';

function RightSidebar() {
  return (
    <section className="rightbar">
      <div className="flex flex-col gap-2.5 my-25 h-full">
        <div className="suggestCommunities">
        <h1 className="title"> Community Recommendations</h1>
      </div>
      <div className="suggestUsers">
        <h1 className="title"> Follow others</h1>
      </div>
      </div>
    </section>
  )
}

export default RightSidebar;