export function filterHTMLTags(text) {
  return text.replace(/<\/?[^>]+(>|$)/g, "");
}

export function toDate(date) {
  return new Date(date).toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

export function toSlug(text, separator = "-") {
  return text
    .trim()
    .toLowerCase()
    .replace(/[\W_]+/g, separator)
    .replace(/^-+|-+$/g, "");
}

export function calculateTimeAgo(updated_at) {
  const createdTime = new Date(updated_at);
  const currentTime = new Date();
  const diffInMilliseconds = currentTime - createdTime;
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays === 0) {
    if (diffInHours === 0) {
      return `${diffInMinutes} menit yang lalu`;
    } else {
      return `${diffInHours} jam yang lalu`;
    }
  } else if (diffInDays === 1) {
    return "1 hari yang lalu";
  } else {
    return `${diffInDays} hari yang lalu`;
  }
}

export function convertToText(text) {
  return <div dangerouslySetInnerHTML={{ __html: `${text}` }} />;
}

export function textTruncate(text, maxLength = 15) {
  if (text.length <= maxLength) return <div dangerouslySetInnerHTML={{ __html: `${text}` }} />;

  const lastSpaceIndex = text.lastIndexOf(" ", maxLength);

  text = lastSpaceIndex !== -1 ? text.substring(0, lastSpaceIndex) + ".." : text.substring(0, maxLength) + "..";

  return <div dangerouslySetInnerHTML={{ __html: `${text}` }} />;
}

export function getFileExtension(fileName) {
  return fileName.substring(fileName.lastIndexOf(".") + 1);
}

export function toEmbedUrl(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[2].length === 11 ? match[2] : null;

  return `//www.youtube.com/embed/${videoId}`;
}
