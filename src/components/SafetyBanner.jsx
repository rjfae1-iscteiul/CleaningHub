import React from "react";
import styled from "styled-components";
import SafetyImage from "../resources/Safety_Banner.jpg";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/icons/HelpOutline";

const S = {
  StyledImage: styled.img`
    position: absolute;
    top: 56%;
    left: 25%;
    width: 16vw;
    height: auto;
  `,

  StyledTitle: styled.text`
    position: absolute;
    top: 53%;
    left: 25%;
    font-family: quicksand;
    font-weight: 500;
    font-size: 1.7vw;
    color: #dfde00;
    letter-spacing: 0.25vw;
  `,

  StyledBody: styled.text`
    position: absolute;
    top: 56%;
    left: 42%;
    right: 21%;
    font-family: quicksand;
    font-weight: 400;
    font-size: 1.2vw;
    text-align: left;
    margin-bottom: 1vh;
  `,

  StyledButton: styled(Button)`
    position: absolute !important;
    top: 70% !important;
    right: 31%;
    font-family: quicksand !important;
    font-weight: 500 !important;
    font-size: 1.2vw !important;
    border-radius: 20vh!important;
    color: white !important;
    letter-spacing: 0.1vw !important;
    background-color: #50bfd8 !important;
    justify-content: center !important;
  `,
};

export default function BannerSafety() {
  return (
    <div>
      <S.StyledImage src={SafetyImage} alt=""></S.StyledImage>
      <S.StyledTitle>O nosso compromisso para a sua segurança</S.StyledTitle>
      <div position="relative">
        <S.StyledBody>
          A sua segurança é uma das nossas maiores preocupações, e que neste
          período difícil para todos se tornou num assunto com uma extrema
          relevância e importância para todos nós, empresas tal como
          consumidores. Para corresponder as necessidades atuais, o nosso
          serviço oferece um conjunto de medidas de segurança que estão de
          acordo com as normas e regras divulgadas pela DGS. Fique a par de
          todas as nossas medidas ao aceder abaixo.
        </S.StyledBody>
        <S.StyledButton variant="contained" elevation={10} size={"medium"} endIcon={<Icon />}>
          Mais Informações
        </S.StyledButton>
      </div>
    </div>
  );
}
