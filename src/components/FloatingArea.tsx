import React from 'react';

interface Props {
  children: React.ReactNode;
}

const FloatingArea: React.FC<Props> = ({children}) => {

  return (
    <div className="fixed bottom-8 right-8 z-100 flex flex-row items-end gap-x-4 bg-transparent">
      {children}
    </div>
  );
}

export default FloatingArea;