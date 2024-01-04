import { useEffect, useState } from 'react';
import Catagery from '../components/Catagery';
import Sort from '../components/Sort';
import Pizza from '../components/Pizza';
import Skeleton from '../components/Pizza/Skeleton';



const Home = () => {

	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetch('https://659618ce04335332df8383cd.mockapi.io/items')
			.then(res => res.json())
			.then(data => {
				setItems(data);
				setIsLoading(false)
			})
	}, [])

	return (
		<>
			<div className='content__top'>
				<Catagery />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{isLoading
					? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
					: items.map((item) => (<Pizza key={item.id} {...item} />))
				}
			</div>
		</>
	)
}

export default Home