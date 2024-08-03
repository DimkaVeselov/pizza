import ReactPaginate from 'react-paginate';
import st from './Pagination.module.scss'

type PaginationPropsType = {
	currentPage: number;
	onChangePage: (page: number) => void;
	pageCount: number
}

const Pagination: React.FC<PaginationPropsType> = ({ currentPage, onChangePage, pageCount  }) => {
	return (
		<ReactPaginate
			className={st.root}
			onPageChange={event => onChangePage(event.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={pageCount}
			forcePage={currentPage - 1}
			nextLabel='>'
			breakLabel='...'
			previousLabel='<'
		/>
	)
}

export default Pagination