import { ProductEntity } from './entities/product.entity';
import { ConnectionArgsDto } from './../page/connection-args.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Page } from 'src/page/page.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({ data: createProductDto });
  }

  findAll() {
    return this.prisma.product.findMany({ where: { published: true } });
  }

  async findPage(connectionArgs: ConnectionArgsDto) {
    const where: Prisma.ProductWhereInput = { published: true };
    const page = await findManyCursorConnection(
      (args) => {
        return this.prisma.product.findMany({ ...args, where });
      },
      () => this.prisma.product.count({ where }),
      connectionArgs,
      {
        recordToEdge: (record) => ({
          node: new ProductEntity(record),
        }),
      },
    );

    return new Page<ProductEntity>(page);
  }

  findDrafts() {
    return this.prisma.product.findMany({ where: { published: false } });
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}
