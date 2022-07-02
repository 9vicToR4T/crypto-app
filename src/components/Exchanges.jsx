import React, { useState, useEffect } from "react";
import { Select, Row, Col, Typography, Divider, Avatar } from "antd";
import {
  useGetCryptosQuery,
  useGetCoinMarketsQuery,
} from "../services/cryptoApi";
import millify from "millify";

const { Option } = Select;

const Exchanges = () => {
  const { data: coinsList, isFetching } = useGetCryptosQuery(50);
  const [coins, setCoins] = useState(null);
  const [coinId, setCoinId] = useState("Qwsogvtv82FCd");

  const { data: dataMarkets, isFetching: fetchingMarkets } =
    useGetCoinMarketsQuery(coinId);

  useEffect(() => {
    setCoins(coinsList?.data?.coins);
  }, [coinsList]);
  if (isFetching && fetchingMarkets) return "Loading";
  // for(let i = 0; i< dataMarkets?.data?.markets.length; i++){

  // }

  console.log(dataMarkets?.data?.markets);
  return (
    <>
      <Row justify="center">
        <Col>
          <Select
            style={{ width: "200px" }}
            placeholder="Choose a coin..."
            showSearch
            onChange={(value) => setCoinId(value)}
          >
            {coins?.map((c) => (
              <Option key={c.uuid} value={c.uuid}>
                {c.name} ({c.symbol})
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Divider>Markets</Divider>
      <Row>
        <Col span={6}>Exchange</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Market Share</Col>
        <Col span={6}>Price BTC </Col>
      </Row>
      {dataMarkets?.data?.markets.map((market) => (
        <Row key={market.uuid} className="market-row">
          <Col span={6}>
            {market.rank}. 
            <Avatar className="market-avatar" src={`${market.exchange.iconUrl}`} />
            {market.exchange.name}
          </Col>
          <Col span={6}>{market.rank}{millify(market["24hVolume"])}</Col>
          <Col span={6}>{market.marketShare}</Col>
          <Col span={6}>{millify(market.price*market.btcPrice)} {market.base.symbol} </Col>
        </Row>
      ))}
    </>
  );
};

export default Exchanges;
