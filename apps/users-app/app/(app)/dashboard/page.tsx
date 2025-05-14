import React from "react";
import * as bcrypt from "bcrypt-ts";

const Dashboard =  async () => {

    const hash = await bcrypt.hash("alice", 10);
    console.log(hash);

  return <div className="w-full min-h-screen bg-purple-50">Page</div>;
};

export default Dashboard;
