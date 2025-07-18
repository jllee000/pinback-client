import { useEffect, useState } from 'react';
import { Icon } from '@pinback/design-system/icons';
import { cva } from 'class-variance-authority';

const categoryDropdownVariants = cva('', {
  variants: {
    size: {
      large: 'w-[32.7rem] ',
      medium: 'w-[26rem] ',
    },
  },
  defaultVariants: {
    size: 'large',
  },
});

const categoryFontVariants = cva('text-black', {
  variants: {
    size: {
      large: 'body2-m',
      medium: 'sub7-sb',
    },
  },
  defaultVariants: {
    size: 'large',
  },
});
interface CategoryDropDownProps {
  size?: 'large' | 'medium';
  categories: string[];
}

interface CategoryDropDownProps {
  size?: 'large' | 'medium';
  categories: string[];
  onSelect?: (value: string) => void;
}

const CategoryDropDown = ({
  size,
  categories,
  onSelect,
}: CategoryDropDownProps) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [categories]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setIsDropDownOpen(false);
    onSelect?.(category);
  };

  return (
    <div className={categoryDropdownVariants({ size })}>
      <div
        onClick={() => setIsDropDownOpen((prev) => !prev)}
        className={`${
          isDropDownOpen ? 'border-main400' : 'border-gray-100'
        } flex w-full items-center justify-between rounded-[1rem] border border-solid bg-white px-[2rem] py-[1rem]`}
      >
        <div className={categoryFontVariants({ size })}>{selectedCategory}</div>
        <span>
          <Icon
            name="down_icon"
            width={16}
            height={16}
            className={`transition-transform duration-300 ${isDropDownOpen ? 'rotate-180' : 'rotate-0'}`}
          />
        </span>
      </div>
      {isDropDownOpen && (
        <div
          className={`absolute mt-[1rem] h-[21.9rem] ${categoryDropdownVariants({ size })} rounded-[1rem] bg-white py-[2rem] pl-[1.4rem] pr-[1.4rem] shadow-[6px_10px_16px_8px_rgba(0,0,0,0.03)]`}
        >
          <div className="flex h-[14.8rem] flex-col gap-[0.5rem] overflow-y-auto overflow-x-hidden">
            {categories.map((category, index) => (
              <div
                className="hover:bg-main200 group flex cursor-pointer items-center justify-between rounded-[0.3rem] p-[0.6rem] hover:text-white"
                key={`${category}-${index}`}
                onClick={() => handleCategoryClick(category)}
              >
                <span
                  className={`${categoryFontVariants({ size })} group-hover:text-white`}
                >
                  {category}
                </span>
                <div
                  className="relative h-[1.8rem] w-[1.8rem]"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect?.('edit');
                    setIsDropDownOpen(false);
                  }}
                >
                  <Icon
                    name="default_order"
                    width={18}
                    height={18}
                    className="absolute left-0 top-0 group-hover:hidden"
                  />
                  <Icon
                    name="white_order"
                    width={18}
                    height={18}
                    className="absolute left-0 top-0 hidden group-hover:block"
                  />
                </div>
              </div>
            ))}
          </div>

          <p
            className="mt-[1rem] flex items-center gap-[0.5rem]"
            onClick={() => {
              setIsDropDownOpen(false);
              onSelect?.('create');
            }}
          >
            <Icon name="plus_icon" width={18} height={18} />
            <span
              className={`text-main400 cursor-pointer ${categoryFontVariants({ size })}`}
            >
              새로운 카테고리 추가하기
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryDropDown;
