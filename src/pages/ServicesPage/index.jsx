import React, { useEffect } from "react";
import Services_jquery from "../../components/Services_jquery";
import Header from "../../components/common/header"
export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div >
      <Header></Header>
      <Services_jquery></Services_jquery>
    </div>
  );
}
