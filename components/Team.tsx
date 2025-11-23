import React from 'react';
import { TEAM_MEMBERS, TEAM_NAME } from '../constants';
import { Mail, Phone, Award } from 'lucide-react';

const Team: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 p-6 text-slate-100 flex items-center justify-center">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 mb-4">
            Meet Team {TEAM_NAME}
          </h1>
          <p className="text-slate-400 text-lg">
            Hindi Seva Mandal Shri Sant Gadge Baba College of Engineering and Technology
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-900/30 border border-indigo-500/30 rounded-full">
            <Award className="text-yellow-400 w-5 h-5" />
            <span className="text-indigo-200 text-sm font-medium">Theme: AI/ML for space data interpretation</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM_MEMBERS.map((member, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-2xl bg-slate-800 p-8 shadow-xl transition-all hover:shadow-2xl hover:shadow-indigo-500/10 border border-slate-700/50 hover:border-indigo-500/50"
            >
              <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-indigo-500/10 blur-xl group-hover:bg-indigo-500/20 transition-all"></div>
              
              <div className="relative z-10">
                <div className="h-12 w-12 rounded-lg bg-indigo-600 flex items-center justify-center text-xl font-bold text-white mb-6">
                  {member.name.charAt(0)}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-indigo-400 font-medium text-sm mb-6">{member.branch}</p>
                
                <div className="space-y-3">
                  <a href={`mailto:${member.email}`} className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
                    <Mail className="h-4 w-4" />
                    {member.email}
                  </a>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <Phone className="h-4 w-4" />
                    {member.contact}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;