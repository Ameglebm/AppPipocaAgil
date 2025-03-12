import { UserInsulin } from '../userinsulin.module'
export interface UserInsulinService {
    postUserInsulin(data: any): Promise<void>
}

