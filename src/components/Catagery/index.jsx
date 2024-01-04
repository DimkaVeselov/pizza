const categorys = [
	{ title: 'Все' },
	{ title: 'Мясные' },
	{ title: 'Вегетарианская' },
	{ title: 'Гриль' },
	{ title: 'Острые' },
	{ title: 'Закрытые' },
]

function Catagery(props) {

	const { value, onClickCategory } = props;

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