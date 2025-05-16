import router from "@/router/index";

// 白名单
const commonList = [
  "/pc",
  "/about",
  "/main",
  "/demo",
  "admin",
  "/jsmap",
  "/user",
  "/applist",
]; //自定义定义白名单

const whiteListpc = ["/register", "/login"]; //pc白名单
const whiteList = [...commonList, ...whiteListpc]; //所有白名单校验

router.beforeEach((to, _from, next) => {
  // 将所有的Pc页面添加进入白名单---未采用
  // 1 在免登录白名单--或者有token，直接进入--不检测
  // 2 没token验证去的地方
  // 3 没token验证--去的地方admin---去login
  // 4 没token验证--去的地方pc子页面---PC子页面进入
  // 5 其他进入pc主页面

  if (whiteList.indexOf(to.path) !== -1 || localStorage.getItem("login")) {
    console.log("白名单或者token账号进入1!");
    next();
  } else if (to.name == "admin") {
    next("/login");
  } else if (to.matched.length != 0) {
    if (to.matched.map((item) => item.name).indexOf("pc") != -1) {
      console.log("PC子页面进入!");
      next();
    } else {
      next("/pc");
    }
  } else {
    console.log("其他进入pc主页面5!");
    next("/pc");
  }
});

router.afterEach(() => {
  console.log("路由加载完成！");
});
