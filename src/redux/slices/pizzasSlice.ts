import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { SortType } from './filterSlice';


type PizzasType = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
	raiting: number
}

interface IPizzasSliceState {
	items: PizzasType[],
	status: Status,
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error'
}

export type SearchPizzasParams = {
	currentPage: string;
	category: string; 
	sortBy: string; 
	order: string; 
	search: string;
}

export const fetchPizzas = createAsyncThunk<PizzasType[], SearchPizzasParams>('pizzas/fetchPizzasStatus',
	async (params) => {
		const { currentPage, category, sortBy, order, search } = params;
		const { data } = await axios.get<PizzasType[]>(
			`https://659618ce04335332df8383cd.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		);
	return data;
});



const initialState: IPizzasSliceState = {
	items: [],
	status: Status.LOADING,
};

export const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<PizzasType[]>) {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzas.pending, (state) => {
				state.status = Status.LOADING;
				state.items = [];
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				state.items = action.payload;
				state.status = Status.SUCCESS;
			})
			.addCase(fetchPizzas.rejected, (state) => {
				state.status = Status.ERROR;
				state.items = [];
			});
	},
});

export const selectPizzas = (state: RootState) => state.pizzas;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
