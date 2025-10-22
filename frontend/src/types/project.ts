export interface Project {
  _id: string;
  name: string;
  key: string;
  description?: string;
  lead: {
    _id: string;
    name: string;
  };
  createdAt: string;
}