import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'
// import style from './Rating.module.scss'
import './Rating.scss'

type Props = {
  rating: number
  numReviews: number
  color: string
  fontSize: number
}

const Rating = ({ rating, numReviews, color, fontSize }: Props) => {
  return (
    <div className='Rating' style={{ fontSize: `${fontSize}rem` }}>
      {[...Array(5)].map((_, i) => {
        return (
          <span className='Rating__star' style={{ color }} key={i}>
            {rating >= i + 0.5 ? (
              <BsStarFill />
            ) : rating >= i + 1 ? (
              <BsStarHalf />
            ) : (
              <BsStar />
            )}
          </span>
        )
      })}
      {!(numReviews === -1) && (
        <span className='Rating__text'>
          <small>
            {numReviews} review{numReviews > 1 ? 's' : ''}
          </small>
        </span>
      )}
    </div>
  )
}

Rating.defaultProps = {
  color: '#e67a00',
  fontSize: 1,
}

export default Rating
