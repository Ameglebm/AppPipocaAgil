import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

const XClose = ({
  size = 24,
  color = "white",
  backgroundColor = "#F34141",
  padding = 10,
}) => {
  const newSize = size + padding * 2; // Aumenta o tamanho total do SVG
  const offset = padding; // Move o ícone para o centro

  return (
    <Svg
      width={newSize}
      height={newSize}
      viewBox={`0 0 ${newSize} ${newSize}`} // Ajusta o viewBox para incluir padding
      fill="none"
    >
      {/* Fundo arredondado */}
      <Rect
        width={newSize}
        height={newSize}
        fill={backgroundColor}
        rx={newSize / 2}
      />

      {/* Ícone X deslocado para centralizar */}
      <Path
        d="M18 6L6 18M6 6L18 18"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        transform={`translate(${offset}, ${offset})`} // Centraliza o ícone dentro do novo espaço
      />
    </Svg>
  );
};

export default XClose;
