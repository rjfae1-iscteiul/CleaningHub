import React from "react";
import styled from "styled-components";
import FirstImage from "../resources/cleaningfirst.jpg";
import LastImage from "../resources/cleaninglast.jpg";
import Splash from "../resources/SplashBanner.jpg";
import Logo from "../resources/Logo_Completo_White.png"

const S = {
  StyledTitleFirst: styled.text`
    position: absolute;
    font-family: quicksand;
    font-weight: 600;
    font-size: 1.8vw;
    letter-spacing: 0.15vw;
    left: 10%;
    top: 8%;
    color: #38c1d3;
  `,

  HorizontalDivider: styled.hr`
    position: absolute;
    top: 10%;
    left: 10%;
    width: 35vw;
    border: 0.3vh solid #38c1d3;
    border-radius: 20vh;
  `,

  StyleBodyFirst: styled.text`
    position: absolute;
    top: 12%;
    left: 10%;
    width: 35vw;
    font-family: quicksand;
    font-weight: 400;
    font-size: 1.3vw;
  `,

  StyledFirstImage: styled.img`
    position: absolute;
    top: 25%;
    left: 10%;
    width: 35vw;
    height: auto;
  `,

  StyledTitleLast: styled.text`
    position: absolute;
    font-family: quicksand;
    font-weight: 600;
    font-size: 1.8vw;
    letter-spacing: 0.15vw;
    left: 55%;
    right: 10%;
    top: 8%;
    color: #38c1d3;
  `,

  HorizontalDividerLast: styled.hr`
    position: absolute;
    top: 10%;
    left: 55%;
    right: 10%;
    width: 35vw;
    border: 0.3vh solid #38c1d3;
    border-radius: 20vh;
  `,

  StyleBodyLast: styled.text`
    position: absolute;
    top: 12%;
    left: 55%;
    width: 35vw;
    font-family: quicksand;
    font-weight: 400;
    font-size: 1.3vw;
  `,

  StyledLastImage: styled.img`
    position: absolute;
    top: 25%;
    left: 55%;
    width: 35vw;
    height: auto;
  `,

  StyledSplash: styled.img`
    position: absolute;
    top: 63%;
    width: 100%;
    height: 64.9vh;
  `,

  StyledLogo: styled.img`
    position: absolute;
    top: 67%;
    left: 10%;
    width: 30vw;
    height: auto;
  `,
  StyledConsigo: styled.text`
    position: absolute;
    top: 68%;
    left: 55%;
    right:10%;
    font-family: quicksand;
    font-weight: 500;
    font-size: 6vw;
    letter-spacing: 0.3vw;
    color:white;
    text-shadow: 3px 3px 5px rgba(150, 150, 150, 0.4);
    text-align: center;
  `,
};

export default function DivAbo() {
  return (
    <div>
      <S.StyledTitleFirst> O que é a CleaningHub?</S.StyledTitleFirst>
      <S.HorizontalDivider></S.HorizontalDivider>
      <S.StyleBodyFirst>
        A CleaningHub é uma empresa criada em 2020 especializada em limpezas ao
        domicilio que nasce de uma necessidade comum a muitas pessoas. A
        necessidade de um serviço de limpeza que seja eficiente, simples,
        enonómico e que inspire confiança a todos os seus utilizadores.
      </S.StyleBodyFirst>
      <S.StyledFirstImage src={FirstImage} alt=""></S.StyledFirstImage>
      <S.StyledTitleLast>Sempre Consigo!</S.StyledTitleLast>
      <S.HorizontalDividerLast></S.HorizontalDividerLast>
      <S.StyleBodyLast>
        A CleaningHub está sempre consigo para garantir a sua segurança e a
        eficiência dos serviços prestados, monitorizando todas as classificações
        dadas aos colaboradores e assegurando que a qualidade dos serviços são
        sempre um dado adquirido
      </S.StyleBodyLast>
      <S.StyledLastImage src={LastImage} alt=""></S.StyledLastImage>
      <S.StyledSplash src={Splash} alt=""></S.StyledSplash>
      <S.StyledLogo src={Logo} alt=""></S.StyledLogo>
      <S.StyledConsigo>WITH YOU SINCE<br></br>2020</S.StyledConsigo>
    </div>
  );
}
