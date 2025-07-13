export interface EmptyStateProps {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  className?: string;
}

const EmptyState = ({
  title,
  description,
  image,
  imageAlt = '빈 상태 이미지',
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={`inline-flex flex-col items-center justify-start gap-0 ${className || ''}`}
    >
      <div className="head1 m-0 flex h-[60px] w-[461px] items-center justify-center whitespace-nowrap p-0 text-center text-gray800">
        {title}
      </div>
      <div className="sub2-m text-gray600 m-0 flex h-[33px] w-[461px] items-center justify-center whitespace-nowrap p-0 text-center">
        {description}
      </div>
      {image && (
        <div className="mt-[38px]">
          <img src={image} alt={imageAlt} className="h-auto w-auto" />
        </div>
      )}
    </div>
  );
};

export default EmptyState;
