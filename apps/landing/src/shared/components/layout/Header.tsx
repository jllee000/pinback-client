import logo from '../../../assets/brand/logo.svg';
import Button from '../Button';

const Header = () => {
  return (
    <header className="z-100 fixed left-1/2 top-0 flex h-[7.4rem] w-[1440px] -translate-x-1/2 items-center justify-between px-[6rem] pb-[1.7rem] pt-[2.5rem]">
      <img src={logo} className="h-[3.2rem] w-[12.4rem]" alt="로고" />
      <Button
        text="다운로드"
        color="black"
        fontSize="m"
        width={170}
        height={58}
        onClick={() => {
          window.open(
            'https://chrome.google.com/webstore/detail/pinback/your-extension-id',
            '_blank'
          );
        }}
      />
    </header>
  );
};

export default Header;
