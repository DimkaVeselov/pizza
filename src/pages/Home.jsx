import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice'

import Catagery from '../components/Catagery';
import Sort from '../components/Sort';
import Pizza from '../components/Pizza';
import Skeleton from '../components/Pizza/Skeleton';
import Pagination from '../components/Pagination';

import { SearchContext } from '../App';

const Home = () => {

	const dispatch = useDispatch()
	const { categoryId, sort } = useSelector(state => state.filter)

	const { searchValue } = useContext(SearchContext)

	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)


	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id))
	}

	const category = categoryId > 0 ? `category=${categoryId}` : ''
	const sortBy = sort.sortProperty.replace('-', '')
	const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
	const search = searchValue ? `&search=${searchValue}` : ''

	useEffect(() => {
		setIsLoading(true);

		axios
			.get(`https://659618ce04335332df8383cd.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
			.then(res => {
				setItems(res.data);
				setIsLoading(false);
			})

		window.scrollTo(0, 0)
	}, [categoryId, sort, searchValue, currentPage])

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
			<Pagination onChangePage={number => setCurrentPage(number)} />
		</div>
	)
}

export default Home