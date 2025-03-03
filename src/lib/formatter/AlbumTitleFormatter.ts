export default function format(albumTitle: string) {
  const lower: string = albumTitle.toLowerCase();
  const punctionationLess: string = lower.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()''™]/g, '');
  return punctionationLess.replaceAll(' ', '-');
}
