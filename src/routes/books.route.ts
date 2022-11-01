import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import BooksController from '@controllers/books.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateBookDto } from '@/dtos/books.dto';

class BooksRoute implements Routes {
  public path = '/books';
  public router = Router();
  public booksController = new BooksController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, validationMiddleware(CreateBookDto, 'body'), this.booksController.create);
    // this.router.get(`${this.path}`, this.booksController.getBooks);
    this.router.get(`${this.path}/latest`, this.booksController.getLatest);
    this.router.get(`${this.path}/:id`, this.booksController.getOne);
    this.router.get(`${this.path}/favorites/:id`, this.booksController.getFavorites);
    // this.router.delete(`${this.path}/:id`, this.booksController.deleteBook);
  }
}

export default BooksRoute;
