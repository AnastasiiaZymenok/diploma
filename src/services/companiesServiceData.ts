import { api } from '../../app/services/api';
import { API_BASE_URL } from '../config/constants';

// Types
export type ProjectStage =
  | 'PLANNING'
  | 'DEVELOPMENT'
  | 'TESTING'
  | 'DEPLOYMENT'
  | 'COMPLETED';

export interface Company {
  id: number;
  name: string;
}

export interface Project {
  id: number;
  name: string;
  status: string;
  description: string;
  stage: ProjectStage;
  customerCompany: Company;
  executorCompany: Company;
  functions: string[];
  expectedResult: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data: T;
}

export interface ProjectsResponse {
  projects: Project[];
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
export class CompaniesServiceData {
  private static instance: CompaniesServiceData;
  private readonly baseUrl: string;

  private constructor() {
    this.baseUrl = `${API_BASE_URL}/api`;
  }

  public static getInstance(): CompaniesServiceData {
    if (!CompaniesServiceData.instance) {
      CompaniesServiceData.instance = new CompaniesServiceData();
    }
    return CompaniesServiceData.instance;
  }

  private handleError(response: any): never {
    throw new ApiError(
      response.status || 500,
      response.data?.message || 'An error occurred',
      response.data
    );
  }

  // Get all projects where the company is either customer or executor
  async getCompanyProjects(): Promise<Project[]> {
    const response = await api.apisauce.get<ApiResponse<ProjectsResponse>>(
      `${this.baseUrl}/projects`
    );
    if (response.ok && response.data?.status === 'success') {
      return response.data.data.projects;
    }
    this.handleError(response);
  }

  // Get project by ID
  async getProjectById(id: number): Promise<Project> {
    const response = await api.apisauce.get<ApiResponse<{ project: Project }>>(
      `${this.baseUrl}/projects/${id}`
    );
    if (response.ok && response.data?.status === 'success') {
      return response.data.data.project;
    }
    this.handleError(response);
  }

  // Create new project
  async createProject(
    data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Project> {
    const response = await api.apisauce.post<ApiResponse<{ project: Project }>>(
      `${this.baseUrl}/projects`,
      data
    );
    if (response.ok && response.data?.status === 'success') {
      return response.data.data.project;
    }
    this.handleError(response);
  }

  // Update project
  async updateProject(
    id: number,
    data: Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Project> {
    const response = await api.apisauce.put<ApiResponse<{ project: Project }>>(
      `${this.baseUrl}/projects/${id}`,
      data
    );
    if (response.ok && response.data?.status === 'success') {
      return response.data.data.project;
    }
    this.handleError(response);
  }

  // Delete project
  async deleteProject(id: number): Promise<void> {
    const response = await api.apisauce.delete<ApiResponse<void>>(
      `${this.baseUrl}/projects/${id}`
    );
    if (response.ok && response.data?.status === 'success') {
      return;
    }
    this.handleError(response);
  }
}
