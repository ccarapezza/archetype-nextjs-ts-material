import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { ChevronRight, Close, ExpandMore } from '@mui/icons-material';
import { Box } from '@mui/material';

interface Props {
  title: string;
  onClose?: () => void;
  onMinimize?: () => void;
  children: React.ReactNode;
  className?: string;
  color?: string;
}

const FloatingWindow: React.FC<Props> = ({ title, onClose, onMinimize, children, className, color = "blue" }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (onMinimize) {
      onMinimize();
    }
  };

  const handleClose = () => {
    setIsClosed(true);
    if (onClose) {
      onClose();
    }
  };

  if (isClosed) {
    return null;
  }

  const rootClasses = `fixed bottom-8 right-8 z-100 shadow-lg transition-transform ease-out transform rounded ${
    isMinimized ? 'translate-y-8' : ''
  } ${className}`;

  const headerClasses = `flex items-center justify-between px-4 py-2 bg-${color}-500 text-white rounded-t`;

  const contentClasses = 'px-4 py-2';

  return (
    <Paper className={rootClasses} elevation={3}>
      <div className={headerClasses}>
        <Typography variant="h6" className='mr-5'>{title}</Typography>
        <Box>
          {isMinimized ? (
            <IconButton aria-label="Expand" onClick={handleMinimize}>
              <ExpandMore />
            </IconButton>
          ) : (
            <IconButton aria-label="Minimize" onClick={handleMinimize}>
              <ChevronRight />
            </IconButton>
          )}
          <IconButton aria-label="Close" onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
      </div>
      {!isMinimized && <div className={contentClasses}>{children}</div>}
    </Paper>
  );
}

export default FloatingWindow;