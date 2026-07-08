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
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import { IssuesService } from './issues.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueStatusDto } from './dto/update-issue-status.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Issues')
@ApiCookieAuth('access_token')
@Controller('issues')
@UseGuards(AuthGuard, RolesGuard)
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @ApiOperation({ summary: 'Створити проблему по заходу' })
  @Roles('SUPERADMIN', 'MANAGER')
  @Post()
  create(@Body() body: CreateIssueDto) {
    return this.issuesService.create(body);
  }

  @ApiOperation({ summary: 'Список проблем по місту' })
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  @Get()
  findByCityId(@Query('cityId') cityId: string) {
    return this.issuesService.findByCityId(cityId);
  }

  @ApiOperation({ summary: 'Оновити статус проблеми' })
  @Roles('SUPERADMIN', 'MANAGER')
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: UpdateIssueStatusDto) {
    return this.issuesService.updateStatus(id, body.status);
  }
}
