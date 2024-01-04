import ReactPaginate from 'react-paginate'
import { useNavigate } from 'react-router-dom'
import useWindowWidth from '../../hooks/useWindowWidth'
import './Pagination.scss'

type Props = { page: number; pages: number; search?: string }

export default function Pagination({ page, pages, search = '' }: Props) {
  const navigate = useNavigate()

  const handlePageClick = (selectedItem: { selected: number }) => {
    const newPage = selectedItem.selected + 1 // react-paginate uses zero-based index
    navigate('?page=' + newPage + (search ? '&search=' + search : ''))
  }

  const marginPagesDisplayed = useWindowWidth('tablet') ? 1 : 0
  const pageRangeDisplayed = useWindowWidth('laptop') ? 4 : 3

  return (
    <>
      {pages > 1 && (
        <ReactPaginate
          className='Pagination'
          pageCount={pages}
          initialPage={page - 1} // react-paginate uses zero-based index
          marginPagesDisplayed={marginPagesDisplayed}
          pageRangeDisplayed={pageRangeDisplayed}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
        />
      )}
    </>
  )
}
