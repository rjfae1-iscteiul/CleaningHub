import React from "react";
import styled from "styled-components";
import DotIcon from "@material-ui/icons/FiberManualRecord";
import Button from "@material-ui/core/Button";

const S = {
  StyledTitle: styled.text`
    position: absolute;
    top: 8%;
    left: 10%;
    font-family: quicksand;
    font-weight: 700;
    font-size: 1.8vw;
    letter-spacing: 0.15vw;
    color: #38c1d3;
  `,

  StyledIcon1: styled(DotIcon)`
    position: absolute;
    width: 4vw;
    height: auto;
    color: #dfde00;
    top: 15%;
    left: 49.5%;
  `,

  VerticalDivider: styled.hr`
    position: absolute;
    top: 17.5%;
    left: 49.25%;
    height: 14vh;
    margin: auto 1vw;
    border: 0.15vw solid black;
    background-color:black;
    border-radius: 20vh;
  `,

  StyledButton: styled(Button)`
    position: absolute !important;
    top: 14%;
    left: 55%;
    background-color: #50bfd8 !important;
    color: white !important;
    font-family: quicksand !important;
    font-weight: 500 !important;
    font-size: 1.3vw !important;
    letter-spacing: 0.2vw !important;
    border-radius: 20vh !important;
    padding-left: 2vw !important;
    padding-right: 2vw !important;
  `,

  StyledText: styled.text`
    position: absolute;
    top: 19%;
    left: 55%;
    width: 25vw;
    font-family: quicksand;
    font-weight: 400;
    font-size: 1.2vw;
  `,

  StyledIcon2: styled(DotIcon)`
    position: absolute;
    width: 4vw;
    height: auto;
    color: #dfde00;
    top: 26%;
    left: 49.5%;
  `,

  VerticalDivider2: styled.hr`
    position: absolute;
    top: 28.5%;
    left: 49.25%;
    height: 43vh;
    margin: auto 1vw;
    border: 0.15vw solid black;
    border-radius: 20vh;
    background-color:black;
  `,

  StyledButton2: styled(Button)`
    position: absolute !important;
    top: 26%;
    right: 55%;
    background-color: #50bfd8 !important;
    color: white !important;
    font-family: quicksand !important;
    font-weight: 500 !important;
    font-size: 1.3vw !important;
    letter-spacing: 0.2vw !important;
    border-radius: 20vh !important;
    padding-left: 2vw !important;
    padding-right: 2vw !important;
  `,

  StyledText2: styled.text`
    position: absolute;
    top: 31%;
    right: 55%;
    width: 25vw;
    font-family: quicksand;
    font-weight: 400;
    font-size: 1.2vw;
    text-align: right;
  `,

  StyledIcon3: styled(DotIcon)`
    position: absolute;
    width: 4vw;
    height: auto;
    color: #dfde00;
    top: 53%;
    left: 49.5%;
  `,

  VerticalDivider3: styled.hr`
    position: absolute;
    top: 55.5%;
    left: 49.25%;
    height: 15vh;
    margin: auto 1vw;
    border: 0.15vw solid black;
    border-radius: 20vh;
    background-color:black;
  `,

  StyledButton3: styled(Button)`
    position: absolute !important;
    top: 52%;
    left: 55%;
    background-color: #50bfd8 !important;
    color: white !important;
    font-family: quicksand !important;
    font-weight: 500 !important;
    font-size: 1.3vw !important;
    letter-spacing: 0.2vw !important;
    border-radius: 20vh !important;
    padding-left: 2vw !important;
    padding-right: 2vw !important;
  `,

  StyledText3: styled.text`
    position: absolute;
    top: 57%;
    left: 55%;
    width: 25vw;
    font-family: quicksand;
    font-weight: 400;
    font-size: 1.2vw;
    text-align: left;
  `,

  StyledIcon4: styled(DotIcon)`
    position: absolute;
    width: 4vw;
    height: auto;
    color: #dfde00;
    top: 64.5%;
    left: 49.5%;
  `,

  VerticalDivider4: styled.hr`
    position: absolute;
    top: 67%;
    left: 49.25%;
    height: 14vh;
    margin: auto 1vw;
    border: 0.15vw solid black;
    border-radius: 20vh;
    background-color:black;
  `,

  StyledButton4: styled(Button)`
    position: absolute !important;
    top: 64%;
    right: 55%;
    background-color: #50bfd8 !important;
    color: white !important;
    font-family: quicksand !important;
    font-weight: 500 !important;
    font-size: 1.3vw !important;
    letter-spacing: 0.2vw !important;
    border-radius: 20vh !important;
    padding-left: 2vw !important;
    padding-right: 2vw !important;
  `,

  StyledText4: styled.text`
    position: absolute;
    top: 69%;
    right: 55%;
    width: 25vw;
    font-family: quicksand;
    font-weight: 400;
    font-size: 1.2vw;
    text-align: right;
  `,

  StyledIcon5: styled(DotIcon)`
    position: absolute;
    width: 4vw;
    height: auto;
    color: #dfde00;
    top: 75.5%;
    left: 49.5%;
  `,
  
  StyledButton5: styled(Button)`
    position: absolute !important;
    top: 75%;
    left: 55%;
    background-color: #50bfd8 !important;
    color: white !important;
    font-family: quicksand !important;
    font-weight: 500 !important;
    font-size: 1.3vw !important;
    letter-spacing: 0.2vw !important;
    border-radius: 20vh !important;
    padding-left: 2vw !important;
    padding-right: 2vw !important;
  `,

  StyledText5: styled.text`
    position: absolute;
    top: 80%;
    left: 55%;
    width: 25vw;
    font-family: quicksand;
    font-weight: 400;
    font-size: 1.2vw;
    text-align: left;
  `,
};

export default function divTimeline() {
  return (
    <div>
      <S.StyledTitle>Como Funciona</S.StyledTitle>
      <S.StyledButton variant="contained" size="small" disableRipple="true">
        1º Passo
      </S.StyledButton>
      <S.StyledText>
        O utilizador cria uma conta na aplicação dependendo se deseja ser um
        prestador de serviço ou um cliente.
      </S.StyledText>
      <S.StyledIcon1 src={<DotIcon />} alt=""></S.StyledIcon1>
      <S.VerticalDivider></S.VerticalDivider>
      <S.StyledIcon2 src={<DotIcon />} alt=""></S.StyledIcon2>
      <S.VerticalDivider2></S.VerticalDivider2>
      <S.StyledButton2 variant="contained" size="small" disableRipple="true">
        2º Passo
      </S.StyledButton2>
      <S.StyledText2>
        Após a criação da conta, o cliente coloca filtros na aplicação (ex:
        localização, rating) de modo a que esta lhe mostre uma lista de
        prestadores de serviço interessantes para si. <p></p>Os vários
        prestadores de serviço irão receber notificações com os detalhes do
        serviço (ex: fotografias da(s) divisão(ões) a serem limpas, através de
        uma mensagem enviada pela plataforma automaticamente. Poderão aceitar ou
        rejeitar consoante a sua disponibilidade.{" "}
      </S.StyledText2>
      <S.StyledIcon3></S.StyledIcon3>
      <S.VerticalDivider3></S.VerticalDivider3>
      <S.StyledButton3 variant="contained" size="small" disableRipple="true">
        3º Passo
      </S.StyledButton3>
      <S.StyledText3>
        Depois do prestador de serviço aceitar a limpeza, é feita a
        correspondência entre os dois utilizadores e o serviço será realizado.
      </S.StyledText3>
      <S.StyledIcon4></S.StyledIcon4>
      <S.VerticalDivider4></S.VerticalDivider4>
      <S.StyledButton4 variant="contained" size="small" disableRipple="true">
        4º Passo
      </S.StyledButton4>
      <S.StyledText4>
        Após a realização do serviço, o prestador coloca na aplicação que o
        serviço foi concluido e o pagamento será feito.
      </S.StyledText4>
      <S.StyledIcon5></S.StyledIcon5>
      <S.StyledButton5 variant="contained" size="small" disableRipple="true">
        5º Passo
      </S.StyledButton5>
      <S.StyledText5>
        O cliente deverá atribuir uma classificação ao prestador de serviço numa
        escala de 0-10 e poderá deixar um comentário.
      </S.StyledText5>
    </div>
  );
}
