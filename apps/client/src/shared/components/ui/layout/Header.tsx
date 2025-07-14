import logo from '@assets/brand/logo.svg';

const Header = () => {
  return (
    <header className="bg-background fixed left-0 top-0 flex h-[6rem] w-full max-w-[144rem] items-center px-[6rem] pb-[1.7rem] pt-[2.5rem]">
      <img src={logo} className="h-[3.2rem] w-[12.4rem]" alt="로고" />
    </header>
  );
};

export default Header;
