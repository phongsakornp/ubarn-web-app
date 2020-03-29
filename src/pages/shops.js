import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import Layout from 'components/Layout';
import Seo from 'components/Seo';
import foodImg from 'images/food.svg';
import beverageImg from 'images/beverage.svg';

const ComponentText = {
  HERO_TITLE: 'ร้านค้า',
  HERO_SUBTITLE: '',
  SELECT_CITY: 'เลือกอำเภอ',
  SELECT_TYPE: 'เลือกประเภท',
  FOOD_CATEGORY: 'อาหาร',
  BEVERAGE_CATEGORY: 'เครื่องดื่ม',
};

const cityList = ['ทับเที่ยง', 'ย่านตาขาว', 'นาโยง'];

const SelectorBox = ({ id, name, label, imgSrc, onChange }) => {
  const [checked, setChecked] = React.useState(false);
  const handleChange = evt => {
    const targetChecked = evt.target.checked;
    setChecked(targetChecked);
    onChange(targetChecked);
  };
  return (
    <label htmlFor={id} className="">
      <div className="flex flex-col">
        <input
          id={id}
          type="checkbox"
          name={name}
          className={'w-0 h-0'}
          checked={checked}
          onChange={handleChange}
          onBlur={() => {}}
        />
        <div
          className={
            (checked ? 'bg-red-400' : ' bg-red-200') +
            ' flex items-center justify-center rounded-md w-20 h-20 overflow-hidden'
          }
        >
          <img
            width="50"
            height="50"
            className={'m-auto h-full block'}
            src={imgSrc}
            alt="Shop category icon"
          />
        </div>
        <div
          className={
            (checked ? 'font-bold' : '') +
            ' mt-2 text-center text-sm text-gray-700'
          }
        >
          {label}
        </div>
      </div>
    </label>
  );
};
SelectorBox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
SelectorBox.defaultProps = {
  onChange: () => {},
};

const DropdownSelector = ({ id, name, label, value, options, onChange }) => {
  const handleChange = evt => {
    onChange(evt.target.value);
  };
  return (
    <label htmlFor={id} className="w-full">
      <div className={'w-full p-5 flex flex-col justify-start'}>
        <div className={'text-sm lg:text-base'}>{label}</div>
        <div className="relative inline-block w-64 mt-2">
          <select
            id={id}
            name={name}
            value={value}
            className={
              'block appearance-none w-full bg-transparent' +
              ' hover:border-gray-500 border-b-2 rounded-none font-bold' +
              ' pr-8 leading-tight focus:outline-none'
            }
            onChange={handleChange}
            onBlur={() => {}}
          >
            {options.map((elm, idx) => (
              <option key={`${elm}-${idx}`}>{elm}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
    </label>
  );
};
DropdownSelector.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};
DropdownSelector.defaultProps = {
  options: [],
  onChange: () => {},
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'category': {
      return {
        ...state,
        category: {
          ...state.category,
          [action.payload.name]: action.payload.checked,
        },
      };
    }
    case 'city': {
      return {
        ...state,
        city: action.payload.name,
      };
    }
    default: {
      return state;
    }
  }
};

const Shops = ({ data }) => {
  const [filter, dispatchFilter] = React.useReducer(filterReducer, {
    city: cityList[0],
    category: {},
  });

  return (
    <Layout
      renderContent={() => {
        return (
          <>
            <Seo title="Shops" />
            <div className="flex flex-col items-center justify-center w-full max-w-screen-lg">
              <div className="flex flex-col items-center">
                <div className="mt-0 mb-2 text-xl font-normal font-bold leading-normal text-black lg:text-4xl">
                  {ComponentText.HERO_TITLE}
                </div>
              </div>
              <DropdownSelector
                id="city"
                name="city"
                label={ComponentText.SELECT_CITY}
                value={filter.city}
                options={cityList}
                onChange={name =>
                  dispatchFilter({ type: 'city', payload: { name } })
                }
              />

              <div className={'flex flex-col w-full p-5'}>
                <div className={'text-sm lg:text-base'}>
                  {ComponentText.SELECT_TYPE}
                </div>
                <div className={'flex w-full mt-2'}>
                  <SelectorBox
                    id="food"
                    name="food"
                    label={ComponentText.FOOD_CATEGORY}
                    imgSrc={foodImg}
                    onChange={checked =>
                      dispatchFilter({
                        type: 'category',
                        payload: { name: 'food', checked },
                      })
                    }
                  />
                  <div className={'ml-4'}>
                    <SelectorBox
                      id="beverage"
                      name="beverage"
                      label={ComponentText.BEVERAGE_CATEGORY}
                      imgSrc={beverageImg}
                      onChange={checked =>
                        dispatchFilter({
                          type: 'category',
                          payload: { name: 'beverage', checked },
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div
                className={
                  'grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-3 w-full p-5'
                }
                style={{ justifyItems: 'center' }}
              >
                {data.allShopJson.edges.map(({ node }, idx) => {
                  return (
                    <Link to={`/shops/${node.id}`} key={`${node.name}-${idx}`}>
                      <div
                        className={
                          'flex flex-col w-full overflow-hidden text-gray-900 bg-white border rounded-lg shadow'
                        }
                      >
                        <img
                          src={node.coverImgSrc}
                          alt="Shop cover"
                          className="object-cover w-full h-48"
                        />
                        <div className={'flex flex-col p-5'}>
                          <div className="text-xs font-semibold tracking-wide text-gray-600 uppercase">
                            {node.city}
                          </div>
                          <h4 className="text-lg font-semibold">{node.name}</h4>
                          <div className="mt-2 text-teal-600 text-sm">{`เปิด: ${node.openTime}`}</div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </>
        );
      }}
    />
  );
};
export default Shops;

export const query = graphql`
  query {
    allShopJson {
      edges {
        node {
          id
          name
          city
          openTime
          coverImgSrc
        }
      }
    }
  }
`;
