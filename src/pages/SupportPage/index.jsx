import React, { useEffect } from "react";
import styled from "styled-components";
import DivSupport from "../../components/Support";

export default function Support() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <DivSupport />;
}
