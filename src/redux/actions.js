/*
 * action 类型
 */
export const INCREASE = 'INCREASE';
export const SUBTRACT = 'SUBTRACT';
/*
 * 其它的常量
 */
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};
/*
 * action 创建函数
 */
export function increse() {
  return { type: INCREASE};
}
export function subtarct() {
  return { type: SUBTRACT};
}