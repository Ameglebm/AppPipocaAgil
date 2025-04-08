import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Activity = (props) => (
  <Svg
    width={props.width || 16}
    height={props.height || 17}
    viewBox="0 0 16 17"
    fill="none"
    {...props}
  >
    <Path
      d="M14.6663 8.66675H11.9997L9.99967 14.6667L5.99967 2.66675L3.99967 8.66675H1.33301"
      stroke={props.stroke || "#7A98FF"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Activity;
