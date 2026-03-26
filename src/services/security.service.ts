import { apiClient } from '@/lib';
import { endpoints } from '@/config';
import {
  ISecurityRepository,
  IpBlackList,
  BlockIpCommand,
  UnblockIpCommand,
  UnlockAccountCommand,
  ChangePasswordCommand,
  Result,
} from '@/core';

export class SecurityService implements ISecurityRepository {
  async getBlockedIps(activeOnly = true): Promise<IpBlackList[]> {
    return apiClient.get<IpBlackList[]>(endpoints.security.blockedIps, { activeOnly });
  }

  async blockIp(command: BlockIpCommand): Promise<Result> {
    return apiClient.post<Result>(endpoints.security.blockIp, command);
  }

  async unblockIp(command: UnblockIpCommand): Promise<Result> {
    return apiClient.post<Result>(endpoints.security.unblockIp, command);
  }

  async unlockAccount(command: UnlockAccountCommand): Promise<Result> {
    return apiClient.post<Result>(endpoints.security.unlockAccount, command);
  }

  async changePassword(command: ChangePasswordCommand): Promise<Result> {
    return apiClient.post<Result>(endpoints.security.changePassword, command);
  }
}

export const securityService = new SecurityService();
