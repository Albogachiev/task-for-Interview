import React, { useState } from 'react';
import { useSelector } from "react-redux";
// @ts-ignore
import style from '../../scss/Header.module.scss';
import { booksFetchData, setCategories, setTitle  } from '../../redux/slice/getBooks';
import { RootState, useAppDispatch } from '../../redux/store';

export const Header:React.FC = () =>  {
    const  { books, }  = useSelector((el:RootState) => el.books);
    const [inputData, setInputData] = useState({categori:'all', 
                                                sort:'', 
                                                title:''})
    const dispatch = useAppDispatch();
    function categoriBooks() {
      const categoriesSet = new Set<string>();
      books.forEach((el) => {
        if (el?.categories) {
          if (Array.isArray(el.categories)) {
            el.categories.forEach((category: string) => categoriesSet.add(category));
          }
        }
      });
      return Array.from(categoriesSet);
    }

    function keyEnter(){
      let url = inputData.sort;
      dispatch(booksFetchData({url}))
      dispatch(setCategories(inputData.categori))
      dispatch(setTitle(inputData.title))
    }
    function keyPres(event:React.KeyboardEvent<HTMLElement>){
      if (event.key === 'Enter') {
        event.preventDefault();
        keyEnter();
      }
    };
  return (
    <div className={style.header}>
      <h1>Search for books</h1>

      <form onSubmit={(e) => e.preventDefault()} 
            className={style.form_for_books}>
      <label htmlFor="for_books"><img src='/images/search_icon.svg' alt='search' /></label>
      <input value={inputData.title} 
             onKeyDown={keyPres} 
             onChange={(e) => setInputData((prev) => ({...prev, title:e.target.value}))} 
             className={style.input_for_books} 
             type='text' />
      </form>

       <div className={style.small_inputs}>

        <label htmlFor='inp1'><p>Categories</p></label>
        <select id='inp1' 
                value={inputData.categori} 
                onKeyDown={keyPres} 
                onChange={(e) => setInputData((prev) => ({...prev, categori:e.target.value}))} 
                name="options">
                     <option value="all" >all</option>
            {categoriBooks()?.map((el, i) => (
                     <option key={i} 
                             value={el}>{el}</option>
            ))}
        </select>

        <label htmlFor='inp2'><p>Sorting by</p></label>
        <select id='inp2' 
                value={inputData.sort} 
                onKeyDown={keyPres} 
                onChange={(e) => setInputData((prev) => ({...prev, sort:e.target.value}))} 
                name="options">
            <option value='relevance' >relevance</option>
            <option value='newest' >newest</option>
        </select>

      </div>
      <button className={style.button_search} onClick={() => keyEnter()}>ПОИСК</button>
    </div>
  )
}
