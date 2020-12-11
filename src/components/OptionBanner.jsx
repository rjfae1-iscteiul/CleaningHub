import React from "react";
import styled from "styled-components";
import CompanyIcon from "@material-ui/icons/Business";
import OffersIcon from "@material-ui/icons/LocalOffer";
import Button from "@material-ui/core/Button";
import WorksIcon from "@material-ui/icons/Smartphone";
import { Link } from "react-router-dom";

const S = {
  StyledIcon: styled(CompanyIcon)`
    position: absolute !important;
    top: 80%;
    left: 15%;
    width: 1.9vw !important;
    height: auto !important;
    color: #dfde00; ;
  `,

  StyledTitle: styled.text`
    position: absolute;
    top: 80%;
    left: 17.5%;
    font-family: quicksand;
    font-weight: 400;
    font-size: 1.6vw;
    text-decoration: underline;
    text-underline-offset: 1vh;
    color: #dfde00;
  `,

  StyledBody: styled.text`
    position: absolute;
    top: 83.5%;
    left: 17.5%;
    right: 65%;
    font-family: quicksand;
    font-weight: 300;
    font-size: 1.1vw;
  `,

  StyledButton: styled(Button)`
    position: absolute !important;
    top: 90.5%;
    left: 17.5%;
    font-family: quicksand !important;
    font-weight: 400 !important;
    font-size: 1.05w !important;
    border-bottom: 0.2vh solid #dfde00 !important;
    padding: 0 !important;
    &:hover {
      background-color: transparent !important;
    }
  `,

  StyledIconMiddle: styled(OffersIcon)`
    position: absolute !important;
    top: 80%;
    left: 40%;
    width: 1.8vw !important;
    height: auto !important;
    color: #dfde00; ;
  `,

  StyledTitleMiddle: styled.text`
    position: absolute;
    top: 80%;
    left: 42.5%;
    font-family: quicksand;
    font-weight: 400;
    font-size: 1.6vw;
    text-decoration: underline;
    text-underline-offset: 1vh;
    color: #dfde00;
  `,

  StyledBodyMiddle: styled.text`
    position: absolute;
    top: 83.5%;
    left: 42.5%;
    right: 35%;
    font-family: quicksand;
    font-weight: 300;
    font-size: 1.1vw;
  `,

  StyledButtonMiddle: styled(Button)`
    position: absolute !important;
    top: 90.5%;
    left: 42.5%;
    font-family: quicksand !important;
    font-weight: 400 !important;
    font-size: 1.05w !important;
    border-bottom: 0.2vh solid #dfde00 !important;
    padding: 0 !important;
    &:hover {
      background-color: transparent !important;
    }
  `,

  StyledIconLast: styled(WorksIcon)`
    position: absolute !important;
    top: 80%;
    left: 70%;
    width: 1.8vw !important;
    height: auto !important;
    color: #dfde00; ;
  `,

  StyledTitleLast: styled.text`
    position: absolute;
    top: 80%;
    left: 72.5%;
    font-family: quicksand;
    font-weight: 400;
    font-size: 1.6vw;
    text-decoration: underline;
    text-underline-offset: 1vh;
    color: #dfde00;
  `,

  StyledBodyLast: styled.text`
    position: absolute;
    top: 83.5%;
    left: 72.5%;
    right: 10%;
    font-family: quicksand;
    font-weight: 300;
    font-size: 1.1vw;
  `,

  StyledButtonLast: styled(Button)`
    position: absolute !important;
    top: 90.5%;
    left: 72.5%;
    font-family: quicksand !important;
    font-weight: 400 !important;
    font-size: 1.05w !important;
    border-bottom: 0.2vh solid #dfde00 !important;
    padding: 0 !important;
    &:hover {
      background-color: transparent !important;
    }
  `,
};

export default function BannerOptions() {
  return (
    <div position="relative">
      <S.StyledIcon></S.StyledIcon>
      <S.StyledTitle>Sobre Nós</S.StyledTitle>
      <S.StyledBody>
        Saiba tudo sobre nós, como começámos e as coisas que nos fazem mover.
        <br></br>Seja bem-vindo ao nosso mundo !
      </S.StyledBody>
      <S.StyledButton
        variant="small"
        disableTouchRipple="true"
        disableRipple="true"
        component={Link}
        to="/AboutUs"
      >
        Mais Informações
      </S.StyledButton>
      <S.StyledIconMiddle></S.StyledIconMiddle>
      <S.StyledTitleMiddle>As Nossas Ofertas</S.StyledTitleMiddle>
      <S.StyledBodyMiddle>
        Fique a saber de todas as nossas ofertas que estão sempre disponíveis à
        distância de um clique.
        <br></br>De uma vista de olhos !
      </S.StyledBodyMiddle>
      <S.StyledButtonMiddle
        variant="small"
        disableTouchRipple="true"
        disableRipple="true"
        component={Link}
        to="/Offers"
      >
        Mais Informações
      </S.StyledButtonMiddle>
      <S.StyledIconLast></S.StyledIconLast>
      <S.StyledTitleLast>Como Funciona</S.StyledTitleLast>
      <S.StyledBodyLast>
        Deixamos um pequeno guia para te ajudar sempre que precisares.
        <br></br>Veja o mini-tutorial abaixo !
      </S.StyledBodyLast>
      <S.StyledButtonLast
        variant="small"
        disableTouchRipple="true"
        disableRipple="true"
        component={Link}
        to="/Timeline"
      >
        Mais Informações
      </S.StyledButtonLast>
    </div>
  );
}
