import * as React from "react";
import Svg, { Path } from "react-native-svg";

const HistóricoSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={20}
    fill="none"
    {...props} // Permite que propriedades sejam passadas para o SVG
  >
    <Path
      stroke="currentColor" // Usa 'currentColor' para permitir a mudança de cor dinamicamente
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.5 11.167 18.876 9.61l-1.625 1.556M19.12 10c0 3.866-3.272 7-7.31 7C7.774 17 4.5 13.866 4.5 10s3.273-7 7.31-7c2.681 0 5.026 1.383 6.298 3.445M11.81 6.11V10l2.436 1.556"
    />
  </Svg>
);

export default HistóricoSvg;
