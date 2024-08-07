import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type ActionPayloadCountType = {
	id: number;
	type: string;
	size: number
}

export type CartItemType = {
	id: number;
	title: string;
	price: number;
	imageUrl: string;
	type: string;
	size: number;
	count: number;
}

interface ICartSliceState {
	totalPrice: number;
	items: CartItemType[];
}

const initialState: ICartSliceState = {
	totalPrice: 0,
	items: [],
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItems(state, action: PayloadAction<CartItemType>) {
			const findItem = state.items.find(
				(obj) =>
					obj.id === action.payload.id &&
					obj.type === action.payload.type &&
					obj.size === action.payload.size
			);

			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				});
			}
			state.totalPrice = state.items.reduce((sum, obj) => {
				return obj.price * obj.count + sum;
			}, 0);
		},
		minusItem(state, action: PayloadAction<ActionPayloadCountType>) {
			const findItem = state.items.find(
				(obj) =>
					obj.id === action.payload.id &&
					obj.type === action.payload.type &&
					obj.size === action.payload.size
			);

			if (findItem) findItem.count--;
			state.totalPrice = state.items.reduce((sum, obj) => {
				return obj.price * obj.count + sum;
			}, 0);
		},
		removeItems(state, action: PayloadAction<ActionPayloadCountType>) {
			state.items = state.items.filter(
				(obj) =>
					obj.id !== action.payload.id ||
					obj.type !== action.payload.type ||
					obj.size !== action.payload.size
			);

			state.totalPrice = state.items.reduce((sum, obj) => {
				return obj.price * obj.count + sum;
			}, 0);
		},
		clearItems(state) {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

export const selectCart = (state: RootState) => state.cart;

export const { addItems, removeItems, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
