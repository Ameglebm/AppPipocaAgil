import * as React from "react";
import Svg, { Path, G, Defs, ClipPath } from "react-native-svg"; // Certifique-se de importar corretamente

const InfoOcatagon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>

    <G clipPath="url(#a)">
      <Path
        stroke="#282828"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 13.333V10m0-3.333h.008m-8.342.435v5.796c0 .204 0 .306.023.401.02.085.054.167.1.241.051.084.123.156.268.3l4.102 4.103c.144.144.216.216.3.267.075.046.156.08.241.1.096.023.198.023.402.023h5.795c.204 0 .306 0 .402-.023a.834.834 0 0 0 .24-.1c.085-.051.157-.123.3-.267l4.103-4.103c.144-.144.216-.216.268-.3a.835.835 0 0 0 .1-.24c.023-.097.023-.199.023-.402V7.102c0-.204 0-.305-.023-.401a.836.836 0 0 0-.1-.241c-.052-.084-.124-.156-.268-.3L13.84 2.056c-.144-.144-.216-.216-.3-.268a.834.834 0 0 0-.241-.1c-.096-.022-.198-.022-.402-.022H7.102c-.204 0-.306 0-.402.023a.833.833 0 0 0-.24.1c-.085.051-.157.123-.301.267L2.057 6.16c-.145.145-.217.217-.268.3a.833.833 0 0 0-.1.242c-.023.096-.023.197-.023.401Z"
      />
    </G>
  </Svg>
);

export default InfoOcatagon;
