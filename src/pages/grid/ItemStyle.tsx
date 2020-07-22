import React, { CSSProperties } from "react";
import { Card, Form, Row, Col, Popover, Select, Input } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import CssCode from "../../components/CssCode";

interface gridItemProperty {
  label: string;
  propertyKey: string;
  defaultValue?: string;
  options?: string[];
  content: React.ReactNode;
}

const gridItems: gridItemProperty[] = [
  {
    label: "grid-column-start",
    propertyKey: "gridColumnStart",
    content: (
      <div>
        <p>grid-column-start：左边框所在的垂直网格线</p>
        <p>grid-column-end：右边框所在的垂直网格线</p>
        <CssCode>
          {`.item-1 {
  grid-column-start: 2;
  grid-column-end: 4;
}`}
        </CssCode>
        {/* <p>grid-column-[start|end] 可以指定为网格线的名字。</p>
        <CssCode>
          {`.item-1 {
            grid-column-start: header-start;
            grid-column-end: header-end;
          }`}
        </CssCode> */}
        <p>
          grid-column-[start|end]
          还可以使用span关键字，表示"跨越"，即左右边框之间跨越多少个网格。
        </p>
        <CssCode>
          {`.item-1 {
  grid-column-start: span 2;
  grid-column-end: span 2;
}`}
        </CssCode>
        <p>grid-column属性是grid-column-start和grid-column-end的合并简写形式</p>
        <CssCode>
          {`.item-1 {
  grid-column:  grid-column-start / grid-column-end;
}`}
        </CssCode>
      </div>
    ),
  },
  {
    label: "grid-column-end",
    propertyKey: "gridColumnEnd",
    content: (
      <div>
        <p>grid-column-start：左边框所在的垂直网格线</p>
        <p>grid-column-end：右边框所在的垂直网格线</p>
        <CssCode>
          {`.item-1 {
  grid-column-start: 2;
  grid-column-end: 4;
}`}
        </CssCode>
        {/* <p>grid-column-[start|end] 可以指定为网格线的名字。</p>
        <CssCode>
          {`.item-1 {
            grid-column-start: header-start;
            grid-column-end: header-end;
          }`}
        </CssCode> */}
        <p>
          grid-column-[start|end]
          还可以使用span关键字，表示"跨越"，即左右边框之间跨越多少个网格。
        </p>
        <CssCode>
          {`.item-1 {
  grid-column-start: span 2;
  grid-column-end: span 2;
}`}
        </CssCode>
        <p>grid-column属性是grid-column-start和grid-column-end的合并简写形式</p>
        <CssCode>
          {`.item-1 {
  grid-column:  grid-column-start / grid-column-end;
}`}
        </CssCode>
      </div>
    ),
  },
  {
    label: "grid-row-start",
    propertyKey: "gridRowStart",
    content: (
      <div>
        <p>grid-row-start：上边框所在的水平网格线</p>
        <p>grid-row-end：下边框所在的水平网格线</p>
        <CssCode>
          {`.item-1 {
  grid-row-start: 2;
  grid-row-end: 4;
}`}
        </CssCode>
        <p>
          grid-column-[start|end]
          还可以使用span关键字，表示"跨越"，即上下边框之间跨越多少个网格。
        </p>
        <CssCode>
          {`.item-1 {
  grid-row-start: span 2;
  grid-row-end: span 2;
}`}
        </CssCode>
        <p>grid-row-row-start和grid-row-end的合并简写形式</p>
        <CssCode>
          {`.item-1 {
  grid-row:  grid-row-start / grid-row-end;
}`}
        </CssCode>
      </div>
    ),
  },
  {
    label: "grid-row-end",
    propertyKey: "gridRowEnd",
    content: (
      <div>
        <p>grid-row-start：上边框所在的水平网格线</p>
        <p>grid-row-end：下边框所在的水平网格线</p>
        <CssCode>
          {`.item-1 {
  grid-row-start: 2;
  grid-row-end: 4;
}`}
        </CssCode>
        <p>
          grid-column-[start|end]
          还可以使用span关键字，表示"跨越"，即上下边框之间跨越多少个网格。
        </p>
        <CssCode>
          {`.item-1 {
  grid-row-start: span 2;
  grid-row-end: span 2;
}`}
        </CssCode>
        <p>grid-row-row-start和grid-row-end的合并简写形式</p>
        <CssCode>
          {`.item-1 {
  grid-row:  grid-row-start / grid-row-end;
}`}
        </CssCode>
      </div>
    ),
  },
  {
    label: "grid-area",
    propertyKey: "gridArea",
    content: (
      <div>
        <p>grid-area属性指定项目放在哪一个区域。</p>
        <CssCode>
          {`.item-1 {
  grid-area: e;
}`}
        </CssCode>
        <p>
          grid-area属性还可用作grid-row-start、grid-column-start、grid-row-end、grid-column-end的合并简写形式，直接指定项目的位置。
        </p>
        <CssCode>
          {`.item-1 {
  grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
}`}
        </CssCode>
      </div>
    ),
  },
  {
    label: "justify-self",
    propertyKey: "justifySelf",
    defaultValue: "stretch",
    options: ["stretch", "start", "end", "center"],
    content: (
      <div>
        <p>
          justify-self属性设置单元格内容的水平位置（左中右），跟justify-items属性的用法完全一致，但只作用于单个项目。
        </p>
        <CssCode>
          {`.item-1 {
  justify-self: start | end | center | stretch;
}`}
        </CssCode>
        <ul>
          <li>start：对齐单元格的起始边缘。</li>
          <li>end：对齐单元格的结束边缘。</li>
          <li>center：单元格内部居中。</li>
          <li>stretch：拉伸，占满单元格的整个宽度（默认值）。</li>
        </ul>
        <p>place-self属性是align-self属性和justify-self属性的合并简写形式。</p>
        <CssCode>
          {`.item-1 {
  place-self: <align-self> <justify-self>;
}`}
        </CssCode>
      </div>
    ),
  },
  {
    label: "align-self",
    propertyKey: "alignSelf",
    defaultValue: "stretch",
    options: ["stretch", "start", "end", "center"],
    content: (
      <div>
        <p>
          align-self属性设置单元格内容的垂直位置（上中下），跟align-items属性的用法完全一致，也是只作用于单个项目。
        </p>
        <CssCode>
          {`.item-1 {
  align-self: start | end | center | stretch;
}`}
        </CssCode>
        <ul>
          <li>start：对齐单元格的起始边缘。</li>
          <li>end：对齐单元格的结束边缘。</li>
          <li>center：单元格内部居中。</li>
          <li>stretch：拉伸，占满单元格的整个宽度（默认值）。</li>
        </ul>
        <p>place-self属性是align-self属性和justify-self属性的合并简写形式。</p>
        <CssCode>
          {`.item-1 {
  place-self: <align-self> <justify-self>;
}`}
        </CssCode>
      </div>
    ),
  },
];

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface Props {
  selected: number;
  itemStyle: CSSProperties[];
  setSelectedItemStyle: (index: number, style: CSSProperties) => void;
}

const ItemStyle = ({ selected, itemStyle, setSelectedItemStyle }: Props) => {
  return (
    <Card title={<code>.item{selected + 1}</code>}>
      <Form {...layout} name="basic">
        {gridItems.map((gridItem) => (
          <Form.Item
            key={gridItem.label}
            label={gridItem.label}
            name={gridItem.propertyKey}
          >
            <Row align="middle">
              <Col span={22}>
                {gridItem.options ? (
                  <Select
                    defaultValue={gridItem.defaultValue}
                    onChange={(value) =>
                      setSelectedItemStyle(selected, {
                        [gridItem.propertyKey]: value,
                      })
                    }
                  >
                    {gridItem.options.map((option) => (
                      <Select.Option key={option} value={option}>
                        {option}
                      </Select.Option>
                    ))}
                  </Select>
                ) : (
                  <Input
                    allowClear
                    onChange={(e) =>
                      setSelectedItemStyle(selected, {
                        [gridItem.propertyKey]: e.target.value,
                      })
                    }
                  />
                )}
              </Col>
              <Col span={2}>
                <div className="text-center">
                  <Popover content={gridItem.content} title={gridItem.label}>
                    <QuestionCircleOutlined />
                  </Popover>
                </div>
              </Col>
            </Row>
          </Form.Item>
        ))}
      </Form>
    </Card>
  );
};
export default ItemStyle;
