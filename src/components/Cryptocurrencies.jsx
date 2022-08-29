import React, {useState, useEffect} from 'react';
import millify from 'millify';
import {Link} from 'react-router-dom';
import {Card, Row, Col, Input} from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const Cryptocurrencies = ({ simplified}) => {
  const count = simplified ? 10: 100;
  const { data:cryptosList, isFetching} = useGetCryptosQuery(count);
  const [cryptos, setCryptos]= useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(()=> {
    setCryptos(cryptosList?.data?.coins);
    const filteredData = cryptosList?.data?.coins.filter((item)=>item.name.toLowerCase().includes(searchTerm));
  
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if(isFetching) return <Loader/>;
  
  return (
    <>
      {/* !simplified is to only shows the search bar in the cryptos page  */}
      {!simplified && (
        <div className="search-crypto">
          <Input placeholder="Search Cryptocurrency" onChange={(e)=> setSearchTerm(e.target.value.toLowerCase())}/>
        </div>
      )}
      
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
               {/* Changed the styling to restrict the size of the card  */}
                <Card 
                  title={`${currency.rank}. ${currency.name}`}
                  extra={<img style={{height:30}}className = "crypto-image" src={currency.iconUrl} alt="crypto"/>}
                  hoverable
                >
                  <p>Price: {millify(currency.price)}</p>
                  <p>Market Cap: {millify(currency.marketCap)}</p>
                  <p>Daily Change: {currency.change}%</p>
                </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;