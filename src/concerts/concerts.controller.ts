import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ConcertsService } from './concerts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('concerts')
export class ConcertsController {
  constructor(private concertsService: ConcertsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async create(@Body() concert: any) {
    return this.concertsService.create(concert);
  }

  @Get()
  async findAll() {
    return this.concertsService.findAll();
  }

  @Get('search')
  async search(@Param('name') name: string) {
    return this.concertsService.searchByName(name);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.concertsService.findOne(id);
  }
}
