import React, { useEffect } from "react";
import styled from "styled-components";
import FirstImg from "../resources/Flexible.jpeg";
import SecondImg from "../resources/Reliable.jpeg";
import LastImg from "../resources/Everywhere.jpeg";
import Offer from "../resources/WorkerOffer.jpeg";
import Hours from "../resources/Hours.jpeg";
import Button from "@material-ui/core/Button";

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
    top: 11%;
    left: 10%;
    color: black;
  `,

  StyledFirstImage: styled.img`
    position: absolute;
    top: 16%;
    left: 15%;
    width: 15vw;
    height: auto;
  `,

  StyledFirstAdj: styled.text`
    position: absolute;
    top: 33%;
    left: 17%;
    font-family: quicksand;
    font-weight: 500;
    font-size: 1.4vw;
    color: #38c1d3;
  `,

  StyledFirstText: styled.text`
    position: absolute;
    top: 36%;
    left: 15%;
    width: 15vw;
    font-family: quicksand;
    font-weight: 400;
    font-size: 1.3vw;
    text-align: center;
    color: black;
  `,

  StyledSecondImage: styled.img`
    position: absolute;
    top: 16%;
    left: 42.5%;
    width: 14.5vw;
    height: auto;
  `,

  StyledSecondAdj: styled.text`
    position: absolute;
    top: 33%;
    left: 46.5%;
    font-family: quicksand;
    font-weight: 500;
    font-size: 1.4vw;
    color: #38c1d3;
  `,

  StyledSecondText: styled.text`
    position: absolute;
    top: 36%;
    left: 42.5%;
    width: 15vw;
    font-family: quicksand;
    font-weight: 400;
    font-size: 1.3vw;
    text-align: center;
    color: black;
  `,

  StyledLastImage: styled.img`
    position: absolute;
    top: 17%;
    left: 70%;
    width: 14.5vw;
    border-radius: 50%;
    height: auto;
  `,

  StyledLastAdj: styled.text`
    position: absolute;
    top: 33%;
    left: 73.5%;
    font-family: quicksand;
    font-weight: 500;
    font-size: 1.4vw;
    color: #38c1d3;
  `,

  StyledLastText: styled.text`
    position: absolute;
    top: 36%;
    left: 70%;
    width: 15vw;
    font-family: quicksand;
    font-weight: 400;
    font-size: 1.3vw;
    text-align: center;
    color: black;
  `,

  StyledMiddleBanner: styled.text`
    position: absolute;
    top: 50%;
    left: 38%;
    width: 23vw;
    color: #38c1d3;
    text-align: center;
    border-bottom: 0.4vh solid #38c1d3;
    font-family: quicksand;
    font-weight: 600;
    font-size: 1.6vw;
  `,

  StyledOffer: styled.img`
    position: absolute;
    top: 58%;
    left: 10%;
    width: 30vw;
    height: 43.5vh;
  `,

  StyledHours: styled.img`
    position: absolute;
    top: 58%;
    left: 60%;
    width: 30vw;
    height: auto;
  `,

  StyledFirstDesc: styled.text`
    position: absolute;
    top: 84%;
    left: 10%;
    width: 30vw;
    font-family: quicksand;
    font-weight: 400;
    font-size: 1.3vw;
    text-align: center;
    color: black;
  `,

  StyledSecondDesc: styled.text`
    position: absolute;
    top: 84%;
    left: 60%;
    width: 30vw;
    font-family: quicksand;
    font-weight: 400;
    font-size: 1.3vw;
    text-align: center;
    color: black;
  `,

  StyledButton: styled(Button)`
    position: absolute !important;
    top: 93%;
    left: 38%;
    font-family: quicksand !important;
    font-weight: 500 !important;
    font-size: 1.2vw !important;
    border-radius: 20vh !important;
    color: white !important;
    letter-spacing: 0.1vw !important;
    background-color: #50bfd8 !important;
    justify-content: center !important;
    padding-left: 1vw !important;
    padding-right: 1vw !important;
  `,
};

export default function DivOffer() {
  return (
    <div>
      <S.StyledTitle>As Nossas Ofertas</S.StyledTitle>
      <S.StyledDescription>
        Veja o que faz o nosso produto ser tão simples e fácil de incorporar na
        sua vida
      </S.StyledDescription>
      <S.StyledFirstImage src={FirstImg} alt=""></S.StyledFirstImage>
      <S.StyledFirstAdj>Horários Flexíveis</S.StyledFirstAdj>
      <S.StyledFirstText>
        Agende a sua limpeza para qualquer hora do dia
      </S.StyledFirstText>
      <S.StyledSecondImage src={SecondImg} alt=""></S.StyledSecondImage>
      <S.StyledSecondAdj>Confiança</S.StyledSecondAdj>
      <S.StyledSecondText>
        Escolha um dos nossos colaboradores, analisando as reviews de antigos
        clientes.
      </S.StyledSecondText>
      <S.StyledLastImage src={LastImg} alt=""></S.StyledLastImage>
      <S.StyledLastAdj>Localização</S.StyledLastAdj>
      <S.StyledLastText>
        Com base na sua localização, mostramos as melhores ofertas para si.
      </S.StyledLastText>
      <S.StyledMiddleBanner>Venha trabalhar connosco</S.StyledMiddleBanner>
      <S.StyledOffer src={Offer} alt=""></S.StyledOffer>
      <S.StyledHours src={Hours} alt=""></S.StyledHours>
      <S.StyledFirstDesc>
        Inscreva-se como colaborador e trabalhe nas suas horas vagas.{" "}
      </S.StyledFirstDesc>
      <S.StyledSecondDesc>
        Tem a liberdade de escolher o seu horário e o seu local de trabalho.
      </S.StyledSecondDesc>
      <S.StyledButton variant="contained" elevation={10}>
        Registe-se como colaborador
      </S.StyledButton>
    </div>
  );
}
