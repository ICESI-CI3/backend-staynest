/* istanbul ignore next */
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

// clase de paginacion
export class PaginationDto {
    /* istanbul ignore next */
    @IsOptional()
    @IsPositive()
    @Type( () => Number ) // enableImplicitConversions: true
    limit?: number;
    /* istanbul ignore next */
    @IsOptional()
    @Min(0)
    @Type( () => Number ) // enableImplicitConversions: true
    offset?: number;
}