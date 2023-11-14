// @ts-ignore
import style from '../../scss/Card.module.scss';
import { BooksTypes } from '../../redux/slice/typesSlice';

export default function Card({title,categories,authors,img}:BooksTypes) {
  return (
    <div className={style.cardContainer}>
      <img src={img} alt='фото книги' />

      <div className={style.cardText}>
      <p className={style.categori}>{categories}</p>
      <p className={style.title}>{title}</p>
      <p className={style.author}>{authors?.length > 1 ? `${authors} ` : authors}</p>
      </div>
    </div>
  )
}
