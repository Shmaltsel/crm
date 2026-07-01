import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueStatusDto } from './dto/update-issue-status.dto';

@Controller('issues')
@UseGuards(AuthGuard)
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Post()
  create(@Body() body: CreateIssueDto) {
    return this.issuesService.create(body);
  }

  @Get()
  findByCityId(@Query('cityId') cityId: string) {
    return this.issuesService.findByCityId(cityId);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: UpdateIssueStatusDto) {
    return this.issuesService.updateStatus(id, body.status);
  }
}
