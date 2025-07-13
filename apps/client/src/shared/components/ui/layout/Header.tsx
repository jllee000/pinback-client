import logo from '/src/assets/brand/logo.svg';

const Header = () => {
  return (
    <header className="flex h-[6rem] max-w-[1440px] items-center pl-[6rem]">
      <img
        src={logo}
        className="mb-[2.6rem] mt-[2.5rem] h-[2.3rem] w-[9.6rem]"
        alt="로고"
      />
    </header>
  );
};

export default Header;
