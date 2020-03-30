/*
 * Provide global state for ui compoents.
 */
import React from 'react';
import PropTypes from 'prop-types';

export const LayoutStateContext = React.createContext();
export const LayoutDispatchContext = React.createContext();

export const LayoutActionType = {
  SHOPS_FILTER_SET_CITY: 'shops/filter/set-city',
  SHOPS_FILTER_CHANGE_CATEGORY: 'shops/filter/change-category',
};

const initialState = {
  shops: {
    filter: {
      city: 'เมือง',
      category: { food: true },
    },
  },
};

const shopsFilterReducer = (state, action) => {
  switch (action.type) {
    case LayoutActionType.SHOPS_FILTER_SET_CITY: {
      return {
        ...state,
        city: action.payload.name,
      };
    }
    case LayoutActionType.SHOPS_FILTER_CHANGE_CATEGORY: {
      return {
        ...state,
        category: {
          ...state.category,
          [action.payload.name]: action.payload.checked,
        },
      };
    }
    default:
      throw new Error('Invalidate action type');
  }
};

const reducer = (state, action) => {
  return {
    ...state,
    shops: {
      filter: {
        ...shopsFilterReducer(state.shops.filter, action),
      },
    },
  };
};

const LayoutContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <LayoutStateContext.Provider value={state}>
      <LayoutDispatchContext.Provider value={dispatch}>
        {children}
      </LayoutDispatchContext.Provider>
    </LayoutStateContext.Provider>
  );
};
LayoutContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutContextProvider;
