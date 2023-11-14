import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { BooksSliceTypes, BooksTypes, } from './typesSlice';

const initialState:BooksSliceTypes = { 
    books:[],
    status:'',
    categori:'',
    title:'',
 }

 export const booksFetchData = createAsyncThunk(
    '/books',
    async ({url, startIndex}: { url?: string; startIndex?: number }) => {
      try {
        const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=search+terms&`, {
          params: {
            key: 'AIzaSyASBgFDfxaQWtW1SJIqo39YZeYs-EbY2JI',
            orderBy: url || 'relevance',
            startIndex: startIndex || 20,
            maxResults: 10
          }
        });
          const infoBook = data.items.map(({volumeInfo}:any) => {
            const { title, categories, authors, imageLinks }:BooksTypes = volumeInfo;
            return { title, categories, authors, imageLinks }
          })
          return infoBook
      } catch (error) {
        console.log('ошибка получения данных', error)
      }
    }
  )

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setCategories(state, action:PayloadAction<string>){
      if(action.payload === 'all'){
        state.categori = ''
      }else{
        state.categori = action.payload
      }
    },
    setTitle(state, action:PayloadAction<string>){
      state.title = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(booksFetchData.pending, (state, action) => {
      state.status = 'LOADING'
    })
    builder.addCase(booksFetchData.fulfilled, (state, action) => {
      state.books = [...state.books, ...action.payload]
      state.status = 'SECCES'
    })
    builder.addCase(booksFetchData.rejected, (state, action) => {
      state.status = 'ERROR'
    })
  }
});

export const { setCategories, setTitle, } = booksSlice.actions;
export default booksSlice.reducer;