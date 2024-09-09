import type { OptionProps } from './Select';

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // 转义正则表达式中的特殊字符
}

function fuzzySearch(optionsList: OptionProps[], searchTerm: string): OptionProps[] {
  const escapedTerm = escapeRegExp(searchTerm); // 先对搜索词进行转义
  const regex = new RegExp(escapedTerm, 'i'); // 使用转义后的搜索词
  return optionsList.filter((option) => regex.test(option.label));
}

export default fuzzySearch;
