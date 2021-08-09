import React from "react";
import * as s from "./StyledCanvases";

const Field = React.forwardRef((props, ref) => {
  return <s.Field {...props} ref={ref} />;
});

export default Field;
