import React, { useEffect } from "react";
import Dashboard_CH from "../../components/Dashboard_CH";
import Header from "../../components/common/header"

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div>
      <Header></Header>
      <Dashboard_CH></Dashboard_CH>
    </div>
  );
}
