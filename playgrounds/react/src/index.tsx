import React from "react";
import ReactDom from "react-dom";

import { Button } from "../../../packages/react";

import '../../../packages/scss/lib/Button.css'

ReactDom.render(<Button label="Example" />, document.querySelector("#root"));
