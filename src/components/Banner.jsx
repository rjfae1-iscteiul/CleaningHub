import React from "react";
import styled from "styled-components";
import MainImage from "../resources/ImageHomePage.jpg";
import Logo from "../resources/Logo_Completo.png";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const S = {
  StyledImage: styled.img`
    width: 100%;
    height: auto;
    max-height: 55vh;
  `,

  StyledLogo: styled.img`
    position: absolute;
    top: 20%;
    left: 10%;
    width: 30vw;
    height: auto;
  `,

  StyledCard: styled(Card)`
    padding: 0.5vw !important;
    position: absolute !important;
    top: 23%;
    right: 10%;
    width: 35vw;
    height: auto;
    align-items: center !important;
  `,

  StyledTitle: styled.text`
    font-family: quicksand;
    font-weight: 600;
    font-size: 2vw;
    color: #dfde00;
  `,

  StyleBody: styled.text`
    font-family: quicksand;
    font-weight: 400;
    font-size: 1.2vw;
    color: black;
    word-break: keep-all;
  `,

  StyledDivider: styled.h2`
    width: 80%;
    text-align: center;
    font-family: quicksand;
    font-weight: 400;
    font-size: 1.5vw;
    border-bottom: 0.2vh solid #000;
    line-height: 0.15vh;
    margin-top: 4vh;
    margin-left: 3vw;
    margin-bottom: 2.5vh;
  `,

  StyledSpan: styled.span`
    background: #fff;
    padding: 0 1vw;
  `,

  
};

export default function BannerHome() {
  return (
    <div position="relative">
      <S.StyledImage src={MainImage} alt=""></S.StyledImage>
      <S.StyledLogo src={Logo} alt=""></S.StyledLogo>
      <S.StyledCard elevation={10}>
        <CardContent>
          <S.StyledTitle>Reviews dos nossos clientes</S.StyledTitle>
          <p></p>
          <S.StyleBody>
              "Muito profissionais e atenciosos! Recomendo vivamente!" - Maria Gomes
              
          </S.StyleBody>
          <p></p>
          <S.StyleBody>
          "O serviço de limpeza mais fácil que já usei. Preços bastante acessíveis" - André Silva
          </S.StyleBody>
          
            <S.StyledDivider>
              <S.StyledSpan>Est. 2020</S.StyledSpan>
            </S.StyledDivider>
        </CardContent>
      </S.StyledCard>
    </div>
  );
}
