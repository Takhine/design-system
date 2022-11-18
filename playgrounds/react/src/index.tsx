import React from "react";
import { createRoot } from "react-dom/client";

import { Select } from "@takhinearin/react";

import "@takhinearin/scss/lib/Utilities.css";
import "@takhinearin/scss/lib/Text.css";
import "@takhinearin/scss/lib/Margin.css";
import "@takhinearin/scss/lib/Select.css";
import "@takhinearin/scss/lib/global.css";


const container = document.getElementById("root");

const root = createRoot(container!); // createRoot(container!) if you use TypeScript

const options = [{
  label: 'Strict Black',
  value: 'black'
}, {
  label: 'Heavenly Green',
  value: 'green'
}, {
  label: 'Sweet Pink',
  value: 'pink'
}]


root.render(
  <div style={{padding: '40px'}}>
    <Select options={options} />
  </div>
);
