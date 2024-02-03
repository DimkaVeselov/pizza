import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import qs from 'qs'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'

import Catagery from '../components/Catagery';
import Sort, { sortList } from '../components/Sort';
import Pizza from '../components/Pizza';
import Skeleton from '../components/Pizza/Skeleton';
import Pagination from '../components/Pagination';

import { SearchContext } from '../App';
import { current } from '@reduxjs/toolkit';

const Home = () => {

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isSearch = useRef(false)
	const isMounted = useRef(false)

	const { categoryId, sort, currentPage } = useSelector(state => state.filter)

	const { searchValue } = useContext(SearchContext)

	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id))
	}

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number))
	}

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))

			const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)

			dispatch(
				setFilters({
					...params,
					sort,
				})
			)

			isSearch.current = true
		}
	}, [])

	useEffect(() => {
		window.scrollTo(0, 0)

		if (!isSearch.current) {
			fetchPizzas()
		}

		isSearch.current = false

	}, [categoryId, sort.sortProperty, searchValue, currentPage])

	const fetchPizzas = () => {
		setIsLoading(true);

		const sortBy = sort.sortProperty.replace('-', '')
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

		axios
			.get(`https://659618ce04335332df8383cd.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
			.then(res => {
				setItems(res.data);
				setIsLoading(false);
			})
	}

	useEffect(() => {

		if (isMounted.current) {

			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage
			})

			navigate(`?${queryString}`)
		}

		isMounted.current = true

	}, [categoryId, sort.sortProperty, searchValue, currentPage])



	const pizzas = items.map((item) => (<Pizza key={item.id} {...item} />))
	const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />)

	return (
		<div className='container'>
			<div className='content__top'>
				<Catagery value={categoryId} onClickCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{isLoading
					? skeletons
					: pizzas
				}
			</div>
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	)
}

export default Home