import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProductService } from './shared/product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
    ApiBody,
    ApiConflictResponse,
    ApiOkResponse,
    ApiOperation,
} from '@nestjs/swagger';
import { Product } from './entities/product.entity';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: 'Create a new product',
    })
    @ApiConflictResponse({
        status: 409,
        description: 'Product already exists with this name',
    })
    @ApiOkResponse({ type: CreateProductDto, isArray: true })
    @ApiBody({ type: CreateProductDto })
    async create(@Body() product: CreateProductDto): Promise<Product> {
        return this.productService.createProduct(product);
    }

    @Get()
    @ApiOperation({
        summary: 'Get all products of database',
    })
    @ApiOkResponse({ type: Product, isArray: true })
    async getAll(): Promise<Product[]> {
        return await this.productService.getAllProducts();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Find a specified product',
    })
    @ApiOkResponse({
        status: 200,
        description: 'Product found',
        type: Product,
    })
    async getOne(@Param('id') id: string): Promise<Product> {
        return this.productService.getProductById(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: 'Update a specified product',
    })
    @ApiBody({ type: UpdateProductDto })
    async update(
        @Param('id') id: string,
        @Body() product: UpdateProductDto,
    ): Promise<Product> {
        return this.productService.updateProduct(id, { ...product });
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: 'Delete a specified product',
    })
    @ApiOkResponse({
        status: 200,
        description: 'Product deleted',
        type: Product,
    })
    async delete(@Param('id') id: string): Promise<Product> {
        return this.productService.deleteProduct(id);
    }
}
