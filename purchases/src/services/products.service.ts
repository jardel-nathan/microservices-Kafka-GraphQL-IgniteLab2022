import { Injectable } from "@nestjs/common";
import slugify from "slugify";
import { PrismaService } from '../database/prisma/prisma.service';

interface CreateProductParams{
  title: string;
}

@Injectable()
export class ProductsService {
 
  constructor(private prisma: PrismaService) {}

  listAllProducts() {
    return this.prisma.product.findMany();
  }

  getProductById(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async createProduct({ title }: CreateProductParams) {
    const slug = slugify(title, {
      lower: true,
    });

    const productWithSameSlug = await this.prisma.product.findUnique({ // verifica se ja existe um produto com o mesmo slug
      where: {
        slug,
      },
    });

    if (productWithSameSlug) {
      throw new Error('Another product with same slug already exists.');
    }

    return this.prisma.product.create({ // cria o produto no banco de dados
      data: {
        title,
        slug,
      },
    });
  }
 
}