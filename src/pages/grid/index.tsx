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
  });

  const setGridContainerStyle = useCallback(
    (style: CSSProperties) => {
      setContainerStyle({
        ...containerStyle,
        ...style,
      });
    },
    [containerStyle]
  );

  useEffect(() => {
    document.title = "📺Display📺-Grid";
  }, []);
  return (
    <Row>
      <Col xs={24} sm={24} md={24} lg={8}>
        <GridContainer containerStyle={containerStyle} />
      </Col>
      <Col xs={24} sm={12} md={12} lg={8}>
        <ContainerStyle setGridContainerStyle={setGridContainerStyle} />
      </Col>
      <Col xs={24} sm={12} md={12} lg={8}>
        <ItemStyle />
      </Col>
    </Row>
  );
};
export default Grid;
