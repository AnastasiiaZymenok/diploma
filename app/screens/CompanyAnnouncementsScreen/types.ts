export interface Announcement {
  id: string;
  title: string;
  description: string;
  type: 'search' | 'offer';
  listOfRequirementsOrServices: string[];
  createdAt: string;
  companyId: string;
}
