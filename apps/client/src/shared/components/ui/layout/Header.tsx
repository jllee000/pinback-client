import logo from '@assets/brand/logo.svg';

interface HeaderProps {
  bg?: string;
}

const Header = ({ bg = 'bg-background' }: HeaderProps) => {
  return (
    <header
      className={`fixed left-1/2 top-0 z-50 flex h-[7.4rem] w-[1440px] -translate-x-1/2 items-center px-[6rem] pb-[1.7rem] pt-[2.5rem] ${bg}`}
    >
      <img
        src={logo}
        className="h-[3.2rem] w-[12.4rem]"
        alt="로고"
        onClick={() => (window.location.href = 'https://www.pinback.today/')}
      />
    </header>
  );
};

export default Header;
