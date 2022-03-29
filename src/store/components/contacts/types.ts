export interface Contact {
  id: string;
  age: number;
  name: string;
  gender: 'male' | 'female',
  company: string;
  email: string;
  photo: string;
}

export interface SearchParams {
  _page: number;
  _sort: string;
  _order: 'asc' | 'desc'
}
