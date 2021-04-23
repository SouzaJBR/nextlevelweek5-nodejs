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

        const userAlreadyExists = await this.settingsRepository.findOne({username: username});
        
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
        const settings = await this.settingsRepository.findOne({username});
        return settings;
    }

    async update(username: string, chat: boolean) {
        await this.settingsRepository.createQueryBuilder()
            .update(Setting)
            .set({chat})
            .where({username})
            .execute();
    }
    constructor() {
        this.settingsRepository = getCustomRepository(SettingsRepository);
    }
}

export {SettingsService}