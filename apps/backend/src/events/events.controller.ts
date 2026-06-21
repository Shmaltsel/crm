import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { CreateEventDto } from './dto/create-event.dto';
import { SubmitReportDto } from './dto/submit-report.dto';

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
  findBySchool(@Param('schoolId') schoolId: string) {
    return this.eventsService.findBySchool(schoolId);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: string; actionName: string; comment?: string },
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
    @Body() body: { field: string; status: string },
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
    @Body() body: { hostId: string; driverId: string; cityId: string },
  ) {
    return this.eventsService.assignCrewToEvent(
      id,
      body.cityId,
      body.hostId,
      body.driverId,
    );
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }
}
