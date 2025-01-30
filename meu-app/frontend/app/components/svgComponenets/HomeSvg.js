import * as React from "react";
import Svg, { Path } from "react-native-svg";
const HomeSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.114 21v-7.4c0-.56 0-.84.11-1.054.097-.188.252-.341.443-.437.216-.109.5-.109 1.067-.109h2.835c.567 0 .851 0 1.068.109.19.096.345.249.442.437.11.214.11.494.11 1.054V21M11.158 2.764 4.289 8.039c-.459.353-.689.53-.854.75a1.99 1.99 0 0 0-.322.65c-.075.265-.075.552-.075 1.126V17.8c0 1.12 0 1.68.22 2.108.195.376.505.682.886.874.433.218 1 .218 2.134.218h11.747c1.134 0 1.701 0 2.134-.218.382-.192.691-.498.886-.874.22-.428.22-.988.22-2.108v-7.235c0-.574 0-.861-.075-1.126a1.99 1.99 0 0 0-.322-.65c-.165-.22-.395-.397-.854-.75l-6.868-5.275c-.355-.273-.533-.41-.73-.462a1.025 1.025 0 0 0-.529 0c-.196.052-.374.189-.73.462Z"
    />
  </Svg>
);
export default HomeSvg;
