import { NextFunction, Request, Response } from 'express';
import { CreateBookDto } from '@/dtos/books.dto';
import BooksService from '@/services/books.service';

class BooksController {
  public booksService = new BooksService();

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookData: CreateBookDto = req.body;

      const book = await this.booksService.createBook(bookData);
      res.status(201).json({ data: book, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookId = Number(req.params.id);
      const book = await this.booksService.getBookById(bookId);

      res.status(200).json({ data: book, message: 'found' });
    } catch (error) {
      next(error);
    }
  };

  public getLatest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const books = await this.booksService.getLatestBooks();

      res.status(200).json({ data: books, message: 'found' });
    } catch (error) {
      next(error);
    }
  };

  public getFavorites = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const books = await this.booksService.getFavoriteBooks(userId);

      res.status(200).json({ data: books, message: 'found' });
    } catch (error) {
      next(error);
    }
  };
}

export default BooksController;
