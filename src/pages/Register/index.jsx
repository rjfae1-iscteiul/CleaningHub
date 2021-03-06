import React, { useEffect } from "react";
import Register_jquery from "../../components/Register_jquery";
import Header from "../../components/common/header"

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div>
      <Header></Header>
      <Register_jquery></Register_jquery>
    </div>
  );
}
