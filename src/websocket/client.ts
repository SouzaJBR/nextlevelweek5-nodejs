import { io } from '../http';
import { ConnectionService } from '../services/ConnectionService';
import { MessagesService } from '../services/MessagesService';
import { UsersService } from '../services/UsersService';

interface IParams {
    text: string;
    email: string;
}

io.on('connect', (socket) => {

    const connectionService = new ConnectionService();
    const usersService = new UsersService();
    const messagesService = new MessagesService();

    socket.on('client_first_access', async ({email, text}: IParams) => {
        
        const socket_id = socket.id;
        const user_id = (await usersService.create(email)).id;

        const connection = await connectionService.findByUserId(user_id);

        if(!connection)
            await connectionService.create({
                socket_id,
                user_id
            });
        else {
            connection.socket_id = socket_id;
            await connectionService.create(connection);
        }

        await messagesService.create({
            user_id,
            text
        });
    });
});