import { IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  public title: string;

  @IsString()
  public authors: string;

  @IsString()
  public categories: string;

  @IsString()
  public thumbnail: string;

  @IsString()
  public published: string;
}
