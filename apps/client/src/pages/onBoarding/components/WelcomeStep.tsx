interface WelcomeStepProps {
  handleClick: () => void;
}

const WelcomeStep = ({ handleClick }: WelcomeStepProps) => {
  return (
    <>
      <div className="mt-[13.5rem] flex flex-col items-center gap-[3.6rem]">
        <p className="head2">Pinback에 오신 걸 환영해요</p>
        {/* TODO: 사용 동영상으로 변경 예정 */}
        <div className="fixed bottom-0 h-[69.8rem] w-[119.8rem] bg-gray-100"></div>
      </div>
      <button className="btn btn-primary mt-8" onClick={handleClick}>
        토큰 테스트 ㅋㅋ
      </button>
    </>
  );
};

export default WelcomeStep;
