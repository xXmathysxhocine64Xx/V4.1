#!/usr/bin/env node
const { spawn } = require('child_process');

const child = spawn('yarn', ['start'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    PORT: '3000',
    HOSTNAME: '0.0.0.0'
  },
  cwd: '/app'
});

child.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
  process.exit(code);
});

child.on('error', (error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

// Handle signals
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  child.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully...');
  child.kill('SIGINT');
});