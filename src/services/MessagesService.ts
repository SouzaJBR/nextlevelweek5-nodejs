import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";
import { MessagesRepository } from "../repositories/MessagesRepository";

interface IMessageCreate {
    admin_id: string;
    user_id: string;
    text: string;
}

class MessagesService {
    private messagesRepository: Repository<Message>;

    async create({ admin_id, user_id, text }: IMessageCreate) {

        const message = this.messagesRepository.create({ admin_id, user_id, text });

        await this.messagesRepository.save(message);

        return message;
    }

    async listByUser(user_id: string) {

        const messages = await this.messagesRepository.find({
            where: { user_id },
            relations: ["user"],
        });

        return messages;
    }

    constructor() {
        this.messagesRepository = getCustomRepository(MessagesRepository);
    }
}

export { MessagesService };