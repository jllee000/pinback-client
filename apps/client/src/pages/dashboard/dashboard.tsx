import { Header } from '@shared/components';
import { LevelInfoSection } from '@pages/dashboard/components';
import {
  DailyReminderSection,
  BookmarkSection,
} from '@pages/dashboard/components';
import { useDashboard } from '@pages/dashboard/hooks/useDashboard';
import { mockBookmarkCards, mockCategories } from '@pages/dashboard/mockData';
import ReusableEmptyState from '@shared/components/ui/display/ReusableEmptyState';

const Dashboard = () => {
  const {
    activeCategory,
    isAllViewExpanded,
    handleCategoryClick,
    handleAllViewClick,
  } = useDashboard();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto max-w-[1440px]">
        <div className="px-4">
          <DailyReminderSection />
          <BookmarkSection
            activeCategory={activeCategory}
            categories={mockCategories}
            bookmarks={mockBookmarkCards}
            onCategoryClick={handleCategoryClick}
            onAllViewClick={handleAllViewClick}
            isAllViewExpanded={isAllViewExpanded}
          />
          <section className="mb-8 mt-8">
            <div className="flex justify-center">
              <LevelInfoSection />
            </div>
          </section>

          {/* EmptyState - 치삐 일러스트 프리셋 */}
          <section className="mb-8 mt-8">
            <div className="flex justify-center">
              <ReusableEmptyState preset="information" />
            </div>
          </section>

          {/* EmptyState - url.svg 일러스트 프리셋 */}
          <section className="mb-8 mt-8">
            <div className="mt-8">
              <div className="flex justify-center">
                <ReusableEmptyState preset="url" />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
