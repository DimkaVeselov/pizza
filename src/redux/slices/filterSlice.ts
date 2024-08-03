import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnum {
	RAITING_DESC = 'raiting',
	RAITING_ASC = '-raiting',
	PRICE_DESC = 'price',
	PRICE_ASC = '-price',
	TITLE_DESC = 'title',
	TITLE_ASC = '-title'
}

export type SortType = {
	name: string,
	sortProperty: SortPropertyEnum,
}

export interface IFilterSliceState {
	searchValue: string;
	categoryId: number;
	currentPage: number;
	sort: SortType;
}

const initialState: IFilterSliceState = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярности ↓',
		sortProperty: SortPropertyEnum.RAITING_DESC,
	},
};

export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId: (state, action: PayloadAction<number>) => {
			state.categoryId = action.payload;
		},
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload;
		},
		setSort: (state, action: PayloadAction<SortType>) => {
			state.sort = action.payload;
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		setFilters(state, action: PayloadAction<IFilterSliceState>) {
			state.sort = action.payload.sort;
			state.currentPage = Number(action.payload.currentPage);
			state.categoryId = Number(action.payload.categoryId);
		},
	},
});

export const selectFilter = (state: RootState) => state.filter

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
