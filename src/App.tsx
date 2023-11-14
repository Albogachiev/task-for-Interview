import React from 'react';
import { booksFetchData } from './redux/slice/getBooks';

import { Header } from './components/Header/Header';
import Home from './components/Home/Home';
// @ts-ignore
import style from './scss/App.module.scss';
import { useAppDispatch } from './redux/store'

export default function App() {
  const [startIndex, setStartIndex] = React.useState<number>(0);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(booksFetchData({startIndex}))
},[startIndex, dispatch])

  return (
    <div className={style.container}>
      <Header />
      <Home />
      <button className={style.button_pagination} 
              onClick={() => setStartIndex((prev) => prev + 10)}>ЕЩЕ</button>
    </div>
  );
}
