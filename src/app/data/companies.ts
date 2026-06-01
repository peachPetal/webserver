export interface Company {
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

export const companies: Company[] = [
  { id: 1, name: '파마리서치', marketCap: 2000000000000, earnings: 100000000000, revenue: 300000000000, employees: 500, city: '강릉', category: '의약', listingStatus: '코스닥' },
  { id: 2, name: '아리바이오', marketCap: 800000000000, earnings: -30000000000, revenue: 1000000000, employees: 150, city: '춘천', category: '의약', listingStatus: '비상장' },
  { id: 3, name: '유바이오로직스', marketCap: 700000000000, earnings: 5000000000, revenue: 70000000000, employees: 300, city: '춘천', category: '의약', listingStatus: '코스닥' },
  { id: 4, name: '코아스템켐온', marketCap: 300000000000, earnings: -5000000000, revenue: 50000000000, employees: 300, city: '춘천', category: '검정', listingStatus: '코스닥' },
  { id: 5, name: '압타머사이언스', marketCap: 200000000000, earnings: -20000000000, revenue: 2000000000, employees: 100, city: '춘천', category: '의약', listingStatus: '코스닥' },
  { id: 6, name: '메디아나', marketCap: 200000000000, earnings: 10000000000, revenue: 60000000000, employees: 300, city: '원주', category: '의료기기', listingStatus: '코스닥' },
  { id: 7, name: '씨유메디칼', marketCap: 120000000000, earnings: 4000000000, revenue: 50000000000, employees: 200, city: '원주', category: '의료기기', listingStatus: '코스닥' },
  { id: 8, name: '파나큐라', marketCap: 100000000000, earnings: 2000000000, revenue: 20000000000, employees: 120, city: '춘천', category: '검정', listingStatus: '비상장' },
  { id: 9, name: '리노블바이오팜', marketCap: 60000000000, earnings: 2000000000, revenue: 20000000000, employees: 120, city: '원주', category: '의약', listingStatus: '비상장' },
  { id: 10, name: '젠트리바이오', marketCap: 60000000000, earnings: -6000000000, revenue: 3000000000, employees: 70, city: '춘천', category: '의약', listingStatus: '비상장' },
  { id: 11, name: '비디매스', marketCap: 60000000000, earnings: -7000000000, revenue: 5000000000, employees: 70, city: '춘천', category: '의약', listingStatus: '비상장' },
  { id: 12, name: '비노시스', marketCap: 60000000000, earnings: -5000000000, revenue: 5000000000, employees: 70, city: '춘천', category: '의약', listingStatus: '비상장' },
  { id: 13, name: '메가메디칼', marketCap: 50000000000, earnings: 2500000000, revenue: 25000000000, employees: 150, city: '원주', category: '의료기기', listingStatus: '비상장' },
  { id: 14, name: '팜스토리', marketCap: 50000000000, earnings: 1000000000, revenue: 20000000000, employees: 120, city: '춘천', category: '기타', listingStatus: '코스닥' },
  { id: 15, name: '리포바이오메드', marketCap: 50000000000, earnings: -4000000000, revenue: 4000000000, employees: 60, city: '춘천', category: '의약', listingStatus: '비상장' },
  { id: 16, name: '어큐진', marketCap: 50000000000, earnings: -4000000000, revenue: 3000000000, employees: 60, city: '강릉', category: '의약', listingStatus: '비상장' },
  { id: 17, name: '이엘메드', marketCap: 50000000000, earnings: -3000000000, revenue: 4000000000, employees: 60, city: '춘천', category: '의약', listingStatus: '비상장' },
  { id: 18, name: '슈미트헬스코리아', marketCap: 50000000000, earnings: -2000000000, revenue: 6000000000, employees: 80, city: '춘천', category: '의약', listingStatus: '비상장' },
  { id: 19, name: '보름바이오', marketCap: 50000000000, earnings: -4000000000, revenue: 3000000000, employees: 60, city: '춘천', category: '의약', listingStatus: '비상장' },
  { id: 20, name: '하울바이오', marketCap: 50000000000, earnings: -4000000000, revenue: 2000000000, employees: 60, city: '춘천', category: '의약', listingStatus: '비상장' },
  { id: 21, name: '강일코스팜', marketCap: 40000000000, earnings: 2000000000, revenue: 20000000000, employees: 120, city: '강릉', category: '화학', listingStatus: '비상장' },
  { id: 22, name: '레오메딕스', marketCap: 40000000000, earnings: 1200000000, revenue: 15000000000, employees: 90, city: '원주', category: '의료기기', listingStatus: '비상장' },
  { id: 23, name: '앱틀라스', marketCap: 40000000000, earnings: -3000000000, revenue: 3000000000, employees: 40, city: '춘천', category: '의약', listingStatus: '비상장' },
  { id: 24, name: '베름', marketCap: 40000000000, earnings: 1200000000, revenue: 15000000000, employees: 90, city: '춘천', category: '식품', listingStatus: '비상장' },
  { id: 25, name: '이노제닉스', marketCap: 40000000000, earnings: -5000000000, revenue: 2000000000, employees: 50, city: '춘천', category: '의약', listingStatus: '비상장' },
  { id: 26, name: '휴피트', marketCap: 40000000000, earnings: -3000000000, revenue: 3000000000, employees: 50, city: '춘천', category: '의약', listingStatus: '비상장' },
  { id: 27, name: '유스바이오글로벌', marketCap: 40000000000, earnings: -3000000000, revenue: 4000000000, employees: 60, city: '춘천', category: '의약', listingStatus: '비상장' },
  { id: 28, name: '청아굿푸드', marketCap: 35000000000, earnings: 1200000000, revenue: 15000000000, employees: 80, city: '춘천', category: '식품', listingStatus: '비상장' },
  { id: 29, name: '청도제약', marketCap: 30000000000, earnings: 500000000, revenue: 8000000000, employees: 40, city: '춘천', category: '의약', listingStatus: '비상장' },
  { id: 30, name: '이뮨팜', marketCap: 30000000000, earnings: 1000000000, revenue: 12000000000, employees: 70, city: '춘천', category: '식품', listingStatus: '비상장' },
  { id: 31, name: '콤비메드', marketCap: 30000000000, earnings: 1000000000, revenue: 12000000000, employees: 80, city: '춘천', category: '화학', listingStatus: '비상장' },
  { id: 32, name: '비엔지', marketCap: 30000000000, earnings: 900000000, revenue: 13000000000, employees: 70, city: '춘천', category: '식품', listingStatus: '비상장' },
  { id: 33, name: '코리아베스트원', marketCap: 30000000000, earnings: 1000000000, revenue: 12000000000, employees: 70, city: '춘천', category: '식품', listingStatus: '비상장' },
  { id: 34, name: '노블비타', marketCap: 30000000000, earnings: 1000000000, revenue: 12000000000, employees: 70, city: '춘천', category: '식품', listingStatus: '비상장' },
  { id: 35, name: '퍼펙트바이옴', marketCap: 30000000000, earnings: 1000000000, revenue: 12000000000, employees: 80, city: '춘천', category: '화학', listingStatus: '비상장' },
  { id: 36, name: '네올', marketCap: 30000000000, earnings: 800000000, revenue: 10000000000, employees: 70, city: '강릉', category: '기타', listingStatus: '비상장' },
  { id: 37, name: '마이셀릭스', marketCap: 30000000000, earnings: 800000000, revenue: 10000000000, employees: 70, city: '춘천', category: '기타', listingStatus: '비상장' },
  { id: 38, name: '더밸류바이오텍', marketCap: 25000000000, earnings: 700000000, revenue: 9000000000, employees: 60, city: '춘천', category: '식품', listingStatus: '비상장' },
  { id: 39, name: '화진바이오코스메틱', marketCap: 25000000000, earnings: 800000000, revenue: 10000000000, employees: 60, city: '춘천', category: '화장품', listingStatus: '비상장' },
  { id: 40, name: '에이치앤비', marketCap: 25000000000, earnings: 700000000, revenue: 10000000000, employees: 60, city: '춘천', category: '식품', listingStatus: '비상장' },
  { id: 41, name: '세찬', marketCap: 25000000000, earnings: 900000000, revenue: 12000000000, employees: 70, city: '춘천', category: '식품', listingStatus: '비상장' },
  { id: 42, name: '다럼앤바이오', marketCap: 20000000000, earnings: 300000000, revenue: 5000000000, employees: 30, city: '춘천', category: '화학', listingStatus: '비상장' },
  { id: 43, name: '불루진', marketCap: 20000000000, earnings: 500000000, revenue: 8000000000, employees: 50, city: '춘천', category: '화학', listingStatus: '비상장' },
  { id: 44, name: '엠텍', marketCap: 20000000000, earnings: 800000000, revenue: 10000000000, employees: 70, city: '춘천', category: '기타', listingStatus: '비상장' },
  { id: 45, name: '무무코스메틱', marketCap: 20000000000, earnings: 600000000, revenue: 8000000000, employees: 50, city: '춘천', category: '화장품', listingStatus: '비상장' },
  { id: 46, name: '마이밸류', marketCap: 20000000000, earnings: 600000000, revenue: 8000000000, employees: 50, city: '춘천', category: '화학', listingStatus: '비상장' },
  { id: 47, name: '메디허브바이오', marketCap: 15000000000, earnings: 200000000, revenue: 4000000000, employees: 25, city: '춘천', category: '기타', listingStatus: '비상장' },
  { id: 48, name: '강원퍼퓸알케미', marketCap: 15000000000, earnings: 300000000, revenue: 5000000000, employees: 30, city: '춘천', category: '화학', listingStatus: '비상장' },
];

export const cities = [...new Set(companies.map(c => c.city))].sort();
export const categories = [...new Set(companies.map(c => c.category))].sort();
