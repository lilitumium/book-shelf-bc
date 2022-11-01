import { Book, PrismaClient } from '@prisma/client';
import { CreateBookDto } from '@/dtos/books.dto';
import { HttpException } from '@/exceptions/HttpException';

class BooksService {
  public books = new PrismaClient().book;

  public async createBook(bookData: CreateBookDto): Promise<Book> {
    const book = await this.books.create({ data: bookData });

    return book;
  }

  public async getBookById(bookId: number): Promise<Book> {
    const book = await this.books.findUnique({
      where: { id: bookId },
      include: {
        collections: {
          select: {
            id: true,
            book: true,
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    if (!book) throw new HttpException(409, 'Book not found');

    return book;
  }

  public async getLatestBooks(): Promise<Array<Book>> {
    const books = await this.books.findMany({ take: 6, orderBy: { createdAt: 'desc' } });

    return books;
  }

  public async getFavoriteBooks(userId: number): Promise<Array<Book>> {
    const books = await this.books.findMany({
      where: { userId },
    });

    return books;
  }
}

export default BooksService;
