import logo from '@assets/brand/logo.svg';

const Header = () => {
  return (
    <header className="bg-background fixed left-1/2 top-0 z-50 flex h-[7.4rem] w-[1440px] -translate-x-1/2 items-center px-[6rem] pb-[1.7rem] pt-[2.5rem]">
      <img src={logo} className="h-[3.2rem] w-[12.4rem]" alt="로고" />
    </header>
  );
};

export default Header;
