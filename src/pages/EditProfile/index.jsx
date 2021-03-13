import React, { useEffect } from "react";
import EditProfile from "../../components/EditProfile.jsx";
import Header from "../../components/common/header"

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div>
      <Header></Header>
      <EditProfile></EditProfile>
    </div>
  );
}