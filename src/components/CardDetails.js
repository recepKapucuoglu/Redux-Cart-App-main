import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DLT, ADD, REMOVE } from '../redux/actions/action';
import './style.css';

const CardDetails = () => {
  const [data, setData] = useState([]);
  console.log('Data: ', data);

  const { id } = useParams();
  // console.log(id);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getdata = useSelector((state) => state.cartreducer.carts);
  // console.log(getdata);

  const compare = () => {
    const comparedata = getdata.filter((e) => {
      return e.id == id;
    });
    setData(comparedata);
  };

  //ürün ekleme
  const addHandler = (e) => {
    // console.log(e);
    dispatch(ADD(e));
  };

  //ürün azaltma

  const remove = (item) => {
    dispatch(REMOVE(item));
  };

  const dlt = (id) => {
    dispatch(DLT(id));
    navigate('/');
  };

  useEffect(() => {
    compare();
  }, [id]);

  return (
    <>
      <div className="container mt-3">
        <h2>Ürün Detay Sayfası</h2>

        <section className="container mt-3">
          <div className="item_details ">
            {data.map((ens) => (
              <>
                <div className="items_img ">
                  <img alt="" src={ens.imgdata} />
                </div>

                <div className="details ">
                  <Table>
                    <tr>
                      <td>
                        <p>
                          <strong>Name: </strong> {ens.name}
                        </p>
                        <p>
                          <strong>Fiyat: </strong> {ens.price} ₺
                        </p>
                        <p>
                          <strong>Açıklama: </strong> {ens.name}
                        </p>
                        <p>
                          <strong>Toplam: </strong> {ens.price * ens.quantity}
                        </p>
                        <div
                          className="mt-5 d-flex justify-content-between align-items-center"
                          style={{
                            width: 100,
                            cursor: 'pointer',
                            background: 'darkgray',
                            color: 'black',
                          }}
                        >
                          <span
                            style={{ fontSize: 24 }}
                            onClick={
                              ens.quantity <= 1
                                ? () => dlt(ens.id)
                                : () => remove(ens)
                            }
                          >
                            -
                          </span>
                          <span style={{ fontSize: 22 }}>{ens.quantity}</span>
                          <span
                            style={{ fontSize: 24 }}
                            onClick={() => addHandler(ens)}
                          >
                            +
                          </span>
                        </div>
                      </td>
                      <td>
                        <p>
                          <strong>Sil: </strong>
                          <span>
                            <i
                              className="fas fa-trash "
                              style={{
                                color: 'red',
                                fontSize: 20,
                                cursor: 'pointer',
                              }}
                              onClick={() => dlt(ens.id)}
                            ></i>
                          </span>
                        </p>
                      </td>
                    </tr>
                  </Table>
                </div>
              </>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default CardDetails;
