import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const Coracao = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={33}
    fill="none"
    {...props}
  >
    <Rect width={32} height={32} y={0.5} fill="#F2D9D6" rx={16} />
    <Path
      stroke="#B05A4F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18.8 18.236H18l-1.2 2.377-1.6-4.755-1.2 2.378h-.8m2.795-5.043c-1.6-1.853-4.267-2.351-6.271-.655-2.004 1.696-2.286 4.532-.713 6.538 1.19 1.515 4.566 4.557 6.147 5.955.291.257.437.386.607.436a.819.819 0 0 0 .46 0c.17-.05.315-.179.606-.436 1.581-1.398 4.958-4.44 6.147-5.955 1.573-2.006 1.326-4.86-.713-6.538-2.038-1.678-4.671-1.198-6.27.655Z"
    />
  </Svg>
);
export default Coracao;
