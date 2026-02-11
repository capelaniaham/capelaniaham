
import React, { useState, useEffect, useMemo } from 'react';
import Layout from './components/Layout';
import Login from './components/Login';
import ConfirmationModal from './components/Shared/ConfirmationModal';
import MainContent from './components/MainContent';
import AIAssistant from './components/AIAssistant';
import { Unit } from './types';
import { useApp } from './contexts/AppContext';
import { useAuth } from './contexts/AuthContext';
import { useAppFlow } from './hooks/useAppFlow';

const App: React.FC = () => {
  const {
    users, bibleStudies, bibleClasses, smallGroups, staffVisits,
    proSectors, config, isSyncing, isConnected, loadFromCloud, saveToCloud, saveRecord, deleteRecord
  } = useApp();

  const { isAuthenticated, currentUser, login, logout, updateCurrentUser, loginError } = useAuth();

  const {
    activeTab, isPending, setActiveTab,
    currentUnit, setCurrentUnit,
    editingItem, setEditingItem,
    itemToDelete, setItemToDelete,
    handleSaveItem, confirmDeletion, getVisibleHistory
  } = useAppFlow({ currentUser, saveRecord, deleteRecord });

  const [visitedTabs, setVisitedTabs] = useState<Set<string>>(new Set(['dashboard']));

  useEffect(() => {
    if (activeTab) {
      setVisitedTabs(prev => new Set(prev).add(activeTab));
    }
  }, [activeTab]);

  const unitSectors = useMemo(() => 
    proSectors.filter(s => s.unit === currentUnit).map(s => s.name).sort(), 
  [proSectors, currentUnit]);

  if (!isAuthenticated || !currentUser) {
    return <Login onLogin={login} isSyncing={isSyncing} errorMsg={loginError} isConnected={isConnected} config={config} />;
  }

  const renderContent = () => {
    if (activeTab === 'ai-assistant') {
      return <AIAssistant />;
    }
    
    return (
      <MainContent 
        activeTab={activeTab}
        visitedTabs={visitedTabs}
        currentUser={currentUser}
        users={users}
        bibleStudies={bibleStudies}
        bibleClasses={bibleClasses}
        smallGroups={smallGroups}
        staffVisits={staffVisits}
        config={config}
        currentUnit={currentUnit}
        unitSectors={unitSectors}
        editingItem={editingItem}
        isLoading={isSyncing}
        setActiveTab={setActiveTab}
        setCurrentUnit={setCurrentUnit}
        setEditingItem={setEditingItem}
        setItemToDelete={setItemToDelete}
        saveToCloud={saveToCloud}
        saveRecord={saveRecord}
        updateCurrentUser={updateCurrentUser}
        handleSaveItem={handleSaveItem}
        getVisibleHistory={getVisibleHistory}
        loadFromCloud={loadFromCloud}
      />
    );
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} userRole={currentUser.role} isSyncing={isSyncing} isConnected={isConnected} config={config} onLogout={logout}>
      <div className="max-w-7xl mx-auto px-2 md:px-0 relative">
        
        {isPending && (
          <div className="fixed top-0 right-0 p-8 z-[200] animate-pulse">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          </div>
        )}

        <ConfirmationModal 
          isOpen={!!itemToDelete}
          title="Excluir Registro?"
          message="Esta ação é permanente e não pode ser desfeita."
          onConfirm={confirmDeletion}
          onCancel={() => setItemToDelete(null)}
        />

        {['bibleStudy', 'bibleClass', 'smallGroup', 'staffVisit'].includes(activeTab) && (
          <div className="mb-8 flex bg-white p-1.5 rounded-full shadow-sm border border-slate-100 max-w-fit mx-auto md:mx-0">
            {[Unit.HAB, Unit.HABA].map(u => (
              <button 
                key={u} 
                onClick={() => setCurrentUnit(u)} 
                className={`px-8 py-2.5 rounded-full font-black text-[10px] uppercase transition-all ${currentUnit === u ? 'text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`} 
                style={{ backgroundColor: currentUnit === u ? (config.primaryColor || '#005a9c') : undefined }}
              >
                Unidade {u}
              </button>
            ))}
          </div>
        )}
        
        {renderContent()}

      </div>
    </Layout>
  );
};

export default App;
