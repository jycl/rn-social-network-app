import {createContext, useContext} from 'react';
import UserStore from './userStore';
import PostStore from './postStore';
import PhotoStore from './photoStore';
import TodoStore from './todoStore';

const postStore = new PostStore();
const photoStore = new PhotoStore();
const todoStore = new TodoStore();
const userStore = new UserStore(postStore, photoStore, todoStore);

export const store = {
  userStore,
  postStore,
  photoStore,
  todoStore,
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
