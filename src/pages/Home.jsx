import { useEffect, useState } from 'react';
import Catagery from '../components/Catagery';
import Sort from '../components/Sort';
import Pizza from '../components/Pizza';
import Skeleton from '../components/Pizza/Skeleton';
import Pagination from '../components/Pagination';




const Home = ({ searchValue }) => {

	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [activeCategory, setActiveCategory] = useState(0)
	const [currentPage, setCurrentPage] = useState(1)
	const [selectedSortItem, setSelectedSortItem] = useState({
		name: 'популярности',
		sortProperty: 'rating'
	})

	const category = activeCategory > 0 ? `category=${activeCategory}` : ''
	const sortBy = selectedSortItem.sortProperty.replace('-', '')
	const order = selectedSortItem.sortProperty.includes('-') ? 'asc' : 'desc'
	const search = searchValue ? `&search=${searchValue}` : ''

	useEffect(() => {
		setIsLoading(true);
		fetch(`https://659618ce04335332df8383cd.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
			.then(res => res.json())
			.then(data => {
				setItems(data);
				setIsLoading(false);
			})

		window.scrollTo(0, 0)
	}, [activeCategory, selectedSortItem, searchValue, currentPage])

	const pizzas = items.map((item) => (<Pizza key={item.id} {...item} />))
	const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />)

	return (
		<div className='container'>
			<div className='content__top'>
				<Catagery value={activeCategory} onClickCategory={(i) => setActiveCategory(i)} />
				<Sort value={selectedSortItem} onClickSort={(i) => setSelectedSortItem(i)} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{!isLoading
					? pizzas
					: skeletons
				}
			</div>
			<Pagination onChangePage={number => setCurrentPage(number)} />
		</div>
	)
}

export default Home