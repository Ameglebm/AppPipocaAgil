import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInsulinDTO, GetUserInsulinDTO, PatchUserInsulinDTO, DeleteUserInsulinDTO } from '../dtos/userInsulinDTO';
import { IUserInsulinRepository } from '../interface/userInsulinRepository.interface';
import { IUserInsulinService } from '../interface/userInsulinService.interface';


export class UserinsulinService implements IUserInsulinService{
    constructor(
        @Inject('IUserInsulinRepository') private readonly userInsulinRepository: IUserInsulinRepository,
    ) {}
    
    async createUserInsulin(data: CreateUserInsulinDTO): Promise<void> {
        await this.userInsulinRepository.createUserInsulin(data);
    }
    
    async getUserInsulin(params: GetUserInsulinDTO): Promise<any | null> {
        const userId = params.userId;
        const record = await this.userInsulinRepository.getUserInsulinByUserId(userId);
    
        if (!record) {
            throw new NotFoundException("Registro de insulina não encontrado.");
        }
        return record;
    }
    
    
    async patchUserInsulin(data: PatchUserInsulinDTO): Promise<void> {
        await this.userInsulinRepository.patchUserInsulin(data);
    }
    
    async deleteUserInsulin(params: DeleteUserInsulinDTO): Promise<void> {
        await this.userInsulinRepository.deleteUserInsulin(params);
    }
}


