import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCookieAuth,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma/prisma.service';
import { IsOptional, IsString } from 'class-validator';

class ProjectStatsQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cityId?: string;
}

@ApiTags('Projects')
@ApiCookieAuth('access_token')
@Controller('projects')
@UseGuards(AuthGuard, RolesGuard)
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly prisma: PrismaService,
  ) {}

  @ApiOperation({ summary: 'Список проєктів (типів шоу)' })
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @ApiOperation({ summary: 'Отримати проєкт за ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @ApiOperation({ summary: 'Статистика проєкту' })
  @Get(':id/stats')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async getStats(
    @Param('id') id: string,
    @Query() query: ProjectStatsQueryDto,
    @CurrentUser() user: JwtUser,
  ) {
    let effectiveCityId: string | undefined = query.cityId;
    if (user.role === 'MANAGER') {
      const me = await this.prisma.user.findUnique({
        where: { id: user.sub },
        select: { cityId: true },
      });
      effectiveCityId = me?.cityId ?? undefined;
    }
    return this.projectsService.getStats(id, effectiveCityId);
  }

  @ApiOperation({ summary: 'Створити проєкт' })
  @Post()
  @Roles('SUPERADMIN')
  create(@Body() body: CreateProjectDto) {
    return this.projectsService.create(body);
  }

  @ApiOperation({ summary: 'Оновити проєкт' })
  @Patch(':id')
  @Roles('SUPERADMIN')
  update(@Param('id') id: string, @Body() body: UpdateProjectDto) {
    return this.projectsService.update(id, body);
  }

  @ApiOperation({ summary: 'Видалити проєкт' })
  @Delete(':id')
  @Roles('SUPERADMIN')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
