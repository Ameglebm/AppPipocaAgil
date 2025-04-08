import React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";

const Drop = ({ width = 16, height = 16, color = "#B05A4F" }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <G clipPath="url(#clip0)">
        <Path
          d="M13.6667 9.19616C13.6667 11.9684 11.2789 14.2158 8.33333 14.2158C5.38781 14.2158 3 11.9684 3 9.19616C3 8.5305 3.13767 7.8951 3.38768 7.31381C4.17886 5.47423 8.33333 1.66675 8.33333 1.66675C8.33333 1.66675 12.4878 5.47423 13.279 7.31381C13.529 7.8951 13.6667 8.5305 13.6667 9.19616Z"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect
            width="16"
            height="15.0588"
            fill="white"
            transform="translate(0 0.666748)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default Drop;
