import { Injectable } from '@nestjs/common';
import { Inject, NotFoundException } from '@nestjs/common';
import { CreateUserInsulinDTO, GetUserInsulinDTO, PatchInsulinDTO, DeleteInsulinDTO, } from '../dtos/userInsulinDTO';
import { IUserInsulinRepository } from '../interface/userInsulinRepository.interface';
import { IUserInsulinService } from '../interface/userInsulinService.interface';

@Injectable()
export class UserinsulinService implements IUserInsulinService{
    constructor(
        @Inject('IUserInsulinRepository') private readonly userInsulinRepository: IUserInsulinRepository,
    ) {}
    
    async createUserInsulin(data: CreateUserInsulinDTO): Promise<void> {
        await this.userInsulinRepository.createUserInsulin(data);
    }
    // FINALIZADO
    async getUserInsulin(params: GetUserInsulinDTO): Promise<any | null> {
        const userId = parseInt(params.userId, 10);
        const record = await this.userInsulinRepository.getUserInsulin(userId);
    
        if (!record || record.length === 0) {
            throw new NotFoundException('Registro de insulina não encontrado.');
        }
    
        return record;
    }
    // FINALIZADO
    async patchUserInsulin(data: PatchInsulinDTO): Promise<void> {
        console.log(data)
        const { userId } = data;
        const record = await this.userInsulinRepository.getUserInsulin(Number(userId));
        if (!record) {
            throw new NotFoundException(`Registro de insulina não encontrado.`);
        }
        await this.userInsulinRepository.patchUserInsulin(data);
    }
    // FINALIZADO
    async deleteUserInsulin(params: DeleteInsulinDTO): Promise<void> {

        const record = await this.userInsulinRepository.getUserInsulin(Number(params.userId));
        if (!record) {
            throw new NotFoundException(`Registro de insulina não encontrado.`);
        }

        await this.userInsulinRepository.deleteUserInsulin(params);
    }
}
