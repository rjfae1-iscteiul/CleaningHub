import React, { useEffect } from "react";
import Register from "../../components/Register";
import Header from "../../components/common/header"

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    
      <div style={{backgroundColor: "#00CCFF"}}>
      <Header></Header>
      <Register></Register>
    </div>
  );
}
