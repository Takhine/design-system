import React from "react";
import ReactDom from "react-dom";

import { Text, Margin } from "@design-system/react";

import "@design-system/scss/lib/Utilities.css";
import "@design-system/scss/lib/Text.css";
import "@design-system/scss/lib/Margin.css";
import "@design-system/scss/lib/global.css";

import { FontSize } from "@design-system/foundation";

ReactDom.render(
  <div>
    <Margin>
      <Text size={FontSize.base}>This is some text</Text>
    </Margin>
  </div>,
  document.querySelector("#root")
);
