import ContentLoader from "react-content-loader"

const Skeleton = () => (
	<div className="pizza-block-wrap" >
		<ContentLoader
			className="pizza-block"
			speed={2}
			width={280}
			height={500}
			viewBox="0 0 280 500"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<circle cx="135" cy="145" r="125" />
			<rect x="0" y="286" rx="5" ry="5" width="275" height="20" />
			<rect x="1" y="316" rx="5" ry="5" width="275" height="88" />
			<rect x="7" y="425" rx="5" ry="5" width="95" height="27" />
			<rect x="130" y="414" rx="25" ry="25" width="152" height="45" />
		</ContentLoader>
	</div>
)

export default Skeleton