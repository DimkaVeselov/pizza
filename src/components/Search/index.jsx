import { useState, useContext, useRef, useCallback } from 'react'
import { SearchContext } from '../../App'
import debounce from 'lodash.debounce'

import st from './Search.module.scss'

const Search = () => {

	const [value, setValue] = useState('')
	const { setSearchValue } = useContext(SearchContext)

	const inputRef = useRef()

	const updateSearchValue = useCallback(
		debounce(value => {
			setSearchValue(value)
		}, 250), []
	)

	const onChangeInput = (event) => {
		setValue(event.target.value)
		updateSearchValue(event.target.value)
	}

	const clearSearch = () => {
		setValue('')
		setSearchValue('')
		inputRef.current.focus()
	}

	return (
		<div className={st.root}>
			<input
				ref={inputRef}
				className={st.input}
				placeholder='Поиск пиццы'
				onChange={(e) => onChangeInput(e)}
				value={value}
			/>
			{value && <svg
				className={st.clear}
				xmlns="http://www.w3.org/2000/svg"
				height="48"
				viewBox="0 0 48 48"
				width="48"
				onClick={clearSearch} >
				<path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
				<path d="M0 0h48v48H0z" fill="none" />
			</svg>}

		</div >
	)
}

export default Search