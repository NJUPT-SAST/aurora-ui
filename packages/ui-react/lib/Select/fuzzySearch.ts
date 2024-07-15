import type { OptionProps } from './Select';

function fuzzySearch(optionsList: OptionProps[], searchTerm: string): OptionProps[] {
  const regex = new RegExp(searchTerm, 'i');
  return optionsList.filter((option) => regex.test(option.label));
}

export default fuzzySearch;
