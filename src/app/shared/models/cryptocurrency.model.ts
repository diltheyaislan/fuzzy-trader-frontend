export default interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  image: string;
  description: string;
  price: number;
  logo_url: string;
  created_at: Date;
  updated_at: Date;
}
