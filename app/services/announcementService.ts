import { api } from './api/api';
import type { ApiResponse } from 'apisauce';
import type { AxiosError } from 'axios';

export interface Company {
  id: number;
  name: string;
  description: string;
  logo: string;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  company: Company;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAnnouncementDto {
  title: string;
  content: string;
  companyId: number;
}

export interface UpdateAnnouncementDto {
  title?: string;
  content?: string;
  companyId?: number;
}

class AnnouncementService {
  private async ensureAuth() {
    await api.setupAuth();
  }

  async getAnnouncements(): Promise<ApiResponse<Announcement[]>> {
    try {
      await this.ensureAuth();
      return await api.apisauce.get<Announcement[]>('api/announcements');
    } catch (error) {
      return {
        ok: false,
        problem: 'NETWORK_ERROR',
        data: [],
        originalError: error as AxiosError,
      };
    }
  }

  async getAnnouncementById(id: number): Promise<Announcement> {
    const response = await api.apisauce.get<
      ApiResponse<{ announcement: Announcement }>
    >(`/api/announcements/${id}`);
    if (response.ok && response.data?.status === 'success') {
      return response.data.data.announcement;
    }
    throw new Error(response.data?.message || 'Failed to fetch announcement');
  }

  async createAnnouncement(
    data: CreateAnnouncementDto
  ): Promise<ApiResponse<Announcement>> {
    try {
      await this.ensureAuth();
      return await api.apisauce.post<Announcement>('/api/announcements', data);
    } catch (error) {
      return {
        ok: false,
        problem: 'NETWORK_ERROR',
        data: null as unknown as Announcement,
        originalError: error as AxiosError,
      };
    }
  }

  async updateAnnouncement(
    id: number,
    data: UpdateAnnouncementDto
  ): Promise<ApiResponse<Announcement>> {
    try {
      await this.ensureAuth();
      return await api.apisauce.put<Announcement>(`/announcements/${id}`, data);
    } catch (error) {
      return {
        ok: false,
        problem: 'NETWORK_ERROR',
        data: null as unknown as Announcement,
        originalError: error as AxiosError,
      };
    }
  }

  async deleteAnnouncement(id: number): Promise<ApiResponse<void>> {
    try {
      await this.ensureAuth();
      return await api.apisauce.delete<void>(`/announcements/${id}`);
    } catch (error) {
      return {
        ok: false,
        problem: 'NETWORK_ERROR',
        data: undefined,
        originalError: error as AxiosError,
      };
    }
  }
}

export const announcementService = new AnnouncementService();
