import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Company } from '../data/companies';

interface EditCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (company: Company) => void;
  onDelete?: (id: number) => void;
  company?: Company;
  isDarkMode: boolean;
}

export function EditCompanyModal({ isOpen, onClose, onSave, onDelete, company, isDarkMode }: EditCompanyModalProps) {
  const [formData, setFormData] = useState<Company>({
    id: 0,
    name: '',
    marketCap: 0,
    earnings: 0,
    revenue: 0,
    employees: 0,
    city: '',
    category: '',
    listingStatus: '비상장',
  });

  useEffect(() => {
    if (company) {
      setFormData(company);
    } else {
      setFormData({
        id: Date.now(),
        name: '',
        marketCap: 0,
        earnings: 0,
        revenue: 0,
        employees: 0,
        city: '',
        category: '',
        listingStatus: '비상장',
      });
    }
  }, [company, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleDelete = () => {
    if (company && onDelete && confirm('정말 삭제하시겠습니까?')) {
      onDelete(company.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
      <div className={`relative w-full max-w-2xl p-6 rounded-lg m-4 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 ${
            isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className={`text-2xl mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {company ? '기업 정보 수정' : '새 기업 추가'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className={`block text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                기업명 *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-2 rounded-md border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className={`block text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                도시 *
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className={`w-full px-4 py-2 rounded-md border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className={`block text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                분야 *
              </label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full px-4 py-2 rounded-md border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className={`block text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                상장 여부 *
              </label>
              <select
                required
                value={formData.listingStatus}
                onChange={(e) => setFormData({ ...formData, listingStatus: e.target.value })}
                className={`w-full px-4 py-2 rounded-md border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="비상장">비상장</option>
                <option value="코스닥">코스닥</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                시가총액 (원) *
              </label>
              <input
                type="number"
                required
                value={formData.marketCap}
                onChange={(e) => setFormData({ ...formData, marketCap: Number(e.target.value) })}
                className={`w-full px-4 py-2 rounded-md border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className={`block text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                매출액 (원) *
              </label>
              <input
                type="number"
                required
                value={formData.revenue}
                onChange={(e) => setFormData({ ...formData, revenue: Number(e.target.value) })}
                className={`w-full px-4 py-2 rounded-md border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className={`block text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                영업이익 (원) *
              </label>
              <input
                type="number"
                required
                value={formData.earnings}
                onChange={(e) => setFormData({ ...formData, earnings: Number(e.target.value) })}
                className={`w-full px-4 py-2 rounded-md border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className={`block text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                직원수 *
              </label>
              <input
                type="number"
                required
                value={formData.employees}
                onChange={(e) => setFormData({ ...formData, employees: Number(e.target.value) })}
                className={`w-full px-4 py-2 rounded-md border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              저장
            </button>
            {company && onDelete && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                삭제
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-md transition-colors ${
                isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
