import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from '../config/constants';

// Types
export type AnnouncementType = 'search' | 'offer';

export interface Company {
  id: number;
  name: string;
  industry: string;
}

export interface Announcement {
  id: number;
  title: string;
  description: string;
  type: AnnouncementType;
  listOfRequirementsOrServices: string[];
  company: Company;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAnnouncementDto {
  title: string;
  description: string;
  type: AnnouncementType;
  listOfRequirementsOrServices: string[];
}

export interface UpdateAnnouncementDto extends CreateAnnouncementDto {}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data: T;
}

export interface AnnouncementsResponse {
  announcements: Announcement[];
}

// Error handling
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Service class
export class AnnouncementService {
  private static instance: AnnouncementService;
  private readonly baseUrl: string;

  private constructor() {
    this.baseUrl = `${API_BASE_URL}/api/announcements`;
  }

  public static getInstance(): AnnouncementService {
    if (!AnnouncementService.instance) {
      AnnouncementService.instance = new AnnouncementService();
    }
    return AnnouncementService.instance;
  }

  private getAuthHeader(): { Authorization: string } {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new ApiError(401, 'Authentication token not found');
    }
    return { Authorization: `Bearer ${token}` };
  }

  private handleError(error: AxiosError): never {
    if (error.response) {
      const errorData = error.response.data as { message?: string };
      throw new ApiError(
        error.response.status,
        errorData?.message || 'An error occurred',
        error.response.data
      );
    }
    throw new ApiError(500, 'Network error occurred');
  }

  // Get all announcements
  async getAnnouncements(): Promise<Announcement[]> {
    try {
      const response = await axios.get<ApiResponse<AnnouncementsResponse>>(
        this.baseUrl,
        { headers: this.getAuthHeader() }
      );
      return response.data.data.announcements;
    } catch (error) {
      this.handleError(error as AxiosError);
    }
  }

  // Get announcement by ID
  async getAnnouncementById(id: number): Promise<Announcement> {
    try {
      const response = await axios.get<
        ApiResponse<{ announcement: Announcement }>
      >(`${this.baseUrl}/${id}`, { headers: this.getAuthHeader() });
      return response.data.data.announcement;
    } catch (error) {
      this.handleError(error as AxiosError);
    }
  }

  // Create announcement
  async createAnnouncement(data: CreateAnnouncementDto): Promise<Announcement> {
    try {
      const response = await axios.post<
        ApiResponse<{ announcement: Announcement }>
      >(this.baseUrl, data, { headers: this.getAuthHeader() });
      return response.data.data.announcement;
    } catch (error) {
      this.handleError(error as AxiosError);
    }
  }

  // Update announcement
  async updateAnnouncement(
    id: number,
    data: UpdateAnnouncementDto
  ): Promise<Announcement> {
    try {
      const response = await axios.put<
        ApiResponse<{ announcement: Announcement }>
      >(`${this.baseUrl}/${id}`, data, { headers: this.getAuthHeader() });
      return response.data.data.announcement;
    } catch (error) {
      this.handleError(error as AxiosError);
    }
  }

  // Delete announcement
  async deleteAnnouncement(id: number): Promise<void> {
    try {
      await axios.delete(`${this.baseUrl}/${id}`, {
        headers: this.getAuthHeader(),
      });
    } catch (error) {
      this.handleError(error as AxiosError);
    }
  }
}
