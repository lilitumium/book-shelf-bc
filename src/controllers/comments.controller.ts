import { NextFunction, Request, Response } from 'express';
import { CreateCommentDto } from '@/dtos/comments.dto';
import CommentsService from '@/services/comments.service';

class CommentsController {
  public commentsService = new CommentsService();

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const comments = await this.commentsService.getAllComments();

      res.status(200).json({ data: comments, message: 'found' });
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const commentId = Number(req.params.id);
      const comment = await this.commentsService.getCommentById(commentId);

      res.status(200).json({ data: comment, message: 'found' });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const commentData: CreateCommentDto = req.body;

      const comment = await this.commentsService.createComment(commentData);
      res.status(201).json({ data: comment, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}

export default CommentsController;
