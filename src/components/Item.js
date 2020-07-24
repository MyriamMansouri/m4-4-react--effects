import React from "react";
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

const Item = ({ name, cost, value, numOwned, handleClick }) => {
  return (
    <ItemWrapper onClick={handleClick}>
      <h4>{name}</h4>
      <p>
        Cost: {cost} cookies. Produces {value} cookies/second.
      </p>
    </ItemWrapper>
  );
};

export default Item;
