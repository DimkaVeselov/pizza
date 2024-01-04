import { useState } from "react";

const categorys = [
	{ title: 'Все' },
	{ title: 'Мясные' },
	{ title: 'Вегетарианская' },
	{ title: 'Гриль' },
	{ title: 'Острые' },
	{ title: 'Закрытые' },
]

function Catagery() {

	const [activeCategory, setActiveCategory] = useState(0)


	return (
		<div className='categories'>
			<ul>
				{categorys.map((item, index) => (
					<li
						key={item.title}
						className={activeCategory === index ? 'active' : ''}
						onClick={() => setActiveCategory(index)}>{item.title}
					</li>)
				)}
			</ul>
		</div>
	);
}

export default Catagery