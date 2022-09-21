/* eslint-disable quotes */
import { EscPos } from "@tillpos/xml-escpos-helper/lib";

// store this template somewhere `s3` or as `static asset` based on your preference
const template = `
  <?xml version="1.0" encoding="UTF-8"?>
  <document>
    <align mode="center">
      <bold>
        <text-line size="1:0">{{title}}</text-line>
      </bold>
    </align>

    {{#thankyouNote}}
    <align mode="center">
      <text-line size="0:0">  {{{thankyouNote}}}</text-line>
    </align>

    <line-feed />

    <paper-cut />
  </document>
`;

const input = {
  title: "Sample",
  thankyouNote: "Welcome...!",
};

export const buffer = EscPos.getBufferFromTemplate(template, input);
