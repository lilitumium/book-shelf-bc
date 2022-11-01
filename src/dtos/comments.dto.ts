import { IsString, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  public content: string;

  @IsNumber()
  public userId: number;

  @IsNumber()
  public bookId: number;
}
