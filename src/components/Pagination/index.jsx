import ReactPaginate from 'react-paginate';
import st from './Pagination.module.scss'

const Pagination = ({ onChangePage }) => {
	return (
		<ReactPaginate
			className={st.root}
			onPageChange={event => onChangePage(event.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={3}
			nextLabel='>'
			breakLabel='...'
			previousLabel='<'
			renderOnZeroPageCount={null}
		/>
	)
}

export default Pagination