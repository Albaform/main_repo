export default function getRecruitStatus(startDate: string, endDate: string): '모집중' | '모집 마감' {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    // 날짜만 비교
    today.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
  

    if (today > end) return '모집 마감';
    return '모집중';
  }