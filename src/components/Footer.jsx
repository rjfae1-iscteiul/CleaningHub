import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";

const S = {
  StyledTitle: styled.text`
    position: absolute;
    top: 96%;
    left: 30%;
    font-family: quicksand;
    font-weight: 400;
    font-size: 1.3vw;
  `,

  StyledButton: styled(Button)`
    position: absolute !important;
    top: 95.5% !important;
    right: 28% !important;
    color: white !important;
    background-color: #50bfd8 !important;
    border-radius: 20vh !important;
    font-family: quicksand !important;
    font-weight: 500 !important;
    font-size: 1.2vw !important;
    letter-spacing: 0.1vw !important;
    justify-content: center !important;
  `,
};

export default function FooterBanner() {
  return (
    <div>
      <S.StyledTitle>Não perca mais tempo e registe-se agora</S.StyledTitle>
      <S.StyledButton variant="contained" size="medium" endIcon={<CreateIcon />}>Registe-se aqui</S.StyledButton>
    </div>
  );
}
