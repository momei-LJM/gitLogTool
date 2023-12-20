import dayjs from "dayjs";
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
const paths = [
  "C:/jc_project/dc2.4.0/imp-web",
  "C:/jc_project/dc2.4.0/imp-h5",
  "C:/jc_project/imp-web",
  "C:/jc_project/imp-h5",
];
const from = dayjs().startOf("week").valueOf();
const author = "lujiamu";

// 开始时间

const start = async (proPath: string) => {
  const git: SimpleGit = simpleGit(proPath, {
    binary: "git",
  });
  const allCommits = await git.log({ strictDate: true });
  const commits = allCommits.all.filter(
    (i) => i.author_name === author && dayjs(i.date).valueOf() >= from
  );
  const messages = commits.map((i) => ({
    message: i.message,
    author: i.author_name,
    date: dayjs(i.date).format("YYYY年MM月DD日"),
  }));
  return {
    project: proPath,
    messages,
  };
};

const startTask = async () => {
  const logs = await Promise.all(paths.map((i) => start(i)));
  return logs;
};

let express = require("express");
let app = express();

app.set("view engine", "ejs");

app.get("/", async (req: any, res: any) => {
  const logs = await startTask();
  res.render("index", { logs });
});

app.listen(4000, () => console.log("Example app listening on port 4000!"));
