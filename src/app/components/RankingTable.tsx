import { ArrowUpDown, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router';

interface Company {
  id: number;
  name: string;
  marketCap: number;
  earnings: number;
  revenue: number;
  employees: number;
  city: string;
  category: string;
  listingStatus: string;
}

interface RankingTableProps {
  companies: Company[];
  metric: 'marketCap' | 'earnings' | 'revenue' | 'employees';
  isDarkMode?: boolean;
  isAdminMode?: boolean;
  onEdit?: (company: Company) => void;
}

export function RankingTable({ companies, metric, isDarkMode = false, isAdminMode = false, onEdit }: RankingTableProps) {
  const navigate = useNavigate();
  const formatCurrency = (value: number) => {
    if (value >= 1e12) return `${(value / 1e12).toFixed(2)}조원`;
    if (value >= 1e8) return `${(value / 1e8).toFixed(0)}억원`;
    if (value >= 1e4) return `${(value / 1e4).toFixed(0)}만원`;
    return `${value.toLocaleString()}원`;
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString();
  };

  const getMetricLabel = () => {
    switch (metric) {
      case 'marketCap': return '시가총액';
      case 'earnings': return '영업이익';
      case 'revenue': return '매출액';
      case 'employees': return '직원수';
    }
  };

  const getMetricValue = (company: Company) => {
    const value = company[metric];
    return metric === 'employees' ? formatNumber(value) : formatCurrency(value);
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className={`border-b ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
            <th className={`px-6 py-3 text-left text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>순위</th>
            <th className={`px-6 py-3 text-left text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>기업명</th>
            <th className={`px-6 py-3 text-left text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>도시</th>
            <th className={`px-6 py-3 text-left text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>분야</th>
            <th className={`px-6 py-3 text-right text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <div className="flex items-center justify-end gap-1">
                {getMetricLabel()}
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </th>
            {isAdminMode && (
              <th className={`px-6 py-3 text-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                관리
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr
              key={company.id}
              className={`border-b transition-colors ${
                isDarkMode
                  ? 'border-gray-700 hover:bg-gray-800'
                  : 'border-gray-100 hover:bg-gray-50'
              }`}
            >
              <td
                className={`px-6 py-4 text-sm cursor-pointer ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                onClick={() => navigate(`/company/${company.id}`)}
              >
                {index + 1}
              </td>
              <td
                className={`px-6 py-4 text-sm cursor-pointer ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                onClick={() => navigate(`/company/${company.id}`)}
              >
                {company.name}
              </td>
              <td
                className={`px-6 py-4 text-sm cursor-pointer ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                onClick={() => navigate(`/company/${company.id}`)}
              >
                {company.city}
              </td>
              <td
                className={`px-6 py-4 text-sm cursor-pointer ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                onClick={() => navigate(`/company/${company.id}`)}
              >
                {company.category}
              </td>
              <td
                className={`px-6 py-4 text-sm text-right cursor-pointer ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                onClick={() => navigate(`/company/${company.id}`)}
              >
                {getMetricValue(company)}
              </td>
              {isAdminMode && onEdit && (
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(company);
                    }}
                    className={`p-2 rounded-md transition-colors ${
                      isDarkMode
                        ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                        : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                    }`}
                    title="수정"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
