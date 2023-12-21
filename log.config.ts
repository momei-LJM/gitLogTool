import dayjs from "dayjs";
import { defineConfig } from "./utils/index.ts";

export default defineConfig({
  paths: [
    "C:/jc_project/dc2.4.0/imp-web",
    "C:/jc_project/dc2.4.0/imp-h5",
    "C:/jc_project/imp-web",
    "C:/jc_project/imp-h5",
  ],
  author: "lujiamu",
  since: dayjs().startOf("week").valueOf(),
});
