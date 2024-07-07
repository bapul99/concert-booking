import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body('concertId') concertId: string) {
    return this.reservationsService.create(req.user.userId, concertId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllByUser(@Request() req) {
    return this.reservationsService.findAllByUser(req.user.userId);
  }
}
