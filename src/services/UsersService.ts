import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UserRepository"

class UsersService {

    private usersRepository: Repository<User>;

    async create(email: string) {
        const userExists = await this.usersRepository.findOne({email});

        if(userExists)
            return userExists;

        const user = this.usersRepository.create({email});

        await this.usersRepository.save(user);

        return user;
    }

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository);
    }
}

export {UsersService}