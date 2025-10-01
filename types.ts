
export interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  topics: string[];
}
