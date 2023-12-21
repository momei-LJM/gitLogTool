import dayjs from "dayjs";
import { simpleGit, SimpleGit, SimpleGitOptions } from "simple-git";

import logConfig from "./log.config.ts";
import c from "child_process";
import chalk from "chalk";
import express from "express";
const start = async (proPath: string) => {
  const git: SimpleGit = simpleGit(proPath, {
    binary: "git",
  });
  const allCommits = await git.log({ strictDate: true });
  const commits = allCommits.all.filter(
    (i) =>
      i.author_name === logConfig.author &&
      dayjs(i.date).valueOf() >= logConfig.since
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
  const logs = await Promise.all(logConfig.paths.map((i) => start(i)));
  return logs;
};

let app = express();

app.set("view engine", "ejs");

app.get("/", async (req: any, res: any) => {
  const logs = await startTask();
  res.render("index", { logs });
});

const PORT = 4000;
const HOST = "localhost";
const log = console.log;

app.listen(PORT, () => {
  log(
    chalk.green("server is ready!") +
      "：" +
      chalk.hex("#8b25eb").underline(`http://${HOST}:${PORT}`)
  );
  c.exec(`start  http://${HOST}:${PORT}`);
});
