import React, { CSSProperties } from "react";
import { Card, Select } from "antd";
import { Form } from "antd";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

interface Props {
  setFlexContainerStyle: (style: CSSProperties) => void;
}

const styleOptions = [
  {
    label: "display",
    defaultValue: "flex",
    propertyKey: "display",
    options: ["flex", "inline-flex"],
  },
  {
    label: "flex-wrap",
    defaultValue: "nowrap",
    propertyKey: "flexDirection",
    options: ["row", "row-reverse", "column", "column-reverse"],
  },
  {
    label: "flex-direction",
    defaultValue: "row",
    propertyKey: "flexWrap",
    options: ["nowrap", "wrap", "wrap-reverse"],
  },
  {
    label: "justify-content",
    defaultValue: "flex-start",
    propertyKey: "justifyContent",
    options: [
      "flex-start",
      "flex-end",
      "center",
      "space-between",
      "space-around",
    ],
  },
  {
    label: "align-items",
    defaultValue: "stretch",
    propertyKey: "alignItems",
    options: ["stretch", "flex-start", "flex-end", "center", "baseline"],
  },
];

const ContainerStyle = ({ setFlexContainerStyle }: Props) => {
  return (
    <Card
      title={<code>.container</code>}
      extra={
        <a
          href="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html"
          target="blank"
        >
          FlexGrammar
        </a>
      }
    >
      <Form {...layout}>
        {styleOptions.map((styleOption) => (
          <Form.Item key={styleOption.label} label={styleOption.label} name={styleOption.label}>
            <Select
              defaultValue={styleOption.defaultValue}
              onChange={(value) =>
                setFlexContainerStyle({ [styleOption.propertyKey]: value })
              }
            >
              {styleOption.options.map((option) => (
                <Select.Option key={option} value={option}>{option}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        ))}
      </Form>
    </Card>
  );
};
export default ContainerStyle;
