import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConcertsService } from './concerts.service';
import { ConcertsController } from './concerts.controller';
import { Concert } from './concert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Concert])],
  providers: [ConcertsService],
  controllers: [ConcertsController],
})
export class ConcertsModule {}
