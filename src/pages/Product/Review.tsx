import { FormEvent, useState } from 'react'
import { BsPersonCircle } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Rating from '../../components/Rating/Rating'
import { AppDispatch, RootState } from '../../store/_index'
import {
  createReview,
  deleteReview,
  getProduct,
} from '../../store/productService'
import { toLocalDateString } from '../../utils/toLocalDateString'
import style from './Review.module.scss'

export default function Review() {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  const { user } = useSelector((state: RootState) => state.user)
  const { product } = useSelector((state: RootState) => state.product)

  const dispatch: AppDispatch = useDispatch()
  const { _id } = useParams()

  function reviewSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch(createReview({ _id: product._id, rating, comment }))
  }

  async function deleteReviewHandler() {
    // e.preventDefault()
    try {
      await dispatch(deleteReview(product._id)).unwrap()
      if (_id) {
        dispatch(getProduct(_id))
      }
    } catch (error) {}
  }

  const userReview = product.reviews.find((review) => review.user === user?._id)

  return (
    <div className={style.Review}>
      {/* write review */}
      <div className={style.writeReview}>
        {/* if there is your review, show your review, else show below <></>*/}
        {user &&
          (userReview ? (
            <div className={style.reviewCard}>
              <button className={style.delete} onClick={deleteReviewHandler}>
                X
              </button>
              <p className={style.user}>Your Review</p>
              <Rating
                rating={userReview.rating}
                numReviews={-1}
                fontSize={0.8}
              />
              <p className={style.time}>
                {toLocalDateString(userReview.updatedAt)}
              </p>
              <p className={style.comment}>{userReview.comment}</p>
            </div>
          ) : (
            <>
              <p className={style.title}>Write a review</p>
              <form onSubmit={reviewSubmitHandler}>
                <select
                  required
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  <option value='3'>5 - Good</option>
                  <option value='4'>4</option>
                  <option value='3'>3</option>
                  <option value='2'>2</option>
                  <option value='1'>1 - Bad</option>
                </select>
                <textarea
                  placeholder='Write your review here...'
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
                <button type='submit'>Submit</button>
              </form>
            </>
          ))}
        {!user && (
          <Link
            className='title'
            to={`/signin?redirect=/product/${product._id}`}
          >
            Sign in to write review
          </Link>
        )}
      </div>
      {/* customer reviews */}
      <div className={style.customerReviews}>
        <p className={style.title}>Customer reviews</p>
        <div className={style.reviewList}>
          {product.reviews.map((review, i) => {
            return (
              <div className={style.reviewCard} key={i}>
                {review.user === user?._id && (
                  <button
                    className={style.delete}
                    onClick={deleteReviewHandler}
                  >
                    X
                  </button>
                )}
                <p className={style.user}>
                  <BsPersonCircle /> {review.name}
                </p>
                <Rating rating={review.rating} numReviews={-1} fontSize={0.8} />
                <p className={style.time}>
                  {toLocalDateString(review.updatedAt)}
                </p>
                <p className={style.comment}>{review.comment}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
