import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() body: any) {
    return this.eventsService.create(body);
  }

  @Get('school/:schoolId')
  findBySchool(@Param('schoolId') schoolId: string) {
    return this.eventsService.findBySchool(schoolId);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: string, actionName: string, comment?: string }) {
    return this.eventsService.updateStatus(id, body.status, body.actionName, body.comment);
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
  

}
