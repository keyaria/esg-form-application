export function getText(details: any) {
  const standardValue = details.standardValue ? 'ISO 14064-3' : '';
  let standardValueOther = '';
  if (details.standardValueOther === true) {
    standardValueOther = details.standardValueOtherText;
  }

  return [standardValue, standardValueOther];
}
