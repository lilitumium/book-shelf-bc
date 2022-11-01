import { Comment, PrismaClient } from '@prisma/client';
import { CreateCommentDto } from '@/dtos/comments.dto';
import { HttpException } from '@/exceptions/HttpException';

class CommentsService {
  public comments = new PrismaClient().comment;

  public async getAllComments(): Promise<Array<Comment>> {
    const comments = await this.comments.findMany();

    return comments;
  }

  public async getCommentById(id: number): Promise<Comment> {
    const comment = await this.comments.findUnique({ where: { id } });

    if (!comment) throw new HttpException(409, 'Comment not found');

    return comment;
  }

  public async createComment(commentData: CreateCommentDto): Promise<Comment> {
    const comment = await this.comments.create({ data: commentData });

    return comment;
  }
}

export default CommentsService;
