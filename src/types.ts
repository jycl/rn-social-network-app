import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

export type NavigationProps = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
};

export type UserType = {
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
};

export type PostType = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

export type CommentType = {
  body: string;
  email: string;
  id: number;
  name: string;
  postId: number;
};

export type AlbumType = {
  id: number;
  photoCount: number;
  title: string;
  userId: number;
};

export type PhotoType = {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
};

export type TodoType = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
};

export type TabType = 'Posts' | 'Albums' | 'Todos';
