export const ADD = (item) => {
  return {
    type: 'ADD_CART',
    payload: item,
  };
};

//ürün silme

export const DLT = (id) => {
  return {
    type: 'RMV_CART',
    payload: id,
  };
};

// ürün azaltma

export const REMOVE = (item) => {
  return {
    type: 'RMV_ONE',
    payload: item,
  };
};
