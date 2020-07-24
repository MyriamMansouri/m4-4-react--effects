import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import cookieSrc from "../cookie.svg";
import Item from "./Item";
import useInterval from "../hooks/use-interval.hook";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
  const [numCookies, setNumCookies] = React.useState(1000);
  const [purchasedItems, setPurchasedItems] = React.useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  const calculateCookiesPerTick = () => {
    return items
      .map((item) => item.value * purchasedItems[item.id])
      .reduce((val, acc) => val + acc);
  };

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick();
    setNumCookies(numOfGeneratedCookies + numCookies);
  }, 1000);

  const handleClick = (id, cost) => {
    if (numCookies - cost >= 0) {
      setPurchasedItems({ ...purchasedItems, [id]: purchasedItems[id] + 1 });
      setNumCookies(numCookies - cost);
    } else {
      window.alert(
        `You just can't. Item is ${cost} but you only have ${numCookies}.`
      );
    }
  };

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>{calculateCookiesPerTick()}</strong> cookies per second
        </Indicator>
        <Button>
          <Cookie
            src={cookieSrc}
            onClick={() => setNumCookies(numCookies + 1)}
          />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>

        {items.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            cost={item.cost}
            value={item.value}
            numOwned={purchasedItems[item.id]}
            handleClick={() => handleClick(item.id, item.cost)}
          />
        ))}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
