import { NextFunction, Request, Response } from 'express';
import TagsService from '@/services/tags.service';

class TagsController {
  public tagsService = new TagsService();

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tags = await this.tagsService.getAllTags();
      res.status(200).json({ data: tags, message: 'found' });
    } catch (error) {
      next(error);
    }
  };

  public getLatest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tags = await this.tagsService.getLatestTags();

      res.status(200).json({ data: tags, message: 'found' });
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tagId = Number(req.params.id);
      const tag = await this.tagsService.getTagById(tagId);

      res.status(200).json({ data: tag, message: 'found' });
    } catch (error) {
      next(error);
    }
  };
}

export default TagsController;
