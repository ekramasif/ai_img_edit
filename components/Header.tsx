
import React from 'react';
import { FilePenLine } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-8 sm:px-12 flex justify-between items-center animate-fade-in">
      <div className="flex items-center space-x-2">
        <FilePenLine className="w-6 h-6 text-primary" />
        <h1 className="text-xl font-medium tracking-tight"><a href="#">AI Image Editor</a></h1>
      </div>
      <div className="text-xs text-muted-foreground">
        Created by <a href="http://dendritesoft.com/" target='_blank'>Dendritesoft</a>
      </div>
    </header>
  );
};

export default Header;
