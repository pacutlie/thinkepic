export default function Loader({ src, width, quality }) {
  return `${src}?w=${width}&q=${quality || 75}`;
  // const url = new URL('https://drive.google.com/file/d/1DRTrUE21ntCsXFoBZ0p5Pn4muwIrQBzR/preview?q=75');
  // return url.href;
}
