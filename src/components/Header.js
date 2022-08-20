import { Badge } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { DLT } from '../redux/actions/action';

const Header = () => {
  const [price, setPrice] = useState(0);
  // console.log(price);

  const getdata = useSelector((state) => state.cartreducer.carts);
  console.log(getdata);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const dlt = (id) => {
    dispatch(DLT(id));
  };

  const toplamfiyat = () => {
    let price = 0;
    getdata.map((ens, k) => {
      price = ens.price * ens.quantity + price;
    });
    setPrice(price);
  };

  useEffect(() => {
    toplamfiyat();
  }, [toplamfiyat]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" style={{ height: '50px' }}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-2">
            365 Redux-Cart
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light mx-2">
              Home
            </NavLink>
          </Nav>

          <Badge
            badgeContent={getdata.length}
            color="primary"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <i
              className="fa-solid fa-cart-shopping text-light"
              style={{ fontSize: 25, cursor: 'pointer' }}
            ></i>
          </Badge>
        </Container>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {getdata.length ? (
            <div
              className="card_details"
              style={{ width: '22rem', padding: 10 }}
            >
              <Table>
                <thead>
                  <tr>
                    <th>Görsel</th>
                    <th>Ürün Detay</th>
                  </tr>
                </thead>
                <tbody>
                  {getdata.map((e) => (
                    <>
                      <tr>
                        <td>
                          <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                            <img
                              src={e.imgdata}
                              style={{
                                width: '7rem',
                                height: '7rem',
                                marginTop: '10px',
                              }}
                              alt=""
                            />
                          </NavLink>
                        </td>
                        <td>
                          <p>
                            <strong> {e.name} </strong>
                          </p>
                          <p style={{ color: 'crimson' }}>Fiyat: {e.price} ₺</p>
                          <p> {e.detail} </p>
                          <p> Miktar: {e.quantity} </p>
                        </td>
                        <td>
                          <i
                            className="fas fa-trash text-danger fs-5"
                            style={{ cursor: 'pointer' }}
                            onClick={() => dlt(e.id)}
                          ></i>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
                <p
                  className="text-center text-danger"
                  style={{ fontSize: '15px', fontWeight: 'bold' }}
                >
                  Toplam: {price} ₺
                </p>
              </Table>
            </div>
          ) : (
            <div
              className="card_details d-flex justify-content-center align-items-center"
              style={{ width: '25rem', padding: 10, position: 'relative' }}
            >
              <i
                className="fas fa-close sm"
                onClick={handleClose}
                style={{
                  position: 'absolute',
                  top: 2,
                  right: 15,
                  fontSize: 24,
                }}
              ></i>
              <p>Sepette ürün bulunmamaktadır.</p>
              <img
                src="./cart.gif"
                alt=""
                style={{ height: '100px' }}
                className="bos_sepet_img"
              />
            </div>
          )}
        </Menu>
      </Navbar>
    </div>
  );
};

export default Header;
