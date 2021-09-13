export const camelToTitle = (camel: string) => camel.substr(0, 1).toUpperCase() + camel.substr(1).replace(/([A-Z])/g, ' $1');
export const toTitle = (str: string) => str.replace(/\b(.)/g, r => r.toUpperCase());

export const upperSnakeToTitle = (snake: string) => snake.substr(0, 1) + snake.substr(1).toLowerCase().replace(/(_[a-z])/g, r => ' '+r.substr(1).toUpperCase())

export const limitedSplit = (str: string, sep: RegExp, n: number) => {
  const out = [];
  while(n--) out.push(str.slice(sep.lastIndex, sep.exec(str)?.index));
  out.push(str.slice(sep.lastIndex));
  return out;
}
