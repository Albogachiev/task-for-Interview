// @ts-ignore
import { useSelector } from "react-redux";
import style from '../../scss/Home.module.scss';
import Card from '../Card/Card';
import { Skeleton } from '../Skeleton/Skeleton';
import { RootState } from '../../redux/store';
import { BooksTypes } from "../../redux/slice/typesSlice";


export default function Home() {
  const { categori, books, title, status }  = useSelector((el:RootState) => el.books);

  const catSearch = books?.filter((item) => item?.title?.toLowerCase()?.includes(title?.toLowerCase()));
  const sortSearch:BooksTypes[] = catSearch?.filter(({categories}) =>!categori || (categories?.[0] && categories[0].includes(categori))) ?? [];
  const skeleton = [...Array(8)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className={style.home}>
    <h1 className={style.count}>{sortSearch.length}</h1>
    <div className={style.content}>
    { status === 'SECCES' ? sortSearch?.map((el, i) => {
        return ( <Card key={i} 
                  title={el?.title} 
                  categories={el?.categories} 
                  authors={el?.authors} 
                  img={el?.imageLinks?.thumbnail
                  } />
        );
      })
       : 
       skeleton}
    </div>
    </div>
  )
}
