import { Controller, Post, Get, Delete, Body, UseGuards, Request, Param } from '@nestjs/common';
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async cancelReservation(@Request() req, @Param('id') reservationId: string) {
    return this.reservationsService.cancel(req.user.userId, reservationId);
  }
}
