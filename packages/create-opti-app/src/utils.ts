import { execSync } from 'node:child_process';

export function exec(command: string, cwd: string): void {
  execSync(command, { cwd, stdio: 'pipe' });
}

export function isValidProjectName(name: string): boolean {
  return /^[a-z0-9-]+$/.test(name);
}
