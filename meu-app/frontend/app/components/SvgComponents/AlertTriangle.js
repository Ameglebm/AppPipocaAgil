import * as React from "react";
import Svg, { Path } from "react-native-svg";
const AlertTriangle = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#F9F9F9"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.9978 8.99999V13M11.9978 17H12.0078M10.6131 3.89171L2.38823 18.0983C1.93203 18.8863 1.70393 19.2803 1.73764 19.6037C1.76705 19.8857 1.91482 20.142 2.14417 20.3088C2.40713 20.5 2.86239 20.5 3.77292 20.5H20.2227C21.1332 20.5 21.5885 20.5 21.8514 20.3088C22.0808 20.142 22.2286 19.8857 22.258 19.6037C22.2917 19.2803 22.0636 18.8863 21.6074 18.0983L13.3825 3.89171C12.9279 3.10654 12.7006 2.71396 12.4041 2.58211C12.1454 2.4671 11.8502 2.4671 11.5915 2.58211C11.295 2.71396 11.0677 3.10655 10.6131 3.89171Z"
    />
  </Svg>
);
export default AlertTriangle;
