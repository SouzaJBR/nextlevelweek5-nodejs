import {EntityRepository, Repository} from 'typeorm';
import { Setting } from '../entites/Setting';

@EntityRepository(Setting)
class SettingsRepository extends Repository<Setting> {

}

export {SettingsRepository}