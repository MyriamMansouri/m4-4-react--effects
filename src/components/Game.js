import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import cookieSrc from "../cookie.svg";
import Item from "./Item";
import useInterval from "../hooks/use-interval.hook";
import useKeydown from "../hooks/useKeydown.hook";
import useDocumentTitle from "../hooks/useDocumentTitle.hook";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1, click: 0 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10, click: 0 },
  { id: "megacursor", name: "Mega Cursor", cost: 800, value: 0, click: 5 },
  { id: "farm", name: "Farm", cost: 1000, value: 80, click: 0 },
];

const Game = () => {
  const [numCookies, setNumCookies] = React.useState(1000);
  const [purchasedItems, setPurchasedItems] = React.useState({
    cursor: 0,
    megacursor: 0,
    grandma: 0,
    farm: 0,
  });

  const calculateCookiesPerClick = () => {
    return items
      .map((item) => item.click * purchasedItems[item.id])
      .reduce((val, acc) => val + acc);
  };

  const calculateCookiesPerTick = () => {
    return items
      .map((item) => item.value * purchasedItems[item.id])
      .reduce((val, acc) => val + acc);
  };

  const incrementCookies = (increment) => {
    setNumCookies((n) => n + increment);
  };

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick();
    setNumCookies(numOfGeneratedCookies + numCookies);
  }, 1000);

  useKeydown("Space", () => incrementCookies(calculateCookiesPerClick()));
  useDocumentTitle(`${numCookies} cookies - Cookie clicker`, "Coockie clicker");

  const handleClick = (id, cost) => {
    if (numCookies - cost >= 0) {
      setPurchasedItems({ ...purchasedItems, [id]: purchasedItems[id] + 1 });
      setNumCookies((n) => n - cost);
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
            onClick={() => incrementCookies(calculateCookiesPerClick())}
          />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>

        {items.map((item, index) => (
          <Item
            key={item.id}
            name={item.name}
            cost={item.cost}
            value={item.value}
            click={item.click}
            numOwned={purchasedItems[item.id]}
            isFirst={index === 0}
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
