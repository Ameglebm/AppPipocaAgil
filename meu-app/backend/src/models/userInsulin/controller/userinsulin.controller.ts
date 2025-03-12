import { AuthGuard } from '@/middlewares/auth.guard';
import { Controller, Post, Get, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiTags('userInsulin')
@Controller('userInsulin')

export class UserinsulinController {}