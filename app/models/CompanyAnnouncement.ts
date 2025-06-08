export interface Company {
  name: string
  industry: string
  email: string
  foundedYear: number
  services: string[]
  responseText: string
}

export interface CompanyAnnouncement {
  id: string
  title: string
  description: string
  company: Company
  createdAt: string
  updatedAt: string
}
