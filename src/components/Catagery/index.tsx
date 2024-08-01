type CategoryType = {
	title: string
}

type CategoryPropsType = {
	value: number;
	onClickCategory: any
}

const categorys: CategoryType[] = [
	{ title: 'Все' },
	{ title: 'Мясные' },
	{ title: 'Вегетарианская' },
	{ title: 'Гриль' },
	{ title: 'Острые' },
	{ title: 'Закрытые' },
]

const Catagery: React.FC<CategoryPropsType> = ({ value, onClickCategory }) => {
	return (
		<div className='categories'>
			<ul>
				{categorys.map((item, i) => (
					<li
						key={item.title}
						className={value === i ? 'active' : ''}
						onClick={() => onClickCategory(i)}>{item.title}
					</li>)
				)}
			</ul>
		</div>
	);
}

export default Catagery