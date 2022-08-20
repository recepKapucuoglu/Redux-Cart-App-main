const INIT_STATE = {
  carts: [],
};

export const cartreducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'ADD_CART':
      const ItemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );

      if (ItemIndex >= 0) {
        state.carts[ItemIndex].quantity += 1;
      } else {
        const current = { ...action.payload, quantity: 1 };
        return {
          ...state,
          carts: [...state.carts, current],
        };
      }
    // return {
    //   ...state,
    //   carts: [...state.carts, action.payload],
    // };

    case 'RMV_CART':
      const data = state.carts.filter((en) => en.id !== action.payload);

      return {
        ...state,
        carts: data,
      };

    case 'RMV_ONE':
      const ItemIndex_min = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.carts[ItemIndex_min].quantity >= 1) {
        const rmvitem = (state.carts[ItemIndex_min].quantity -= 1);
        console.log([...state.carts, rmvitem]);

        return {
          ...state,
          carts: [...state.carts],
        };
      } else if (state.carts[ItemIndex_min].quantity === 1) {
        const data = state.carts.filter((en) => en.id !== action.payload);

        return {
          ...state,
          carts: data,
        };
      }

    default:
      return state;
  }
};
