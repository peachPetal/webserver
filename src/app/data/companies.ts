export interface FinancialHistory {
  year: string; month: string; marketCap: number; revenue: number; earnings: number;
}
export interface CompanyBenefit {
  year: string; month: string; programName: string; agencyName: string; supportType: string; amount?: number;
}
export interface Company {
  id: number; name: string; marketCap: number; revenue: number; earnings: number; employees: number;
  city: string; category: string; listingStatus: string; ticker?: string; corpCode?: string;
  benefits?: CompanyBenefit[]; financialHistory?: FinancialHistory[];
}