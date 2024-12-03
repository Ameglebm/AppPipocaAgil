import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg"; // Importando Svg, Path e Rect corretamente

const IconSuccess = (props) => (
  <Svg width={48} height={48} fill="none" {...props}>
    <Rect width={48} height={48} fill="#53B483" rx={24} />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M34 23.086v.92a10 10 0 1 1-5.93-9.14M34 16 24 26.01l-3-3"
    />
  </Svg>
);

export default IconSuccess;
