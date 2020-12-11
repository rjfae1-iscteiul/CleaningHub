import React, { useEffect } from "react";
import styled from "styled-components";
import ArrowForward from "@material-ui/icons/ArrowForwardIos";

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

  StyledText1: styled.text`
    position: absolute;
    top: 17%;
    left: 10%;
    width: 75vw;
    border-bottom: 0.4vh solid black;
    padding-bottom: 3vh;
    padding-left: 5vw;
    font-family: quicksand;
    font-weight: 600;
    font-size: 1.6vw;
  `,

  StyledArrow1: styled(ArrowForward)`
    position: absolute !important;
    top: 17%;
    left: 85%;
  `,

  StyledText2: styled.text`
    position: absolute;
    top: 27%;
    left: 10%;
    width: 75vw;
    border-bottom: 0.4vh solid black;
    padding-bottom: 3vh;
    padding-left: 5vw;
    font-family: quicksand;
    font-weight: 600;
    font-size: 1.6vw;
  `,

  StyledArrow2: styled(ArrowForward)`
    position: absolute !important;
    top: 27%;
    left: 85%;
  `,

  StyledText3: styled.text`
    position: absolute;
    top: 37%;
    left: 10%;
    width: 75vw;
    border-bottom: 0.4vh solid black;
    padding-bottom: 3vh;
    padding-left: 5vw;
    font-family: quicksand;
    font-weight: 600;
    font-size: 1.6vw;
  `,

  StyledArrow3: styled(ArrowForward)`
    position: absolute !important;
    top: 37%;
    left: 85%;
  `,

  StyledText4: styled.text`
    position: absolute;
    top: 47%;
    left: 10%;
    width: 75vw;
    border-bottom: 0.4vh solid black;
    padding-bottom: 3vh;
    padding-left: 5vw;
    font-family: quicksand;
    font-weight: 600;
    font-size: 1.6vw;
  `,

  StyledArrow4: styled(ArrowForward)`
    position: absolute !important;
    top: 47%;
    left: 85%;
  `,

  StyledText5: styled.text`
    position: absolute;
    top: 57%;
    left: 10%;
    width: 75vw;
    border-bottom: 0.4vh solid black;
    padding-bottom: 3vh;
    padding-left: 5vw;
    font-family: quicksand;
    font-weight: 600;
    font-size: 1.6vw;
  `,

  StyledArrow5: styled(ArrowForward)`
    position: absolute !important;
    top: 57%;
    left: 85%;
  `,

  StyledText6: styled.text`
    position: absolute;
    top: 67%;
    left: 10%;
    width: 75vw;
    border-bottom: 0.4vh solid black;
    padding-bottom: 3vh;
    padding-left: 5vw;
    font-family: quicksand;
    font-weight: 600;
    font-size: 1.6vw;
  `,

  StyledArrow6: styled(ArrowForward)`
    position: absolute !important;
    top: 67%;
    left: 85%;
  `,
};

export default function DivSafety() {
  return (
    <div>
      <S.StyledTitle>Suporte</S.StyledTitle>
      <S.StyledText1>Contratar um serviço</S.StyledText1>
      <S.StyledArrow1 />
      <S.StyledText2>Opções de pagamento</S.StyledText2>
      <S.StyledArrow2 />
      <S.StyledText3>Definições de conta</S.StyledText3>
      <S.StyledArrow3 />
      <S.StyledText4>Registar-se para prestar serviços</S.StyledText4>
      <S.StyledArrow4 />
      <S.StyledText5>Outras questões</S.StyledText5>
      <S.StyledArrow5 />
      <S.StyledText6>Contacte-nos</S.StyledText6>
      <S.StyledArrow6 />
    </div>
  );
}
