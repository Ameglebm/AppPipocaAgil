import * as React from "react";
import Svg, { Path } from "react-native-svg";

const RelatoriosSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="currentColor" // Corrigido de "currenColor" para "currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M22 21H4.689c-.591 0-.887 0-1.113-.109a1.03 1.03 0 0 1-.46-.437c-.116-.214-.116-.494-.116-1.054V3m17.944 5-4.136 4.183c-.157.158-.235.237-.33.278a.553.553 0 0 1-.267.044c-.103-.01-.205-.06-.408-.16l-3.439-1.69c-.203-.1-.305-.15-.409-.16a.554.554 0 0 0-.267.044c-.094.04-.172.12-.33.278L7.223 15"
    />
  </Svg>
);

export default RelatoriosSvg;
