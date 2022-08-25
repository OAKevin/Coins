import React, {useState, useEffect} from 'react';
import millify from 'millify';
import {Link} from 'react-router-dom';
import {Card, Row, Col, Input} from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({ simplified}) => {
  const count = simplified ? 10: 100;
  const { data:cryptosList, isFetching} = useGetCryptosQuery(count);
  const [cryptos, setCryptos]= useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  {/* Filtering data by search bar  */}
  useEffect(()=> {
    const filteredData = cryptosList?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
  
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if(isFetching) return 'Loading ...';
  
  return (
    <>
      {/* !simplified is to only shows the search bar in the cryptos page  */}
      {!simplified && (
        <div className="search-crypto">
          <input placeholder="Search Cryptocurrency" onChange={(e)=> setSearchTerm(e.target.value)}/>
        </div>
      )}
      
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos ?.map((currency) => (
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