import React, { CSSProperties } from "react";
import { Card, Select, Popover } from "antd";
import { Form } from "antd";
import CssCode from "../../components/CssCode";

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
    content: (
      <div>
        <p>任何一个容器都可以指定为 Flex 布局。</p>
        <CssCode>
          {`.container {
  display: flex;
}`}
        </CssCode>
        <p>行内元素也可以使用 Flex 布局。</p>
        <CssCode>
          {`.container {
  display: inline-flex;
}`}
        </CssCode>
        <p>Webkit 内核的浏览器，必须加上-webkit前缀。</p>
        <CssCode>
          {`.container {
  display: -webkit-flex; /* Safari */
  display: flex;
}`}
        </CssCode>
      </div>
    ),
  },
  {
    label: "flex-direction",
    defaultValue: "nowrap",
    propertyKey: "flexDirection",
    options: ["row", "row-reverse", "column", "column-reverse"],
    content:(
      <div>
        <p><code>flex-direction</code>属性内部元素是如何在 flex 容器中布局的，定义了主轴的方向(正方向或反方向)。</p>
        <CssCode>
          {`.container {
  flex-direction: row | row-reverse | column | column-reverse;
}`}
        </CssCode>
        <ul>
          <li>row（默认值）：主轴为水平方向，起点在左端。</li>
          <li>row-reverse：主轴为水平方向，起点在右端。</li>
          <li>column：主轴为垂直方向，起点在上沿。</li>
          <li>column-reverse：主轴为垂直方向，起点在下沿。</li>
        </ul>
      </div>
    )
  },
  {
    label: "flex-wrap",
    defaultValue: "row",
    propertyKey: "flexWrap",
    options: ["nowrap", "wrap", "wrap-reverse"],
    content:(
      <div>
        <p><code>flex-wrap</code>指定 flex 元素单行显示还是多行显示 。如果允许换行，这个属性允许你控制行的堆叠方向。</p>
        <CssCode>
          {`.container {
  flex-direction: nowrap | wrap | wrap-reverse
}`}
        </CssCode>
        <ul>
          <li>nowrap:flex 的元素被摆放到到一行，这可能导致溢出 flex 容器。</li>
          <li>wrap：flex 元素 被打断到多个行中。</li>
          <li>wrap-reverse:和 wrap 的行为一样，开始行方向和wrap相反</li>
        </ul>
        <h3>flex-flow</h3>
        <p>flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。</p>       
         <CssCode>
          {`.container {
  flex-flow: <flex-direction> || <flex-wrap>;
}`}
        </CssCode>
      </div>
    )
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
    content:(
      <div>
        <p><code>flex-direction</code>属性内部元素是如何在 flex 容器中布局的，定义了主轴的方向(正方向或反方向)。</p>
        <CssCode>
          {`.container {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}`}
        </CssCode>
        <ul>
          <li>flex-start（默认值）：左对齐</li>
          <li>flex-end：右对齐</li>
          <li>center： 居中</li>
          <li>space-between：两端对齐，项目之间的间隔都相等。</li>
          <li>space-around：每个项目两侧的间隔相等。</li>
        </ul>
      </div>
    )
  },
  {
    label: "align-items",
    defaultValue: "stretch",
    propertyKey: "alignItems",
    options: ["stretch", "flex-start", "flex-end", "center", "baseline"],
    content:(
      <div>
        <p><code>align-items</code>属性定义项目在交叉轴上如何对齐。</p>
        <CssCode>
          {`.container {
  align-items: flex-start | flex-end | center | baseline | stretch;
}`}
        </CssCode>
        <ul>
          <li>flex-start：交叉轴的起点对齐。</li>
          <li>flex-end：交叉轴的终点对齐。</li>
          <li>center：交叉轴的中点对齐。</li>
          <li>baseline: 项目的第一行文字的基线对齐。</li>
          <li>stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。</li>
        </ul>
      </div>
    )
  },
  {
    label: "align-content",
    defaultValue: "stretch",
    propertyKey: "alignContent",
    options: ["stretch", "flex-start", "flex-end", "center", "space-between","space-around"],
    content:(
      <div>
        <p><code>align-content</code>属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。</p>
        <CssCode>
          {`.container {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}`}
        </CssCode>
        <ul>
          <li>flex-start：与交叉轴的起点对齐。</li>
          <li>flex-end：与交叉轴的终点对齐。</li>
          <li>center：与交叉轴的中点对齐。</li>
          <li>space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。</li>
          <li>space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。</li>
          <li>stretch（默认值）：轴线占满整个交叉轴。</li>
        </ul>
      </div>
    )
  },
];

const ContainerStyle = ({ setFlexContainerStyle }: Props) => {
  return (
    <Card title={<code>.container</code>}>
      <Form {...layout}>
        {styleOptions.map((styleOption) => (
          <>
            <Form.Item
              key={styleOption.label}
              label={
                <Popover
                  content={styleOption.content}
                  title={styleOption.label}
                >
                  <span style={{ cursor: "pointer" }}>{styleOption.label}</span>
                </Popover>
              }
              name={styleOption.label}
            >
              <Select
                defaultValue={styleOption.defaultValue}
                onChange={(value) =>
                  setFlexContainerStyle({ [styleOption.propertyKey]: value })
                }
              >
                {styleOption.options.map((option) => (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </>
        ))}
      </Form>
    </Card>
  );
};
export default ContainerStyle;
