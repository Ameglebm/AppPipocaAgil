import { IUserInsulinRepository }  from "../interface/userInsulinRepository.interface";
import { CreateUserInsulinDTO, GetUserInsulinDTO, PatchUserInsulinDTO, DeleteUserInsulinDTO } from "../dtos/userInsulinDTO";
import { UserInsulin } from "../userinsulin.module";
import { prisma } from "@/lib/prisma";
