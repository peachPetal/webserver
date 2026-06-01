import { useParams, useNavigate } from 'react-router';
import { useState } from 'react';
import { companies } from '../data/companies';
import { ArrowLeft, TrendingUp, DollarSign, Users, Building2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';

interface CompanyDetailProps {
  isDarkMode: boolean;
}

type TabType = 'marketCap' | 'earnings' | 'revenue' | 'employees' | 'support' | 'financial';

interface SupportProgram {
  date: string;
  name: string;
  amount: number;
}

export function CompanyDetail({ isDarkMode }: CompanyDetailProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const company = companies.find(c => c.id === Number(id));
  const [activeTab, setActiveTab] = useState<TabType>('marketCap');

  if (!company) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="text-center">
          <h2 className={`text-2xl mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>기업을 찾을 수 없습니다</h2>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    if (value < 0) {
      const absValue = Math.abs(value);
      if (absValue >= 1e12) return `-${(absValue / 1e12).toFixed(2)}조원`;
      if (absValue >= 1e8) return `-${(absValue / 1e8).toFixed(0)}억원`;
      if (absValue >= 1e4) return `-${(absValue / 1e4).toFixed(0)}만원`;
      return `-${absValue.toLocaleString()}원`;
    }
    if (value >= 1e12) return `${(value / 1e12).toFixed(2)}조원`;
    if (value >= 1e8) return `${(value / 1e8).toFixed(0)}억원`;
    if (value >= 1e4) return `${(value / 1e4).toFixed(0)}만원`;
    return `${value.toLocaleString()}원`;
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString();
  };

  const rank = companies
    .sort((a, b) => b.marketCap - a.marketCap)
    .findIndex(c => c.id === company.id) + 1;

  const mockSupportPrograms: SupportProgram[] = [
    { date: '2024-02', name: '강원바이오 혁신성장 지원사업', amount: 500000000 },
    { date: '2024-05', name: 'R&D 세액공제', amount: 300000000 },
    { date: '2024-09', name: '수출확대 지원금', amount: 250000000 },
  ];

  const generateChartData = (metric: 'marketCap' | 'earnings' | 'revenue' | 'employees') => {
    const baseValue = company[metric];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return months.map((month, index) => {
      const progress = (index + 1) / 12;
      const variance = 0.85 + (progress * 0.15);
      const support = mockSupportPrograms.find(p => p.date === `2024-${String(index + 1).padStart(2, '0')}`);

      return {
        month,
        date: `2024-${String(index + 1).padStart(2, '0')}`,
        value: baseValue * variance,
        support: support?.name,
        supportAmount: support?.amount,
        key: `${metric}-${index}`,
      };
    });
  };

  const tabs = [
    { id: 'marketCap' as TabType, label: '시가총액' },
    { id: 'earnings' as TabType, label: '영업이익' },
    { id: 'revenue' as TabType, label: '매출액' },
    { id: 'employees' as TabType, label: '직원수' },
    { id: 'support' as TabType, label: '지원사업' },
    { id: 'financial' as TabType, label: '재무정보' },
  ];

  const getChartColor = () => {
    switch (activeTab) {
      case 'marketCap': return '#3b82f6';
      case 'earnings': return '#8b5cf6';
      case 'revenue': return '#10b981';
      case 'employees': return '#f59e0b';
      default: return '#3b82f6';
    }
  };

  const getCurrentValue = () => {
    switch (activeTab) {
      case 'marketCap': return formatCurrency(company.marketCap);
      case 'earnings': return formatCurrency(company.earnings);
      case 'revenue': return formatCurrency(company.revenue);
      case 'employees': return formatNumber(company.employees);
      default: return '';
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={`p-3 rounded-lg shadow-lg border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <p className={`text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {data.month} 2024
          </p>
          <p className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {activeTab === 'employees' ? formatNumber(data.value) : formatCurrency(data.value)}
          </p>
          {data.support && (
            <p className={`text-xs mt-2 pt-2 border-t ${
              isDarkMode ? 'text-green-400 border-gray-600' : 'text-green-600 border-gray-200'
            }`}>
              🎯 {data.support}
              <br />
              <span className="text-xs">{formatCurrency(data.supportAmount)}</span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`border-b ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/')}
            className={`flex items-center gap-2 text-sm mb-4 transition-colors ${
              isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            목록으로 돌아가기
          </button>

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-20 h-20 rounded-lg flex items-center justify-center text-3xl ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                {company.name.charAt(0)}
              </div>
              <div>
                <h1 className={`text-3xl mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {company.name}
                </h1>
                <div className={`flex items-center gap-3 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <span>{rank}위</span>
                  <span>·</span>
                  <span>{company.category}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {company.city}
                  </span>
                  <span>·</span>
                  <span>{(company as any).listingStatus}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Company Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div>
              <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>시가총액</p>
              <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {formatCurrency(company.marketCap)}
              </p>
            </div>
            <div>
              <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>매출액</p>
              <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {formatCurrency(company.revenue)}
              </p>
            </div>
            <div>
              <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>영업이익</p>
              <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {formatCurrency(company.earnings)}
              </p>
            </div>
            <div>
              <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>직원수</p>
              <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {formatNumber(company.employees)}명
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} mb-6`}>
          <div className="flex gap-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-2 text-sm whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? isDarkMode
                      ? 'border-blue-500 text-blue-400'
                      : 'border-blue-600 text-blue-600'
                    : isDarkMode
                    ? 'border-transparent text-gray-400 hover:text-gray-300'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {(activeTab === 'marketCap' || activeTab === 'earnings' || activeTab === 'revenue' || activeTab === 'employees') && (
          <div className={`p-6 rounded-lg border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {tabs.find(t => t.id === activeTab)?.label} 추이
              </h2>
              <div className={`text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {getCurrentValue()}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart
                data={generateChartData(activeTab as 'marketCap' | 'earnings' | 'revenue' | 'employees')}
                isAnimationActive={false}
              >
                <defs>
                  <linearGradient id={`color${activeTab}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={getChartColor()} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={getChartColor()} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                <XAxis
                  dataKey="month"
                  stroke={isDarkMode ? '#9ca3af' : '#6b7280'}
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke={isDarkMode ? '#9ca3af' : '#6b7280'}
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => {
                    if (activeTab === 'employees') return formatNumber(value);
                    if (value < 0) {
                      const absValue = Math.abs(value);
                      if (absValue >= 1e12) return `-${(absValue / 1e12).toFixed(1)}조`;
                      if (absValue >= 1e8) return `-${(absValue / 1e8).toFixed(0)}억`;
                      return `-${absValue}`;
                    }
                    if (value >= 1e12) return `${(value / 1e12).toFixed(1)}조`;
                    if (value >= 1e8) return `${(value / 1e8).toFixed(0)}억`;
                    return `${value}`;
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={getChartColor()}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#color${activeTab})`}
                  isAnimationActive={false}
                />
                {generateChartData(activeTab as 'marketCap' | 'earnings' | 'revenue' | 'employees').map((point) =>
                  point.support ? (
                    <ReferenceDot
                      key={point.key}
                      x={point.month}
                      y={point.value}
                      r={6}
                      fill="#10b981"
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ) : null
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'support' && (
          <div className={`p-6 rounded-lg border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h2 className={`text-xl mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              지원사업 수혜 내역
            </h2>
            <div className="space-y-4">
              {mockSupportPrograms.map((program, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`text-base mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {program.name}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {program.date}
                      </p>
                    </div>
                    <div className={`text-lg ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                      {formatCurrency(program.amount)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'financial' && (
          <div className={`p-6 rounded-lg border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h2 className={`text-xl mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              재무 정보
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  시가총액
                </p>
                <p className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {formatCurrency(company.marketCap)}
                </p>
              </div>
              <div>
                <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  연간 매출액
                </p>
                <p className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {formatCurrency(company.revenue)}
                </p>
              </div>
              <div>
                <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  영업이익
                </p>
                <p className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {formatCurrency(company.earnings)}
                </p>
              </div>
              <div>
                <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  영업이익률
                </p>
                <p className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {((company.earnings / company.revenue) * 100).toFixed(2)}%
                </p>
              </div>
              <div>
                <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  총 직원수
                </p>
                <p className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {formatNumber(company.employees)}명
                </p>
              </div>
              <div>
                <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  1인당 매출액
                </p>
                <p className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {formatCurrency(company.revenue / company.employees)}
                </p>
              </div>
              <div>
                <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  상장 여부
                </p>
                <p className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {(company as any).listingStatus}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
