import { useState, useMemo, useRef } from 'react';
import { RankingTable } from './RankingTable';
import { CompanyTreemap } from './CompanyTreemap';
import { EditCompanyModal } from './EditCompanyModal';
import { companies as initialCompanies, Company } from '../data/companies';
import { Search, Pencil, Download, Plus, Image } from 'lucide-react';
import domtoimage from 'dom-to-image-more';

type ViewMode = 'ranking' | 'treemap';
type FilterMode = 'total' | 'cities' | 'categories';
type Metric = 'marketCap' | 'earnings' | 'revenue' | 'employees';

interface HomePageProps {
  isDarkMode: boolean;
  isAdminMode: boolean;
}

export function HomePage({ isDarkMode, isAdminMode }: HomePageProps) {
  const [companies, setCompanies] = useState(initialCompanies);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | undefined>(undefined);
  const treemapRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('ranking');
  const [filterMode, setFilterMode] = useState<FilterMode>('total');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedListingStatus, setSelectedListingStatus] = useState<string>('');
  const [metric, setMetric] = useState<Metric>('marketCap');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const cities = useMemo(() => [...new Set(companies.map(c => c.city))].sort(), [companies]);
  const categories = useMemo(() => [...new Set(companies.map(c => c.category))].sort(), [companies]);

  const filteredAndSortedCompanies = useMemo(() => {
    let filtered = [...companies];

    if (filterMode === 'cities' && selectedCity) {
      filtered = filtered.filter(c => c.city === selectedCity);
    } else if (filterMode === 'categories' && selectedCategory) {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }

    if (selectedListingStatus) {
      filtered = filtered.filter(c => c.listingStatus === selectedListingStatus);
    }

    if (searchQuery) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered.sort((a, b) => b[metric] - a[metric]);
  }, [filterMode, selectedCity, selectedCategory, selectedListingStatus, metric, searchQuery]);

  const navItems = viewMode === 'ranking'
    ? [
        { label: '전체 순위', mode: 'total' as FilterMode },
        { label: '도시별 순위', mode: 'cities' as FilterMode },
        { label: '분야별 순위', mode: 'categories' as FilterMode },
      ]
    : [
        { label: '전체 트리맵', mode: 'total' as FilterMode },
        { label: '도시별 트리맵', mode: 'cities' as FilterMode },
        { label: '분야별 트리맵', mode: 'categories' as FilterMode },
      ];

  const metrics: { label: string; value: Metric }[] = [
    { label: '시가총액', value: 'marketCap' },
    { label: '영업이익', value: 'earnings' },
    { label: '매출액', value: 'revenue' },
    { label: '직원수', value: 'employees' },
  ];

  const getMetricLabel = () => {
    const labels = {
      marketCap: '시가총액',
      earnings: '영업이익',
      revenue: '매출액',
      employees: '직원수',
    };
    return labels[metric];
  };

  const getTotalMetricValue = () => {
    const total = filteredAndSortedCompanies.reduce((sum, company) => sum + company[metric], 0);

    if (metric === 'employees') {
      return total.toLocaleString() + '명';
    }

    // Handle negative values
    if (total < 0) {
      const absTotal = Math.abs(total);
      if (absTotal >= 1e12) return `-${(absTotal / 1e12).toFixed(2)}조원`;
      if (absTotal >= 1e8) return `-${(absTotal / 1e8).toFixed(0)}억원`;
      if (absTotal >= 1e4) return `-${(absTotal / 1e4).toFixed(0)}만원`;
      return `-${absTotal.toLocaleString()}원`;
    }

    if (total >= 1e12) return `${(total / 1e12).toFixed(2)}조원`;
    if (total >= 1e8) return `${(total / 1e8).toFixed(0)}억원`;
    if (total >= 1e4) return `${(total / 1e4).toFixed(0)}만원`;
    return `${total.toLocaleString()}원`;
  };

  const handleSaveCompany = (company: Company) => {
    const existingIndex = companies.findIndex(c => c.id === company.id);
    if (existingIndex >= 0) {
      const updated = [...companies];
      updated[existingIndex] = company;
      setCompanies(updated);
    } else {
      setCompanies([...companies, company]);
    }
  };

  const handleDeleteCompany = (id: number) => {
    setCompanies(companies.filter(c => c.id !== id));
  };

  const handleDownloadCSV = () => {
    const headers = ['ID', '기업명', '도시', '분야', '상장여부', '시가총액', '매출액', '영업이익', '직원수'];
    const rows = companies.map(c => [
      c.id,
      c.name,
      c.city,
      c.category,
      c.listingStatus,
      c.marketCap,
      c.revenue,
      c.earnings,
      c.employees
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob(['﻿' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `강원바이오기업_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyTreemapAsImage = async () => {
    if (!treemapRef.current) return;

    try {
      const blob = await domtoimage.toBlob(treemapRef.current, {
        bgcolor: isDarkMode ? '#111827' : '#ffffff',
        width: treemapRef.current.offsetWidth,
        height: treemapRef.current.offsetHeight,
        style: {
          margin: '0',
        },
      });

      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob
          })
        ]);
        alert('트리맵 이미지가 클립보드에 복사되었습니다!');
      } catch (err) {
        console.error('클립보드 복사 실패:', err);
        // Fallback: download as file
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `트리맵_${new Date().toISOString().split('T')[0]}.png`;
        link.click();
        URL.revokeObjectURL(url);
        alert('트리맵 이미지가 다운로드되었습니다!');
      }
    } catch (error) {
      console.error('이미지 생성 실패:', error);
      alert('이미지 생성에 실패했습니다.');
    }
  };

  return (
    <>
      {/* Navigation */}
      <nav className={`border-b ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.mode}
                  onClick={() => {
                    setFilterMode(item.mode);
                    if (item.mode === 'total') {
                      setSelectedCity('');
                      setSelectedCategory('');
                      setSelectedListingStatus('');
                    }
                  }}
                  className={`text-sm transition-colors ${
                    filterMode === item.mode
                      ? 'text-blue-600 font-medium'
                      : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => setViewMode(viewMode === 'ranking' ? 'treemap' : 'ranking')}
                className={`text-sm transition-colors ${
                  isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {viewMode === 'ranking' ? '트리맵으로 보기' : '순위표로 보기'}
              </button>
            </div>

            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  placeholder="기업 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 pr-4 py-1.5 rounded-md text-sm border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Filter Options */}
      {filterMode === 'total' && (
        <div className={`border-b ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center gap-2">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>상장 여부:</span>
              <button
                onClick={() => setSelectedListingStatus('')}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  selectedListingStatus === ''
                    ? 'bg-blue-600 text-white'
                    : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setSelectedListingStatus('코스닥')}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  selectedListingStatus === '코스닥'
                    ? 'bg-blue-600 text-white'
                    : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                코스닥
              </button>
              <button
                onClick={() => setSelectedListingStatus('비상장')}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  selectedListingStatus === '비상장'
                    ? 'bg-blue-600 text-white'
                    : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                비상장
              </button>
            </div>
          </div>
        </div>
      )}

      {filterMode === 'cities' && (
        <div className={`border-b ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center gap-4">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className={`px-4 py-2 border rounded-md text-sm ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="">전체 도시</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedListingStatus('')}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                    selectedListingStatus === ''
                      ? 'bg-blue-600 text-white'
                      : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  전체
                </button>
                <button
                  onClick={() => setSelectedListingStatus('코스닥')}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                    selectedListingStatus === '코스닥'
                      ? 'bg-blue-600 text-white'
                      : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  코스닥
                </button>
                <button
                  onClick={() => setSelectedListingStatus('비상장')}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                    selectedListingStatus === '비상장'
                      ? 'bg-blue-600 text-white'
                      : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  비상장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {filterMode === 'categories' && (
        <div className={`border-b ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-4 py-2 border rounded-md text-sm ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="">전체 분야</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedListingStatus('')}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                    selectedListingStatus === ''
                      ? 'bg-blue-600 text-white'
                      : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  전체
                </button>
                <button
                  onClick={() => setSelectedListingStatus('코스닥')}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                    selectedListingStatus === '코스닥'
                      ? 'bg-blue-600 text-white'
                      : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  코스닥
                </button>
                <button
                  onClick={() => setSelectedListingStatus('비상장')}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                    selectedListingStatus === '비상장'
                      ? 'bg-blue-600 text-white'
                      : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  비상장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistics and Metric Buttons Section */}
      <div className={`border-b ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Title and Stats */}
          <div className="text-center mb-6">
            <h2 className={`text-3xl mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {getMetricLabel()} 기준 상위 기업
            </h2>
            <div className="flex items-center justify-center gap-3">
              <p className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                기업수: <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{filteredAndSortedCompanies.length}개</span>
                {' · '}
                총 {getMetricLabel()}: <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{getTotalMetricValue()}</span>
              </p>
              {isAdminMode && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingCompany(undefined);
                      setShowEditModal(true);
                    }}
                    className={`p-1.5 rounded-md transition-colors ${
                      isDarkMode
                        ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                        : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                    }`}
                    title="새 기업 추가"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleDownloadCSV}
                    className={`p-1.5 rounded-md transition-colors ${
                      isDarkMode
                        ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                        : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                    }`}
                    title="CSV 다운로드"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Metric Buttons */}
          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Rank by</span>
            {metrics.map((m) => (
              <button
                key={m.value}
                onClick={() => setMetric(m.value)}
                className={`px-5 py-2 rounded-full text-sm transition-colors ${
                  metric === m.value
                    ? isDarkMode
                      ? 'bg-blue-600 text-white border-2 border-blue-600'
                      : 'bg-white text-gray-900 border-2 border-gray-900'
                    : isDarkMode
                    ? 'bg-transparent text-gray-300 border-2 border-gray-600 hover:border-gray-500'
                    : 'bg-transparent text-gray-600 border-2 border-gray-300 hover:border-gray-400'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {viewMode === 'ranking' ? (
          <RankingTable
            companies={filteredAndSortedCompanies}
            metric={metric}
            isDarkMode={isDarkMode}
            isAdminMode={isAdminMode}
            onEdit={(company) => {
              setEditingCompany(company);
              setShowEditModal(true);
            }}
          />
        ) : (
          <div>
            <div className="flex justify-end mb-4">
              <button
                onClick={handleCopyTreemapAsImage}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Image className="h-4 w-4" />
                이미지로 복사
              </button>
            </div>
            <div ref={treemapRef} className="h-[600px]">
              <CompanyTreemap companies={filteredAndSortedCompanies} metric={metric} />
            </div>
          </div>
        )}
      </main>

      <EditCompanyModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingCompany(undefined);
        }}
        onSave={handleSaveCompany}
        onDelete={handleDeleteCompany}
        company={editingCompany}
        isDarkMode={isDarkMode}
      />
    </>
  );
}
