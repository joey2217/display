import React, { useState, useCallback, CSSProperties, useEffect } from "react";
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
    alignContent: "stretch",
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

  useEffect(() => {
    document.title = "📺Display📺-Flex";
  }, []);

  return (
    <Row>
      <Col span={24} sm={24} md={24} lg={8}>
        <FlexContainer
          containerStyle={containerStyle}
          itemStyle={itemStyle}
          selected={selected}
          setSelected={setSelected}
          increaseItem={increaseItem}
          decreaseItem={decreaseItem}
        />
      </Col>
      <Col xs={24} sm={24} md={12} lg={8}>
        <ContainerStyle setFlexContainerStyle={setFlexContainerStyle} />
      </Col>
      <Col xs={24} sm={24} md={12} lg={8}>
        <ItemStyle
          selected={selected}
          selectedItemStyle={itemStyle[selected]}
          setSelectedItemStyle={setSelectedItemStyle}
        />
      </Col>
    </Row>
  );
};
export default Flex;
