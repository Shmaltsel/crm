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
import { AssignCrewDto } from './dto/assign-crew.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { EventQueryDto } from './dto/event-query.dto';
import { Throttle } from '@nestjs/throttler';
import { RolesGuard } from '../auth/guards/roles.guard';
import { OwnershipGuard } from '../auth/guards/ownership.guard';
import { CheckOwnership } from '../auth/decorators/check-ownership.decorator';

@Controller('events')
@UseGuards(AuthGuard, RolesGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll(@CurrentUser() user: JwtUser, @Query() query: EventQueryDto) {
    return this.eventsService.findAllForUser(user, query);
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
  @UseGuards(OwnershipGuard)
  @CheckOwnership('event')
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
  @UseGuards(OwnershipGuard)
  @CheckOwnership('event')
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
  @UseGuards(OwnershipGuard)
  @CheckOwnership('event')
  assignCrew(@Param('id') id: string, @Body() body: AssignCrewDto) {
    return this.eventsService.assignCrewToEvent(id, body.crewId);
  }

  @Post(':id/history')
  addHistoryComment(
    @Param('id') id: string,
    @Body() body: AddCommentDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.eventsService.addHistoryComment(id, body.comment, user);
  }

  @Patch('history/:historyId')
  updateHistoryComment(
    @Param('historyId') historyId: string,
    @Body() body: AddCommentDto,
  ) {
    return this.eventsService.updateHistoryComment(historyId, body.comment);
  }

  @Delete(':id')
  @UseGuards(OwnershipGuard)
  @CheckOwnership('event')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @Post(':id/report')
  @Throttle({ default: { ttl: 60000, limit: 10 } })
  @UseGuards(OwnershipGuard)
  @CheckOwnership('event')
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
  @UseGuards(OwnershipGuard)
  @CheckOwnership('event')
  reschedule(
    @Param('id') id: string,
    @Body() body: RescheduleEventDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.eventsService.rescheduleEvent(id, body.date, body.time, user);
  }
}
