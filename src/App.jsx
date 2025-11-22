import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, ArrowLeft, Code, Play, X } from 'lucide-react';

// 简单的本地存储键
const STORAGE_KEY = 'ai_apps_data';

export default function App() {
  const [view, setView] = useState('home'); // home, install, run
  const [apps, setApps] = useState([]);
  const [activeApp, setActiveApp] = useState(null);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setApps(JSON.parse(saved));
  }, []);

  const saveApp = () => {
    if (!name || !code) return;
    // 这里预留了广告位逻辑：在保存前弹窗
    if(!window.confirm("观看广告以生成应用？(模拟)")) return;
    
    const newApp = { id: Date.now(), name, code, color: '#'+Math.floor(Math.random()*16777215).toString(16) };
    const newList = [newApp, ...apps];
    setApps(newList);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    setName(''); setCode('');
    setView('home');
  };

  return (
    <div className="h-screen w-screen bg-slate-900 text-white flex flex-col overflow-hidden font-sans">
      {/* 顶部栏 */}
      {view !== 'run' && (
        <div className="p-4 bg-slate-800 shadow-md flex justify-between items-center z-10">
          <span className="font-bold text-lg flex items-center gap-2">
            <Code size={20} className="text-blue-400"/> AI 运行器
          </span>
        </div>
      )}

      {/* 主内容 */}
      <div className="flex-1 overflow-y-auto relative p-4">
        {/* 首页 */}
        {view === 'home' && (
          <div className="space-y-4">
            {/* 广告位 Banner */}
            <div className="bg-slate-800 h-16 rounded flex items-center justify-center text-slate-500 text-xs border border-slate-700">
              [Google AdMob Banner 广告位]
            </div>

            {apps.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                暂无应用，点击右下角 + 号添加
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {apps.map(app => (
                  <div key={app.id} onClick={() => {setActiveApp(app); setView('run')}} className="flex flex-col items-center gap-1">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg" style={{background: app.color}}>
                      {app.name[0]}
                    </div>
                    <span className="text-xs truncate w-full text-center">{app.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 安装页 */}
        {view === 'install' && (
          <div className="flex flex-col gap-4 h-full">
             <button onClick={() => setView('home')} className="flex items-center text-slate-400"><ArrowLeft size={16}/> 返回</button>
             <input className="bg-slate-800 p-3 rounded text-white outline-none border border-slate-700" placeholder="应用名称" value={name} onChange={e=>setName(e.target.value)} />
             <textarea className="flex-1 bg-slate-800 p-3 rounded font-mono text-xs outline-none border border-slate-700" placeholder="粘贴 HTML 代码..." value={code} onChange={e=>setCode(e.target.value)} />
             <button onClick={saveApp} className="bg-blue-600 p-4 rounded-xl font-bold text-white shadow-lg flex justify-center items-center gap-2">
               <Save size={20}/> 生成 APP
             </button>
          </div>
        )}

        {/* 运行页 */}
        {view === 'run' && activeApp && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col">
            <iframe srcDoc={activeApp.code} className="flex-1 w-full border-none" sandbox="allow-scripts allow-forms allow-popups allow-modals allow-same-origin"/>
            <button onClick={() => setView('home')} className="absolute bottom-8 right-4 bg-black/30 backdrop-blur p-3 rounded-full text-white shadow-xl z-50">
              <X size={24}/>
            </button>
          </div>
        )}
      </div>

      {/* 悬浮按钮 */}
      {view === 'home' && (
        <button onClick={() => setView('install')} className="absolute bottom-8 right-6 bg-blue-600 w-14 h-14 rounded-full flex items-center justify-center shadow-xl text-white z-20">
          <Plus size={32}/>
        </button>
      )}
    </div>
  );
}

