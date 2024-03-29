module.exports = {
  getSlide: "/api/setting/slider/all",
  addSlide: "/api/setting/slider/add",
  updateSlide: "/api/setting/slider/update",
  deleteSlide: "/api/setting/slider/delete",
  saveEmbedVideo: "/api/setting/embed/save",
  getEmbedVideo: "/api/setting/embed/get",
  getTeams: "/api/setting/team/all",
  addTeam: "/api/setting/team/add",
  deleteTeam: "/api/setting/team/delete",
  updateTeam: "/api/setting/team/update",
  getMenu: "/api/menu/all",
  deleteMenu: "/api/menu/remove",
  deleteSubmenu: "/api/submenu/remove",
  updateAbout: "/api/setting/about/save",
  getAbout: "/api/setting/about/get",
  saveTermOfUse: "/api/setting/save",
  getTermOfUse: "/api/setting/get?type=term-of-use",
  savePrivacyPolicy: "/api/setting/save",
  getPrivacyPolicy: "/api/setting/get?type=privacy-policy",
  saveSitemap: "/api/setting/save",
  getSitemap: "/api/setting/get?type=sitemap",
  getHomePost: (param = "") => `/api/post/home?${param}`,
};
