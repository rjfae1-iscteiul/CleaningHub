import React, { useEffect } from "react";
import styled from "styled-components";
import DivAbout from "../../components/AboutUs";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <DivAbout />;
}
