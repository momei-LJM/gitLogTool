type TConfig = {
  /**项目地址 */
  paths: string[];
  /**git账号 */
  author: string;
  /**开始时间 */
  since: number;
};
export const defineConfig = (option: TConfig) => option;
