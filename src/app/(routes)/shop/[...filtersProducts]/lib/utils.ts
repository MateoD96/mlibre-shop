export const replacePageInUrl = (pathname: string, page: number) => {
  const p = pathname.match(/indexPage_\d+/g);
  let newUrl = pathname;
  if (p) {
    newUrl = newUrl.replace(/indexPage_\d+/g, `indexPage_${page}`);
  } else {
    newUrl = newUrl.concat(`/indexPage_${page}`);
  }
  return newUrl;
};
