import * as React from "react";
import Svg, { Path } from "react-native-svg";
const BackIconSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      stroke="#282828"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m15 18.5-6-6 6-6"
    />
  </Svg>
);
export default BackIconSvg;
