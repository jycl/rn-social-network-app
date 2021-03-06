import {
  UserType,
  PhotoType,
  PostType,
  CommentType,
  AlbumType,
  TodoType,
} from '../types';

/**
 * APIService encapsulates all backend API calls to https://jsonplaceholder.typicode.com/.
 * The URLs for the API calls are listed in the APIConfig.
 *
 * Note that due to the staticity of backend data, the service methods will be kept in
 * this single file.  If each module (e.g. User, Albums), were to increase in method types
 * (e.g. CRUD, POST), it would be more suitable to have a service for each module (e.g. UserService).
 *
 * For test files see ./__tests__/APIService.test.js.
 */

export const APIConfig = {
  POSTS: 'https://jsonplaceholder.typicode.com/posts/',
  COMMENTS: 'https://jsonplaceholder.typicode.com/comments/',
  ALBUMS: 'https://jsonplaceholder.typicode.com/albums/',
  PHOTOS: 'https://jsonplaceholder.typicode.com/photos/',
  TODOS: 'https://jsonplaceholder.typicode.com/todos/',
  USERS: 'https://jsonplaceholder.typicode.com/users/',
};

/**
 * Invoke global fetch method to fetch resources from the input
 * url and fetch options
 * @param {String} url resource location (only URL in this case) to attempt to fetch from
 * @param {Object} fetchOptions object with key-value for request settings, for more details see:
 *                https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
 * @return {Response.JSON} JSON returned from .json() call on response
 */
async function _fetchWithParams(url: string, fetchOptions: RequestInit) {
  try {
    const response = await fetch(url, fetchOptions);
    if (response.ok && response.json) {
      return response.json();
    } else {
      throw new Error(`Error retrieving API from URL: ${url}`);
    }
  } catch (error) {
    console.log(error);
    return {};
  }
}

/**
 * Invoke fetch method with fetch options for GET request.
 * @param {String} url URL to make HTTP GET request to from
 * @return {Response.JSON} JSON returned from .json() call on response
 */
export async function get(url: string): Promise<[]> {
  return await _fetchWithParams(url, {
    method: 'GET',
    headers: {'Content-Type': 'application/json; charset=utf-8'},
  });
}

/**
 * Get full user list from backend
 * @return {Array<Objects>} each object represents user details
 */
export async function getUserList(): Promise<UserType[]> {
  return await get(APIConfig.USERS);
}

/**
 * Get full post history list for user with input userId
 * @param {String} userId used to query posts with this userId
 * @return {Array<Objects>} each object represents a post
 */
export async function getPostHistoryForUser(
  userId: number,
): Promise<PostType[]> {
  const url = APIConfig.POSTS + `?userId=${userId}`;
  return await get(url);
}

/**
 * Get full post history list for user with input userId
 * @param {String} postId parent Id used to query comments with this postId
 * @return {Array<Objects>} each object represents a post record
 */
export async function getCommentsForPost(
  postId: number,
): Promise<CommentType[]> {
  const url = APIConfig.COMMENTS + `?postId=${postId}`;
  return await get(url);
}

/**
 * Get all photo albums related to user by userId
 * @param {String} userId parent Id used to query comments with this postId
 * @return {Array<Objects>} each object represents an album record
 */
export async function getAlbumsForUser(userId: number): Promise<AlbumType[]> {
  const url = APIConfig.ALBUMS + `?userId=${userId}`;
  return await get(url);
}

/**
 * Get all photos from the photo album with albumId
 * @param {String} albumId parent Id used to query photos with this albumId
 * @return {Array<Objects>} each object represents a photo record
 */
export async function getPhotosForAlbum(albumId: number): Promise<PhotoType[]> {
  const url = APIConfig.PHOTOS + `?albumId=${albumId}`;
  return await get(url);
}

/**
 * Get full todo list for user
 * @param {String} userId parent Id used to query todos with this userId
 * @return {Array<Objects>} each object represents a todo record
 */
export async function getTodosForUser(userId: number): Promise<TodoType[]> {
  const url = APIConfig.TODOS + `?userId=${userId}`;
  return await get(url);
}
