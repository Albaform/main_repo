export default function getDday(recruitmentEndDate: string): string {
    const today = new Date();
    const endDate = new Date(recruitmentEndDate);

    // 오늘 날짜의 시간을 00:00:00으로 리셋
    today.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return '마감';
    if (diffDays === 0) return 'D-DAY';
    return `D-${diffDays}`;
}
