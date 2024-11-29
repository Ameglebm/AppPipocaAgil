import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SaudeSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      stroke="currentColor" // Usa 'currentColor' para permitir a mudança de cor via props
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.778 1.889h-.89A.889.889 0 0 0 1 2.778v3.555a4.444 4.444 0 0 0 4.444 4.445m2.667-8.89H9c.49 0 .889.399.889.89v3.555a4.444 4.444 0 0 1-4.445 4.445m0 0v1.333a4.889 4.889 0 1 0 9.778 0v-1.333m0 0a1.778 1.778 0 1 0 0-3.556 1.778 1.778 0 0 0 0 3.556ZM7.222 1v1.778M3.667 1v1.778"
    />
  </Svg>
);

export default SaudeSvg;
