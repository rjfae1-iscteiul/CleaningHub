import React, { useEffect } from "react";
import MyServices_Prestador from "../../components/MyServices_Prestador";
import Header from "../../components/common/header"

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div>
      <Header></Header>
      <MyServices_Prestador></MyServices_Prestador>
    </div>
  );
}
