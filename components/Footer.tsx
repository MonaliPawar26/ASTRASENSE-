import React from 'react';
import { TEAM_NAME, TEAM_MEMBERS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">ASTRASENSE</h3>
            <p className="text-sm">
              AI-Powered Early Hazard & Environmental Risk Detection.
              Empowering agencies with real-time satellite intelligence.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Team {TEAM_NAME}</h3>
            <ul className="space-y-2 text-sm">
              {TEAM_MEMBERS.map((member) => (
                <li key={member.email} className="flex justify-between">
                  <span>{member.name}</span>
                  <span className="text-slate-600">{member.branch}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact</h3>
            <p className="text-sm">Hindi Seva Mandal Shri Sant Gadge Baba College of Engineering and Technology</p>
            <p className="text-sm mt-2">support@astrasense.ai</p>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} ShadowHack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;