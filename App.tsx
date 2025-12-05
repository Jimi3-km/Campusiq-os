
import React, { useState } from 'react';
import { type AppTab } from './types';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import CampusPulseDashboard from './components/CampusPulseDashboard';
import MarketplaceDashboard from './components/MarketplaceDashboard';
import StudyIQDashboard from './components/StudyIQDashboard';
import FinIQDashboard from './components/FinIQDashboard';
import PerformanceDashboard from './components/PerformanceDashboard';
import FloatingAiButton from './components/FloatingAiButton';


const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('Pulse');

  const renderContent = () => {
    switch (activeTab) {
      case 'Pulse':
        return <CampusPulseDashboard />;
      case 'Market':
        return <MarketplaceDashboard />;
      case 'StudyIQ':
        return <StudyIQDashboard />;
      case 'FinIQ':
        return <FinIQDashboard />;
      case 'Performance':
        return <PerformanceDashboard />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-brand-gray-600">
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
              <p>Please select a different tab.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-brand-gray-50 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 pb-24 max-w-4xl">
        {renderContent()}
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <FloatingAiButton />
    </div>
  );
};

export default App;
