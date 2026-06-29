import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { CreateEventDto } from './dto/create-event.dto';
import { SubmitReportDto } from './dto/submit-report.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdatePreparationDto } from './dto/update-preparation.dto';
import { RescheduleEventDto } from './dto/reschedule-event.dto';

@Controller('events')
@UseGuards(AuthGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // Список подій для поточного користувача.
  // Для водіїв/ведучих повертаються лише ті події, де вони у складі екіпажу.
  // Для менеджерів/адмінів — усі події.
  @Get()
  findAll(@CurrentUser() user: JwtUser) {
    return this.eventsService.findAllForUser(user);
  }

  @Post()
  create(@Body() body: CreateEventDto, @CurrentUser() user: JwtUser) {
    return this.eventsService.create(body, user);
  }

  @Get('school/:schoolId')
  findBySchool(
    @Param('schoolId') schoolId: string,
    @Query('minimal') minimal?: string,
  ) {
    return this.eventsService.findBySchool(schoolId, minimal === 'true');
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: UpdateStatusDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.eventsService.updateStatus(
      id,
      body.status,
      body.actionName,
      body.comment,
      user,
    );
  }

  @Patch(':id/preparation')
  updatePreparation(
    @Param('id') id: string,
    @Body() body: UpdatePreparationDto,
  ) {
    return this.eventsService.updatePreparationStatus(
      id,
      body.field,
      body.status,
    );
  }

  @Post(':id/assign-crew')
  assignCrew(
    @Param('id') id: string,
    @Body() body: { crewId: string }, // ЗМІНЕНО
  ) {
    return this.eventsService.assignCrewToEvent(id, body.crewId);
  }

  @Post(':id/history')
  addHistoryComment(
    @Param('id') id: string,
    @Body() body: { comment: string },
    @CurrentUser() user: JwtUser,
  ) {
    return this.eventsService.addHistoryComment(id, body.comment, user);
  }

  // Маршрут для оновлення коментаря
  @Patch('history/:historyId')
  updateHistoryComment(
    @Param('historyId') historyId: string,
    @Body() body: { comment: string },
  ) {
    return this.eventsService.updateHistoryComment(historyId, body.comment);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @Post(':id/report')
  submitReport(
    @Param('id') id: string,
    @Body() body: SubmitReportDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.eventsService.submitReport(id, body, user);
  }

  @Get('school/:schoolId/completed')
  findCompletedBySchool(@Param('schoolId') schoolId: string) {
    return this.eventsService.findCompletedBySchool(schoolId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id/reschedule')
  reschedule(
    @Param('id') id: string,
    @Body() body: RescheduleEventDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.eventsService.rescheduleEvent(id, body.date, body.time, user);
  }
}
