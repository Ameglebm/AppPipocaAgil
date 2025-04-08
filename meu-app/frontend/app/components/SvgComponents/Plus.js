import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Plus = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.stroke || "#FDFDFD"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 5v14m-7-7h14"
    />
  </Svg>
);
export default Plus;
