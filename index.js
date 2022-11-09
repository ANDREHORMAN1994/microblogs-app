import './style.css';

import {
  fillUsersSelect,
  fillPosts,
  fillFeaturedPostComments,
  clearPageData,
  fillErrorMessage,
} from './utils/updateUI';

const usersSelect = document.querySelector('#users-select');

const USERS_API = 'https://dummyjson.com/users';
// faça a lógica para pegar as informações das pessoas usuárias e preencher o select aqui.

const fetchAPi = async (endpoint) => {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

const fillSelect = async () => {
  const { users } = await fetchAPi(USERS_API);
  // console.log(users);
  fillUsersSelect(users);
};
fillSelect();

usersSelect.addEventListener('change', async ({ target }) => {
  clearPageData();

  // faça a lógica para pegar as informações dos posts da pessoa selecionada e dos comentários do post destacado aqui.

  try {
    const id = target.value;
    const endpoint = `https://dummyjson.com/posts/user/${id}`;

    const { posts } = await fetchAPi(endpoint);
    console.log(posts);
    fillPosts(posts);

    const [featuredPost] = posts;
    console.log(featuredPost);
    const endpointComments = `https://dummyjson.com/posts/${featuredPost.id}/comments`;
    const { comments } = await fetchAPi(endpointComments);
    fillFeaturedPostComments(comments);
  } catch (error) {
    fillErrorMessage(error.message);
  }
});
