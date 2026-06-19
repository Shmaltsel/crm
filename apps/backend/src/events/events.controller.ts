import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { EventsService } from './events.service';
import { AuthGuard } from '../auth/auth.guard'; // Додаємо імпорт

@Controller('events')
@UseGuards(AuthGuard) // Захищаємо всі маршрути подій і читаємо токен
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() body: any, @Request() req) {
    return this.eventsService.create(body, req.user); // Передаємо req.user
  }

  @Get('school/:schoolId')
  findBySchool(@Param('schoolId') schoolId: string) {
    return this.eventsService.findBySchool(schoolId);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: string, actionName: string, comment?: string }, @Request() req) {
    return this.eventsService.updateStatus(id, body.status, body.actionName, body.comment, req.user); // Передаємо req.user
  }

  @Patch(':id/preparation')
  updatePreparation(@Param('id') id: string, @Body() body: { field: string, status: string }) {
    return this.eventsService.updatePreparationStatus(id, body.field, body.status);
  }

  @Post(':id/assign-crew')
  assignCrew(@Param('id') id: string, @Body() body: { hostId: string, driverId: string, cityId: string }) {
    return this.eventsService.assignCrewToEvent(id, body.cityId, body.hostId, body.driverId);
  }

  // Маршрут для оновлення коментаря
  @Patch('history/:historyId')
  updateHistoryComment(@Param('historyId') historyId: string, @Body() body: { comment: string }) {
    return this.eventsService.updateHistoryComment(historyId, body.comment);
  }

 @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @Post(':id/report')
    @UseGuards(AuthGuard)
    submitReport(@Param('id') id: string, @Body() body: any, @Request() req) {
      return this.eventsService.submitReport(id, body, req.user);
    }
      

}
