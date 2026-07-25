import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { RoleSwitcherBar } from './components/layout/RoleSwitcherBar';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileWorkspaceBar } from './components/layout/MobileWorkspaceBar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/UI/ToastContainer';

// Public Pages
import { Hero } from './components/public/Hero';
import { FocusAreas } from './components/public/FocusAreas';
import { FounderSpotlight } from './components/public/FounderSpotlight';
import { ExecGrid } from './components/public/ExecGrid';
import { ProjectShowcase } from './components/public/ProjectShowcase';
import { PartnershipsModal } from './components/public/PartnershipsModal';
import { PublicationsArchive } from './components/public/PublicationsArchive';

// Dedicated Auth Pages
import { LoginView } from './components/auth/LoginView';
import { RegisterView } from './components/auth/RegisterView';
import { ForgotPasswordView } from './components/auth/ForgotPasswordView';

// Member Views
import { MemberDashboard } from './components/member/MemberDashboard';
import { MyGroupView } from './components/member/MyGroupView';
import { MemberProfile } from './components/member/MemberProfile';
import { ResearchWorkspace } from './components/member/ResearchWorkspace';
import { ProposalForm } from './components/member/ProposalForm';
import { BuildWorkspace } from './components/member/BuildWorkspace';
import { PublishingCompiler } from './components/member/PublishingCompiler';
import { LeaderboardView } from './components/member/LeaderboardView';
import { BountyBoard } from './components/member/BountyBoard';
import { EventsCalendar } from './components/member/EventsCalendar';
import { MemberDirectory } from './components/member/MemberDirectory';

// Admin Views
import { AdminOverview } from './components/admin/AdminOverview';
import { PlacementEngine } from './components/admin/PlacementEngine';
import { ProposalReviewQueue } from './components/admin/ProposalReviewQueue';
import { ContentManager } from './components/admin/ContentManager';

const AppContent = () => {
  const { activeTab, userRole } = useApp();

  const renderMainContent = () => {
    switch (activeTab) {
      // Public Views
      case 'home':
        return (
          <div className="space-y-16">
            <Hero />
            <FocusAreas />
            <FounderSpotlight />
            <ExecGrid />
            <ProjectShowcase />
            <PartnershipsModal />
            <PublicationsArchive />
          </div>
        );
      case 'about':
        return (
          <div className="space-y-12">
            <FounderSpotlight />
            <FocusAreas />
          </div>
        );
      case 'executives':
        return <ExecGrid />;
      case 'showcase':
        return <ProjectShowcase />;
      case 'partnerships':
        return <PartnershipsModal />;
      case 'publications':
        return <PublicationsArchive />;

      // Dedicated Auth Views
      case 'login':
        return <LoginView />;
      case 'register':
        return <RegisterView />;
      case 'forgot_password':
        return <ForgotPasswordView />;

      // Member Views
      case 'dashboard':
        return <MemberDashboard />;
      case 'mygroup':
        return <MyGroupView />;
      case 'profile':
        return <MemberProfile />;
      case 'research':
        return <ResearchWorkspace />;
      case 'proposal':
        return <ProposalForm />;
      case 'build':
        return <BuildWorkspace />;
      case 'publish':
        return <PublishingCompiler />;
      case 'leaderboard':
        return <LeaderboardView />;
      case 'bounties':
        return <BountyBoard />;
      case 'events':
        return <EventsCalendar />;
      case 'directory':
        return <MemberDirectory />;

      // Admin Views
      case 'admin_overview':
        return <AdminOverview />;
      case 'admin_placement':
        return <PlacementEngine />;
      case 'admin_proposals':
        return <ProposalReviewQueue />;
      case 'admin_content':
        return <ContentManager />;

      default:
        return <Hero />;
    }
  };

  const isWorkspaceView = [
    'dashboard', 'mygroup', 'profile', 'research', 'proposal', 'build', 'publish',
    'leaderboard', 'bounties', 'events', 'directory',
    'admin_overview', 'admin_placement', 'admin_proposals', 'admin_content'
  ].includes(activeTab);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 selection:bg-emerald-600 selection:text-white pt-20">
      {/* Top Fixed Header */}
      <Navbar />

      {/* Main Container */}
      <div className={`flex-1 w-full ${isWorkspaceView ? 'flex flex-col md:flex-row min-h-[calc(100vh-5rem)]' : 'px-0 py-0'}`}>
        {isWorkspaceView && <Sidebar />}
        <main className={`flex-1 min-w-0 ${isWorkspaceView ? 'p-4 sm:p-8 max-w-full' : ''}`}>
          {isWorkspaceView && <MobileWorkspaceBar />}
          {renderMainContent()}
        </main>
      </div>

      {/* Public Footer (Hidden in Dashboard / Workspace Views) */}
      {!isWorkspaceView && <Footer />}

      {/* Custom Alert Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
