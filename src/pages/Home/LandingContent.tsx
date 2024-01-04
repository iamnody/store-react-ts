import funImage from '../../assets/fun.svg'
import storeImage from '../../assets/store.svg'
import style from './LandingContent.module.scss'

export default function LandingContent() {
  return (
    <div className={style.LandingContent}>
      <img src={storeImage} className={style.storeImage} alt='' />
      <h1>
        <div className={style.top}>
          <div className={style.fun}>
            {/* <div className={style.funWapper}> */}
            <img src={funImage} alt='' />
            <span>fun</span>
            {/* </div> */}
          </div>
          <span className={style.place}>place</span>
        </div>
        <span className={style.oliver}>Oliver's</span>
      </h1>
    </div>
  )
}
