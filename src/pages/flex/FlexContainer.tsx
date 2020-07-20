import React, { CSSProperties } from "react";
import { Card } from "antd";
import {
  MinusOutlined,
  PlusOutlined,
} from '@ant-design/icons';

interface Props {
  containerStyle: CSSProperties;
  itemStyle: CSSProperties[];
  selected: number;
  setSelected: (index: number) => void;
  increaseItem: () => void;
  decreaseItem: () => void;
}

const FlexContainer = ({
  containerStyle,
  itemStyle,
  selected,
  setSelected,
  increaseItem,
  decreaseItem,
}: Props) => {
  
  return (
  <Card title="FlexContainer" extra={<><MinusOutlined onClick={decreaseItem}/>{itemStyle.length}Items<PlusOutlined onClick={increaseItem}/></>}>
      <span>SpanFoo</span>
      <div className="flex-container container" style={{ ...containerStyle }}>
        {
          itemStyle.map((style,index)=>React.createElement('div',{
            className:selected===index?`item selected`:"item",
            key:index,
            style,
            onClick:()=>setSelected(index)
          },
          `${index+1}`
          ))
        }
      </div>
      <span>SpanBar</span>
    </Card>
  );
};
export default FlexContainer;
