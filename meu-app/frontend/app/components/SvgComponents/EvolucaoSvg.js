import * as React from "react";
import Svg, { Path } from "react-native-svg";

const EvolucaoSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke="currentColor" // Torna o stroke dinâmico
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.166 16.667v-5.834M10.5 16.667V8.333m-6.667 8.334v-3.334m7.839-9.143 4.307 1.615M9.499 4.5 4.833 8M18.05 5.366a1.25 1.25 0 1 1-1.767 1.768 1.25 1.25 0 0 1 1.767-1.768Zm-13.333 2.5a1.25 1.25 0 1 1-1.768 1.768 1.25 1.25 0 0 1 1.768-1.768Zm6.667-5a1.25 1.25 0 1 1-1.768 1.768 1.25 1.25 0 0 1 1.768-1.768Z"
    />
  </Svg>
);

export default EvolucaoSvg;
