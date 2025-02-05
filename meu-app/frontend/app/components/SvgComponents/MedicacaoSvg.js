import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import PropTypes from "prop-types";

const MedicacaoSvg = ({ color = "#7B7A78", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill={color} // Alteração da cor com base na propriedade `color`
        d="M18 11a6.508 6.508 0 0 0-6.5 6.5c0 3.584 2.916 6.5 6.5 6.5s6.5-2.916 6.5-6.5S21.584 11 18 11Zm0 2a4.47 4.47 0 0 1 2.394.692l-6.203 6.203a4.472 4.472 0 0 1-.692-2.394c0-2.481 2.019-4.5 4.5-4.5L18 13Zm0 9a4.47 4.47 0 0 1-2.394-.692l6.203-6.203c.438.694.692 1.515.692 2.394 0 2.481-2.019 4.5-4.5 4.5L18 22ZM2.5 13v4.5a4.505 4.505 0 0 0 6.544 4.01 1.001 1.001 0 0 1 .911 1.782 6.518 6.518 0 0 1-2.956.709A6.509 6.509 0 0 1 .5 17.5v-11C.5 2.916 3.416 0 7 0s6.5 2.916 6.5 6.5V9a1 1 0 1 1-2 0V6.5C11.5 4.019 9.481 2 7 2a4.505 4.505 0 0 0-4.5 4.5V11h7a1 1 0 1 1 0 2h-7Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.5 0h24v24H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default MedicacaoSvg;

MedicacaoSvg.propTypes = {
  color: PropTypes.string,
};
