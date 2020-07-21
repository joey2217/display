import React, { CSSProperties, useState, useEffect } from "react";
import { Card, Form, Input, Select, Row, Col, Popover } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import CssCode from "../../components/CssCode";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface Props {
  setGridContainerStyle: (style: CSSProperties) => void;
}

const gridTemplateColumnsMap: Map<
  string,
  { value: string; content: React.ReactNode }
> = new Map([
  [
    "none",
    {
      value: "100px 100px 100px",
      content: (
        <div>
          <p>grid-template-columns属性定义每一列的列宽。</p>
          <CssCode>
            {`.container {
    display: grid;
    grid-template-columns: 100px 100px 100px; 
    grid-template-rows: 100px 100px 100px;
}`}
          </CssCode>
          <p>除了使用绝对单位，也可以使用百分比。</p>
          <CssCode>
            {`.container {
    display: grid;
    grid-template-columns: 33.33% 33.33% 33.33%;  
    grid-template-rows: 33.33% 33.33% 33.33%;
}`}
          </CssCode>
        </div>
      ),
    },
  ],
  [
    "repeat",
    {
      value: "repeat(3, 33.33%)",
      content: (
        <div>
          <p>grid-template-columns可以使用repeat()函数，简化重复的值。</p>
          <CssCode>
            {`.container {
    display: grid;
    grid-template-columns: repeat(3, 33.33%);
    grid-template-rows: repeat(3, 33.33%);
}`}
          </CssCode>
          <p>
            repeat()接受两个参数，第一个参数是重复的次数（上例是3），第二个参数是所要重复的值。
          </p>
          <p>repeat()重复某种模式也是可以的。</p>
          <CssCode>
            {`.container {
    display: grid;
    grid-template-columns: repeat(2, 100px 20px 80px);
}`}
          </CssCode>
        </div>
      ),
    },
  ],
  [
    "auto-fill",
    {
      value: "repeat(auto-fill, 100px)",
      content: (
        <div>
          <p>
            单元格的大小固定的，容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，
          </p>
          <p>这时可以使用auto-fill关键字表示自动填充。</p>
          <CssCode>
            {`.container {
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
}`}
          </CssCode>
          <p>
            上面代码表示每列宽度100px，然后自动填充，直到容器不能放置更多的列。
          </p>
        </div>
      ),
    },
  ],
  [
    "fr",
    {
      value: "1fr 2fr",
      content: (
        <div>
          <p>
            为了方便表示比例关系，网格布局提供了fr关键字（fraction
            的缩写，意为"片段"）。
          </p>
          <p>如果两列的宽度分别为1fr和2fr，就表示后者是前者的两倍。</p>
          <CssCode>
            {`.container {
    display: grid;
    grid-template-columns: 1fr 2fr;
}`}
          </CssCode>
          <p>fr可以与绝对长度的单位结合使用，这时会非常方便。</p>
          <CssCode>
            {`.container {
    display: grid;
    grid-template-columns: 150px 1fr 2fr;
}`}
          </CssCode>
        </div>
      ),
    },
  ],
  [
    "minmax",
    {
      value: "1fr minmax(100px, 2fr)",
      content: (
        <div>
          <p>
            minmax()函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。
          </p>
          <CssCode>
            {`.container {
    display: grid;
    grid-template-columns: 1fr minmax(100px, 2fr);
}`}
          </CssCode>
        </div>
      ),
    },
  ],
  [
    "auto",
    {
      value: "100px auto 100px",
      content: (
        <div>
          <p>auto关键字表示由浏览器自己决定长度。</p>
          <CssCode>
            {`.container {
    display: grid;
    grid-template-columns: 100px auto 100px;
}`}
          </CssCode>
        </div>
      ),
    },
  ],
  [
    "line-name",
    {
      value: "[c1] 100px [c2] 100px [c3] auto [c4]",
      content: (
        <div>
          <p>
            grid-template-columns属性和grid-template-rows属性里面，还可以使用方括号，指定每一根网格线的名字，方便以后的引用。
          </p>
          <CssCode>
            {`.container {
    display: grid;
    grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
    grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
}`}
          </CssCode>
          <p>
            上面代码指定网格布局为3行 x
            3列，因此有4根垂直网格线和4根水平网格线。方括号里面依次是这八根线的名字。
          </p>
          <p>网格布局允许同一根线有多个名字，比如[fifth-line row-5]。</p>
        </div>
      ),
    },
  ],
]);

let gridTemplateColumnsContent = gridTemplateColumnsMap.get("none")?.content;

const ContainerStyle = ({ setGridContainerStyle }: Props) => {
  const [form] = Form.useForm();

  const onGridTemplateColumnsKeyChange = (value: string) => {
    const style = gridTemplateColumnsMap.get(value)?.value;
    form.setFieldsValue({
      gridTemplateColumns: style,
    });
    setGridContainerStyle({ gridTemplateColumns: style });
    gridTemplateColumnsContent = gridTemplateColumnsMap.get(value)?.content;
  };

  return (
    <Card title={<code>.container</code>}>
      <Form {...layout} form={form} name="basic">
        <Form.Item label="display" name="display">
          <Row align="middle">
            <Col span={22}>
              <Select
                defaultValue="grid"
                onChange={(value) => setGridContainerStyle({ display: value })}
              >
                <Select.Option value="grid">grid</Select.Option>
                <Select.Option value="inline-grid">inline-grid</Select.Option>
              </Select>
            </Col>
            <Col span={2}>
              <div className="text-center">
                <Popover
                  content={
                    <div>
                      <p>display: grid指定一个容器采用网格布局。</p>
                      <CssCode>
                        {`.container {
    display: grid;
}`}
                      </CssCode>
                      <p>display: inline-grid,将容器设为行内元素。</p>
                      <CssCode>
                        {`.container {
  display: inline-grid;
}`}
                      </CssCode>
                    </div>
                  }
                  title="grid"
                >
                  <QuestionCircleOutlined />
                </Popover>
              </div>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="grid-template-columns">
          <Row align="middle">
            <Col span={8}>
              <Form.Item noStyle>
                <Select
                  placeholder="gridTemplateColumnsKey"
                  defaultValue="none"
                  onChange={onGridTemplateColumnsKeyChange}
                >
                  <Select.Option value="none">none</Select.Option>
                  <Select.Option value="repeat">repeat()</Select.Option>
                  <Select.Option value="auto-fill">auto-fill</Select.Option>
                  <Select.Option value="fr">fr</Select.Option>
                  <Select.Option value="minmax">minmax()</Select.Option>
                  <Select.Option value="auto">auto</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item name="gridTemplateColumns" noStyle>
                <Input
                  defaultValue="100px 100px 100px"
                  onChange={(e) => {
                    setGridContainerStyle({
                      gridTemplateColumns: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={2}>
              <div className="text-center">
                <Popover
                  content={gridTemplateColumnsContent}
                  title="grid-template-columns"
                >
                  <QuestionCircleOutlined />
                </Popover>
              </div>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default ContainerStyle;
