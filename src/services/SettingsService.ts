import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

class SettingsService {

    private settingsRepository: Repository<Setting>;

    async create({chat, username}: ISettingsCreate) {

        const userAlreadyExists = this.settingsRepository.findOne({username: username});
        
        if(userAlreadyExists)
            throw new Error("User already exists!");
    
        const settings = this.settingsRepository.create({
            chat,
            username
        });
    
        await this.settingsRepository.save(settings);
    
        return settings;
    }

    async findByUsername(username: string) {
        const settings = this.settingsRepository.findOne({username});
        return settings;
    }

    constructor() {
        this.settingsRepository = getCustomRepository(SettingsRepository);
    }
}

export {SettingsService}