import React, { useEffect } from "react";
import styled from "styled-components";
import DivSafety from "../../components/Safety";

export default function Safety() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <DivSafety />;
}
