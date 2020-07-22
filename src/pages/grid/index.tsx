import React, { useEffect, useState, CSSProperties, useCallback } from "react";
import { Row, Col } from "antd";
import GridContainer from "./GridContainer";
import ContainerStyle from "./ContainerStyle";
import ItemStyle from "./ItemStyle";

import "./style.css";

const Grid = () => {
  const [containerStyle, setContainerStyle] = useState<CSSProperties>({
    display: "grid",
    gridTemplateColumns: "100px 100px 100px",
    gridTemplateRows: "100px 100px 100px",
    rowGap: "10px",
    columnGap: "10px",
    gridTemplateAreas: `'a b c'
    'd e f'
    'g h i'`,
    gridAutoFlow:'row',
    justifyItems:'stretch',
    alignItems:'stretch',
    justifyContent:'start',
    alignContent:'start',
    gridAutoColumns:'50px',
    gridAutoRows:'50px',
  });


  const [itemStyle, setItemStyle] = useState<CSSProperties[]>(new Array(9).fill({}))

  const [selected, setSelected] = useState(0);

  const setGridContainerStyle = useCallback(
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

  useEffect(() => {
    document.title = "📺Display📺-Grid";
  }, []);
  return (
    <Row>
      <Col xs={24} sm={24} md={24} lg={8}>
        <GridContainer itemStyle={itemStyle} containerStyle={containerStyle} selected={selected} setSelected={setSelected} />
      </Col>
      <Col xs={24} sm={12} md={12} lg={8}>
        <ContainerStyle setGridContainerStyle={setGridContainerStyle} />
      </Col>
      <Col xs={24} sm={12} md={12} lg={8}>
        <ItemStyle selected={selected} itemStyle={itemStyle}  setSelectedItemStyle={setSelectedItemStyle}/>
      </Col>
    </Row>
  );
};
export default Grid;
