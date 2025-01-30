import * as React from "react";
import Svg, { Path } from "react-native-svg";
import PropTypes from "prop-types";

const EmergenciaSvg = ({ color = "#7B7A78", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill={color} // Agora a cor pode ser dinâmica
      d="M21.5 18.126V13c0-4.963-4.037-9-9-9s-9 4.037-9 9v5.126A4.006 4.006 0 0 0 .5 22c0 1.103.897 2 2 2h20c1.103 0 2-.897 2-2a4.006 4.006 0 0 0-3-3.874ZM12.5 6c3.86 0 7 3.141 7 7v5h-14v-5c0-3.859 3.141-7 7-7Zm-10 16c0-1.103.897-2 2-2h16c1.103 0 2 .897 2 2h-20ZM21.297 6.211a1 1 0 0 1-.008-1.414l1.5-1.517a1 1 0 1 1 1.422 1.406l-1.5 1.517a1 1 0 0 1-1.414.008Zm-4.185-4.17.777-1.5a1 1 0 1 1 1.776.92l-.777 1.5a.999.999 0 0 1-1.348.427 1 1 0 0 1-.428-1.347ZM.79 4.687a.999.999 0 1 1 1.422-1.406l1.5 1.517A.999.999 0 1 1 2.29 6.204L.79 4.687Zm4.546-3.226A1 1 0 0 1 7.111.54l.777 1.5a1 1 0 0 1-1.776.92l-.777-1.5ZM8.5 13c0-2.207 1.794-4 4-4a1 1 0 1 1 0 2c-1.103 0-2 .896-2 2a1 1 0 1 1-2 0Z"
    />
  </Svg>
);

export default EmergenciaSvg;

EmergenciaSvg.propTypes = {
  color: PropTypes.string,
};
