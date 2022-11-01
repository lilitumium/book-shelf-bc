import { BooksInCollections, Collection, PrismaClient } from '@prisma/client';
import { CreateCollectionDto } from '@/dtos/collections.dto';
import { HttpException } from '@/exceptions/HttpException';

class CollectionsService {
  public collections = new PrismaClient().collection;
  public booksInCollections = new PrismaClient().booksInCollections;

  public async createCollection(collectionData: CreateCollectionDto): Promise<Collection> {
    const { title, thumbnail, creatorId, bookIds, tagId } = collectionData;

    const collection = await this.collections.create({
      data: {
        title,
        creatorId,
        thumbnail,
        tagId,
        books: {
          create: bookIds?.map(bookId => ({
            book: {
              connect: {
                id: bookId,
              },
            },
          })),
        },
      },
    });

    return collection;
  }

  public async getAllCollections(): Promise<Array<Collection>> {
    const collections = await this.collections.findMany();

    return collections;
  }

  public async getLatestCollections(): Promise<Array<BooksInCollections>> {
    const collectionGroups = await this.booksInCollections.findMany({
      take: 10,
      include: {
        book: true,
        collection: {
          include: {
            creator: true,
          },
        },
      },
    });

    const response = collectionGroups.reduce((acc, collection) => {
      const { book, collection: collectionData } = collection;

      const collectionIndex = acc.findIndex(item => item.collection.id === collectionData.id);

      if (collectionIndex === -1) {
        acc.push({
          collection: collectionData,
          books: [book],
        });
      } else {
        acc[collectionIndex].books.push(book);
      }

      return acc;
    }, []);

    return response;
  }

  public async getCollectionById(collectionId: number): Promise<BooksInCollections> {
    const collections = await this.booksInCollections.findMany({
      where: {
        collectionId,
      },
      include: {
        book: true,
        collection: {
          include: {
            creator: true,
          },
        },
      },
    });

    if (!collections) throw new HttpException(409, 'Collection not found');

    const preparedCollection = {
      ...collections[0].collection,
      books: collections.map(collection => collection.book),
    };

    return preparedCollection;
  }

  public async deleteCollectionById(collectionId: number): Promise<Collection> {
    const collection = await this.collections.delete({ where: { id: collectionId } });

    if (!collection) throw new HttpException(409, 'Collection not found');

    return collection;
  }
}

export default CollectionsService;
