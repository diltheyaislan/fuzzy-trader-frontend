import Company from './company.model';
import Cryptocurrency from './cryptocurrency.model';

export interface UserHasCompany {
  quantity: number;
  amount: number;
  company: Company;
}

export interface UserHasCryptocurrency {
  quantity: number;
  amount: number;
  cryptocurrency: Cryptocurrency;
}

export default interface InvestmentPortfolio {
  amount: number;
  shares: UserHasCompany[];
  cryptocurrency: UserHasCryptocurrency[];
}
