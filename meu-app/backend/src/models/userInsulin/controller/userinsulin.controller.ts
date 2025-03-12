import { AuthGuard } from '@/middlewares/auth.guard';
import { Controller, Post, Get, Patch, Delete, UseGuards, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiTags('userInsulin')
@Controller('userInsulin')

export class UserinsulinController { 
    constructor (@Inject('IUserInsulinService') private readonly userInsulinService: IUserInsulinService) {} }