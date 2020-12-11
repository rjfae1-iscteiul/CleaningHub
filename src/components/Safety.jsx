import React, { useEffect } from "react";
import styled from "styled-components";
import CleaningKit from "../resources/CleaningKit.jpg";
import Covid1 from "../resources/covid01.jpg";
import Covid2 from "../resources/covid02.jpg";

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

  StyledFirstBanner: styled.text`
    position: absolute;
    top: 20%;
    left: 34%;
    width: 32vw;
    color: #38c1d3;
    text-align: center;
    border-bottom: 0.4vh solid #38c1d3;
    font-family: quicksand;
    font-weight: 600;
    font-size: 1.6vw;
  `,

  StyledFirstText: styled.text`
    font-family: quicksand;
    font-weight: 400;
    font-size: 1.3vw;
    position: absolute;
    top: 38%;
    left: 50%;
    width: 40%;
    color: black;
  `,

  StyledFirstPic: styled.img`
    position: absolute;
    top: 26%;
    left: 10%;
    width: 30vw;
    height: auto;
    border-radius: 5%;
  `,

  StyledSecondBanner: styled.text`
    position: absolute;
    top: 62%;
    left: 46.5%;
    width: 7vw;
    color: #38c1d3;
    text-align: center;
    border-bottom: 0.4vh solid #38c1d3;
    font-family: quicksand;
    font-weight: 600;
    font-size: 1.6vw;
  `,

  StyledSecondText: styled.text`
    font-family: quicksand;
    font-weight: 400;
    font-size: 1.3vw;
    text-align: right;
    position: absolute;
    top: 80%;
    left: 10%;
    width: 40%;
    color: black;
  `,

  StyledSecondPic: styled.img`
    position: absolute;
    top: 68%;
    left: 60%;
    width: 30vw;
    height: auto;
    border-radius: 5%;
  `,

  StyledLastText: styled.text`
    font-family: quicksand;
    font-weight: 400;
    font-size: 1.3vw;
    position: absolute;
    top: 118%;
    left: 50%;
    width: 40%;
    color: black;
  `,

  StyledLastPic: styled.img`
    position: absolute;
    top: 110%;
    left: 10%;
    width: 30vw;
    height: auto;
    border-radius: 5%;
  `,
};

export default function DivSafety() {
  return (
    <div>
      <S.StyledTitle>Segurança</S.StyledTitle>
      <S.StyledDescription>
      Devido ao facto de termos uma plataforma que prima pela segurança,
      o nosso objetivo é garantir que todos os utilizadores, isto é,
      todos os clientes e prestadores de serviço se sintam seguros em relação à realização de limpezas.
      </S.StyledDescription>
      <S.StyledFirstBanner>Funcionalidades de suporte à segurança</S.StyledFirstBanner>
      <S.StyledFirstText>
        Disponibilizamos contacto de suporte em caso de emergência.
        Garantimos a melhor experiência possível ajustando a segurança às suas vontades e restrições. 
      </S.StyledFirstText>
      <S.StyledFirstPic src={CleaningKit} alt="" />
      <S.StyledSecondBanner>Covid-19</S.StyledSecondBanner>
      <S.StyledSecondText>
        Garantimos o cumprimento de todas as normas aconselhadas para assegurar e
        manter a saúde/segurança de todos os utilizadores da nossa plataforma.
      </S.StyledSecondText>
      <S.StyledSecondPic src={Covid1} alt="" />
      <S.StyledLastText>
        Perante a pandemia, apelamos aos prestadores de serviço da nossa plataforma que respeitem
        as medidas de higienização e proteção individual que são conhecidas por todos nós e que
        podem ser encontradas no site da Direção Geral de Saúde.
        <br/>O uso de álcool gel é obrigatório bem como o uso da máscara e de
        luvas desde a sua entrada até à sua saída da habitação.
      </S.StyledLastText>
      <S.StyledLastPic src={Covid2} alt="" />
    </div>
  );
}
