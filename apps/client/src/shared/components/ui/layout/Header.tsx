import { Icon } from '@pinback/design-system/icons';
const Header = () => {
  return (
    <header className="bg-background fixed left-0 top-0 flex h-[6rem] w-full max-w-[144rem] items-center pl-[6rem]">
      <Icon
        name="main_logo"
        width={96}
        height={23}
        className="mb-[2.6rem] mt-[2.5rem]"
      />
    </header>
  );
};

export default Header;
