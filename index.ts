import { simpleGit, SimpleGit, SimpleGitOptions } from "simple-git";

const options: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(),
  binary: "git",
  maxConcurrentProcesses: 6,
  trimmed: false,
};

// when setting all options in a single object
// const git: SimpleGit = simpleGit(options);

// or split out the baseDir, supported for backward compatibility

const git: SimpleGit = simpleGit("C:/jc_project/dc2.4.0/imp-web", {
  binary: "git",
});
const res = git.log();
console.log(111, res);
