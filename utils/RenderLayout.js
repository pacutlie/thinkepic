const _ = require("lodash");

const layout1 = (name, props) => `import LayoutHome from "@/components/04-Templates/Layout/LayoutHome";
                        export default function ${name}() {
                          return <LayoutHome props={${props}} />;
                        }`;

const layout2 = (name, props) => `import Layout2 from "@/components/04-Templates/Layout/Layout2";
                        export default function ${name}() {
                          return <Layout2 props={${props}} />;
                        }`;

const layout3 = (name, props) => `import LayoutAbout from "@/components/04-Templates/Layout/LayoutAbout";
                        export default function ${name}() {
                          return <LayoutAbout props={${props}} />;
                        }`;

const layout4 = (name, props) => `import Layout4 from "@/components/04-Templates/Layout/Layout4";
                        export default function ${name}() {
                          return <Layout4 props={${props}} />;
                        }`;

export default function RenderLayout(layout, name, props) {
  name = _.camelCase(name);
  props = JSON.stringify(props);

  switch (layout) {
    case "layout1":
      layout = layout2(name, props);
      break;
    case "layout2":
      layout = layout4(name, props);
      break;
    // case "layout3":
    //   layout = layout3(name, props);
    //   break;
    // case "layout4":
    //   layout = layout4(name, props);
    //   break;
  }

  return layout;
}
