import st from './NotFoundBlock.module.scss'

export const NotFoundBlock = () => {
	return (
		<div className={st.root}>
			<h1>
				<span>😕</span>
				<br />
				Ничего не найдено
			</h1>
			<p className={st.descr} >К сожалени данная страница отсутствует в нашем интернет-магазине</p>
		</div >
	)
}

