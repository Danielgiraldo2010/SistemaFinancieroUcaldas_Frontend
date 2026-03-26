import {
  IpBlackList, BlockIpCommand, UnblockIpCommand,
  UnlockAccountCommand, ChangePasswordCommand,
} from './security.types';
import { Result } from './common.types';

export interface ISecurityRepository {
  getBlockedIps(activeOnly?: boolean): Promise<IpBlackList[]>;
  blockIp(command: BlockIpCommand): Promise<Result>;
  unblockIp(command: UnblockIpCommand): Promise<Result>;
  unlockAccount(command: UnlockAccountCommand): Promise<Result>;
  changePassword(command: ChangePasswordCommand): Promise<Result>;
}
