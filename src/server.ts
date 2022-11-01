import App from '@/app';
import validateEnv from '@utils/validateEnv';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import BooksRoute from '@routes/books.route';
import TagsRoute from '@routes/tags.route';
import CollectionRoute from '@routes/collection.route';
import CommentsRoute from './routes/comments.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new BooksRoute(),
  new TagsRoute(),
  new CollectionRoute(),
  new CommentsRoute(),
]);

app.listen();
