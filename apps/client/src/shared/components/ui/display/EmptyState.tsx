



interface EmptyStateProps {
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
    <div className={`inline-flex flex-col justify-start items-center gap-0 ${className || ''}`}>
      <div className="text-black w-[461px] h-[60px] head1 m-0 p-0 flex items-center justify-center text-center whitespace-nowrap">
        {title}
      </div>
      <div className="text-gray-600 w-[461px] h-[33px] sub2-m m-0 p-0 flex items-center justify-center text-center whitespace-nowrap">
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