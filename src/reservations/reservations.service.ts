import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import { User } from '../users/user.entity';
import { Concert } from '../concerts/concert.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationsRepository: Repository<Reservation>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Concert)
    private concertsRepository: Repository<Concert>,
  ) {}

  async create(userId: string, concertId: string): Promise<Reservation> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const concert = await this.concertsRepository.findOne({ where: { id: concertId } });

    if (!user || !concert) {
      throw new Error('User or concert not found');
    }

    if (user.points < concert.price) {
      throw new Error('Not enough points');
    }

    if (concert.seat_count <= 0) {
      throw new Error('No seats available');
    }

    user.points -= concert.price;
    concert.seat_count -= 1;

    await this.usersRepository.save(user);
    await this.concertsRepository.save(concert);

    const reservation = new Reservation();
    reservation.user = user;
    reservation.concert = concert;
    reservation.reservation_date = new Date();

    return this.reservationsRepository.save(reservation);
  }

  async cancel(userId: string, reservationId: string): Promise<void> {
    const reservation = await this.reservationsRepository.findOne({
      where: { id: reservationId, user: { id: userId } },
      relations: ['concert'],
    });

    if (!reservation) {
      throw new Error('Reservation not found');
    }

    const user = reservation.user;
    const concert = reservation.concert;

    user.points += concert.price;
    concert.seat_count += 1;

    await this.usersRepository.save(user);
    await this.concertsRepository.save(concert);
    await this.reservationsRepository.remove(reservation);
  }

  async findAllByUser(userId: string): Promise<Reservation[]> {
    return this.reservationsRepository.find({
      where: { user: { id: userId } },
      relations: ['concert'],
      order: { reservation_date: 'DESC' },
    });
  }
}
