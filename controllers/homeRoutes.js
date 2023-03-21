const router = require("express").Router();
const { Blog, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const BlogData = await Blog.findAll({ order: [["id", "DESC"]] });

    const displayPosts = BlogData.map((posts) => posts.get({ plain: true }));

    res.render("homepage", {
      title: "Homepage",
      displayPosts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/about", async (req, res) => {
  res.render("about", { title: "About" });
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login", { title: "Login" });
});

router.get("/register", (req, res) => {
  res.render("register", { title: "Sign Up" });
});

router.get("dashboard", (req, res) => {
  res.render("dashboard", { title: Dashboard, loggedIn: req.session.loggedIn });
});

module.exports = router;
