/*
 * action 类型
 */
//增加
export const INCREASE = 'INCREASE';
//减少
export const SUBTRACT = 'SUBTRACT';
//商品
export const SHOP = 'SHOP';
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