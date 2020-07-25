import React, { useEffect } from "react";
import styled from "styled-components";

const ItemWrapper = styled.button`
  background-color: inherit;
  color: inherit;
  text-align: inherit;
  font-size: inherit;
  border: none;
  border-bottom: grey 1px solid;
  padding: 10px 0;
  &:focus {
    outline: blue solid 3px;
  }
`;

const Item = ({ name, cost, value, numOwned, isFirst, handleClick }) => {
  const itemRef = React.useRef(null);
  useEffect(() => {
    if (isFirst) {
      itemRef.current.focus();
    }
  }, [isFirst]);

  return (
    <ItemWrapper onClick={handleClick} ref={itemRef}>
      <h4>{name}</h4>
      <p>
        Cost: {cost} cookies. Produces {value} cookies/second.
      </p>
    </ItemWrapper>
  );
};

export default Item;
