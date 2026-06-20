import { useState, useEffect } from 'react';
import { Company } from '../data/companies';

const mapCategory = (dbCategory: string): string => {
  const categoryMap: { [key: string]: string } = {
    // 바이오
    '체외진단': '바이오',
    '백신의약품': '바이오',
    '의료용보툴리눔': '바이오',
    '항체신약': '바이오',
    '동물용의약품': '바이오',
    '조직재생': '바이오',
    '보툴리눔필러': '바이오',
    '의약품제조': '바이오',
    '소아과의약품': '바이오',
    '동물질병진단': '바이오',
    '바이오의약': '바이오',
    '유전자치료제': '바이오',
    '신약연구소': '바이오',
    '간질환진단': '바이오',
    '신속진단키트': '바이오',
    '항체신소재': '바이오',
    
    // 의료기기
    '심장충격기': '의료기기',
    '연구용실험장비': '의료기기',
    '의료용전극센서': '의료기기',
    '환자감시장치': '의료기기',
    '웨어러블기기': '의료기기',
    
    // 식품 및 화장품
    '바이오에스테틱': '식품 및 화장품',
    '화장품소재': '식품 및 화장품',
    '식품ODM': '식품 및 화장품',
    '건강기능식품': '식품 및 화장품',
    '브랜드식품': '식품 및 화장품',
    '피부헬스케어': '식품 및 화장품',
    '그린바이오사료': '식품 및 화장품',
    '기능성사료': '식품 및 화장품',
  };
  return categoryMap[dbCategory] || '바이오';
};

export function useCompanyData() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('http://localhost:8080/webserver/api/companies')
      .then((response) => {
        if (!response.ok) throw new Error('백엔드 서버 응답 에러');
        return response.json();
      })
      .then((data: Company[]) => {
        // 데이터를 정제하여 상태에 적재
        const mappedData = data.map((c) => ({
          ...c,
          category: mapCategory(c.category),
        }));
        setCompanies(mappedData);
        setCities([...new Set(mappedData.map((c) => c.city))].sort());
        setCategories(['바이오', '의료기기', '식품 및 화장품']);
        setLoading(false);
      })
      .catch((error) => {
        console.error("데이터 연동 실패:", error);
        setLoading(false);
      });
  }, []);

  return { companies, cities, categories, loading };
}