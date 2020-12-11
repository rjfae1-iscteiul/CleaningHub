import React, { useEffect } from "react";
import styled from "styled-components";
import ArrowForward from '@material-ui/icons/ArrowForwardIos';

const S = {
  StyledTitle: styled.text`
    font-family: quicksand;
    font-weight: 700;
    font-size: 1.8vw;
    letter-spacing: 0.15vw;
    position: absolute;
    top: 8%;
    left: 10%;
    color: #38c1d3;
  `,

  StyledDescription: styled.text`
    font-family: quicksand;
    font-weight: 400;
    font-size: 1.3vw;
    position: absolute;
    top: 12%;
    left: 10%;
    width: 80%;
    color: black;
  `,
};

export default function DivSafety() {
  return (
    <div>
      <S.StyledTitle>Suporte</S.StyledTitle>
    </div>
  );
}
