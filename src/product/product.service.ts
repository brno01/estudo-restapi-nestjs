import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async getAllProducts(): Promise<Product[]> {
        const products = await this.productRepository.find();
        if (!products) {
            throw new InternalServerErrorException(
                'Não foi possível buscar todos os produtos',
            );
        }
        return products;
    }

    async getProductById(id: string): Promise<Product> {
        const checkProduct = await this.productRepository.findOne({
            where: { id },
        });
        if (!checkProduct) {
            throw new NotFoundException('Produto não encontrado no sistema');
        }
        return checkProduct;
    }

    async createProduct(product: CreateProductDto): Promise<Product> {
        const checkProduct = await this.productRepository.findOneBy({
            name: product.name,
        });
        if (checkProduct) {
            throw new ConflictException('Produto já existe no sistema');
        }
        const productSaved = this.productRepository
            .create({ ...product })
            .save();
        if (!productSaved) {
            throw new InternalServerErrorException(
                'Não foi possível criar produto',
            );
        }
        return productSaved;
    }

    async updateProduct(
        id: string,
        product: UpdateProductDto,
    ): Promise<Product> {
        const checkProduct = await this.productRepository.findOne({
            where: { id },
        });
        if (!checkProduct) {
            throw new NotFoundException('Produto não encontrado no sistema');
        }
        const productUpdated = await this.productRepository
            .create({
                id,
                ...product,
            })
            .save();
        if (!productUpdated) {
            throw new InternalServerErrorException(
                'Não foi possível atualizar produto',
            );
        }
        const productSaved = await this.productRepository.findOne({
            where: { id },
        });
        return productSaved;
    }

    async deleteProduct(id: string): Promise<Product> {
        const checkProduct = await this.productRepository.findOne({
            where: { id },
        });
        if (!checkProduct) {
            throw new NotFoundException('Produto não encontrado no sistema');
        }
        const productDeleted = await this.productRepository.delete({
            id,
        });
        if (!productDeleted) {
            throw new InternalServerErrorException(
                'Não foi possível deletar produto',
            );
        }
        if (productDeleted) {
            throw new NotFoundException(
                'Produto removido do sistema com sucesso',
            );
        }
        return checkProduct;
    }
}
