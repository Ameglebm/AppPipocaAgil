import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInsulinDTO, GetUserInsulinDTO, PatchUserInsulinDTO, DeleteUserInsulinDTO } from '../dtos/userInsulinDTO';

@Injectable()
export class UserinsulinService {
    constructor(
        @Inject('IUserInsulinRepository') private readonly userInsulinRepository: IUserInsulinRepository) {}

        async createUserInsulin(data: CreateUserInsulinDTO): Promise<void> {

            
        }

}

