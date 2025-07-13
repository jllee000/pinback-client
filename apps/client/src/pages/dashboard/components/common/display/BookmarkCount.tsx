interface BookmarkCountProps {
  totalCount: number;
}

const BookmarkCount = ({ totalCount }: BookmarkCountProps) => {
  return (
    <div className="text-gray800 head4 justify-start self-stretch">
      총 {totalCount}개
    </div>
  );
};

export default BookmarkCount;
