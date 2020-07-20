import React, { CSSProperties, useEffect } from "react";
import { Card, Form, InputNumber, Input, Select } from "antd";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
interface Props {
  selected: number;
  selectedItemStyle: CSSProperties;
  setSelectedItemStyle: (index: number, style: CSSProperties) => void;
}

const numberStyleOptions = [
  {
    label: "order",
    defaultValue: 0,
    min: 0,
    propertyKey: "order",
  },
  {
    label: "flex-grow",
    defaultValue: 0,
    min: 0,
    propertyKey: "flexGrow",
  },
  {
    label: "flex-shrink",
    defaultValue: 1,
    min: 0,
    propertyKey: "flexShrink",
  },
];

const ItemStyle = ({
  selected,
  selectedItemStyle,
  setSelectedItemStyle,
}: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...selectedItemStyle });
  }, [form, selectedItemStyle]);

  return (
    <Card title={<code>.item{selected + 1}</code>}>
      <Form {...layout} form={form}>
        {numberStyleOptions.map((styleOption) => (
          <Form.Item
            key={styleOption.label}
            label={styleOption.label}
            name={styleOption.propertyKey}
          >
            <InputNumber
              min={styleOption.min}
              defaultValue={styleOption.defaultValue}
              onChange={(value) =>
                setSelectedItemStyle(selected, {
                  [styleOption.propertyKey]: value,
                })
              }
            />
          </Form.Item>
        ))}
        <Form.Item label="flex-basis" name="flexBasis">
          <Input
            onChange={(e) =>
              setSelectedItemStyle(selected, {
                flexBasis: e.target.value,
              })
            }
          />
        </Form.Item>
        <Form.Item label="align-self" name="alignSelf">
          <Select
            defaultValue="auto"
            onChange={(value) =>
              setSelectedItemStyle(selected, {
                alignSelf: value,
              })
            }
          >
            <Select.Option value="auto">auto</Select.Option>
            <Select.Option value="flex-start">flex-start</Select.Option>
            <Select.Option value="flex-end">flex-end</Select.Option>
            <Select.Option value="center">center</Select.Option>
            <Select.Option value="baseline">baseline</Select.Option>
            <Select.Option value="stretch">stretch</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default ItemStyle;
