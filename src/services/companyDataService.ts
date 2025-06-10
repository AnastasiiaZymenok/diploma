import { api } from '../../app/services/api';
import { API_BASE_URL } from '../config/constants';

// Types
export type CompanyRole = 'admin' | 'user';

export interface Company {
  id: number;
  name: string;
  industry: string;
  email: string;
  foundedYear: number;
  services: string[];
  description: string;
  profilePhoto?: string;
  role: CompanyRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateCompanyDto {
  name?: string;
  industry?: string;
  email?: string;
  foundedYear?: number;
  services?: string[];
  description?: string;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data: T;
}

export interface CompaniesResponse {
  companies: Company[];
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
export class CompanyDataService {
  private static instance: CompanyDataService;
  private readonly baseUrl: string;

  private constructor() {
    this.baseUrl = `${API_BASE_URL}/api/companies`;
  }

  public static getInstance(): CompanyDataService {
    if (!CompanyDataService.instance) {
      CompanyDataService.instance = new CompanyDataService();
    }
    return CompanyDataService.instance;
  }

  private handleError(response: any): never {
    throw new ApiError(
      response.status || 500,
      response.data?.message || 'An error occurred',
      response.data
    );
  }

  // Get all companies
  async getAllCompanies(): Promise<Company[]> {
    const response = await api.apisauce.get<ApiResponse<CompaniesResponse>>(
      this.baseUrl
    );
    if (response.ok && response.data?.status === 'success') {
      return response.data.data.companies;
    }
    this.handleError(response);
  }

  // Get current user's company
  async getMyCompany(): Promise<Company> {
    const response = await api.apisauce.get<ApiResponse<{ company: Company }>>(
      `${this.baseUrl}/me`
    );
    if (response.ok && response.data?.status === 'success') {
      return response.data.data.company;
    }
    this.handleError(response);
  }

  // Update current user's company
  async updateMyCompany(data: UpdateCompanyDto): Promise<Company> {
    const response = await api.apisauce.put<ApiResponse<{ company: Company }>>(
      `${this.baseUrl}/me`,
      data
    );
    if (response.ok && response.data?.status === 'success') {
      return response.data.data.company;
    }
    this.handleError(response);
  }

  // Update specific company
  async updateCompany(id: number, data: UpdateCompanyDto): Promise<Company> {
    const response = await api.apisauce.put<ApiResponse<{ company: Company }>>(
      `${this.baseUrl}/${id}`,
      data
    );
    if (response.ok && response.data?.status === 'success') {
      return response.data.data.company;
    }
    this.handleError(response);
  }

  // Upload company photo
  async uploadCompanyPhoto(id: number, photoFile: File): Promise<Company> {
    const formData = new FormData();
    formData.append('photo', photoFile);

    const response = await api.apisauce.post<ApiResponse<{ company: Company }>>(
      `${this.baseUrl}/${id}/photo`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    if (response.ok && response.data?.status === 'success') {
      return response.data.data.company;
    }
    this.handleError(response);
  }
}
