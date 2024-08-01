const PizzasEmpty = () => {
	return (
		<div className="cart cart--empty cart--error">
			<h2>Произошла ошибка <span>😕</span></h2>
			<p>
				К сожалению не удалось получить пиццы<br />
				Попробуйте позже
			</p>
			<button onClick={() => window.location.reload()} className="button button--black">
				<span>Попробовать еще раз</span>
			</button>
		</div>
	)
}

export default PizzasEmpty