import * as React from "react";
import Svg, { Path } from "react-native-svg";
const NextIconSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 18L15 12L9 6"
    />
  </Svg>
);
export default NextIconSvg;
