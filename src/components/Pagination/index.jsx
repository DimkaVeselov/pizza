import ReactPaginate from 'react-paginate';
import st from './Pagination.module.scss'

const Pagination = ({ currentPage, onChangePage }) => {
	return (
		<ReactPaginate
			className={st.root}
			onPageChange={event => onChangePage(event.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={3}
			forcePage={currentPage - 1}
			nextLabel='>'
			breakLabel='...'
			previousLabel='<'
			renderOnZeroPageCount={null}
		/>
	)
}

export default Pagination