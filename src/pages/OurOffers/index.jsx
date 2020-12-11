import React, { useEffect } from "react";
import styled from "styled-components";
import DivOffers from "../../components/Offers";

export default function Offers() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <DivOffers />;
}
