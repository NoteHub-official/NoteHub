(function (e) {
  function t(t) {
    for (var a, o, s = t[0], c = t[1], l = t[2], m = 0, d = []; m < s.length; m++)
      (o = s[m]), Object.prototype.hasOwnProperty.call(n, o) && n[o] && d.push(n[o][0]), (n[o] = 0);
    for (a in c) Object.prototype.hasOwnProperty.call(c, a) && (e[a] = c[a]);
    u && u(t);
    while (d.length) d.shift()();
    return i.push.apply(i, l || []), r();
  }
  function r() {
    for (var e, t = 0; t < i.length; t++) {
      for (var r = i[t], a = !0, s = 1; s < r.length; s++) {
        var c = r[s];
        0 !== n[c] && (a = !1);
      }
      a && (i.splice(t--, 1), (e = o((o.s = r[0]))));
    }
    return e;
  }
  var a = {},
    n = { app: 0 },
    i = [];
  function o(t) {
    if (a[t]) return a[t].exports;
    var r = (a[t] = { i: t, l: !1, exports: {} });
    return e[t].call(r.exports, r, r.exports, o), (r.l = !0), r.exports;
  }
  (o.m = e),
    (o.c = a),
    (o.d = function (e, t, r) {
      o.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (o.r = function (e) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (o.t = function (e, t) {
      if ((1 & t && (e = o(e)), 8 & t)) return e;
      if (4 & t && "object" === typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (o.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var a in e)
          o.d(
            r,
            a,
            function (t) {
              return e[t];
            }.bind(null, a)
          );
      return r;
    }),
    (o.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e["default"];
            }
          : function () {
              return e;
            };
      return o.d(t, "a", t), t;
    }),
    (o.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (o.p = "/");
  var s = (window["webpackJsonp"] = window["webpackJsonp"] || []),
    c = s.push.bind(s);
  (s.push = t), (s = s.slice());
  for (var l = 0; l < s.length; l++) t(s[l]);
  var u = c;
  i.push([0, "chunk-vendors"]), r();
})({
  0: function (e, t, r) {
    e.exports = r("56d7");
  },
  "09e0": function (e, t, r) {},
  1368: function (e, t, r) {},
  "2a74": function (e, t, r) {
    "use strict";
    r.r(t);
    r("159b"), r("d3b7"), r("ddb0"), r("ac1f"), r("5319");
    var a = r("bba4"),
      n = r.n(a),
      i = r("d307"),
      o = {};
    i.keys().forEach(function (e) {
      if ("./index.js" !== e && "./dummy.js" !== e) {
        var t = i(e),
          r = n()(e.replace(/(\.\/|\.js)/g, ""));
        o[r] = t.default || t;
      }
    }),
      (t["default"] = o);
  },
  "2b56": function (e, t, r) {
    "use strict";
    r("09e0");
  },
  "4add": function (e, t, r) {
    "use strict";
    r("f91f");
  },
  "56d7": function (e, t, r) {
    "use strict";
    r.r(t);
    var a = r("1da1"),
      n = (r("e260"), r("e6cf"), r("cca6"), r("a79d"), r("96cf"), r("2b0e")),
      i = function () {
        var e = this,
          t = e.$createElement,
          r = e._self._c || t;
        return r(
          "v-app",
          { style: { background: e.$vuetify.theme.themes[e.theme].background } },
          [
            r(e.navbarName, { tag: "component" }),
            r("v-main", { staticClass: "mx-0 mb-0" }, [r("router-view")], 1),
          ],
          1
        );
      },
      o = [],
      s = function () {
        var e = this,
          t = e.$createElement,
          r = e._self._c || t;
        return r(
          "div",
          [
            r(
              "v-app-bar",
              { staticClass: "white--text", attrs: { app: "", color: "appbar", height: 50 } },
              [
                r(
                  "v-icon",
                  {
                    staticClass: "white--text",
                    attrs: { size: 28 },
                    on: {
                      click: function (t) {
                        e.showDrawer = !e.showDrawer;
                      },
                    },
                  },
                  [e._v("menu")]
                ),
                r("v-spacer"),
                r(
                  "v-btn",
                  {
                    staticClass: "ma-2",
                    attrs: { text: "", icon: "", color: "white" },
                    on: {
                      click: function (t) {
                        e.$vuetify.theme.dark = !e.$vuetify.theme.dark;
                      },
                    },
                  },
                  [
                    "dark" !== e.theme
                      ? r(
                          "v-tooltip",
                          {
                            attrs: { bottom: "" },
                            scopedSlots: e._u(
                              [
                                {
                                  key: "activator",
                                  fn: function (t) {
                                    var a = t.on,
                                      n = t.attrs;
                                    return [
                                      r(
                                        "v-icon",
                                        e._g(
                                          e._b(
                                            {
                                              staticClass: "white--text mx-2",
                                              attrs: { size: 20 },
                                            },
                                            "v-icon",
                                            n,
                                            !1
                                          ),
                                          a
                                        ),
                                        [e._v("brightness_medium")]
                                      ),
                                    ];
                                  },
                                },
                              ],
                              null,
                              !1,
                              2557369445
                            ),
                          },
                          [r("span", [e._v("dark mode")])]
                        )
                      : r(
                          "v-tooltip",
                          {
                            attrs: { bottom: "" },
                            scopedSlots: e._u([
                              {
                                key: "activator",
                                fn: function (t) {
                                  var a = t.on,
                                    n = t.attrs;
                                  return [
                                    r(
                                      "v-icon",
                                      e._g(
                                        e._b(
                                          { staticClass: "white--text mx-2", attrs: { size: 20 } },
                                          "v-icon",
                                          n,
                                          !1
                                        ),
                                        a
                                      ),
                                      [e._v("brightness_high")]
                                    ),
                                  ];
                                },
                              },
                            ]),
                          },
                          [r("span", [e._v("light mode")])]
                        ),
                  ],
                  1
                ),
                e.user
                  ? r(
                      "v-menu",
                      {
                        attrs: { bottom: "", "min-width": "200px", rounded: "", "offset-y": "" },
                        scopedSlots: e._u(
                          [
                            {
                              key: "activator",
                              fn: function (t) {
                                var a = t.on;
                                return [
                                  r(
                                    "v-btn",
                                    e._g({ attrs: { icon: "", "x-large": "" } }, a),
                                    [
                                      r("UserAvatar", {
                                        attrs: {
                                          firstname: e.user.firstname,
                                          lastname: e.user.lastname,
                                          size: 36,
                                        },
                                      }),
                                    ],
                                    1
                                  ),
                                ];
                              },
                            },
                          ],
                          null,
                          !1,
                          2871642282
                        ),
                      },
                      [
                        r(
                          "v-expand-transition",
                          [
                            r("v-card", [
                              r("div", { staticClass: "justify-center pt-4" }, [
                                r(
                                  "div",
                                  { staticClass: "mx-auto text-center" },
                                  [
                                    r("UserAvatar", {
                                      attrs: {
                                        firstname: e.user.firstname,
                                        lastname: e.user.lastname,
                                        size: 45,
                                      },
                                    }),
                                    r("h3", { staticClass: "mt-3 info--text" }, [
                                      e._v(e._s(e.user.firstname + " " + e.user.lastname)),
                                    ]),
                                    r("p", { staticClass: "text-caption mt-1" }, [
                                      e._v(" " + e._s(e.user.email) + " "),
                                    ]),
                                    r("v-divider"),
                                    r(
                                      "v-btn",
                                      {
                                        attrs: { text: "", width: "100%" },
                                        on: { click: e.logoutUser },
                                      },
                                      [
                                        r("v-icon", { attrs: { left: "" } }, [e._v("exit_to_app")]),
                                        e._v(" Logout "),
                                      ],
                                      1
                                    ),
                                  ],
                                  1
                                ),
                              ]),
                            ]),
                          ],
                          1
                        ),
                      ],
                      1
                    )
                  : r(
                      "v-btn",
                      {
                        attrs: { outlined: "", color: "primary", rounded: "", small: "" },
                        on: { click: e.authenticateUser },
                      },
                      [e._v(" Login ")]
                    ),
              ],
              1
            ),
            r(
              "v-navigation-drawer",
              {
                attrs: { color: "drawer", app: "" },
                model: {
                  value: e.showDrawer,
                  callback: function (t) {
                    e.showDrawer = t;
                  },
                  expression: "showDrawer",
                },
              },
              [
                r("div", { staticClass: "d-flex flex-column justify-center align-center py-5" }, [
                  r(
                    "div",
                    { staticClass: "d-flex flex-row align-center" },
                    [
                      r("v-img", {
                        staticClass: "white--text align-end",
                        attrs: {
                          src: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
                          height: "50px",
                          width: "50px",
                        },
                      }),
                      r("div", { staticClass: "text-h4 ml-2", style: { fontWeight: 405 } }, [
                        e._v("NoteHub"),
                      ]),
                    ],
                    1
                  ),
                ]),
                r("v-divider"),
                e.user
                  ? r(
                      "v-list",
                      { attrs: { "three-line": "" } },
                      [
                        r(
                          "v-list-item",
                          [
                            r(
                              "v-list-item-content",
                              [
                                r("v-list-item-title", [
                                  e._v(e._s(e.user.firstname + " " + e.user.lastname)),
                                ]),
                                r("v-list-item-subtitle", [e._v(e._s(e.user.subtitle))]),
                              ],
                              1
                            ),
                          ],
                          1
                        ),
                      ],
                      1
                    )
                  : e._e(),
                r("v-divider"),
                r(
                  "v-list",
                  e._l(e.links, function (t) {
                    return r(
                      "v-list-item",
                      { key: t.text, attrs: { router: "", to: { name: t.name }, exact: "" } },
                      [
                        r("v-list-item-icon", [r("v-icon", [e._v(e._s(t.icon))])], 1),
                        r("v-list-item-content", [r("v-list-item-title", [e._v(e._s(t.text))])], 1),
                      ],
                      1
                    );
                  }),
                  1
                ),
              ],
              1
            ),
          ],
          1
        );
      },
      c = [],
      l = r("5530"),
      u = function () {
        var e = this,
          t = e.$createElement,
          r = e._self._c || t;
        return r(
          "v-avatar",
          { attrs: { color: "primary", size: e.size } },
          [
            e.avatarUrl && "null" !== e.avatarUrl
              ? r("v-img", { attrs: { src: e.avatarUrl } })
              : r("h4", { staticClass: "white--text" }, [e._v(e._s(e.initial))]),
          ],
          1
        );
      },
      m = [],
      d =
        (r("a9e3"),
        r("99af"),
        {
          name: "UserAvatar",
          props: {
            firstname: { type: String, required: !0 },
            lastname: { type: String, required: !0 },
            size: { type: Number, required: !0 },
            avatarUrl: { type: String },
          },
          computed: {
            fullname: function () {
              return "".concat(this.firstname, " ").concat(this.lastname);
            },
            initial: function () {
              return this.firstname[0].toUpperCase() + this.lastname[0].toUpperCase();
            },
          },
        }),
      p = d,
      v = r("2877"),
      h = r("6544"),
      f = r.n(h),
      g = r("8212"),
      b = r("adda"),
      w = Object(v["a"])(p, u, m, !1, null, null, null),
      x = w.exports;
    f()(w, { VAvatar: g["a"], VImg: b["a"] });
    var y = r("2f62"),
      C = {
        name: "NavigationBar",
        components: { UserAvatar: x },
        data: function () {
          return {
            showDrawer: !1,
            links: [
              { icon: "home", text: "Home", name: "home" },
              { icon: "dashboard", text: "Dashboard", name: "dashboard" },
              { icon: "groups", text: "Explore Community", name: "communities" },
              { icon: "person", text: "My Profile", name: "profile" },
            ],
          };
        },
        methods: Object(l["a"])(
          Object(l["a"])({}, Object(y["b"])(["logout"])),
          {},
          {
            logoutUser: function () {
              var e = this;
              return Object(a["a"])(
                regeneratorRuntime.mark(function t() {
                  return regeneratorRuntime.wrap(function (t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (t.next = 2), e.logout({ router: e.$router, route: e.$route });
                        case 2:
                          console.log("Logout...");
                        case 3:
                        case "end":
                          return t.stop();
                      }
                  }, t);
                })
              )();
            },
            authenticateUser: function () {
              this.$router.push({ name: "auth" });
            },
          }
        ),
        computed: {
          user: function () {
            return this.$store.state.auth.currentUser;
          },
          theme: function () {
            return this.$vuetify.theme.dark ? "dark" : "light";
          },
        },
      },
      _ = C,
      k = r("40dc"),
      L = r("8336"),
      j = r("b0af"),
      V = r("ce7e"),
      I = r("0789"),
      N = r("132d"),
      U = r("8860"),
      A = r("da13"),
      O = r("5d23"),
      T = r("34c3"),
      S = r("e449"),
      D = r("f774"),
      $ = r("2fa4"),
      B = r("3a2f"),
      P = Object(v["a"])(_, s, c, !1, null, null, null),
      E = P.exports;
    f()(P, {
      VAppBar: k["a"],
      VBtn: L["a"],
      VCard: j["a"],
      VDivider: V["a"],
      VExpandTransition: I["a"],
      VIcon: N["a"],
      VImg: b["a"],
      VList: U["a"],
      VListItem: A["a"],
      VListItemContent: O["a"],
      VListItemIcon: T["a"],
      VListItemSubtitle: O["b"],
      VListItemTitle: O["c"],
      VMenu: S["a"],
      VNavigationDrawer: D["a"],
      VSpacer: $["a"],
      VTooltip: B["a"],
    });
    var F = {
        name: "App",
        components: { NavigationBar: E },
        data: function () {
          return { app: null };
        },
        computed: {
          theme: function () {
            return this.$vuetify.theme.dark ? "dark" : "light";
          },
          navbarName: function () {
            return this.$route.meta.navbar;
          },
        },
        created: function () {
          this.$store.dispatch("initialLogin", this.$router);
        },
      },
      M = F,
      z = r("7496"),
      q = r("f6c4"),
      R = Object(v["a"])(M, i, o, !1, null, null, null),
      J = R.exports;
    f()(R, { VApp: z["a"], VMain: q["a"] });
    var W = r("8c4f"),
      Y = function () {
        var e = this,
          t = e.$createElement,
          r = e._self._c || t;
        return r(
          "div",
          [
            r("v-container", { staticClass: "trans main-container", attrs: { fluid: "" } }, [
              r(
                "div",
                { staticClass: "d-flex flex-column" },
                [
                  r("h1", { staticClass: "special-text text-h4 info--text mb-2" }, [
                    e._v("Dashboard"),
                  ]),
                  r("v-divider"),
                  r("CommunityGroup", { staticClass: "mt-4" }),
                  r("NotebookGrid", { staticClass: "mt-4" }),
                ],
                1
              ),
            ]),
          ],
          1
        );
      },
      G = [],
      H = function () {
        var e = this,
          t = e.$createElement,
          r = e._self._c || t;
        return r(
          "v-sheet",
          { attrs: { elevation: "4", rounded: "lg" } },
          [
            r(
              "div",
              { staticClass: "px-10 pt-4 pb-1 d-flex justify-center align-center" },
              [
                r(
                  "div",
                  {
                    staticClass: "px-0 pb-0",
                    style: e.$vuetify.breakpoint.xs ? "width: 100%;" : "width: 250px;",
                  },
                  [
                    r("v-text-field", {
                      attrs: {
                        label: "search community",
                        "prepend-inner-icon": "search",
                        outlined: "",
                        dense: "",
                        "hide-details": "auto",
                        "clear-icon": "highlight_off",
                        clearable: "",
                      },
                      on: {
                        "click:clear": function (t) {
                          e.searchContent = "";
                        },
                      },
                      model: {
                        value: e.searchContent,
                        callback: function (t) {
                          e.searchContent = t;
                        },
                        expression: "searchContent",
                      },
                    }),
                  ],
                  1
                ),
                r("v-spacer", {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: !e.$vuetify.breakpoint.xs,
                      expression: "!$vuetify.breakpoint.xs",
                    },
                  ],
                }),
                r(
                  "v-btn",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: !e.$vuetify.breakpoint.xs,
                        expression: "!$vuetify.breakpoint.xs",
                      },
                    ],
                    attrs: { outlined: "", color: "primary" },
                    on: { click: e.handleJoinCommunity },
                  },
                  [r("v-icon", { attrs: { left: "" } }, [e._v("add")]), e._v(" Join New ")],
                  1
                ),
              ],
              1
            ),
            r(
              "v-slide-group",
              { staticClass: "pa-0 pb-1 community-group", attrs: { "show-arrows": "" } },
              e._l(e.matchedCommunities, function (t, a) {
                return r("v-slide-item", {
                  key: a,
                  scopedSlots: e._u(
                    [
                      {
                        key: "default",
                        fn: function (a) {
                          var n = a.active,
                            i = a.toggle;
                          return [
                            r("CommunityCard", {
                              staticClass: "mx-3",
                              attrs: { active: n, toggle: i, community: t },
                              on: {
                                "leave-community": e.handleDeleteCommunity,
                                "enter-community": e.handleEnterCommunity,
                              },
                            }),
                          ];
                        },
                      },
                    ],
                    null,
                    !0
                  ),
                });
              }),
              1
            ),
          ],
          1
        );
      },
      K = [],
      Q =
        (r("4de4"),
        r("caad"),
        r("2532"),
        r("b0c0"),
        function () {
          var e = this,
            t = e.$createElement,
            r = e._self._c || t;
          return r(
            "v-card",
            {
              staticClass: "ma-2 card pa-0 my-3",
              attrs: { height: e.cardHeight, width: "270" },
              on: { click: e.enterCommunity },
            },
            [
              r(
                "v-card-title",
                { staticClass: "pt-2 pr-2 pb-3 info--text" },
                [
                  e._v(" " + e._s(e.community.name) + " "),
                  r("v-spacer"),
                  r(
                    "v-card-actions",
                    { staticClass: "pa-0 text-center" },
                    [
                      r(
                        "v-menu",
                        {
                          attrs: { "offset-y": "" },
                          scopedSlots: e._u([
                            {
                              key: "activator",
                              fn: function (t) {
                                var a = t.on,
                                  n = t.attrs;
                                return [
                                  r(
                                    "v-btn",
                                    { attrs: { icon: "" } },
                                    [
                                      r("v-icon", e._g(e._b({}, "v-icon", n, !1), a), [
                                        e._v("more_vert"),
                                      ]),
                                    ],
                                    1
                                  ),
                                ];
                              },
                            },
                          ]),
                          model: {
                            value: e.menu,
                            callback: function (t) {
                              e.menu = t;
                            },
                            expression: "menu",
                          },
                        },
                        [
                          r(
                            "v-list",
                            { staticClass: "pa-0" },
                            e._l(e.actions, function (t) {
                              return r(
                                "v-list-item",
                                { key: t.title, staticClass: "pa-0" },
                                [
                                  r(
                                    "v-dialog",
                                    {
                                      attrs: { persistent: "", "max-width": "400" },
                                      scopedSlots: e._u(
                                        [
                                          {
                                            key: "activator",
                                            fn: function (a) {
                                              var n = a.on,
                                                i = a.attrs;
                                              return [
                                                r(
                                                  "v-btn",
                                                  e._g(
                                                    e._b(
                                                      {
                                                        staticClass: "text-capitalize",
                                                        staticStyle: { width: "100%" },
                                                        attrs: { color: t.color, text: "" },
                                                      },
                                                      "v-btn",
                                                      i,
                                                      !1
                                                    ),
                                                    n
                                                  ),
                                                  [e._v(e._s(t.title) + " ")]
                                                ),
                                              ];
                                            },
                                          },
                                        ],
                                        null,
                                        !0
                                      ),
                                      model: {
                                        value: e.dialog,
                                        callback: function (t) {
                                          e.dialog = t;
                                        },
                                        expression: "dialog",
                                      },
                                    },
                                    [
                                      "leave community" === t.title
                                        ? r(
                                            "v-card",
                                            [
                                              r("v-card-title", { staticClass: "text-h6" }, [
                                                e._v(" Are you sure to leave this community? "),
                                              ]),
                                              r("v-card-text", [
                                                e._v("This may cause irriversable data loss."),
                                              ]),
                                              r(
                                                "v-card-actions",
                                                [
                                                  r("v-spacer"),
                                                  r(
                                                    "v-btn",
                                                    {
                                                      attrs: { color: "primary", text: "" },
                                                      on: {
                                                        click: function (r) {
                                                          return e.closeDialogWithAction(t.onClick);
                                                        },
                                                      },
                                                    },
                                                    [e._v(" Leave ")]
                                                  ),
                                                  r(
                                                    "v-btn",
                                                    {
                                                      attrs: { color: "error", text: "" },
                                                      on: {
                                                        click: function (t) {
                                                          return e.closeDialogWithAction();
                                                        },
                                                      },
                                                    },
                                                    [e._v(" Cancel ")]
                                                  ),
                                                ],
                                                1
                                              ),
                                            ],
                                            1
                                          )
                                        : e._e(),
                                    ],
                                    1
                                  ),
                                ],
                                1
                              );
                            }),
                            1
                          ),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                ],
                1
              ),
              r("v-card-subtitle", { staticClass: "pb-2" }, [
                e._v("Creator: " + e._s(e.community.owner)),
              ]),
              r("v-img", {
                staticClass: "white--text align-end",
                attrs: { src: e.community.photo, height: "160" },
              }),
              r(
                "div",
                { staticClass: "d-flex flex-row px-2 align-center justify-end" },
                [
                  r("v-icon", [e._v("groups")]),
                  r("v-card-subtitle", { staticClass: "font-weight-medium pa-2" }, [
                    e._v(" Members: " + e._s(e.community.members) + " "),
                  ]),
                ],
                1
              ),
              r(
                "v-card-text",
                { staticClass: "pt-0 pb-0" },
                [
                  r("v-divider"),
                  r("div", { staticClass: "three-lines pt-1" }, [
                    e._v(" " + e._s(e.community.description) + " "),
                  ]),
                ],
                1
              ),
            ],
            1
          );
        }),
      X = [],
      Z = {
        name: "CommunityCard",
        props: {
          active: { type: Boolean },
          toggle: { type: Function },
          community: { type: Object, required: !0 },
        },
        data: function () {
          var e = this;
          return {
            actions: [
              {
                title: "leave community",
                onClick: function () {
                  return e.leaveCommunity();
                },
                color: "error",
              },
            ],
            dialog: !1,
            menu: !1,
            cardHeight: 330,
          };
        },
        methods: {
          leaveCommunity: function () {
            this.$emit("leave-community", this.community);
          },
          enterCommunity: function () {
            this.$emit("enter-community", this.community);
          },
          closeDialogWithAction: function (e) {
            (this.menu = !1), (this.dialog = !1), e && e();
          },
        },
      },
      ee = Z,
      te = (r("aa21"), r("99d9")),
      re = r("169a"),
      ae = Object(v["a"])(ee, Q, X, !1, null, null, null),
      ne = ae.exports;
    f()(ae, {
      VBtn: L["a"],
      VCard: j["a"],
      VCardActions: te["a"],
      VCardSubtitle: te["b"],
      VCardText: te["c"],
      VCardTitle: te["d"],
      VDialog: re["a"],
      VDivider: V["a"],
      VIcon: N["a"],
      VImg: b["a"],
      VList: U["a"],
      VListItem: A["a"],
      VMenu: S["a"],
      VSpacer: $["a"],
    });
    var ie = {
        name: "CommunityGroup",
        components: { CommunityCard: ne },
        data: function () {
          return {
            searchContent: "",
            communities: [
              {
                communityId: 12345,
                name: "Community Name",
                description:
                  " Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem",
                createdAt: "2021-02-24",
                members: 543,
                owner: "John Smith",
                photo: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
              },
              {
                communityId: 67890,
                name: "ABC",
                description:
                  " Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem",
                createdAt: "2021-02-24",
                members: 543,
                owner: "John Smith",
                photo: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
              },
              {
                communityId: 12345,
                name: "CDE",
                description:
                  " Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem",
                createdAt: "2021-02-24",
                members: 543,
                owner: "John Smith",
                photo: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
              },
              {
                communityId: 12345,
                name: "DEF",
                description:
                  " Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem",
                createdAt: "2021-02-24",
                members: 543,
                owner: "John Smith",
                photo: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
              },
              {
                communityId: 12345,
                name: "Community Name",
                description:
                  " Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem",
                createdAt: "2021-02-24",
                members: 543,
                owner: "John Smith",
                photo: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
              },
              {
                communityId: 12345,
                name: "Community Name",
                description:
                  " Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem",
                createdAt: "2021-02-24",
                members: 543,
                owner: "John Smith",
                photo: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
              },
              {
                communityId: 12345,
                name: "Community Name",
                description:
                  " Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem",
                createdAt: "2021-02-24",
                members: 543,
                owner: "John Smith",
                photo: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
              },
              {
                communityId: 12345,
                name: "Community Name",
                description:
                  " Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem Lorem ipsum dolor sit amet, consectetur adip Lorem ips Lorem",
                createdAt: "2021-02-24",
                members: 543,
                owner: "John Smith",
                photo: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
              },
            ],
          };
        },
        methods: {
          handleDeleteCommunity: function (e) {
            console.log(e.communityId);
          },
          handleEnterCommunity: function (e) {
            this.$router.push({ name: "community", params: { id: e.communityId } });
          },
          handleJoinCommunity: function () {
            this.$router.push({ name: "communities" });
          },
        },
        computed: {
          matchedCommunities: function () {
            var e = this;
            return this.communities.filter(function (t) {
              return t.name.toLowerCase().includes(e.searchContent.toLowerCase());
            });
          },
        },
      },
      oe = ie,
      se = (r("c392"), r("8dd9")),
      ce = r("7efd"),
      le = r("9dbe"),
      ue = r("8654"),
      me = Object(v["a"])(oe, H, K, !1, null, null, null),
      de = me.exports;
    f()(me, {
      VBtn: L["a"],
      VIcon: N["a"],
      VSheet: se["a"],
      VSlideGroup: ce["a"],
      VSlideItem: le["a"],
      VSpacer: $["a"],
      VTextField: ue["a"],
    });
    var pe = function () {
        var e = this,
          t = e.$createElement,
          r = e._self._c || t;
        return r(
          "v-sheet",
          { attrs: { elevation: "4", rounded: "lg" } },
          [
            r(
              "v-card",
              { attrs: { width: "100%" } },
              [
                r(
                  "v-toolbar",
                  { staticClass: "notegrid-toolbar px-1 d-flex align-center justify-center" },
                  [
                    e.$vuetify.breakpoint.xs
                      ? e._e()
                      : r(
                          "div",
                          { staticClass: "px-4 pb-0", style: "width: 100%;" },
                          [
                            r("v-text-field", {
                              attrs: {
                                label: "search title",
                                "prepend-inner-icon": "search",
                                outlined: "",
                                "hide-details": "auto",
                                "clear-icon": "highlight_off",
                                clearable: "",
                                dense: "",
                              },
                              on: {
                                "click:clear": function (t) {
                                  e.searchContent = "";
                                },
                              },
                              model: {
                                value: e.searchContent,
                                callback: function (t) {
                                  e.searchContent = t;
                                },
                                expression: "searchContent",
                              },
                            }),
                          ],
                          1
                        ),
                    e.$vuetify.breakpoint.smAndDown ? e._e() : r("v-spacer"),
                    r(
                      "div",
                      { staticClass: "px-0 pb-0" },
                      [
                        r(
                          "v-menu",
                          {
                            attrs: { "offset-y": "" },
                            scopedSlots: e._u([
                              {
                                key: "activator",
                                fn: function (t) {
                                  var a = t.on,
                                    n = t.attrs;
                                  return [
                                    r(
                                      "v-btn",
                                      e._g(
                                        e._b(
                                          { staticClass: "text-capitalize", attrs: { text: "" } },
                                          "v-btn",
                                          n,
                                          !1
                                        ),
                                        a
                                      ),
                                      [
                                        r("v-icon", { attrs: { left: "" } }, [e._v("share")]),
                                        e._v(" " + e._s(e.shareInfo()) + " "),
                                        r("v-icon", { attrs: { right: "", size: "30" } }, [
                                          e._v("arrow_drop_down"),
                                        ]),
                                      ],
                                      1
                                    ),
                                  ];
                                },
                              },
                            ]),
                          },
                          [
                            r(
                              "v-list",
                              e._l(e.sharedUsers, function (t, a) {
                                return r(
                                  "v-list-item",
                                  {
                                    key: a,
                                    on: {
                                      click: function (t) {
                                        e.sharedIdx = a;
                                      },
                                    },
                                  },
                                  [r("v-list-item-title", [e._v(e._s(t.name))])],
                                  1
                                );
                              }),
                              1
                            ),
                          ],
                          1
                        ),
                      ],
                      1
                    ),
                    e.$vuetify.breakpoint.smAndDown ? e._e() : r("v-spacer"),
                    e.$vuetify.breakpoint.smAndDown
                      ? e._e()
                      : r(
                          "div",
                          { staticClass: "px-4 pb-0", staticStyle: { width: "100%" } },
                          [
                            r("v-select", {
                              attrs: {
                                "offset-y": "",
                                items: e.categories,
                                multiple: "",
                                label: "filter by category",
                                "hide-details": "auto",
                                "prepend-inner-icon": "filter_list",
                                outlined: "",
                                dense: "",
                              },
                              scopedSlots: e._u(
                                [
                                  {
                                    key: "selection",
                                    fn: function (t) {
                                      var a = t.item,
                                        n = t.index;
                                      return [
                                        0 === n
                                          ? r(
                                              "div",
                                              { staticClass: "overflow-hidden text-truncate" },
                                              [
                                                r("v-chip", { attrs: { small: "" } }, [
                                                  r("span", [e._v(e._s(a))]),
                                                ]),
                                                r(
                                                  "span",
                                                  { staticClass: "grey--text text-caption" },
                                                  [
                                                    e._v(
                                                      " (+" +
                                                        e._s(e.selectedCategories.length - 1) +
                                                        " others) "
                                                    ),
                                                  ]
                                                ),
                                              ],
                                              1
                                            )
                                          : e._e(),
                                      ];
                                    },
                                  },
                                ],
                                null,
                                !1,
                                2740135954
                              ),
                              model: {
                                value: e.selectedCategories,
                                callback: function (t) {
                                  e.selectedCategories = t;
                                },
                                expression: "selectedCategories",
                              },
                            }),
                          ],
                          1
                        ),
                  ],
                  1
                ),
                r(
                  "v-card-text",
                  [
                    r(
                      "v-row",
                      {
                        staticClass: "notegrid-row",
                        attrs: { justify: "center", align: "center" },
                      },
                      e._l(e.filteredNotes(), function (e, t) {
                        return r(
                          "v-col",
                          {
                            key: t,
                            staticClass: "d-flex justify-center",
                            attrs: { cols: "12", xs: "6", sm: "6", md: "4", lg: "3", xl: "3" },
                          },
                          [r("NotexCard", { attrs: { note: e } })],
                          1
                        );
                      }),
                      1
                    ),
                  ],
                  1
                ),
              ],
              1
            ),
          ],
          1
        );
      },
      ve = [],
      he = r("b85c"),
      fe = function () {
        var e = this,
          t = e.$createElement,
          r = e._self._c || t;
        return r(
          "v-card",
          { staticClass: "notex-card card", on: { click: e.enterWorkspace } },
          [
            r(
              "div",
              { staticClass: "d-flex" },
              [
                r(
                  "v-card-title",
                  { staticClass: "pt-2 pb-2" },
                  [
                    r("v-avatar", { attrs: { color: "primary", size: "42" } }, [
                      r("h1", { staticClass: "white--text text-h6" }, [e._v("BY")]),
                    ]),
                  ],
                  1
                ),
                r(
                  "div",
                  { staticStyle: { width: "100%" } },
                  [
                    r(
                      "v-card-title",
                      { staticClass: "info--text px-0 pt-2 pb-3 pr-1 text-h6" },
                      [
                        e._v(" " + e._s(e.note.noteTitle) + " "),
                        r("v-spacer"),
                        r(
                          "v-menu",
                          {
                            attrs: { "offset-y": "" },
                            scopedSlots: e._u([
                              {
                                key: "activator",
                                fn: function (t) {
                                  var a = t.on,
                                    n = t.attrs;
                                  return [
                                    r(
                                      "v-btn",
                                      { attrs: { icon: "" } },
                                      [
                                        r("v-icon", e._g(e._b({}, "v-icon", n, !1), a), [
                                          e._v("more_vert"),
                                        ]),
                                      ],
                                      1
                                    ),
                                  ];
                                },
                              },
                            ]),
                            model: {
                              value: e.noteMenu,
                              callback: function (t) {
                                e.noteMenu = t;
                              },
                              expression: "noteMenu",
                            },
                          },
                          [
                            r(
                              "v-list",
                              { staticClass: "pa-0" },
                              [
                                r(
                                  "v-list-item",
                                  { staticClass: "pa-0" },
                                  [
                                    r(
                                      "v-dialog",
                                      {
                                        attrs: { persistent: "", "max-width": "400" },
                                        scopedSlots: e._u([
                                          {
                                            key: "activator",
                                            fn: function (t) {
                                              var a = t.on,
                                                n = t.attrs;
                                              return [
                                                r(
                                                  "v-btn",
                                                  e._g(
                                                    e._b(
                                                      {
                                                        staticClass: "text-capitalize",
                                                        staticStyle: { width: "100%" },
                                                        attrs: {
                                                          color: e.actions[0].color,
                                                          text: "",
                                                        },
                                                      },
                                                      "v-btn",
                                                      n,
                                                      !1
                                                    ),
                                                    a
                                                  ),
                                                  [e._v(e._s(e.actions[0].title) + " ")]
                                                ),
                                              ];
                                            },
                                          },
                                        ]),
                                        model: {
                                          value: e.editTitleDialog,
                                          callback: function (t) {
                                            e.editTitleDialog = t;
                                          },
                                          expression: "editTitleDialog",
                                        },
                                      },
                                      [
                                        r(
                                          "v-card",
                                          [
                                            r("v-card-title", { staticClass: "text-h6" }, [
                                              e._v(" Edit Note Title "),
                                            ]),
                                            r("v-divider"),
                                            r(
                                              "v-card-text",
                                              { staticClass: "py-0 mt-6" },
                                              [
                                                r("v-text-field", {
                                                  attrs: {
                                                    label: "New Note Title",
                                                    "clear-icon": "highlight_off",
                                                    clearable: "",
                                                    "prepend-inner-icon": "title",
                                                  },
                                                  on: {
                                                    "click:clear": function (t) {
                                                      e.noteTitle = "";
                                                    },
                                                  },
                                                  model: {
                                                    value: e.noteTitle,
                                                    callback: function (t) {
                                                      e.noteTitle = t;
                                                    },
                                                    expression: "noteTitle",
                                                  },
                                                }),
                                              ],
                                              1
                                            ),
                                            r(
                                              "v-card-actions",
                                              [
                                                r("v-spacer"),
                                                r(
                                                  "v-btn",
                                                  {
                                                    attrs: { color: "primary", text: "" },
                                                    on: {
                                                      click: function (t) {
                                                        return e.closeDialogWithAction(
                                                          e.actions[0].onClick
                                                        );
                                                      },
                                                    },
                                                  },
                                                  [e._v(" Confirm ")]
                                                ),
                                                r(
                                                  "v-btn",
                                                  {
                                                    attrs: { color: "error", text: "" },
                                                    on: {
                                                      click: function (t) {
                                                        return e.closeDialogWithAction();
                                                      },
                                                    },
                                                  },
                                                  [e._v(" Cancel ")]
                                                ),
                                              ],
                                              1
                                            ),
                                          ],
                                          1
                                        ),
                                      ],
                                      1
                                    ),
                                  ],
                                  1
                                ),
                                e.actions.length >= 2
                                  ? r(
                                      "v-list-item",
                                      { staticClass: "pa-0" },
                                      [
                                        r(
                                          "v-dialog",
                                          {
                                            attrs: { persistent: "", "max-width": "400" },
                                            scopedSlots: e._u(
                                              [
                                                {
                                                  key: "activator",
                                                  fn: function (t) {
                                                    var a = t.on,
                                                      n = t.attrs;
                                                    return [
                                                      r(
                                                        "v-btn",
                                                        e._g(
                                                          e._b(
                                                            {
                                                              staticClass: "text-capitalize",
                                                              staticStyle: { width: "100%" },
                                                              attrs: {
                                                                color: e.actions[1].color,
                                                                text: "",
                                                              },
                                                            },
                                                            "v-btn",
                                                            n,
                                                            !1
                                                          ),
                                                          a
                                                        ),
                                                        [e._v(e._s(e.actions[1].title) + " ")]
                                                      ),
                                                    ];
                                                  },
                                                },
                                              ],
                                              null,
                                              !1,
                                              3370876071
                                            ),
                                            model: {
                                              value: e.deleteNoteDialog,
                                              callback: function (t) {
                                                e.deleteNoteDialog = t;
                                              },
                                              expression: "deleteNoteDialog",
                                            },
                                          },
                                          [
                                            r(
                                              "v-card",
                                              [
                                                r("v-card-title", { staticClass: "text-h6" }, [
                                                  e._v(" Delete Note "),
                                                ]),
                                                r("v-divider"),
                                                r(
                                                  "v-card-text",
                                                  { staticClass: "py-0" },
                                                  [
                                                    r("v-checkbox", {
                                                      attrs: {
                                                        label:
                                                          "Are you willing to transfer ownership?",
                                                      },
                                                      model: {
                                                        value: e.transferOwnership,
                                                        callback: function (t) {
                                                          e.transferOwnership = t;
                                                        },
                                                        expression: "transferOwnership",
                                                      },
                                                    }),
                                                    r(
                                                      "v-form",
                                                      { ref: "ownershipForm" },
                                                      [
                                                        r("v-autocomplete", {
                                                          directives: [
                                                            {
                                                              name: "show",
                                                              rawName: "v-show",
                                                              value: e.transferOwnership,
                                                              expression: "transferOwnership",
                                                            },
                                                          ],
                                                          attrs: {
                                                            items: e.sharedUsers,
                                                            label: "Transfer Ownership",
                                                            "item-text": function (e) {
                                                              return e.firstName + " " + e.lastName;
                                                            },
                                                            "item-value": "userId",
                                                            rules: [
                                                              !e.transferOwnership ||
                                                                null !== e.sharedUserId ||
                                                                "You must select a user!",
                                                            ],
                                                          },
                                                          scopedSlots: e._u(
                                                            [
                                                              {
                                                                key: "selection",
                                                                fn: function (t) {
                                                                  return [
                                                                    e._v(
                                                                      " " +
                                                                        e._s(
                                                                          t.item.firstName +
                                                                            " " +
                                                                            t.item.lastName
                                                                        ) +
                                                                        " "
                                                                    ),
                                                                  ];
                                                                },
                                                              },
                                                              {
                                                                key: "item",
                                                                fn: function (t) {
                                                                  return [
                                                                    [
                                                                      r(
                                                                        "v-list-item-avatar",
                                                                        [
                                                                          r("UserAvatar", {
                                                                            attrs: {
                                                                              avatarUrl:
                                                                                t.item.avatarUrl,
                                                                              firstname:
                                                                                t.item.firstName,
                                                                              lastname:
                                                                                t.item.lastName,
                                                                              size: 34,
                                                                            },
                                                                          }),
                                                                        ],
                                                                        1
                                                                      ),
                                                                      r(
                                                                        "v-list-item-content",
                                                                        [
                                                                          r("v-list-item-title", [
                                                                            e._v(
                                                                              e._s(
                                                                                t.item.firstName +
                                                                                  " " +
                                                                                  t.item.lastName
                                                                              )
                                                                            ),
                                                                          ]),
                                                                        ],
                                                                        1
                                                                      ),
                                                                    ],
                                                                  ];
                                                                },
                                                              },
                                                            ],
                                                            null,
                                                            !1,
                                                            4284946677
                                                          ),
                                                          model: {
                                                            value: e.sharedUserId,
                                                            callback: function (t) {
                                                              e.sharedUserId = t;
                                                            },
                                                            expression: "sharedUserId",
                                                          },
                                                        }),
                                                      ],
                                                      1
                                                    ),
                                                  ],
                                                  1
                                                ),
                                                r(
                                                  "v-card-actions",
                                                  [
                                                    r("v-spacer"),
                                                    r(
                                                      "v-btn",
                                                      {
                                                        attrs: { color: "primary", text: "" },
                                                        on: {
                                                          click: function (t) {
                                                            return e.closeDialogWithAction(
                                                              e.actions[1].onClick
                                                            );
                                                          },
                                                        },
                                                      },
                                                      [e._v(" Confirm ")]
                                                    ),
                                                    r(
                                                      "v-btn",
                                                      {
                                                        attrs: { color: "error", text: "" },
                                                        on: {
                                                          click: function (t) {
                                                            return e.closeDialogWithAction();
                                                          },
                                                        },
                                                      },
                                                      [e._v(" Cancel ")]
                                                    ),
                                                  ],
                                                  1
                                                ),
                                              ],
                                              1
                                            ),
                                          ],
                                          1
                                        ),
                                      ],
                                      1
                                    )
                                  : e._e(),
                              ],
                              1
                            ),
                          ],
                          1
                        ),
                      ],
                      1
                    ),
                    r("v-card-subtitle", { staticClass: "px-0 pb-2 info--text" }, [
                      e._v("Owner: " + e._s(e.note.owner)),
                    ]),
                  ],
                  1
                ),
              ],
              1
            ),
            r("v-divider"),
            r("v-card-text", { staticClass: "pa-3" }, [
              r(
                "div",
                { staticClass: "note-preview grey darken-3 d-flex align-end justify-end rounded" },
                [
                  r("p", { staticClass: "font-weight-medium ma-0 mr-2 white--text" }, [
                    e._v("Created: " + e._s(e.note.createdAt)),
                  ]),
                ]
              ),
            ]),
            r("v-divider"),
            r("v-card-text", { staticClass: "py-2 d-flex justify-space-between text-truncate" }, [
              r("div", { staticStyle: { width: "70px" } }),
              r(
                "div",
                [
                  r("v-icon", { attrs: { size: "18" } }, [e._v("favorite_border")]),
                  e._v(" " + e._s(e.note.likeCount) + " "),
                ],
                1
              ),
              r(
                "div",
                [
                  r("v-icon", { attrs: { size: "18" } }, [e._v("remove_red_eye")]),
                  e._v(" " + e._s(e.note.viewCount) + " "),
                ],
                1
              ),
              r(
                "div",
                [
                  r("v-icon", { attrs: { size: "18" } }, [e._v("notes")]),
                  e._v(" " + e._s(e.note.commentCount) + " "),
                ],
                1
              ),
            ]),
          ],
          1
        );
      },
      ge = [],
      be = {
        name: "NotexCard",
        props: { note: { type: Object, required: !0 } },
        components: { UserAvatar: x },
        data: function () {
          var e = this;
          return {
            actions: [
              {
                title: "Edit Note Title",
                onClick: function () {
                  return e.editNoteTitle();
                },
                color: "primary",
              },
            ],
            editTitleDialog: !1,
            deleteNoteDialog: !1,
            noteMenu: !1,
            noteTitle: this.note.noteTitle,
            transferOwnership: !1,
            sharedUsers: [
              { userId: 104, firstName: "Brian", lastName: "Yin", avatarUrl: null },
              { userId: 102, firstName: "Toubat", lastName: "Brian", avatarUrl: null },
              { userId: 103, firstName: "Lucheng", lastName: "Qing", avatarUrl: null },
              { userId: 105, firstName: "ABC", lastName: "DEF", avatarUrl: null },
            ],
            sharedUserId: null,
          };
        },
        methods: {
          enterWorkspace: function () {
            this.$router.push({ name: "workspace", params: { id: this.note.noteId } });
          },
          deleteNote: function () {
            if (!this.$refs.ownershipForm.validate()) throw new Error("Form is not validated!");
            console.log("Validated! ", this.sharedUserId);
          },
          editNoteTitle: function () {
            console.log(this.noteTitle);
          },
          closeDialogWithAction: function (e) {
            try {
              e && e(),
                (this.noteMenu = !1),
                (this.editTitleDialog = !1),
                (this.deleteNoteDialog = !1),
                (this.transferOwnership = !1),
                (this.sharedUserId = null);
            } catch (t) {
              console.log(t.message);
            }
          },
        },
        computed: Object(l["a"])({}, Object(y["c"])(["currentUser"])),
        mounted: function () {
          var e = this,
            t = {
              title: "Delete Note",
              onClick: function () {
                return e.deleteNote();
              },
              color: "error",
            };
          this.currentUser.userId === this.note.ownerId && this.actions.push(t);
        },
      },
      we = be,
      xe = (r("4add"), r("c6a6")),
      ye = r("ac7c"),
      Ce = r("4bd4"),
      _e = r("8270"),
      ke = Object(v["a"])(we, fe, ge, !1, null, null, null),
      Le = ke.exports;
    f()(ke, {
      VAutocomplete: xe["a"],
      VAvatar: g["a"],
      VBtn: L["a"],
      VCard: j["a"],
      VCardActions: te["a"],
      VCardSubtitle: te["b"],
      VCardText: te["c"],
      VCardTitle: te["d"],
      VCheckbox: ye["a"],
      VDialog: re["a"],
      VDivider: V["a"],
      VForm: Ce["a"],
      VIcon: N["a"],
      VList: U["a"],
      VListItem: A["a"],
      VListItemAvatar: _e["a"],
      VListItemContent: O["a"],
      VListItemTitle: O["c"],
      VMenu: S["a"],
      VSpacer: $["a"],
      VTextField: ue["a"],
    });
    var je = {
        name: "NotebookGrid",
        components: { NotexCard: Le },
        data: function () {
          return {
            searchContent: "",
            notes: [
              {
                noteId: 1234,
                noteTitle: "Note Title",
                dataUrl: "https://www.google.com",
                createdAt: "2021-02-23",
                likeCount: 12,
                viewCount: 45,
                commentCount: 56,
                owner: "Brian Yin",
                ownerId: 104,
                categories: ["Computer Science"],
              },
              {
                noteId: 1234,
                noteTitle: "Note Title",
                dataUrl: "https://www.google.com",
                createdAt: "2021-02-23",
                likeCount: 12,
                viewCount: 45,
                commentCount: 56,
                owner: "Brian Yin",
                ownerId: 123,
                categories: ["Computer Science"],
              },
              {
                noteId: 1234,
                noteTitle: "Note Title",
                dataUrl: "https://www.google.com",
                createdAt: "2021-02-23",
                likeCount: 12,
                viewCount: 45,
                commentCount: 56,
                owner: "Brian Yin",
                ownerId: 123,
                categories: ["Computer Science"],
              },
              {
                noteId: 1234,
                noteTitle: "Note Title",
                dataUrl: "https://www.google.com",
                createdAt: "2021-02-23",
                likeCount: 12,
                viewCount: 45,
                commentCount: 56,
                owner: "Brian Yin",
                ownerId: 123,
                categories: ["Computer Science"],
              },
              {
                noteId: 1234,
                noteTitle: "Note Title",
                dataUrl: "https://www.google.com",
                createdAt: "2021-02-23",
                likeCount: 12,
                viewCount: 45,
                commentCount: 56,
                owner: "Brian Yin",
                ownerId: 123,
                categories: ["Computer Science"],
              },
              {
                noteId: 1234,
                noteTitle: "Note Title",
                dataUrl: "https://www.google.com",
                createdAt: "2021-02-23",
                likeCount: 12,
                viewCount: 45,
                commentCount: 56,
                owner: "Brian Yin",
                ownerId: 123,
                categories: ["Computer Science"],
              },
              {
                noteId: 1234,
                noteTitle: "Note Title",
                dataUrl: "https://www.google.com",
                createdAt: "2021-02-23",
                likeCount: 12,
                viewCount: 45,
                commentCount: 56,
                owner: "Brian Yin",
                ownerId: 123,
                categories: ["Computer Science"],
              },
              {
                noteId: 1234,
                noteTitle: "Note Title",
                dataUrl: "https://www.google.com",
                createdAt: "2021-02-23",
                likeCount: 12,
                viewCount: 45,
                commentCount: 56,
                owner: "Brian Yin",
                ownerId: 123,
                categories: ["Computer Science"],
              },
            ],
            sharedUsers: [
              { ownerId: 104, name: "Brian Yin" },
              { ownerId: 102, name: "Boquan Yin" },
              { ownerId: 103, name: "Toubat Brian" },
              { ownerId: 105, name: "Lucheng Qing" },
            ],
            sharedIdx: 0,
            categories: ["Physics", "Math", "Computer Science", "Chemistry"],
            selectedCategories: ["Computer Science"],
          };
        },
        computed: Object(l["a"])({}, Object(y["c"])(["currentUser"])),
        methods: {
          shareInfo: function () {
            return this.currentUser.userId === this.sharedUsers[this.sharedIdx].ownerId
              ? "Owned by " + this.sharedUsers[this.sharedIdx].name
              : "Shared by " + this.sharedUsers[this.sharedIdx].name;
          },
          intersect: function (e) {
            if (0 == this.selectedCategories.length) return !0;
            var t,
              r = Object(he["a"])(this.selectedCategories);
            try {
              for (r.s(); !(t = r.n()).done; ) {
                var a = t.value;
                if (e.includes(a)) return !0;
              }
            } catch (n) {
              r.e(n);
            } finally {
              r.f();
            }
            return !1;
          },
          filteredNotes: function () {
            var e = this;
            return this.notes
              .filter(function (t) {
                return t.noteTitle.toLowerCase().includes(e.searchContent.toLowerCase());
              })
              .filter(function (t) {
                return e.intersect(t.categories);
              });
          },
        },
      },
      Ve = je,
      Ie = (r("cc39"), r("cc20")),
      Ne = r("62ad"),
      Ue = r("0fd9"),
      Ae = r("b974"),
      Oe = r("71d9"),
      Te = Object(v["a"])(Ve, pe, ve, !1, null, null, null),
      Se = Te.exports;
    f()(Te, {
      VBtn: L["a"],
      VCard: j["a"],
      VCardText: te["c"],
      VChip: Ie["a"],
      VCol: Ne["a"],
      VIcon: N["a"],
      VList: U["a"],
      VListItem: A["a"],
      VListItemTitle: O["c"],
      VMenu: S["a"],
      VRow: Ue["a"],
      VSelect: Ae["a"],
      VSheet: se["a"],
      VSpacer: $["a"],
      VTextField: ue["a"],
      VToolbar: Oe["a"],
    });
    var De = {
        name: "Dashboard",
        components: { CommunityGroup: de, NotebookGrid: Se },
        data: function () {
          return {};
        },
      },
      $e = De,
      Be = (r("2b56"), r("a523")),
      Pe = Object(v["a"])($e, Y, G, !1, null, null, null),
      Ee = Pe.exports;
    f()(Pe, { VContainer: Be["a"], VDivider: V["a"] });
    var Fe = function () {
        var e = this,
          t = e.$createElement,
          r = e._self._c || t;
        return r(
          "v-container",
          { staticClass: "fill-height" },
          [
            r(
              "v-card",
              { attrs: { width: "100%" } },
              [
                r(
                  "v-toolbar",
                  { attrs: { flat: "", dense: "" } },
                  [
                    r(
                      "v-toolbar-title",
                      { staticClass: "grey--text" },
                      [
                        r(
                          "v-btn",
                          {
                            staticClass: "text-capitalize px-5",
                            attrs: { text: "" },
                            on: {
                              click: function (t) {
                                e.val++;
                              },
                            },
                          },
                          [e._v(" Untitled Notebook " + e._s(e.val) + " ")]
                        ),
                      ],
                      1
                    ),
                    r("v-spacer"),
                    r("v-btn", { attrs: { icon: "" } }, [r("v-icon", [e._v("mdi-magnify")])], 1),
                    r("v-btn", { attrs: { icon: "" } }, [r("v-icon", [e._v("mdi-apps")])], 1),
                    r(
                      "v-btn",
                      { attrs: { icon: "" } },
                      [r("v-icon", [e._v("mdi-dots-vertical")])],
                      1
                    ),
                  ],
                  1
                ),
                r("v-divider"),
                r(
                  "v-card-text",
                  { staticClass: "notex-content" },
                  [r("EditorContent", { attrs: { editor: e.editor } })],
                  1
                ),
              ],
              1
            ),
          ],
          1
        );
      },
      Me = [],
      ze = r("1ab4"),
      qe = r("672a"),
      Re = {
        name: "LandingPage",
        components: { EditorContent: ze["b"] },
        data: function () {
          return { val: 0, editor: null };
        },
        mounted: function () {
          this.editor = new ze["a"]({
            extensions: [qe["a"]],
            content:
              '\n        <h2>\n          Hi there,\n        </h2>\n        <p>\n          this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:\n        </p>\n        <ul>\n          <li>\n            That’s a bullet list with one …\n          </li>\n          <li>\n            … or two list items.\n          </li>\n        </ul>\n        <p>\n          Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:\n        </p>\n        <pre><code class="language-css">body {\n  display: none;\n}</code></pre>\n        <p>\n          I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.\n        </p>\n        <blockquote>\n          Wow, that’s amazing. Good work, boy! 👏\n          <br />\n          — Mom\n        </blockquote>\n      ',
          });
        },
        beforeDestroy: function () {
          this.editor.destroy();
        },
      },
      Je = Re,
      We = (r("d8b4"), r("2a7f")),
      Ye = Object(v["a"])(Je, Fe, Me, !1, null, null, null),
      Ge = Ye.exports;
    f()(Ye, {
      VBtn: L["a"],
      VCard: j["a"],
      VCardText: te["c"],
      VContainer: Be["a"],
      VDivider: V["a"],
      VIcon: N["a"],
      VSpacer: $["a"],
      VToolbar: Oe["a"],
      VToolbarTitle: We["a"],
    });
    var He,
      Ke,
      Qe = function () {
        var e = this,
          t = e.$createElement,
          r = e._self._c || t;
        return r("h1", [e._v("User Profile")]);
      },
      Xe = [],
      Ze = {},
      et = Ze,
      tt = Object(v["a"])(et, Qe, Xe, !1, null, null, null),
      rt = tt.exports,
      at = function () {
        var e = this,
          t = e.$createElement,
          r = e._self._c || t;
        return r("h1", [e._v("Workspace")]);
      },
      nt = [],
      it = { name: "Workspace" },
      ot = it,
      st = Object(v["a"])(ot, at, nt, !1, null, null, null),
      ct = st.exports,
      lt = function () {
        var e = this,
          t = e.$createElement,
          r = e._self._c || t;
        return r("h1", [e._v("Community")]);
      },
      ut = [],
      mt = {},
      dt = mt,
      pt = Object(v["a"])(dt, lt, ut, !1, null, null, null),
      vt = pt.exports,
      ht = function () {
        var e = this,
          t = e.$createElement,
          r = e._self._c || t;
        return r("h1", [e._v("Communities")]);
      },
      ft = [],
      gt = {},
      bt = gt,
      wt = Object(v["a"])(bt, ht, ft, !1, null, null, null),
      xt = wt.exports,
      yt = function () {
        var e = this,
          t = e.$createElement,
          r = e._self._c || t;
        return r(
          "v-container",
          { staticClass: "auth-background fill-height pa-15 justify-center", attrs: { fluid: "" } },
          [
            r(
              "v-sheet",
              {
                attrs: {
                  height: "800",
                  elevation: "10",
                  rounded: "",
                  width: e.hidePicture ? 450 : 1600,
                },
              },
              [
                r(
                  "v-card",
                  {
                    staticClass: "fill-height d-flex",
                    attrs: { flat: "", tile: "", color: "grey lighten-2" },
                  },
                  [
                    r(
                      "v-card",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: !e.hidePicture,
                            expression: "!hidePicture",
                          },
                        ],
                        staticClass: "fill-height flex-grow-1 overflow-hidden",
                      },
                      [
                        r(
                          "div",
                          {
                            staticClass:
                              "fill-height white auth-picture d-flex flex-column justify-center align-center",
                          },
                          [
                            r(
                              "div",
                              { staticClass: "d-flex align-center" },
                              [
                                r("v-icon", { attrs: { size: "70", color: "secondary" } }, [
                                  e._v("dashboard"),
                                ]),
                                r("h1", { staticClass: "ml-2 info--text special-text-lg" }, [
                                  e._v("NoteHub"),
                                ]),
                              ],
                              1
                            ),
                            r(
                              "div",
                              {
                                staticClass: "mx-10 text-center info--text special-text-sm",
                                style:
                                  "max-width: " +
                                  (e.$vuetify.breakpoint.mdAndDown ? 450 : 1e3) +
                                  "px;",
                              },
                              [
                                e._v(
                                  " All-in-one rich-text note taking and sharing platform powered by GPT-3 and Tiptap "
                                ),
                              ]
                            ),
                          ]
                        ),
                      ]
                    ),
                    r(
                      "v-card",
                      {
                        staticClass: "pa-0",
                        staticStyle: { width: "450px" },
                        attrs: { flat: "", tile: "" },
                      },
                      [
                        r(
                          "div",
                          {
                            staticClass: "grey darken-3 grey-bg px-5",
                            style: "padding-top: 35px;",
                          },
                          [
                            r(
                              "div",
                              { style: "padding-bottom: 25px; height: 5rem;" },
                              [
                                r("transition", { attrs: { name: "fade", duration: "500" } }, [
                                  e.hidePicture
                                    ? r(
                                        "div",
                                        { staticClass: "d-flex justify-center align-center" },
                                        [
                                          r(
                                            "v-icon",
                                            { attrs: { size: "55", color: "secondary" } },
                                            [e._v("dashboard")]
                                          ),
                                          r(
                                            "h1",
                                            { staticClass: "white--text special-text ml-2" },
                                            [e._v("NoteHub")]
                                          ),
                                        ],
                                        1
                                      )
                                    : e._e(),
                                ]),
                              ],
                              1
                            ),
                            r(
                              "transition",
                              { attrs: { name: "fade", duration: "500", mode: "out-in" } },
                              [
                                e.loginMode
                                  ? r(
                                      "v-card",
                                      {
                                        key: "loginMode",
                                        staticClass: "px-5 py-2",
                                        style: "padding-top: " + (e.loginMode, "125px;"),
                                        attrs: { height: "380", elevation: "7" },
                                      },
                                      [
                                        r("v-card-title", { staticClass: "justify-center" }, [
                                          r(
                                            "h1",
                                            {
                                              staticClass: "text-h4 font-weight-medium info--text",
                                            },
                                            [e._v("Login")]
                                          ),
                                        ]),
                                        r("v-divider"),
                                        r(
                                          "v-form",
                                          { ref: "loginForm", staticClass: "mt-5" },
                                          [
                                            r("v-text-field", {
                                              attrs: {
                                                outlined: "",
                                                label: "Email",
                                                "prepend-inner-icon": "email",
                                                type: "email",
                                                rules: [e.rules.required, e.rules.emailMatch],
                                              },
                                              model: {
                                                value: e.email,
                                                callback: function (t) {
                                                  e.email = t;
                                                },
                                                expression: "email",
                                              },
                                            }),
                                            r("v-text-field", {
                                              attrs: {
                                                outlined: "",
                                                label: "Password",
                                                "prepend-inner-icon": "vpn_key",
                                                "append-icon": e.showPassword
                                                  ? "mdi-eye"
                                                  : "mdi-eye-off",
                                                type: e.showPassword ? "text" : "password",
                                                hint: "At least 8 characters",
                                                counter: "",
                                                rules: [e.rules.required, e.rules.min],
                                              },
                                              on: {
                                                "click:append": function (t) {
                                                  e.showPassword = !e.showPassword;
                                                },
                                              },
                                              model: {
                                                value: e.password,
                                                callback: function (t) {
                                                  e.password = t;
                                                },
                                                expression: "password",
                                              },
                                            }),
                                            r(
                                              "v-btn",
                                              {
                                                attrs: {
                                                  width: "100%",
                                                  color: "primary",
                                                  height: "40",
                                                  loading: e.loading,
                                                },
                                                on: { click: e.loginUser },
                                              },
                                              [e._v(" Login ")]
                                            ),
                                          ],
                                          1
                                        ),
                                        r(
                                          "div",
                                          {
                                            staticClass: "d-flex justify-end ma-2 switch",
                                            on: { click: e.toggleLogin },
                                          },
                                          [r("p", [e._v("Create a new account")])]
                                        ),
                                      ],
                                      1
                                    )
                                  : r(
                                      "v-card",
                                      {
                                        key: "signupMode",
                                        staticClass: "px-5 py-2",
                                        attrs: { height: "640", elevation: "7" },
                                      },
                                      [
                                        r("v-card-title", { staticClass: "justify-center" }, [
                                          r(
                                            "h1",
                                            {
                                              staticClass: "text-h4 font-weight-medium info--text",
                                            },
                                            [e._v("Signup")]
                                          ),
                                        ]),
                                        r("v-divider"),
                                        r(
                                          "v-form",
                                          { ref: "signupForm", staticClass: "mt-5" },
                                          [
                                            r("v-text-field", {
                                              attrs: {
                                                outlined: "",
                                                label: "Email",
                                                "prepend-inner-icon": "email",
                                                type: "email",
                                                rules: [e.rules.required, e.rules.emailMatch],
                                              },
                                              model: {
                                                value: e.email,
                                                callback: function (t) {
                                                  e.email = t;
                                                },
                                                expression: "email",
                                              },
                                            }),
                                            r("v-text-field", {
                                              attrs: {
                                                outlined: "",
                                                label: "First Name",
                                                "prepend-inner-icon": "person",
                                                rules: [e.rules.required],
                                              },
                                              model: {
                                                value: e.firstname,
                                                callback: function (t) {
                                                  e.firstname = t;
                                                },
                                                expression: "firstname",
                                              },
                                            }),
                                            r("v-text-field", {
                                              attrs: {
                                                outlined: "",
                                                label: "Last Name",
                                                "prepend-inner-icon": "person",
                                                rules: [e.rules.required],
                                              },
                                              model: {
                                                value: e.lastname,
                                                callback: function (t) {
                                                  e.lastname = t;
                                                },
                                                expression: "lastname",
                                              },
                                            }),
                                            r("v-text-field", {
                                              attrs: {
                                                outlined: "",
                                                label: "Password",
                                                "prepend-inner-icon": "vpn_key",
                                                "append-icon": e.showPassword
                                                  ? "mdi-eye"
                                                  : "mdi-eye-off",
                                                type: e.showPassword ? "text" : "password",
                                                hint: "At least 8 characters",
                                                counter: "",
                                                rules: [e.rules.required, e.rules.min],
                                              },
                                              on: {
                                                "click:append": function (t) {
                                                  e.showPassword = !e.showPassword;
                                                },
                                              },
                                              model: {
                                                value: e.password,
                                                callback: function (t) {
                                                  e.password = t;
                                                },
                                                expression: "password",
                                              },
                                            }),
                                            r("v-text-field", {
                                              attrs: {
                                                outlined: "",
                                                label: "Confirm Password",
                                                "prepend-inner-icon": "vpn_key",
                                                "append-icon": e.showConfirmPassword
                                                  ? "mdi-eye"
                                                  : "mdi-eye-off",
                                                type: e.showConfirmPassword ? "text" : "password",
                                                hint: "At least 8 characters",
                                                counter: "",
                                                rules: [e.rules.required, e.rules.passwordMatch],
                                              },
                                              on: {
                                                "click:append": function (t) {
                                                  e.showConfirmPassword = !e.showConfirmPassword;
                                                },
                                              },
                                              model: {
                                                value: e.confirmPassword,
                                                callback: function (t) {
                                                  e.confirmPassword = t;
                                                },
                                                expression: "confirmPassword",
                                              },
                                            }),
                                            r(
                                              "v-btn",
                                              {
                                                attrs: {
                                                  width: "100%",
                                                  color: "primary",
                                                  height: "40",
                                                  loading: e.loading,
                                                },
                                                on: { click: e.signupUser },
                                              },
                                              [e._v(" Register ")]
                                            ),
                                          ],
                                          1
                                        ),
                                        r(
                                          "div",
                                          {
                                            staticClass: "d-flex justify-end ma-2 switch",
                                            on: { click: e.toggleLogin },
                                          },
                                          [r("p", [e._v("Login to existing account")])]
                                        ),
                                      ],
                                      1
                                    ),
                              ],
                              1
                            ),
                          ],
                          1
                        ),
                      ]
                    ),
                  ],
                  1
                ),
              ],
              1
            ),
          ],
          1
        );
      },
      Ct = [],
      _t = {
        name: "Authenication",
        data: function () {
          var e = this;
          return {
            loginMode: !0,
            showPassword: !1,
            showConfirmPassword: !1,
            email: "boquany2@illinois.edu",
            password: "12345678",
            confirmPassword: "",
            firstname: "",
            lastname: "",
            rules: {
              required: function (e) {
                return !!e || "Required.";
              },
              min: function (e) {
                return (!!e && e.length >= 8) || "At least 8 characters";
              },
              emailMatch: function (e) {
                return (
                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e) ||
                  "You have entered an invalid email address!"
                );
              },
              passwordMatch: function (t) {
                return t === e.password || "Both passwords must be the same!";
              },
            },
            loading: !1,
          };
        },
        methods: Object(l["a"])(
          Object(l["a"])({}, Object(y["b"])(["signup", "login"])),
          {},
          {
            toggleLogin: function () {
              this.loginMode = !this.loginMode;
            },
            loginUser: function () {
              var e = this;
              return Object(a["a"])(
                regeneratorRuntime.mark(function t() {
                  var r;
                  return regeneratorRuntime.wrap(
                    function (t) {
                      while (1)
                        switch ((t.prev = t.next)) {
                          case 0:
                            if (e.$refs.loginForm.validate()) {
                              t.next = 2;
                              break;
                            }
                            return t.abrupt("return");
                          case 2:
                            return (
                              (e.loading = !0),
                              (t.prev = 3),
                              (t.next = 6),
                              e.login({ email: e.email, password: e.password })
                            );
                          case 6:
                            (r = t.sent),
                              console.log(r),
                              e.$router.push({ name: "dashboard" }),
                              (t.next = 14);
                            break;
                          case 11:
                            (t.prev = 11), (t.t0 = t["catch"](3)), console.log(t.t0);
                          case 14:
                            e.loading = !1;
                          case 15:
                          case "end":
                            return t.stop();
                        }
                    },
                    t,
                    null,
                    [[3, 11]]
                  );
                })
              )();
            },
            signupUser: function () {
              var e = this;
              return Object(a["a"])(
                regeneratorRuntime.mark(function t() {
                  var r;
                  return regeneratorRuntime.wrap(
                    function (t) {
                      while (1)
                        switch ((t.prev = t.next)) {
                          case 0:
                            if (e.$refs.signupForm.validate()) {
                              t.next = 2;
                              break;
                            }
                            return t.abrupt("return");
                          case 2:
                            return (
                              (e.loading = !0),
                              (t.prev = 3),
                              (t.next = 6),
                              e.signup({
                                email: e.email,
                                password: e.password,
                                firstName: e.firstname,
                                lastName: e.lastname,
                              })
                            );
                          case 6:
                            (r = t.sent),
                              console.log(r),
                              e.$router.push({ name: "dashboard" }),
                              (t.next = 14);
                            break;
                          case 11:
                            (t.prev = 11), (t.t0 = t["catch"](3)), console.log(t.t0);
                          case 14:
                            e.loading = !1;
                          case 15:
                          case "end":
                            return t.stop();
                        }
                    },
                    t,
                    null,
                    [[3, 11]]
                  );
                })
              )();
            },
          }
        ),
        computed: Object(l["a"])(
          Object(l["a"])({}, Object(y["c"])(["currentUser"])),
          {},
          {
            hidePicture: function () {
              return this.$vuetify.breakpoint.smAndDown;
            },
          }
        ),
      },
      kt = _t,
      Lt = (r("d4bc"), Object(v["a"])(kt, yt, Ct, !1, null, null, null)),
      jt = Lt.exports;
    f()(Lt, {
      VBtn: L["a"],
      VCard: j["a"],
      VCardTitle: te["d"],
      VContainer: Be["a"],
      VDivider: V["a"],
      VForm: Ce["a"],
      VIcon: N["a"],
      VSheet: se["a"],
      VTextField: ue["a"],
    });
    var Vt = {},
      It = Object(v["a"])(Vt, He, Ke, !1, null, null, null),
      Nt = It.exports,
      Ut = r("2a74");
    n["a"].use(y["a"]);
    var At = new y["a"].Store({ modules: Ut["default"] });
    n["a"].use(W["a"]);
    var Ot = [
        { name: "home", path: "/", meta: { navbar: "NavigationBar" }, component: Ge },
        {
          name: "dashboard",
          path: "/dashboard",
          meta: { requireAuth: !0, navbar: "NavigationBar" },
          component: Ee,
        },
        {
          name: "profile",
          path: "/profile",
          meta: { requireAuth: !0, navbar: "NavigationBar" },
          component: rt,
        },
        { name: "workspace", path: "/workspace/:id", meta: { requireAuth: !0 }, component: ct },
        { name: "community", path: "/community/:id", meta: { requireAuth: !0 }, component: vt },
        {
          name: "communities",
          path: "/communities",
          meta: { requireAuth: !0, navbar: "NavigationBar" },
          component: xt,
        },
        { name: "auth", path: "/auth", meta: { navbar: null }, component: jt },
        { name: "not-found", path: "/not-found", component: Nt },
        { path: "/:catchAll(.*)*", redirect: { name: "not-found" } },
      ],
      Tt = new W["a"]({
        mode: "history",
        base: "/",
        routes: Ot,
        linkExactActiveClass: "yellow--text",
        scrollBehavior: function (e) {
          if (e.hash) return { selector: e.hash, behavior: "smooth" };
        },
      });
    Tt.beforeEach(function (e, t, r) {
      return (
        console.log("Initial Login:", At.state.auth.isAuthenticated),
        e.matched.some(function (e) {
          return e.meta.requireAuth;
        })
          ? At.state.auth.isAuthenticated
            ? r()
            : r({ name: "auth" })
          : r()
      );
    });
    var St = Tt,
      Dt = r("f309"),
      $t = r("fcf4");
    n["a"].use(Dt["a"], {});
    var Bt = new Dt["a"]({
        iconfont: "md",
        breakpoint: { thresholds: { xl: 1280 } },
        theme: {
          options: { customProperties: !0 },
          themes: {
            light: {
              primary: "#1e90ff",
              secondary: "#ffa502",
              error: "#FF5252",
              info: "#4F4F4F",
              success: "#2ed573",
              warning: "#FFC107",
              appbar: "#2c2c2c",
              drawer: $t["a"].white,
              background: $t["a"].grey.lighten4,
              card: $t["a"].white,
            },
            dark: {
              primary: "#2ed573",
              secondary: "#1e90ff",
              error: "#FF5252",
              info: $t["a"].white,
              success: "#2ed573",
              warning: "#FFC107",
              appbar: "#232323",
              drawer: "#232323",
              background: "#171717",
              card: "#2c2c2c",
            },
          },
        },
      }),
      Pt = r("bc3a"),
      Et = r.n(Pt),
      Ft = r("260b"),
      Mt = {
        apiKey: "AIzaSyCE8H066cgN969UuRrI02FxMYlwCK1TWQg",
        authDomain: "notehub-326303.firebaseapp.com",
        projectId: "notehub-326303",
        storageBucket: "notehub-326303.appspot.com",
        messagingSenderId: "121246877159",
        appId: "1:121246877159:web:70bf417836e3c18f2f2942",
      },
      zt = Mt,
      qt = r("ea7b"),
      Rt = r("323e"),
      Jt = r.n(Rt),
      Wt = function (e) {
        e.beforeEach(function (e, t, r) {
          Jt.a.start(), r();
        }),
          e.afterEach(Jt.a.done);
      };
    r("a5d8");
    (n["a"].prototype.$axios = Et.a), (n["a"].config.productionTip = !1), Object(Ft["a"])(zt);
    var Yt,
      Gt = Object(qt["b"])();
    Wt(St),
      Gt.onAuthStateChanged(
        Object(a["a"])(
          regeneratorRuntime.mark(function e() {
            return regeneratorRuntime.wrap(function (e) {
              while (1)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), At.dispatch("initialLogin");
                  case 2:
                    Yt ||
                      (Yt = new n["a"]({
                        router: St,
                        store: At,
                        vuetify: Bt,
                        render: function (e) {
                          return e(J);
                        },
                      }).$mount("#app"));
                  case 3:
                  case "end":
                    return e.stop();
                }
            }, e);
          })
        )
      );
  },
  6713: function (e, t, r) {},
  "6f62": function (e, t, r) {},
  aa21: function (e, t, r) {
    "use strict";
    r("fda1");
  },
  c392: function (e, t, r) {
    "use strict";
    r("6f62");
  },
  c7d4: function (e, t, r) {
    "use strict";
    r.r(t);
    var a = r("1da1"),
      n = (r("99af"), r("96cf"), r("ea7b")),
      i = r("bc3a"),
      o = r.n(i),
      s = r("852e"),
      c = r.n(s),
      l = o.a.create({
        baseURL: "http://localhost:8000/api/",
        headers: { "Content-type": "application/json", "CSRF-Token": c.a.get("XSRF-TOKEN") },
      }),
      u = l;
    t["default"] = {
      state: { isAuthenticated: !1, currentUser: null },
      getters: {
        currentUser: function (e) {
          return e.currentUser;
        },
        getIdToken: (function () {
          var e = Object(a["a"])(
            regeneratorRuntime.mark(function e(t) {
              return regeneratorRuntime.wrap(function (e) {
                while (1)
                  switch ((e.prev = e.next)) {
                    case 0:
                      if (!t.currentUser) {
                        e.next = 4;
                        break;
                      }
                      (e.t0 = null), (e.next = 7);
                      break;
                    case 4:
                      return (e.next = 6), t.currentUser.getIdToken();
                    case 6:
                      e.t0 = e.sent;
                    case 7:
                      return e.abrupt("return", e.t0);
                    case 8:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          function t(t) {
            return e.apply(this, arguments);
          }
          return t;
        })(),
        getFullName: function (e) {
          return "".concat(e.currentUser.firstname, " ").concat(e.currentUser.firstname);
        },
      },
      mutations: {
        toggleAuth: function (e, t) {
          e.isAuthenticated = t;
        },
        setUser: function (e, t) {
          e.currentUser = t;
        },
      },
      actions: {
        signup: function (e, t) {
          return Object(a["a"])(
            regeneratorRuntime.mark(function r() {
              var a, i, o, s, c, l, m, d, p;
              return regeneratorRuntime.wrap(
                function (r) {
                  while (1)
                    switch ((r.prev = r.next)) {
                      case 0:
                        return (
                          (a = e.commit),
                          (i = t.email),
                          (o = t.password),
                          (s = t.firstName),
                          (c = t.lastName),
                          (r.prev = 2),
                          (r.next = 5),
                          Object(n["a"])(Object(n["b"])(), i, o)
                        );
                      case 5:
                        return (l = r.sent), (r.next = 8), l.user.getIdToken();
                      case 8:
                        return (
                          (m = r.sent),
                          (r.next = 11),
                          u.post(
                            "user/insert-user/",
                            { email: i, firstName: s, lastName: c },
                            { headers: { authorization: "Bearer ".concat(m) } }
                          )
                        );
                      case 11:
                        return (
                          (d = r.sent),
                          (p = d.data.userId),
                          a("setUser", {
                            userId: p,
                            firstname: s,
                            lastname: c,
                            email: i,
                            avatarUrl: null,
                            subtitle: "New User",
                            user: l.user,
                          }),
                          a("toggleAuth", !0),
                          r.abrupt("return", !0)
                        );
                      case 18:
                        (r.prev = 18),
                          (r.t0 = r["catch"](2)),
                          console.log("ASDBJKBJABSDBJKABSDJSK"),
                          console.log(r.t0.message);
                      case 22:
                        return r.abrupt("return", !1);
                      case 23:
                      case "end":
                        return r.stop();
                    }
                },
                r,
                null,
                [[2, 18]]
              );
            })
          )();
        },
        login: function (e, t) {
          return Object(a["a"])(
            regeneratorRuntime.mark(function r() {
              var a, i, o, s, c, l, m, d, p, v, h, f;
              return regeneratorRuntime.wrap(
                function (r) {
                  while (1)
                    switch ((r.prev = r.next)) {
                      case 0:
                        return (
                          (a = e.commit),
                          (i = t.email),
                          (o = t.password),
                          (r.prev = 2),
                          (r.next = 5),
                          Object(n["c"])(Object(n["b"])(), i, o)
                        );
                      case 5:
                        return (s = r.sent), (r.next = 8), s.user.getIdToken();
                      case 8:
                        return (
                          (c = r.sent),
                          (r.next = 11),
                          u.post(
                            "user/get-user-by-email/",
                            { email: i },
                            { headers: { authorization: "Bearer ".concat(c) } }
                          )
                        );
                      case 11:
                        return (
                          (l = r.sent),
                          (m = l.data),
                          (d = m.userId),
                          (p = m.firstName),
                          (v = m.lastName),
                          (h = m.avatarUrl),
                          (f = m.subtitle),
                          a("setUser", {
                            userId: d,
                            firstname: p,
                            lastname: v,
                            email: i,
                            avatarUrl: h,
                            subtitle: f,
                            user: s.user,
                          }),
                          a("toggleAuth", !0),
                          r.abrupt("return", !0)
                        );
                      case 18:
                        (r.prev = 18), (r.t0 = r["catch"](2)), console.log(r.t0.message);
                      case 21:
                        return r.abrupt("return", !1);
                      case 22:
                      case "end":
                        return r.stop();
                    }
                },
                r,
                null,
                [[2, 18]]
              );
            })
          )();
        },
        logout: function (e, t) {
          return Object(a["a"])(
            regeneratorRuntime.mark(function r() {
              var a, i, o;
              return regeneratorRuntime.wrap(function (r) {
                while (1)
                  switch ((r.prev = r.next)) {
                    case 0:
                      return (
                        (a = e.commit),
                        (i = t.router),
                        (o = t.route),
                        (r.next = 4),
                        Object(n["d"])(Object(n["b"])())
                      );
                    case 4:
                      a("toggleAuth", !1),
                        a("setUser", null),
                        o.meta.requireAuth && i.push({ name: "auth" });
                    case 7:
                    case "end":
                      return r.stop();
                  }
              }, r);
            })
          )();
        },
        initialLogin: function (e) {
          return Object(a["a"])(
            regeneratorRuntime.mark(function t() {
              var r, a, i, o, s, c, l, m, d, p, v;
              return regeneratorRuntime.wrap(
                function (t) {
                  while (1)
                    switch ((t.prev = t.next)) {
                      case 0:
                        if (((r = e.commit), (a = e.state), !a.currentUser)) {
                          t.next = 3;
                          break;
                        }
                        return t.abrupt("return");
                      case 3:
                        return (
                          (t.prev = 3),
                          (i = Object(n["b"])().currentUser),
                          (t.next = 7),
                          i.getIdToken()
                        );
                      case 7:
                        if (((o = t.sent), !i)) {
                          t.next = 16;
                          break;
                        }
                        return (
                          (t.next = 11),
                          u.post(
                            "user/get-user-by-email/",
                            { email: i.email },
                            { headers: { authorization: "Bearer ".concat(o) } }
                          )
                        );
                      case 11:
                        (s = t.sent),
                          (c = s.data),
                          (l = c.userId),
                          (m = c.firstName),
                          (d = c.lastName),
                          (p = c.avatarUrl),
                          (v = c.subtitle),
                          r("setUser", {
                            userId: l,
                            firstname: m,
                            lastname: d,
                            email: i.email,
                            avatarUrl: p,
                            subtitle: v,
                            user: i,
                          }),
                          console.log(a.currentUser),
                          r("toggleAuth", !0);
                      case 16:
                        t.next = 21;
                        break;
                      case 18:
                        (t.prev = 18), (t.t0 = t["catch"](3)), console.log(t.t0.message);
                      case 21:
                      case "end":
                        return t.stop();
                    }
                },
                t,
                null,
                [[3, 18]]
              );
            })
          )();
        },
      },
    };
  },
  cc39: function (e, t, r) {
    "use strict";
    r("1368");
  },
  d307: function (e, t, r) {
    var a = { "./auth.js": "c7d4", "./index.js": "2a74" };
    function n(e) {
      var t = i(e);
      return r(t);
    }
    function i(e) {
      if (!r.o(a, e)) {
        var t = new Error("Cannot find module '" + e + "'");
        throw ((t.code = "MODULE_NOT_FOUND"), t);
      }
      return a[e];
    }
    (n.keys = function () {
      return Object.keys(a);
    }),
      (n.resolve = i),
      (e.exports = n),
      (n.id = "d307");
  },
  d4bc: function (e, t, r) {
    "use strict";
    r("f59f");
  },
  d8b4: function (e, t, r) {
    "use strict";
    r("6713");
  },
  f59f: function (e, t, r) {},
  f91f: function (e, t, r) {},
  fda1: function (e, t, r) {},
});
//# sourceMappingURL=app.3241fece.js.map
