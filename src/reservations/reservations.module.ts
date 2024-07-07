import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { Reservation } from './reservation.entity';
import { User } from '../users/user.entity';
import { Concert } from '../concerts/concert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, User, Concert])],
  providers: [ReservationsService],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
