import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDatas from './CardData';
import { useDispatch } from 'react-redux';
import { ADD } from '../redux/actions/action';
import './style.css';

const Cards = () => {
  const [data, setData] = useState(CardDatas);

  const dispatch = useDispatch();

  const addHandler = (e) => {
    // console.log(e);
    dispatch(ADD(e));
  };

  return (
    <div className="container mt-3">
      <h2>Ürün Listesi</h2>

      <div className="row d-flex justify-content-center align-items-center ">
        {data.map((ens, key) => (
          <Card
            style={{ width: '22rem', border: 'none' }}
            className="mx-2 mt-4"
          >
            <Card.Img variant="top" src={ens.imgdata} />
            <Card.Body>
              <Card.Title>{ens.name}</Card.Title>
              <Card.Text>Fiyat : {ens.price} ₺</Card.Text>
              <Card.Text>{ens.detail}</Card.Text>
              <Button
                variant="info"
                className="col-lg-12"
                onClick={() => addHandler(ens)}
              >
                Sepete Ekle
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Cards;
