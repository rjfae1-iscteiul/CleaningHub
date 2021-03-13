import React, { useEffect } from "react";
import MyServices_Utilizador from "../../components/MyServices_Utilizador";
import Header from "../../components/common/header"

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div>
      <Header></Header>
      <MyServices_Utilizador></MyServices_Utilizador>
    </div>
  );
}
