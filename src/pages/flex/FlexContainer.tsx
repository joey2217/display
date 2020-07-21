import React, { CSSProperties } from "react";
import { Card } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

interface Props {
  containerStyle: CSSProperties;
  itemStyle: CSSProperties[];
  selected: number;
  setSelected: (index: number) => void;
  increaseItem: () => void;
  decreaseItem: () => void;
}

const colors = [
  "#eccc68",
  "#ffa502",
  "#7bed9f",
  "#2ed573",
  "#ff7f50",
  "#ff6348",
  "#70a1ff",
  "#1e90ff",
  "#ff6b81",
  "#5352ed",
];

const FlexContainer = ({
  containerStyle,
  itemStyle,
  selected,
  setSelected,
  increaseItem,
  decreaseItem,
}: Props) => {
  return (
    <Card
      title="FlexContainer"
      extra={
        <div className="flex-container-extra">
          <MinusOutlined onClick={decreaseItem} />
          {itemStyle.length}Items
          <PlusOutlined onClick={increaseItem} />
          <a
            href="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html"
            target="blank"
          >
            FlexGrammar
          </a>
        </div>
      }
    >
      {/* {containerStyle.display === "inline-flex" && <span>Foo</span>} */}
      <div className="flex-container container" style={{ ...containerStyle }}>
        {itemStyle.map((style, index) =>
          React.createElement(
            "div",
            {
              className: selected === index ? `item selected` : "item",
              key: index,
              style: {
                ...style,
                backgroundColor: colors[index % 10],
              },
              onClick: () => setSelected(index),
            },
            index + 1
          )
        )}
      </div>
      {/* {containerStyle.display === "inline-flex" && <span>Bar</span>} */}
    </Card>
  );
};
export default FlexContainer;
