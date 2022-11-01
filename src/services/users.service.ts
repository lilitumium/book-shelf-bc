import { hash } from 'bcrypt';
import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class UserService {
  public users = new PrismaClient().user;

  public async findAllUser(): Promise<User[]> {
    const allUser: User[] = await this.users.findMany();
    return allUser;
  }

  public async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: User = await this.users.findUnique({
      where: { id: userId },
      include: {
        favoriteBooks: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ data: { ...userData, password: hashedPassword } });
    return createUserData;
  }

  public async deleteUser(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "User doesn't exist");

    const findUser: User = await this.users.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const deleteUserData = await this.users.delete({ where: { id: userId } });
    return deleteUserData;
  }

  public async addFavoriteBook(userId: number, bookId: number): Promise<User> {
    if (isEmpty(userId) || isEmpty(bookId)) throw new HttpException(400, "User doesn't exist");

    const findUser: User = await this.users.findUnique({ where: { id: userId }, include: { favoriteBooks: true } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    // If the user already has the book in favorites, remove it
    const favoriteBooks = findUser.favoriteBooks.map(book => book.id);
    if (favoriteBooks.includes(bookId)) {
      const removeFavoriteBook = await this.users.update({
        where: { id: userId },
        data: {
          favoriteBooks: {
            disconnect: {
              id: bookId,
            },
          },
        },
      });
      return removeFavoriteBook;
    }

    const addFavoriteBookData = await this.users.update({
      where: { id: userId },
      data: {
        favoriteBooks: {
          connect: { id: bookId },
        },
      },
    });

    return addFavoriteBookData;
  }
}

export default UserService;
