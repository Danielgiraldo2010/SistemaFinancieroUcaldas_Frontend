import { apiClient } from '../../http/ApiClient';
import { ISecurityRepository } from '@/core/domain/interfaces';
import {
  IpBlackList, BlockIpCommand, UnblockIpCommand,
  UnlockAccountCommand, Result,
} from '@/core/domain/types';

const BASE = '/api/Security';

export class SecurityService implements ISecurityRepository {
  async getBlockedIps(activeOnly = true): Promise<IpBlackList[]> {
    return apiClient.get<IpBlackList[]>(`${BASE}/blocked-ips`, { activeOnly });
  }

  async blockIp(command: BlockIpCommand): Promise<Result> {
    return apiClient.post<Result>(`${BASE}/block-ip`, command);
  }

  async unblockIp(command: UnblockIpCommand): Promise<Result> {
    return apiClient.post<Result>(`${BASE}/unblock-ip`, command);
  }

  async unlockAccount(command: UnlockAccountCommand): Promise<Result> {
    return apiClient.post<Result>(`${BASE}/unlock-account`, command);
  }
}

export const securityService = new SecurityService();
