import { useState, useEffect } from 'react';
import { Company } from '../data/companies'; // interface Company 유지 필수

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
        setCompanies(data);
        setCities([...new Set(data.map((c) => c.city))].sort());
        setCategories([...new Set(data.map((c) => c.category))].sort());
        setLoading(false);
      })
      .catch((error) => {
        console.error("데이터 연동 실패:", error);
        setLoading(false);
      });
  }, []);

  return { companies, cities, categories, loading };
}