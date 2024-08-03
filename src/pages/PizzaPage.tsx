import axios from 'axios';
import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import ContentLoader from "react-content-loader"

const PizzaPage = () => {
	const [data, setData] = useState<{
		imageUrl: string
		title: string
		description: string
		price: number
	}>()
	const { id } = useParams()
	const navigate = useNavigate()

	const fetchPizza = async () => {
		try {
			const { data } = await axios.get(`https://659618ce04335332df8383cd.mockapi.io/items/${id}`)
			setData(data)
		} catch (error) {
			navigate('/*')
			console.error(error);
		}
	}

	useEffect(() => {
		fetchPizza()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])


	if (!data) {
		return (
			<div className='container'>
				<div className='pizza-page'>
					<Link to="/" className="button button--outline button--add go-back-btn">
						<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>

						<span>Вернуться назад</span>
					</Link>
					<div className='pizza-page__wrap'>
						<ContentLoader
							speed={2}
							width={600}
							height={600}
							viewBox="0 0 600 600"
							backgroundColor="#f2f2f2"
							foregroundColor="#ecebeb"
						>
							<circle cx="191" cy="162" r="161" />
							<rect x="363" y="76" rx="0" ry="0" width="109" height="18" />
							<rect x="365" y="117" rx="0" ry="0" width="171" height="34" />
						</ContentLoader>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='container'>

			<div className='pizza-page'>
				<Link to="/" className="button button--outline button--add go-back-btn">
					<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>

					<span>Вернуться назад</span>
				</Link>
				<div className='pizza-page__wrap'>
					<div className='pizza-page__image'>
						<img src={data?.imageUrl} alt="" />
					</div>
					<div className='pizza-page__content'>
						<h1 className='pizza-page__title'>{data?.title}
							<span className='pizza-page__price'>от&nbsp;{data?.price}&nbsp;₽</span>
						</h1>
						
						<p className='pizza-page__descr'>{data?.description}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PizzaPage