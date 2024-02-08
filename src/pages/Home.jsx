import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs'
import { useNavigate } from 'react-router-dom';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'

import Catagery from '../components/Catagery';
import Sort, { sortList } from '../components/Sort';
import Pizza from '../components/Pizza';
import Skeleton from '../components/Pizza/Skeleton';
import Pagination from '../components/Pagination';

import { SearchContext } from '../App';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

const Home = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isSearch = useRef(false)
	const isMounted = useRef(false)

	const { items, status } = useSelector(state => state.pizzas)
	const { categoryId, sort, currentPage } = useSelector(state => state.filter)

	const { searchValue } = useContext(SearchContext)


	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id))
	}

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number))
	}

	const getPizzas = async () => {
		const sortBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const search = searchValue ? `&search=${searchValue}` : '';
		const category = categoryId > 0 ? `category=${categoryId}` : '';


		dispatch(fetchPizzas({
			currentPage,
			sortBy,
			order,
			search,
			category
		}))

		window.scrollTo(0, 0)
	}

	// если изменили параметры и был первый рендер
	useEffect(() => {
		if (isMounted.current) {

			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage
			});

			navigate(`?${queryString}`);
		}

		isMounted.current = true
	}, [categoryId, sort.sortProperty, currentPage])

	// при первом рендере проверяем параметры и сохраняем в redux
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

	// если первый рендер, то запрашиваем пиццы
	useEffect(() => {
		getPizzas()

		isSearch.current = false
	}, [categoryId, sort.sortProperty, searchValue, currentPage])


	const pizzas = items.map((item) => (<Pizza key={item.id} {...item} />))
	const skeletons = [...new Array(4)].map((_, i) => <Skeleton key={i} />)

	return (
		<div className='container'>
			<div className='content__top'>
				<Catagery value={categoryId} onClickCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			{status === 'error' ?
				<div className="cart cart--empty cart--error">
					<h2>Произошла ошибка <span>😕</span></h2>
					<p>
						К сожалению не удалось получить пиццы<br />
						Попробуйте позже
					</p>
					<Link to="/" className="button button--black">
						<span>Попробовать еще раз</span>
					</Link>
				</div>
				:
				<>
					<div className='content__items'>
						{status === 'loading'
							? skeletons
							: pizzas
						}
					</div>
					<Pagination currentPage={currentPage} onChangePage={onChangePage} />
				</>
			}

		</div>
	)
}

export default Home