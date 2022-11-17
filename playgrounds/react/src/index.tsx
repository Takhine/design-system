import React from "react";
import { createRoot } from "react-dom/client";

import { Select } from "@design-system/react";

import "@design-system/scss/lib/Utilities.css";
import "@design-system/scss/lib/Text.css";
import "@design-system/scss/lib/Margin.css";
import "@design-system/scss/lib/Select.css";
import "@design-system/scss/lib/global.css";


const container = document.getElementById("root");

const root = createRoot(container!); // createRoot(container!) if you use TypeScript

const options = [{
  label: 'Strict Black',
  value: 'strict-black'
}, {
  label: 'Heavenly Green',
  value: 'heavenly-green'
}, {
  label: 'Sweet Pink',
  value: 'pink'
}]


root.render(
  <div style={{padding: '40px'}}>
    <Select options={options} />
  </div>
);
