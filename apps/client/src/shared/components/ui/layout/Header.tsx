import logo from '@assets/brand/logo.svg';

const Header = () => {
  return (
    <header className="bg-background fixed left-0 top-0 flex h-[6rem] max-w-[144rem] items-center pl-[6rem]">
      <img
        src={logo}
        className="mb-[2.6rem] mt-[2.5rem] h-[2.3rem] w-[9.6rem]"
        alt="로고"
      />
    </header>
  );
};

export default Header;
