import { UserRepository } from './repositories/userRepository';
import { AuthRepository } from './repositories/authRepository';
import { AuthService } from './services/authService';
import { UserService } from './services/userService';

const userRepository = new UserRepository();
const authRepository = new AuthRepository();

const authService = new AuthService(userRepository, authRepository);
const userService = new UserService(userRepository);

export { authService };
export { userService };