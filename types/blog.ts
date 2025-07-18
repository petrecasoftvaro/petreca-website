export type PostType = {
  title: string;
  image: string;
  excerpt: string;
  date: string;
  slug: string;
  content: string;
  isFeatured: boolean;
  archived?: boolean;
  author?: {
    name: string;
    image: string;
  };
};

export type Comment = {
  id: string;
  text: string;
  created_at: number;
  url: string;
  user: {
    name: string;
    picture: string;
    sub: string;
    email: string;
  };
};