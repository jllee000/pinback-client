import { Link } from 'react-router-dom';
import { ROUTES_CONFIG } from '@routes/routesConfig';

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-gray900 mb-4 text-6xl font-bold">404</h1>
        <h2 className="text-gray700 mb-6 text-2xl font-semibold">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-gray600 mb-8 max-w-md">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다. URL을 다시
          확인해 주세요.
        </p>
        <Link
          to={ROUTES_CONFIG.dashboard.path}
          className="bg-main400 hover:bg-main300 sub4-sb inline-block rounded-lg px-6 py-3 text-white transition-colors"
        >
          대시보드로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 
