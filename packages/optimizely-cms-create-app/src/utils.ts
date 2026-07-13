import { execSync } from 'node:child_process';

export function exec(command: string, cwd: string, options?: { interactive?: boolean }): void {
  execSync(command, { cwd, stdio: options?.interactive ? 'inherit' : 'pipe' });
}

export function isValidProjectName(name: string): boolean {
  return /^[a-z0-9-]+$/.test(name);
}
