import { ConnectionArgsDto } from './../page/connection-args.dto';
import { ProductEntity } from './entities/product.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Page } from 'src/page/page.dto';
import { ApiPageResponse } from 'src/page/api-page-response';
import { Public } from 'src/auth/public.decorator';

@Controller('products')
@ApiTags('products')
@ApiExtraModels(Page)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ProductEntity })
  async create(@Body() createProductDto: CreateProductDto) {
    return new ProductEntity(
      await this.productsService.create(createProductDto),
    );
  }

  @Get()
  @Public()
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  async findAll() {
    const products = await this.productsService.findAll();
    return products.map((product) => new ProductEntity(product));
  }

  @Get('page')
  @Public()
  @ApiPageResponse(ProductEntity)
  async findPage(@Query() connectionArgs: ConnectionArgsDto) {
    return await this.productsService.findPage(connectionArgs);
  }

  @Get('drafts')
  @ApiBearerAuth()
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  async findDrafts() {
    const drafts = await this.productsService.findDrafts();
    return drafts.map((product) => new ProductEntity(product));
  }

  @Get(':id')
  @Public()
  @ApiOkResponse({ type: ProductEntity })
  async findOne(@Param('id') id: string) {
    return new ProductEntity(await this.productsService.findOne(id));
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ProductEntity })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return new ProductEntity(
      await this.productsService.update(id, updateProductDto),
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: ProductEntity })
  async remove(@Param('id') id: string) {
    return new ProductEntity(await this.productsService.remove(id));
  }
}
