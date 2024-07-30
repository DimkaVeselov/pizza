import { Link } from 'react-router-dom'
import st from './NotFoundBlock.module.scss'

export const NotFoundBlock = (props) => {

	const { text } = props

	return (
		<div className={st.root}>
			<h1>
				<span>😕</span>
				<br />
				Ничего не найдено
			</h1>
			<p className={st.descr} >{text}</p>
			<Link to="/" className="button button--black">
				<span>Вернуться назад</span>
			</Link>
		</div >
	)
}
