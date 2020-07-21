import React, { CSSProperties, useEffect } from "react";
import { Card, Form, InputNumber, Input, Select, Popover } from "antd";
import CssCode from "../../components/CssCode";

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
    content: (
      <div>
        <p>
          <code>order</code>
          属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
        </p>
        <CssCode>
          {`.item {
  order:  <number>; /* default 0 */
}`}
        </CssCode>
      </div>
    ),
  },
  {
    label: "flex-grow",
    defaultValue: 0,
    min: 0,
    propertyKey: "flexGrow",
    content: (
      <div>
        <p>
          <code>flex-grow</code>
          属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
        </p>
        <CssCode>
          {`.item {
  flex-grow: <number>; /* default 0 */
}`}
        </CssCode>
        <p>
          如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。
        </p>
        <p>
          如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。
        </p>
      </div>
    ),
  },
  {
    label: "flex-shrink",
    defaultValue: 1,
    min: 0,
    propertyKey: "flexShrink",
    content: (
      <div>
        <p>
          <code>flex-shrink</code>
          属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
        </p>
        <CssCode>
          {`.item {
  flex-shrink: <number>; /* default 1 */
}`}
        </CssCode>
        <p>
          如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。
        </p>
        <p>
          如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
        </p>
        <p>负值对该属性无效。</p>
      </div>
    ),
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
            label={
              <Popover content={styleOption.content} title={styleOption.label}>
                <span style={{ cursor: "pointer" }}>{styleOption.label}</span>
              </Popover>
            }
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
        <Form.Item
          label={
            <Popover
              content={
                <div>
                  <p>
                    <code>flex-basis</code>
                    属性定义了在分配多余空间之前，项目占据的主轴空间（main
                    size）。
                  </p>
                  <p>
                    浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
                  </p>
                  <CssCode>
                    {`.item {
  flex-basis: <length> | auto; /* default auto */
}`}
                  </CssCode>
                  <p>
                    它可以设为跟width或height属性一样的值（比如100px），则项目将占据固定空间。
                  </p>
                  <h3>flex</h3>
                  <p>
                    <code>flex</code>
                    属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0
                    1 auto。后两个属性可选。
                  </p>
                  <CssCode>
                    {`.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}`}
                  </CssCode>
                  <p>
                    该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
                  </p>
                  <p>
                    建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。
                  </p>
                </div>
              }
              title="flex-basis"
            >
              <span style={{ cursor: "pointer" }}>flex-basis</span>
            </Popover>
          }
          name="flexBasis"
        >
          <Input
            onChange={(e) =>
              setSelectedItemStyle(selected, {
                flexBasis: e.target.value,
              })
            }
          />
        </Form.Item>
        <Form.Item
          label={
            <Popover
              content={
                <div>
                  <p>
                    <code>align-self</code>
                    属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。
                  </p>
                  <p>
                    默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
                  </p>
                  <CssCode>
                    {`.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}`}
                  </CssCode>
                </div>
              }
              title="align-self"
            >
              <span style={{ cursor: "pointer" }}>align-self</span>
            </Popover>
          }
          name="alignSelf"
        >
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
