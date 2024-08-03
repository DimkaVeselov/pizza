import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {  selectFilter, setCategoryId, setCurrentPage } from '../redux/slices/filterSlice'

import Catagery from '../components/Catagery';
import Sort from '../components/Sort';
import Pizza from '../components/Pizza/index';
import Skeleton from '../components/Pizza/Skeleton';
import Pagination from '../components/Pagination';
import { fetchPizzas,  selectPizzas } from '../redux/slices/pizzasSlice';
import PizzasEmpty from '../components/PizzasEmpty';
import { useAppDispatch } from '../redux/store';

const Home = () => {
	const dispatch = useAppDispatch()

	const { items, status } = useSelector(selectPizzas)
	const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)


	const onChangeCategory = (id: number) => {
		dispatch(setCategoryId(id))
	}

	const onChangePage = (number: number) => {
		dispatch(setCurrentPage(number))
	}

	const getPizzas = async () => {

		const sortBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const search = searchValue ? `&search=${searchValue}` : '';
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		
		dispatch(
			fetchPizzas({
				currentPage: String(currentPage),
				category,
				sortBy,
				order,
				search,
			})
		)

		window.scrollTo(0, 0)
	}


	// если первый рендер, то запрашиваем пиццы
	useEffect(() => {
		getPizzas()
	}, [categoryId, sort.sortProperty, searchValue, currentPage])


	const pizzas = items.map((item: any) => (<Pizza key={item.id} {...item} />))

	const skeletons = [...new Array(4)].map((_, i) => <Skeleton key={i} />)

	return (
		<div className='container'>
			<div className='content__top'>
				<Catagery value={categoryId} onClickCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			{status === 'error' ?
				<PizzasEmpty />
				:
				<>
					<div className='content__items'>
						{status === 'loading'
							? skeletons
							: pizzas
						}
					</div>
					<Pagination currentPage={currentPage} onChangePage={onChangePage} pageCount={3} />
				</>
			}

		</div>
	)
}

export default Home