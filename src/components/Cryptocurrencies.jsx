import React, {useState} from 'react';
import millify from 'millify';
import {Link} from 'react-router-dom';
import {Card, Row, Col, Input} from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = () => {
  const { data:cryptosList, isFetching} = useGetCryptosQuery();
  const [cryptos, setCryptos]= useState(cryptosList?.data?.coins);

  console.log(cryptos);
  return (
    <>
      <Row gutters={[32, 32]} className="crypto-card-container">
        {cryptos.map((currency) => (
          <Col xs={24} sm={12} lg={6} classname="crypto-card" key={currency.uuid}>
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
               {/* Changed the styling to restrict the size of the card  */}
                <Card 
                  title={`${currency.rank}. ${currency.name}`}
                  extra={<img style={{height:30}}className="crypto-image" src={currency.iconUrl}/>}
                  hoverable
                >
                  <p>Price: {millify(currency.price)}</p>
                  <p>Market Cap: {millify(currency.marketCap)}</p>
                  <p>Daily Change: {millify(currency.change)}%</p>
                </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies