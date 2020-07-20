import React, { useState, useCallback, CSSProperties } from "react";
import { Row, Col } from "antd";
import FlexContainer from "./FlexContainer";
import ContainerStyle from "./ContainerStyle";
import ItemStyle from "./ItemStyle";
import "./style.css";

const Flex = () => {
  const [containerStyle, setContainerStyle] = useState<CSSProperties>({
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "stretch",
  });

  const [itemStyle, setItemStyle] = useState<CSSProperties[]>([
    {
      order: 0,
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: "auto",
      alignSelf: "auto",
    },
    {
      order: 0,
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: "auto",
      alignSelf: "auto",
    },
    {
      order: 0,
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: "auto",
      alignSelf: "auto",
    },
  ]);

  const [selected, setSelected] = useState(0);

  const setFlexContainerStyle = useCallback(
    (style: CSSProperties) => {
      setContainerStyle({
        ...containerStyle,
        ...style,
      });
    },
    [containerStyle]
  );

  const setSelectedItemStyle = useCallback(
    (index: number, style: CSSProperties) => {
      setItemStyle([
        ...itemStyle.slice(0, index),
        {
          ...itemStyle[index],
          ...style,
        },
        ...itemStyle.slice(index + 1),
      ]);
    },
    [itemStyle]
  );

  const increaseItem = useCallback(() => {
    setItemStyle([
      ...itemStyle,
      {
        order: 0,
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: "auto",
        alignSelf: "auto",
      },
    ]);
  }, [itemStyle]);
  const decreaseItem = useCallback(() => {
    setItemStyle([...itemStyle.slice(0, itemStyle.length - 1)]);
  }, [itemStyle]);

  return (
    <Row>
      <Col xs={24} sm={24} md={24} lg={12}>
        <FlexContainer
          containerStyle={containerStyle}
          itemStyle={itemStyle}
          selected={selected}
          setSelected={setSelected}
          increaseItem={increaseItem}
          decreaseItem={decreaseItem}
        />
      </Col>
      <Col xs={24} sm={24} md={24} lg={12}>
        <Row>
          <Col span={24}>
            <ContainerStyle setFlexContainerStyle={setFlexContainerStyle} />
          </Col>
          <Col span={24}>
            <ItemStyle
              selected={selected}
              selectedItemStyle={itemStyle[selected]}
              setSelectedItemStyle={setSelectedItemStyle}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default Flex;
