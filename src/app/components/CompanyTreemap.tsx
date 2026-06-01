import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
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
}

interface CompanyTreemapProps {
  companies: Company[];
  metric: 'marketCap' | 'earnings' | 'revenue' | 'employees';
}

export function CompanyTreemap({ companies, metric }: CompanyTreemapProps) {
  const navigate = useNavigate();

  const data = companies.map((company, index) => ({
    name: company.name,
    size: company[metric],
    city: company.city,
    category: company.category,
    id: company.id,
    key: `${company.id}-${index}`,
  }));

  const COLORS = [
    '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981',
    '#6366f1', '#14b8a6', '#f97316', '#06b6d4', '#84cc16',
    '#a855f7', '#eab308', '#22c55e', '#ef4444', '#0ea5e9',
  ];

  const CustomizedContent = (props: any) => {
    const { x, y, width, height, index, name, size, id } = props;

    if (width < 40 || height < 40 || !name) return null;

    const formatValue = (value: number) => {
      if (metric === 'employees') return value.toLocaleString() + '명';
      if (value >= 1e12) return `${(value / 1e12).toFixed(1)}조`;
      if (value >= 1e8) return `${(value / 1e8).toFixed(0)}억`;
      if (value >= 1e4) return `${(value / 1e4).toFixed(0)}만`;
      return `${value.toLocaleString()}`;
    };

    return (
      <g
        onClick={() => id && navigate(`/company/${id}`)}
        style={{ cursor: 'pointer' }}
      >
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: COLORS[index % COLORS.length],
            stroke: '#fff',
            strokeWidth: 2,
          }}
        />
        {width > 60 && height > 50 && (
          <>
            <text
              x={x + width / 2}
              y={y + height / 2 - 8}
              textAnchor="middle"
              fill="#fff"
              className="text-sm"
            >
              {name && name.length > 15 ? name.substring(0, 12) + '...' : name}
            </text>
            <text
              x={x + width / 2}
              y={y + height / 2 + 12}
              textAnchor="middle"
              fill="#fff"
              className="text-xs"
            >
              {formatValue(size)}
            </text>
          </>
        )}
      </g>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const formatValue = (value: number) => {
        if (metric === 'employees') return value.toLocaleString() + '명';
        if (value >= 1e12) return `${(value / 1e12).toFixed(2)}조원`;
        if (value >= 1e8) return `${(value / 1e8).toFixed(0)}억원`;
        if (value >= 1e4) return `${(value / 1e4).toFixed(0)}만원`;
        return `${value.toLocaleString()}원`;
      };

      const metricLabel = {
        marketCap: '시가총액',
        earnings: '영업이익',
        revenue: '매출액',
        employees: '직원수',
      }[metric];

      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">도시: {data.city}</p>
          <p className="text-sm text-gray-600">분야: {data.category}</p>
          <p className="text-sm text-gray-900 mt-1">
            {metricLabel}: {formatValue(data.size)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <Treemap
        data={data}
        dataKey="size"
        nameKey="name"
        stroke="#fff"
        fill="#8884d8"
        content={<CustomizedContent />}
        isAnimationActive={false}
      >
        <Tooltip content={<CustomTooltip />} />
      </Treemap>
    </ResponsiveContainer>
  );
}
