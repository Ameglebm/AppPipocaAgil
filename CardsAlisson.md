# Código
## medicalRecord - Pressão arterial
### GET
#### controller
```
  @ApiOperation({ summary: 'Obter registro de pressão arterial do usuário por ID'})
  @ApiResponse({ status: 200, description: 'Registro encontrado'})
  @ApiResponse({ status: 400, description: 'Erro de validação'})
  @ApiResponse({ status: 404, description: 'Registro de pressão arterial não encontrado.'})
  @Get('pressaoArterial/:id')
  async getUserPressaoArterial(@Param() params: GetUserPressaoArterialDTO) {
    try {
      const data = await this.medicalRecordService.getUserPressaoArterial(params);

      return { data };
    } catch (error) {
      if (error instanceof Error && error.message === 'Registro de pressão arterial não encontrado.') {
        throw new NotFoundException(error.message);
      }

      console.error('Erro ao obter registro de pressão arterial:', error);
      throw new InternalServerErrorException('Erro interno do servidor');
    }
  }
```
ok
#### service
```
  async getUserPressaoArterial(params: GetUserPressaoArterialDTO): Promise<any | null> {
    const userId = parseInt(params.id, 10)
    const record = await this.medicalRecordRepository.getUserPressaoArterial(userId);
    
    if (record.length === 0) {
      throw new NotFoundException("Registro de pressão arterial do usuário não encontrado.");
    }

    return record;
  }
```
ok
#### repository
```
  async getUserPressaoArterial(userId: number): Promise<any | null> {
    return await prisma.user_Pressao_Arterial.findMany({ where: { userId } , orderBy: { createdAt:"desc" }});
  }
```
ok
#### DTO
```
export class GetUserPressaoArterialDTO {
  @ApiProperty({ example: 'number', description: 'ID do usuário' })
  @IsNumber({}, { message: 'ID do usuário deve ser um número'})
  id!: string;
}
```

#### service interface
```
  getUserPressaoArterial(userId: GetUserPressaoArterialDTO): Promise<any | null>;
```

#### repository interface
```
    getUserPressaoArterial(userId: number): Promise<any | null>;
```

### POST
#### controller
```
  @ApiOperation({ summary: 'Registrar pressão arterial do usuário' })
  @ApiResponse({ status: 201, description: 'Pressão arterial registrada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação'})
  @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
  @Post('pressaoArterial')
  async createUserPressaoArterial(@Body() dto: CreateUserPressaoArterialDTO) {
    try {
      await this.medicalRecordService.createUserPressaoArterial(dto);
    } catch (error) {
      console.error('Erro ao registrar pressão arterial:', error);
      throw new InternalServerErrorException('Erro interno do servidor');
    }
  }
```

#### service (possível erro aqui; esse serviço não está fazendo nada)
```
  async createUserPressaoArterial(data: CreateUserPressaoArterialDTO): Promise<void> {
    await this.medicalRecordRepository.createUserPressaoArterial(data);
  }
```

#### repository
```
  async createUserPressaoArterial(data: CreateUserPressaoArterialDTO): Promise<void> {
    await prisma.user_Pressao_Arterial.create({
      data: {
        userId: data.userId,
        sistolica: data.sistolica,
        diastolica: data.diastolica,
        date: data.date,
        time: data.time
      },
    });
  }
```

#### DTO
```
export class CreateUserPressaoArterialDTO {
  @ApiProperty({ example: '1', description: 'ID do usuário'})
  @IsNumber({}, { message: 'ID do usuário deve ser um número'})
  userId!: number
  
  @ApiProperty({ example: '10', description: 'Valor da pressão arterial sistólica'})
  @IsNumber({}, { message: 'Valor da pressão arterial sistólica deve ser um número'})
  sistolica!: number

  @ApiProperty({ example: '80', description: 'Valor da pressão arterial diastólica'})
  @IsNumber({}, { message: 'Valor da pressão arterial distólica deve ser um número'})
  diastolica!: number

  @ApiProperty({ example: 'AAAA/MM/DD', description: 'Data da aferição'})
  @IsString({ message: 'Valor da data deve ser uma string'})
  date!: string

  @ApiProperty({ example: '11:00', description: 'Hora da aferição'})
  @IsString({ message: 'O valor da hora deve ser uma string'})
  time!: string
}
```

#### service interface
```
  createUserPressaoArterial(data: CreateUserPressaoArterialDTO): Promise<void>;
```

#### repository interface
```
    createUserPressaoArterial(data: CreateUserPressaoArterialDTO): Promise<void>;
```

## userInsulin - Insulina
### GET
#### controller
```
    @ApiOperation({ summary: 'Ober registro de insulina'})
    @ApiResponse({ status: 200, description: 'Registro de insulina encontrado'})
    @ApiResponse({ status: 400, description: 'Erro de validação' })
    @ApiResponse({ status: 404, description: 'Registro de insulina não encontrado'})
    @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
    @Get(':userid')
    async getUserInsulin(@Param() params: GetUserInsulinDTO) {
        try {
            await this.userInsulinService.getUserInsulin(params);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error; 
            }
            console.error('Erro ao obter registro de insulina', error);
            throw new InternalServerErrorException('Erro interno do servidor');
        }
    }
```

#### service
```
    async getUserInsulin(params: GetUserInsulinDTO): Promise<any | null> {
        const userId = parseInt(params.id, 10);
        const record = await this.userInsulinRepository.getUserInsulin(userId);
    
        if (!record || record.length === 0) {
            throw new NotFoundException('Registro de insulina não encontrado');
        }
    
        return record;
```

#### repository
```
    async getUserInsulin(id: number): Promise<any | null> {
        return await prisma.user_insulina.findMany({
            where: {
                userId: id
            }
        })
    }
```

#### DTO
```
export class GetUserInsulinDTO{
    @ApiProperty({example: '1', description: 'ID do usuario'})
    @IsString({ message: 'O ID do usuario deve ser uma string'})
    id!: string
}
```

#### service interface
```
    getUserInsulin(data: GetUserInsulinDTO): Promise<any>;
```

#### repository interface
```
    getUserInsulin(id: number): Promise<any | null>;
```

### POST
#### controller
```
    @ApiOperation({ summary: 'Registrar administração de insulina'})
    @ApiResponse({ status: 201, description: 'Administração de insulina registrada com sucesso'})
    @ApiResponse({ status: 400, description: 'Erro de validação'})
    @ApiResponse({ status: 500, description: 'Erro interno no servidor'})
    @Post()
    async createUserInsulin(@Body() insulinDto: CreateUserInsulinDTO): Promise<void> {
        try {
            await this.userInsulinService.createUserInsulin(insulinDto);
        } catch (error) {
            console.error('Erro ao registrar administração de insulina:', error);
            throw new InternalServerErrorException('Erro interno no servidor');
        }
    }
```

#### service
```
    async createUserInsulin(data: CreateUserInsulinDTO): Promise<void> {
        await this.userInsulinRepository.createUserInsulin(data);
    }
```

#### repository
```
    async createUserInsulin(data: CreateUserInsulinDTO): Promise<void> {
        await prisma.user_insulina.create({
            data: {
                userId: data.userId,
                insulina: data.insulina, 
                dosagemQtd: data.dosagemQtd
            },
        });
    }
```

#### DTO
```
export class CreateUserInsulinDTO{
    @ApiProperty({ example: '1', description: 'ID do usuario' })
    @IsNumber( {}, {message: 'O ID do usuario deve ser number.' })
    userId!: number

    @ApiProperty({example: 'Insulina', description: 'Nome da insulina'})
    @IsString({ message: 'O nome da insulina deve ser uma string' })
    @IsNotEmpty()
    insulina!: string

    @ApiProperty({example: 'Dosagem', description: 'dosagem da insulina'})
    @IsNumber({}, {message: 'A dosagem deve ser um numero'})
    @IsNotEmpty()
    dosagemQtd!: number
}
```

#### service interface
```
    createUserInsulin(data: CreateUserInsulinDTO): Promise<void>;
```

#### repository interface
```
    createUserInsulin(data: CreateUserInsulinDTO): Promise<void>;
```

### PATCH
#### controller
```
    @ApiOperation({ summary: 'Atualizar registro de insulina'})
    @ApiResponse({ status: 200, description: 'Registro de insulina atualizado com sucesso'})
    @ApiResponse({ status: 400, description: 'Erro de validação'})
    @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
    @Patch()
        async patchUserInsulin(@Body() patchUserInsulin: PatchUserInsulinDTO) {
            try {
                await this.userInsulinService.patchUserInsulin(patchUserInsulin);
            } catch (error) {
                if (error instanceof NotFoundException) {
                    throw error;
                }

                console.error('Erro ao atualizar registro de insulina:', error);
                throw new InternalServerErrorException('Erro interno do servidor');
            }
        }
```

#### service
```
    async patchUserInsulin(data: PatchUserInsulinDTO): Promise<void> {
        const { userId } = data;
        const record = await this.userInsulinRepository.getUserInsulin(userId);
        if (!record) {
            throw new NotFoundException(`Registro de insulina não encontrado`);
        }
        await this.userInsulinRepository.patchUserInsulin(data);
    }
```

#### repository
```
    async patchUserInsulin(data: PatchUserInsulinDTO): Promise<void> {
        const { id, userId } = data; 
        await prisma.user_insulina.update({
            where: { 
              id,
              userId
            },
            data: { 
              dosagemQtd: data.dosagemQtd
            }
        });
    }
```

#### DTO
```
export class PatchUserInsulinDTO{
    @ApiProperty({ example: '1', description: 'ID do registro'})
    @IsNumber({}, {message: 'O ID do registro deve ser um numero'}) 
    id!: number

    @ApiProperty({ example: '1', description: 'ID do usuario'})
    @IsNumber({}, {message: 'O ID do usuario deve ser um numero'}) 
    userId!: number

    @ApiProperty({ example: 'Dosagem', description: 'Dosagem da insulina'})
    @IsNumber({}, {message: 'A dosagem deve ser um numero'})
    dosagemQtd!: number

}
```

#### service interface
```
    patchUserInsulin(data: PatchUserInsulinDTO): Promise<void>;
```

#### repository interface
```
    patchUserInsulin(data: PatchUserInsulinDTO): Promise<void>;
```

### DELETE
#### controller
```
         @ApiOperation({ summary: 'Deletar registro de insulina'})
         @ApiResponse({ status: 200, description: 'Registro de insulina deletado com sucesso'})
         @ApiResponse({ status: 400, description: 'Erro de validação'})
         @ApiResponse({ status: 404, description: 'Registro de insulina não encontrado'})
         @ApiResponse({ status: 500, description: 'Erro interno do servidor'})
         @Delete(':userId/:id')
         async deleteUserInsulin(@Param() params: DeleteUserInsulinDTO){
            try {
                await this.userInsulinService.deleteUserInsulin(params)
            } catch (error) {
                if (error instanceof Error && error.message === 'Registro de insulina não encontrado') {
                    throw new NotFoundException(error.message)
                }

                console.error('Erro ao deletar registro de insulina', error)
                throw new InternalServerErrorException (
                    'Erro interno do servidor')
            }
         }
    }
```

#### service
```
    async deleteUserInsulin(params: DeleteUserInsulinDTO): Promise<void> {
        const userId = parseInt(params.userId, 10)
        const id = parseInt(params.id, 10)

        await this.userInsulinRepository.deleteUserInsulin(userId, id);
    }
```

#### repository
```
    async deleteUserInsulin(id: number, userId: number): Promise<void> {
        await prisma.user_insulina.delete({
            where: {
                id,
                userId
            }
        });
    }
}
```

#### DTO
```
export class DeleteUserInsulinDTO{
    @ApiProperty({ example: '1', description: 'ID da insulina'})
    @IsString({ message: 'O ID deve ser uma string'})
    id!: string

    @ApiProperty({example: '1', description: 'ID do usuário'})
    @IsString({message: 'O ID do usuário deve ser uma string'})
    userId!: string
}
```

#### service interface
```
    deleteUserInsulin(params: DeleteUserInsulinDTO): Promise<void>;
```

#### repository interface
```
    deleteUserInsulin(id: number, userId: number): Promise<void>;
```