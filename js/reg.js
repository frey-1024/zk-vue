/*匹配{{}} */
export const textRE = /\{\{(.*)\}\}/;
/*匹配v- */
export const normalDirRE = /^v-/;
/*匹配v-、@以及:*/
export const dirRE = /^v-|^@|^:/
/*匹配v-bind以及:*/
export const bindRE = /^:|^v-bind:/;
/*匹配@以及v-on，绑定事件 */
export const onRE = /^@|^v-on:/;