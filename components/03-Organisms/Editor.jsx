import { useState, useRef, useMemo } from "react";
// import JoditEditor from "jodit-react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const copyStringToClipboard = function (str) {
  var el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style = { position: "absolute", left: "-9999px" };
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

const facilityMergeFields = ["FacilityNumber", "FacilityName", "Address", "MapCategory", "Latitude", "Longitude", "ReceivingPlant", "TrunkLine", "SiteElevation"];
const inspectionMergeFields = ["InspectionCompleteDate", "InspectionEventType"];

const createOptionGroupElement = (mergeFields, optionGrouplabel) => {
  let optionGroupElement = document.createElement("optgroup");
  optionGroupElement.setAttribute("label", optionGrouplabel);
  for (let index = 0; index < mergeFields.length; index++) {
    let optionElement = document.createElement("option");
    optionElement.setAttribute("class", "merge-field-select-option");
    optionElement.setAttribute("value", mergeFields[index]);
    optionElement.text = mergeFields[index];
    optionGroupElement.appendChild(optionElement);
  }
  return optionGroupElement;
};

const buttons = [
  "undo",
  "redo",
  "|",
  "bold",
  "strikethrough",
  "underline",
  "italic",
  "|",
  "superscript",
  "subscript",
  "|",
  "align",
  "|",
  "ul",
  "ol",
  "outdent",
  "indent",
  "|",
  "font",
  "fontsize",
  "brush",
  "paragraph",
  "|",
  "image",
  "video",
  // "file",
  "|",
  "link",
  "table",
  "|",
  "hr",
  // "eraser",
  // "copyformat",
  "|",
  "fullsize",
  "selectall",
  // "print",
  "|",
  // "source",
  "|",
  {
    name: "insertMergeField",
    tooltip: "Insert Merge Field",
    iconURL: "images/merge.png",
    popup: (editor, current, self, close) => {
      function onSelected(e) {
        let mergeField = e.target.value;
        if (mergeField) {
          console.log(mergeField);
          editor.selection.insertNode(editor.create.inside.fromHTML("{{" + mergeField + "}}"));
        }
      }
      let divElement = editor.create.div("merge-field-popup");

      let labelElement = document.createElement("label");
      labelElement.setAttribute("class", "merge-field-label");
      labelElement.text = "Merge field: ";
      divElement.appendChild(labelElement);

      let selectElement = document.createElement("select");
      selectElement.setAttribute("class", "merge-field-select");
      selectElement.appendChild(createOptionGroupElement(facilityMergeFields, "Facility"));
      selectElement.appendChild(createOptionGroupElement(inspectionMergeFields, "Inspection"));
      selectElement.onchange = onSelected;
      divElement.appendChild(selectElement);

      console.log(divElement);
      return divElement;
    },
  },
  {
    name: "copyContent",
    tooltip: "Copy HTML to Clipboard",
    iconURL: "images/copy.png",
    exec: function (editor) {
      let html = editor.value;
      copyStringToClipboard(html);
    },
  },
];

export default function Editor({ content, setContent }) {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      toolbar: true,
      spellcheck: true,
      language: "en",
      toolbarButtonSize: "medium",
      toolbarAdaptive: false,
      showCharsCounter: true,
      showWordsCounter: true,
      showXPathInStatusbar: false,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      //defaultActionOnPaste: "insert_clear_html",
      buttons: buttons,
      uploader: {
        insertImageAsBase64URI: true,
      },
      height: 500,
      placeholder: content ? "" : "Mulai mengetik...",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      onChange={(newContent) => {
        setContent(newContent);
      }}
    />
  );
}
