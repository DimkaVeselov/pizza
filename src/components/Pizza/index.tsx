import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addItems, CartItemType } from "../../redux/slices/cartSlice"
import { Link } from "react-router-dom"

type PizzaPropsType = {
	id: number;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
	raiting: number
}

type RootState = {
		cart: {
				items: CartItemType[];
		};
};

const typeNames = ['тонкое', 'традиционное']

const Pizza: React.FC<PizzaPropsType> = ({ id, title, price, imageUrl, sizes, types }) => {

	const dispatch = useDispatch()

	const [activeSizePizzas, setActiveSizePizzas] = useState<number>(0)
	const [activeTypePizzas, setActiveTypePizzas] = useState<number>(0)

	const cartItem = useSelector((state: RootState) =>
		state.cart.items.find((obj: CartItemType) =>
			obj.id === id &&
			obj.type === typeNames[activeTypePizzas] &&
			obj.size === sizes[activeSizePizzas]
		)
	);

	const addedCount = cartItem ? cartItem.count : 0

	const onClickAdd = () => {
		const item: CartItemType = {
			id,
			title,
			price,
			imageUrl,
			type: typeNames[activeTypePizzas],
			size: sizes[activeSizePizzas],
			count: 0
		}
		dispatch(addItems(item))
	}

	return (
		<div className="pizza-block-wrap">
			<div className='pizza-block'>
				<Link to={`/pizza/${id}`}>
					<img
						className='pizza-block__image'
						src={imageUrl}
						alt='Pizza'
					/>
					<h4 className='pizza-block__title'>{title}</h4>
				</Link>
				<div className='pizza-block__selector'>
					<ul>
						{types.map((type) => (<li
							key={type}
							className={activeTypePizzas === type ? 'active' : ''}
							onClick={() => setActiveTypePizzas(type)}
						>
							{typeNames[type]}
						</li>
						))}
					</ul>
					<ul>
						{sizes.map((size, i) => (<li
							key={size}
							className={activeSizePizzas === i ? 'active' : ''}
							onClick={() => setActiveSizePizzas(i)}
						>
							{size} см.
						</li>
						))}
					</ul>
				</div>
				<div className='pizza-block__bottom'>
					<div className='pizza-block__price'>от {price} ₽</div>
					<button
						className='button button--outline button--add'
						onClick={onClickAdd}
					>
						<svg
							width='12'
							height='12'
							viewBox='0 0 12 12'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
								fill='white'
							/>
						</svg>
						<span>Добавить</span>
						{addedCount > 0 && <i>{addedCount}</i>}
					</button>
				</div>
			</div >
		</div>
	)
}

export default Pizza