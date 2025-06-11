import { DropdownButton } from './styles';
import { StatusDropdownProps } from './type';

export default function StatusSortDropdown({
  status,
  setStatus,
}: StatusDropdownProps) {
  return (
    <>
      <DropdownButton
        type='button'
        $active={status === ''}
        onClick={() => {
          setStatus('');
        }}
      >
        전체
      </DropdownButton>
      <DropdownButton
        type='button'
        $active={status === 'REJECTED'}
        onClick={() => {
          setStatus('REJECTED');
        }}
      >
        거절
      </DropdownButton>
      <DropdownButton
        type='button'
        $active={status === 'INTERVIEW_PENDING'}
        onClick={() => {
          setStatus('INTERVIEW_PENDING');
        }}
      >
        면접 대기
      </DropdownButton>
      <DropdownButton
        type='button'
        $active={status === 'INTERVIEW_COMPLETED'}
        onClick={() => {
          setStatus('INTERVIEW_COMPLETED');
        }}
      >
        면접 완료
      </DropdownButton>
      <DropdownButton
        type='button'
        $active={status === 'HIRED'}
        onClick={() => {
          setStatus('HIRED');
        }}
      >
        채용 완료
      </DropdownButton>
    </>
  );
}
