import React, { CSSProperties } from "react";
import { Card, Form, Input, Select, Row, Col, Popover, Alert } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import CssCode from "../../components/CssCode";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface gridContainerProperty {
  label: string;
  defaultValue: string;
  propertyKey: string;
  content: React.ReactNode;
  options?: string[];
}

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

const gridGap: gridContainerProperty[] = [
  {
    label: "grid-row-gap",
    defaultValue: "10px",
    propertyKey: "rowGap",
    content: (
      <div>
        <p>grid-row-gap属性设置行与行的间隔（行间距）。(简写row-gap)</p>
        <CssCode>
          {`.container {
  grid-row-gap: 10px;
}`}
        </CssCode>
      </div>
    ),
  },
  {
    label: "grid-column-gap",
    defaultValue: "10px",
    propertyKey: "columnGap",
    content: (
      <div>
        <p>grid-column-gap属性设置列与列的间隔（列间距）。(column-gap)</p>
        <CssCode>
          {`.container {
  grid-column-gap: 10px;
}`}
        </CssCode>
        <p>
          grid-gap(简写gap)属性是grid-column-gap和grid-row-gap的合并简写形式，语法如下。
        </p>
        <CssCode>
          {`.container {
  grid-gap: <grid-row-gap> <grid-column-gap>;
}`}
        </CssCode>
        <p>如果grid-gap省略了第二个值，浏览器认为第二个值等于第一个值。</p>
      </div>
    ),
  },
];

const justifyAlign: gridContainerProperty[] = [
  {
    label: "justify-items",
    defaultValue: "stretch",
    propertyKey: "justifyItems",
    options: ["stretch", "start", "end", "center"],
    content: (
      <div>
        <p>justify-items属性设置单元格内容的水平位置（左中右）</p>
        <CssCode>
          {`.container {
  justify-items: start | end | center | stretch;
}`}
        </CssCode>
        <ul>
          <li>start：对齐单元格的起始边缘。</li>
          <li>end：对齐单元格的结束边缘。</li>
          <li>center：单元格内部居中。</li>
          <li>stretch：拉伸，占满单元格的整个宽度（默认值）。</li>
        </ul>
      </div>
    ),
  },
  {
    label: "align-items",
    defaultValue: "stretch",
    propertyKey: "alignItems",
    options: ["stretch", "start", "end", "center"],
    content: (
      <div>
        <p>align-items属性设置单元格内容的垂直位置（上中下）</p>
        <CssCode>
          {`.container {
  align-items: start | end | center | stretch;
}`}
        </CssCode>
        <ul>
          <li>start：对齐单元格的起始边缘。</li>
          <li>end：对齐单元格的结束边缘。</li>
          <li>center：单元格内部居中。</li>
          <li>stretch：拉伸，占满单元格的整个宽度（默认值）。</li>
        </ul>
        <p>
          place-items属性是align-items属性和justify-items属性的合并简写形式。
        </p>
        <CssCode>{`place-items: <align-items> <justify-items>;}`}</CssCode>
      </div>
    ),
  },
  {
    label: "justify-content",
    defaultValue: "start",
    propertyKey: "justifyContent",
    options: [
      "start",
      "end",
      "center",
      "stretch",
      "space-around",
      "space-between",
      "space-evenly",
    ],
    content: (
      <div>
        <p>justify-content属性是整个内容区域在容器里面的水平位置（左中右）</p>
        <CssCode>
          {`.container {
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
}`}
        </CssCode>
        <ul>
          <li>start - 对齐容器的起始边框。</li>
          <li>end - 对齐容器的结束边框。</li>
          <li>center - 容器内部居中。</li>
          <li>stretch - 项目大小没有指定时，拉伸占据整个网格容器。</li>
          <li>
            space-around -
            每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍。
          </li>
          <li>
            space-between - 项目与项目的间隔相等，项目与容器边框之间没有间隔。
          </li>
          <li>
            space-evenly -
            项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。
          </li>
        </ul>
      </div>
    ),
  },
  {
    label: "align-content",
    defaultValue: "start",
    propertyKey: "alignContent",
    options: [
      "start",
      "end",
      "center",
      "stretch",
      "space-around",
      "space-between",
      "space-evenly",
    ],
    content: (
      <div>
        <p>justify-content属性是整个内容区域在容器里面的水平位置（左中右）</p>
        <CssCode>
          {`.container {
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
}`}
        </CssCode>
        <ul>
          <li>start - 对齐容器的起始边框。</li>
          <li>end - 对齐容器的结束边框。</li>
          <li>center - 容器内部居中。</li>
          <li>stretch - 项目大小没有指定时，拉伸占据整个网格容器。</li>
          <li>
            space-around -
            每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍。
          </li>
          <li>
            space-between - 项目与项目的间隔相等，项目与容器边框之间没有间隔。
          </li>
          <li>
            space-evenly -
            项目与项目的间隔相等，项目与容器边框之间也是同样长度的间隔。
          </li>
        </ul>
        <p>
          place-content属性是align-content属性和justify-content属性的合并简写形式。
        </p>
        <CssCode>{`place-content: <align-content> <justify-content>`}</CssCode>
        <p>如果省略第二个值，浏览器就会假定第二个值等于第一个值。</p>
      </div>
    ),
  },
];

const gridAuto: gridContainerProperty[] = [
  {
    label: "grid-auto-columns",
    defaultValue: "50px",
    propertyKey: "gridAutoColumns",
    content: (
      <div>
        <div>
          <p>
            如果一个网格被定位在没有使用 grid-template-columns
            显式指定尺寸的列中，grid-auto-columns决定新增网格的列宽。
          </p>
          <CssCode>
            {`.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-auto-columns: 50px; 
}`}
          </CssCode>
          <p>
            grid-auto-columns属性支持
            数值(100px),百分比(30%),max-content,min-content,minmax(min,
            max),auto...
          </p>
        </div>
      </div>
    ),
  },
  {
    label: "grid-auto-rows",
    defaultValue: "50px",
    propertyKey: "gridAutoRows",
    content: (
      <div>
        <div>
          <p>
            如果一个网格被定位在没有使用 grid-template-rows
            显式指定尺寸的列中，grid-auto-rows决定新增网格的行高。
          </p>
          <CssCode>
            {`.container {
  display: grid;
  grid-template-rows: 100px 100px 100px;
  grid-auto-rows: 50px; 
}`}
          </CssCode>
          <p>
            grid-auto-rows
            数值(100px),百分比(30%),max-content,min-content,minmax(min,
            max),auto...
          </p>
        </div>
      </div>
    ),
  },
];

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

  const onGridTemplateRowsKeyChange = (value: string) => {
    const style = gridTemplateColumnsMap.get(value)?.value;
    form.setFieldsValue({
      gridTemplateRows: style,
    });
    setGridContainerStyle({ gridTemplateRows: style });
    // gridTemplateColumnsContent = gridTemplateColumnsMap.get(value)?.content;
  };

  return (
    <Card title={<code>.container</code>}>
      <Form
        {...layout}
        form={form}
        name="basic"
        initialValues={{
          gridTemplateAreas: `'a b c'
'd e f'
'g h i'`,
        }}
      >
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
                  allowClear
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
        <Form.Item label="grid-template-rows">
          <Row align="middle">
            <Col span={8}>
              <Form.Item noStyle>
                <Select
                  placeholder="gridTemplateRowsKey"
                  defaultValue="none"
                  onChange={onGridTemplateRowsKeyChange}
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
              <Form.Item name="gridTemplateRows" noStyle>
                <Input
                  defaultValue="100px 100px 100px"
                  allowClear
                  onChange={(e) => {
                    setGridContainerStyle({
                      gridTemplateRows: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={2}>
              <div className="text-center">
                <Popover
                  content={
                    <div>
                      <p>grid-template-rows属性定义每一行的行高。</p>
                      <p>
                        grid-template-rows属性和 grid-template-columns 相似
                        ,支持 repeat() ,auto-fill,fr,minmax(),auto等属性。
                      </p>
                      <CssCode>
                        {`.container {
display: grid;
grid-template-rows: 100px 100px 100px;
/* grid-template-rows: repeat(3, 100px); */
}`}
                      </CssCode>
                      <p>除了使用绝对单位，也可以使用百分比。</p>
                      <CssCode>
                        {`.container {
display: grid;
grid-template-rows: 33.33% 33.33% 33.33%;
}`}
                      </CssCode>
                    </div>
                  }
                  title="grid-template-columns"
                >
                  <QuestionCircleOutlined />
                </Popover>
              </div>
            </Col>
          </Row>
        </Form.Item>
        {gridGap.map((gridGapItem) => (
          <Form.Item label={gridGapItem.label}>
            <Row align="middle">
              <Col span={22}>
                <Form.Item name={gridGapItem.propertyKey} noStyle>
                  <Input
                    defaultValue={gridGapItem.defaultValue}
                    onChange={(e) => {
                      setGridContainerStyle({
                        [gridGapItem.propertyKey]: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={2}>
                <div className="text-center">
                  <Popover
                    content={gridGapItem.content}
                    title={gridGapItem.label}
                  >
                    <QuestionCircleOutlined />
                  </Popover>
                </div>
              </Col>
            </Row>
          </Form.Item>
        ))}
        <Form.Item label="grid-template-areas">
          <Row align="middle">
            <Col span={22}>
              <Form.Item name="gridTemplateAreas" noStyle>
                <Input.TextArea
                  rows={3}
                  allowClear
                  onChange={(e) => {
                    setGridContainerStyle({
                      gridTemplateAreas: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={2}>
              <div className="text-center">
                <Popover
                  content={
                    <div>
                      <p>
                        网格布局允许指定"区域"（area），一个区域由单个或多个单元格组成。grid-template-areas属性用于定义区域。
                      </p>
                      <CssCode>
                        {`.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas: 'a b c'
                       'd e f'
                       'g h i';
}`}
                      </CssCode>
                      <p>
                        上面代码先划分出9个单元格，然后将其定名为a到i的九个区域，分别对应这九个单元格。
                      </p>
                      <p>多个单元格合并成一个区域的写法如下。</p>
                      <CssCode>
                        {`grid-template-areas: 'a a a'
                     'b b b'
                     'c c c';`}
                      </CssCode>
                      <p>上面代码将9个单元格分成a、b、c三个区域。</p>
                      <p>布局实例</p>
                      <CssCode>
                        {`grid-template-areas: "header header header"
                     "main main sidebar"
                     "footer footer footer";`}
                      </CssCode>
                      <p>
                        上面代码中，顶部是页眉区域header，底部是页脚区域footer，中间部分则为main和sidebar。
                      </p>
                      <p>如果某些区域不需要利用，则使用"点"（.）表示。</p>
                      <CssCode>
                        {`grid-template-areas: 'a . c'
                     'd . f'
                     'g . i';`}
                      </CssCode>
                      <p>
                        上面代码中，中间一列为点，表示没有用到该单元格，或者该单元格不属于任何区域。
                      </p>
                      <Alert
                        message={
                          <>
                            <p>
                              注意，区域的命名会影响到网格线。每个区域的起始网格线，会自动命名为区域名-start，终止网格线自动命名为区域名-end。
                            </p>
                            <p>
                              比如，区域名为header，则起始位置的水平网格线和垂直网格线叫做header-start，终止位置的水平网格线和垂直网格线叫做header-end。
                            </p>
                          </>
                        }
                        type="info"
                      />
                    </div>
                  }
                  title="grid-template-areas"
                >
                  <QuestionCircleOutlined />
                </Popover>
              </div>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="grid-auto-flow" name="gridAutoFlow">
          <Row align="middle">
            <Col span={22}>
              <Select
                defaultValue="row"
                onChange={(value) =>
                  setGridContainerStyle({ gridAutoFlow: value })
                }
              >
                <Select.Option value="row">row</Select.Option>
                <Select.Option value="column">column</Select.Option>
                <Select.Option value="dense">dense</Select.Option>
                <Select.Option value="row dense">row dense</Select.Option>
                <Select.Option value="column dense">column dense</Select.Option>
              </Select>
            </Col>
            <Col span={2}>
              <div className="text-center">
                <Popover
                  content={
                    <div>
                      <p>
                        grid-auto-flow
                        属性控制着自动布局算法怎样运作，精确指定在网格中被自动布局的元素怎样排列。
                      </p>
                      <p>
                        默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行。
                      </p>
                      <CssCode>
                        {`.container {
    grid-auto-flow: [ row | column ] || dense;
}`}
                      </CssCode>
                      <p>此属性有两种形式：</p>
                      <ul>
                        <li>单个关键字：row、column，或 dense 中的一个。</li>
                        <li>两个关键字：row dense 或 column dense。</li>
                      </ul>
                      <p>关键词含义</p>
                      <ul>
                        <li>
                          row
                          该关键字指定自动布局算法按照通过逐行填充来排列元素，在必要时增加新行。如果既没有指定
                          row 也没有 column，则默认为 row。
                        </li>
                        <li>
                          column
                          该关键字指定自动布局算法通过逐列填充来排列元素，在必要时增加新列。
                        </li>
                        <li>
                          dense{" "}
                          <p>
                            该关键字指定自动布局算法使用一种“稠密”堆积算法，如果后面出现了稍小的元素，则会试图去填充网格中前面留下的空白。
                          </p>
                          <p>
                            这样做会填上稍大元素留下的空白，但同时也可能导致原来出现的次序被打乱。
                          </p>
                          <p>
                            如果省略它，使用一种「稀疏」算法，在网格中布局元素时，布局算法只会「向前」移动，永远不会倒回去填补空白。
                          </p>
                          <p>
                            这保证了所有自动布局元素「按照次序」出现，即使可能会留下被后面元素填充的空白。
                          </p>
                        </li>
                      </ul>
                    </div>
                  }
                  title="grid-auto-flow"
                >
                  <QuestionCircleOutlined />
                </Popover>
              </div>
            </Col>
          </Row>
        </Form.Item>
        {justifyAlign.map((justifyAlignItem) => (
          <Form.Item
            label={justifyAlignItem.label}
            name={justifyAlignItem.propertyKey}
          >
            <Row align="middle">
              <Col span={22}>
                <Select
                  defaultValue={justifyAlignItem.defaultValue}
                  onChange={(value) =>
                    setGridContainerStyle({
                      [justifyAlignItem.propertyKey]: value,
                    })
                  }
                >
                  {justifyAlignItem.options?.map((option) => (
                    <Select.Option value={option}>{option}</Select.Option>
                  ))}
                </Select>
              </Col>
              <Col span={2}>
                <div className="text-center">
                  <Popover
                    content={justifyAlignItem.content}
                    title={justifyAlignItem.label}
                  >
                    <QuestionCircleOutlined />
                  </Popover>
                </div>
              </Col>
            </Row>
          </Form.Item>
        ))}
        {gridAuto.map((gridAutoItem) => (
          <Form.Item label={gridAutoItem.label} name={gridAutoItem.propertyKey}>
            <Row align="middle">
              <Col span={22}>
                <Input
                  defaultValue={gridAutoItem.defaultValue}
                  onChange={(e) =>
                    setGridContainerStyle({
                      [gridAutoItem.propertyKey]: e.target.value,
                    })
                  }
                />
              </Col>
              <Col span={2}>
                <div className="text-center">
                  <Popover
                    content={gridAutoItem.content}
                    title={gridAutoItem.label}
                  >
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
export default ContainerStyle;
