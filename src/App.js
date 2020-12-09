import React from "react";
import Header from "./components/common/header";
import styled from "styled-components"
import { BrowserRouter, Route } from "react-router-dom";
import About from "./pages/AboutPage";
import Home from "./pages/HomePage";

const Wrapper = styled.div`
  display: flex;
  flex-flow: row;
`;

const AppBody = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row;
  flex: 1 auto;
  position: absolute;
  min-height: 155vh;
  overflow-x: hidden;
`;

export default function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <Header />
          <AppBody>
            <Route path="/" exact component={Home}/>
            <Route path="/AboutUs" exact component={About}/>
         </AppBody>
      </BrowserRouter>
    </Wrapper>
  );
}

