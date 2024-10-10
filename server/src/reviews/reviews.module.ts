import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsService } from './reviews.service';
import Review from './entity/reviews.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Review
    ])
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService]
})
export class ReviewsModule {}
