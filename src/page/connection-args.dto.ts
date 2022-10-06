import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class ConnectionArgsDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  first: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  last: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  after: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  before: string;
}
