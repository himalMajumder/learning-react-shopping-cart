import { faker } from "@faker-js/faker";
import React, { createContext, useContext, useReducer } from "react";
import { cartReducer, productReducer } from "./Reducer";
const Cart = createContext();
faker.seed(99);

const Context = ({ children }) => {
	const products = [...Array(20)].map(() => ({
		id: faker.datatype.uuid(),
		name: faker.commerce.productName(),
		price: faker.commerce.price(),
		image: faker.image.avatar(),
		inStock: Math.floor(Math.random() * 5),
		fastDelivery: Math.random() < 0.5,
		ratings: Math.floor(Math.random() * 5) + 1,
	}));

	const [state, dispatch] = useReducer(cartReducer, {
		products: products,
		cart: [],
	});

	const [productState, productDispatch] = useReducer(productReducer, {
		bySort: false,
		byStock: false,
		byFastDelivery: false,
		byRating: 0,
		searchQuery: "",
	});

	return (
		<Cart.Provider
			value={{ state, dispatch, productState, productDispatch }}
		>
			{children}
		</Cart.Provider>
	);
};

export default Context;

export const CartState = () => {
	return useContext(Cart);
};
