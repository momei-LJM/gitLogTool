import { simpleGit, SimpleGit, SimpleGitOptions } from "simple-git";

const options: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(),
  binary: "git",
  maxConcurrentProcesses: 6,
  trimmed: false,
};

// when setting all options in a single object
const git: SimpleGit = simpleGit(options);

// or split out the baseDir, supported for backward compatibility

// const git: SimpleGit = simpleGit("./", {
//   binary: "git",
// });
const start = async () => {
  const firstHash = await git.firstCommit();
  git.log({ from: firstHash, to: firstHash }, async (res) => {
    console.log(111, res);
  });
};
start();
