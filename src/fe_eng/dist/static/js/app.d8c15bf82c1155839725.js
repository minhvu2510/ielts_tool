webpackJsonp(
  [12],
  {
    0: function(t, e) {},
    "0KY8": function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = {
          name: "VnToE",
          data: function() {
            return {
              test: !0,
              show: !1,
              radio: "",
              check: !0,
              words: [],
              item: "",
              answer: ["", "", "", ""],
              ramdom: 1,
              timer: null,
              totalTime: 900,
              resetButton: !1,
              title: "Countdown to rest time!",
              edit: !1,
              userTime: 26,
              percent: 0,
              count: 0
            };
          },
          mounted: function() {
            this.getdata();
          },
          methods: {
            getdata: function() {
              this.$http
                .get("http://127.0.0.1:8100/preview", {
                  headers: { Authorization: "vudz" },
                  params: { table: this.$route.params.nameTopic, level: 1 }
                })
                .then(function(t) {
                  (this.words = t.body.data), console.log(this.words);
                });
            },
            getramdom: function() {
              console.log(this.words),
                (this.item = this.words[
                  Math.floor(Math.random() * this.words.length)
                ]),
                console.log(this.item);
            },
            memorize: function() {
              var t = this,
                e = { key: this.item.key, table: this.$route.params.nameTopic };
              this.$http.post("http://127.0.0.1:8100/showexample", e).then(
                function(t) {
                  !0 === t.body.status
                    ? (this.$notify({
                        title: "Success",
                        message: t.body.message,
                        type: "success",
                        position: "bottom-right"
                      }),
                      this.getdata())
                    : this.$notify.error({
                        title: "Error",
                        message: t.body.message
                      });
                },
                function(e) {
                  t.notify("warning", e.body.message);
                }
              );
            },
            checkAnser: function() {
              (this.show = !0),
                900 === this.totalTime && this.startTimer(),
                (this.answer = ["", "", "", ""]),
                (this.radio = ""),
                (this.ramdom = Math.floor(
                  Math.random() * this.words.length + 0
                )),
                (this.item = this.words[this.ramdom]),
                console.log(this.item);
              var t = Math.floor(4 * Math.random() + 0);
              for (var e in ((this.answer[t] = this.item.key), this.answer))
                if ((console.log("===" + e), "" === this.answer[e])) {
                  var n = Math.floor(Math.random() * this.words.length + 0);
                  if (this.answer.indexOf(this.words[n].key) < 0)
                    this.answer[e] = this.words[n].key;
                  else
                    for (var i = 0; i < this.words.length; i++)
                      this.answer.indexOf(this.words[i].key) < 0 &&
                        (this.answer[e] = this.words[i].key);
                }
            },
            exampale: function() {
              "" === this.radio
                ? ((this.count = this.count + 1),
                  (this.percent = parseInt(
                    (this.count / (this.words.length + 7)) * 100
                  )),
                  (this.item = this.words[this.ramdom]),
                  this.checkAnser())
                : ((this.count = this.count + 1),
                  (this.percent = parseInt(
                    (this.count / (this.words.length + 7)) * 100
                  )),
                  (this.item = this.words[this.ramdom]),
                  this.radio === this.item.key
                    ? this.$message({
                        message: "Congrats, this is a success message.",
                        type: "success"
                      })
                    : (this.$message({
                        message: "Congrats, this is a success message.",
                        type: "warning"
                      }),
                      this.memorize()),
                  this.checkAnser());
            },
            startTimer: function() {
              var t = this;
              (this.timer = setInterval(function() {
                return t.countdown();
              }, 1e3)),
                (this.resetButton = !0),
                (this.edit = !1);
            },
            stopTimer: function() {
              clearInterval(this.timer),
                (this.timer = null),
                (this.resetButton = !0);
            },
            resetTimer: function() {
              (this.totalTime = 60 * this.userTime),
                clearInterval(this.timer),
                (this.timer = null),
                (this.resetButton = !1);
            },
            editTimer: function() {
              this.edit = !this.edit;
            },
            padTime: function(t) {
              return (t < 10 ? "0" : "") + t;
            },
            countdown: function() {
              this.totalTime--;
            }
          },
          computed: {
            minutes: function() {
              var t = Math.floor(this.totalTime / 60);
              return this.padTime(t);
            },
            seconds: function() {
              var t = this.totalTime - 60 * this.minutes;
              return this.padTime(t);
            }
          }
        },
        s = {
          render: function() {
            var t = this,
              e = t.$createElement,
              i = t._self._c || e;
            return i(
              "div",
              [
                i("el-row", [
                  i(
                    "div",
                    { staticClass: "app-container" },
                    [
                      i(
                        "el-row",
                        { attrs: { gutter: 20 } },
                        [
                          i(
                            "el-col",
                            { attrs: { xs: 24, sm: 24, md: 24 } },
                            [
                              i("el-card", { attrs: { shadow: "never" } }, [
                                i(
                                  "div",
                                  {
                                    staticClass: "clearfix",
                                    staticStyle: { position: "relative" },
                                    attrs: { slot: "header" },
                                    slot: "header"
                                  },
                                  [
                                    i(
                                      "span",
                                      {
                                        staticStyle: {
                                          "font-weight": "bold",
                                          "font-size": "20px"
                                        }
                                      },
                                      [
                                        t._v(
                                          "Topic " +
                                            t._s(this.$route.params.nameTopic)
                                        )
                                      ]
                                    ),
                                    t._v(" "),
                                    i(
                                      "div",
                                      { staticStyle: { float: "right" } },
                                      [
                                        t.edit
                                          ? i("input", {
                                              directives: [
                                                {
                                                  name: "model",
                                                  rawName: "v-model",
                                                  value: t.userTime,
                                                  expression: "userTime"
                                                }
                                              ],
                                              attrs: { type: "text" },
                                              domProps: { value: t.userTime },
                                              on: {
                                                input: function(e) {
                                                  e.target.composing ||
                                                    (t.userTime =
                                                      e.target.value);
                                                }
                                              }
                                            })
                                          : t._e(),
                                        t._v(" "),
                                        i(
                                          "el-tag",
                                          { attrs: { type: "success" } },
                                          [
                                            t._v(
                                              t._s(t.minutes) +
                                                ":" +
                                                t._s(t.seconds)
                                            )
                                          ]
                                        ),
                                        t._v(" "),
                                        i(
                                          "el-button",
                                          {
                                            attrs: { type: "primary" },
                                            on: {
                                              click: function(e) {
                                                return t.checkAnser();
                                              }
                                            }
                                          },
                                          [t._v("Start")]
                                        ),
                                        t._v(" "),
                                        i(
                                          "el-button",
                                          {
                                            attrs: {
                                              type: "success",
                                              plain: ""
                                            },
                                            on: {
                                              click: function(e) {
                                                t.check = !t.check;
                                              }
                                            }
                                          },
                                          [t._v("Show answer")]
                                        ),
                                        t._v(" "),
                                        i(
                                          "el-button",
                                          {
                                            attrs: {
                                              type: "warning",
                                              plain: ""
                                            },
                                            on: {
                                              click: function(e) {
                                                t.test = !t.test;
                                              }
                                            }
                                          },
                                          [t._v("Hide vn")]
                                        )
                                      ],
                                      1
                                    )
                                  ]
                                ),
                                t._v(" "),
                                t.show
                                  ? i(
                                      "div",
                                      [
                                        i(
                                          "div",
                                          [
                                            i("el-progress", {
                                              attrs: {
                                                percentage: t.percent,
                                                status: "success"
                                              }
                                            })
                                          ],
                                          1
                                        ),
                                        t._v(" "),
                                        i(
                                          "el-row",
                                          {
                                            staticStyle: {
                                              "margin-left": "0!important",
                                              "margin-right": "0!important"
                                            },
                                            attrs: { gutter: 20 }
                                          },
                                          [
                                            i(
                                              "el-col",
                                              { attrs: { span: 8 } },
                                              [
                                                i("center", [
                                                  i("h2", [
                                                    t._v(t._s(t.item.value))
                                                  ]),
                                                  t._v(" "),
                                                  i("p", [t._v(t._s(t.count))])
                                                ])
                                              ],
                                              1
                                            ),
                                            t._v(" "),
                                            i(
                                              "el-col",
                                              { attrs: { span: 16 } },
                                              [
                                                t.check
                                                  ? i(
                                                      "div",
                                                      [
                                                        i(
                                                          "el-row",
                                                          t._l(
                                                            t.answer,
                                                            function(e) {
                                                              return i(
                                                                "el-col",
                                                                {
                                                                  key: e.key,
                                                                  staticStyle: {
                                                                    "padding-top":
                                                                      "40px"
                                                                  },
                                                                  attrs: {
                                                                    span: 12
                                                                  }
                                                                },
                                                                [
                                                                  i(
                                                                    "el-radio",
                                                                    {
                                                                      attrs: {
                                                                        label: e
                                                                      },
                                                                      model: {
                                                                        value:
                                                                          t.radio,
                                                                        callback: function(
                                                                          e
                                                                        ) {
                                                                          t.radio = e;
                                                                        },
                                                                        expression:
                                                                          "radio"
                                                                      }
                                                                    },
                                                                    [
                                                                      t._v(
                                                                        t._s(e)
                                                                      )
                                                                    ]
                                                                  )
                                                                ],
                                                                1
                                                              );
                                                            }
                                                          ),
                                                          1
                                                        )
                                                      ],
                                                      1
                                                    )
                                                  : t._e()
                                              ]
                                            )
                                          ],
                                          1
                                        ),
                                        t._v(" "),
                                        i(
                                          "el-row",
                                          {
                                            staticStyle: {
                                              "padding-top": "40px"
                                            }
                                          },
                                          [
                                            i(
                                              "center",
                                              [
                                                i(
                                                  "el-button",
                                                  {
                                                    attrs: { type: "danger" },
                                                    on: {
                                                      click: function(e) {
                                                        return t.memorize();
                                                      }
                                                    }
                                                  },
                                                  [
                                                    i("i", {
                                                      staticClass:
                                                        "fas fa-download"
                                                    })
                                                  ]
                                                ),
                                                t._v(" "),
                                                i(
                                                  "el-button",
                                                  {
                                                    attrs: { type: "primary" },
                                                    on: {
                                                      click: function(e) {
                                                        return t.exampale();
                                                      }
                                                    }
                                                  },
                                                  [
                                                    i("i", {
                                                      staticClass:
                                                        "fas fa-forward"
                                                    })
                                                  ]
                                                )
                                              ],
                                              1
                                            )
                                          ],
                                          1
                                        )
                                      ],
                                      1
                                    )
                                  : i(
                                      "div",
                                      [
                                        i("center", [
                                          i("img", {
                                            staticClass: "image",
                                            attrs: { src: n("F++a") }
                                          }),
                                          t._v(" "),
                                          i(
                                            "h3",
                                            {
                                              staticClass: "test",
                                              class: { test2: t.test },
                                              staticStyle: {
                                                "font-family":
                                                  "'Merriweather', serif"
                                              }
                                            },
                                            [t._v("code by vunm")]
                                          )
                                        ])
                                      ],
                                      1
                                    )
                              ])
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ])
              ],
              1
            );
          },
          staticRenderFns: []
        };
      var a = n("VU/8")(
        i,
        s,
        !1,
        function(t) {
          n("mmw7");
        },
        "data-v-aaa60ad0",
        null
      );
      e.default = a.exports;
    },
    "0xDb": function(t, e, n) {
      "use strict";
      e.a = function(t, e, n) {
        var i = void 0,
          s = void 0,
          a = void 0,
          o = void 0,
          r = void 0,
          l = function l() {
            var c = +new Date() - o;
            c < e && c > 0
              ? (i = setTimeout(l, e - c))
              : ((i = null), n || ((r = t.apply(a, s)), i || (a = s = null)));
          };
        return function() {
          for (var s = arguments.length, c = Array(s), u = 0; u < s; u++)
            c[u] = arguments[u];
          (a = this), (o = +new Date());
          var d = n && !i;
          return (
            i || (i = setTimeout(l, e)),
            d && ((r = t.apply(a, c)), (a = c = null)),
            r
          );
        };
      };
      var i = n("pFYg");
      n.n(i);
    },
    "3YWQ": function(t, e) {},
    "528N": function(t, e) {},
    "5ybE": function(t, e, n) {
      "use strict";
      var i = n("//Fk"),
        s = n.n(i),
        a = n("mtWM"),
        o = n.n(a),
        r = n("zL8q"),
        l = n("IcnI"),
        c = n("TIfe");
      console.log("this is request " + Object(c.a)()),
        console.log("this is request " + Object(c.a)());
      var u = o.a.create({ baseURL: "http://127.0.0.1:8100", timeout: 5e3 });
      u.interceptors.request.use(
        function(t) {
          return (
            l.a.getters.token &&
              ((t.headers.Authorization = Object(c.a)()),
              (t.headers["Content-Type"] = "application/json")),
            t
          );
        },
        function(t) {
          console.log(t), s.a.reject(t);
        }
      ),
        u.interceptors.response.use(
          function(t) {
            return t;
          },
          function(t) {
            return (
              console.log("err", t.response),
              console.log("err", Object(c.a)()),
              r.Notification.error({
                title: "Lỗi",
                message: t.response.data.message
                  ? t.response.data.message.error
                  : "Lỗi không xác định",
                duration: 4e3
              }),
              "Access Token is Wrong" === t.response.data.message.error &&
                setTimeout(function() {
                  l.a.dispatch("LogOut");
                }, 1e3),
              s.a.reject(t)
            );
          }
        );
      var d = u;
      (e.a = function(t) {
        return d({ url: "/extension", method: "post", data: t });
      }),
        (e.b = function(t) {
          return d({ url: "/note", method: "post", data: t });
        }),
        (e.f = function(t) {
          return d({ url: "/extension", method: "get", params: t });
        }),
        (e.d = function(t) {
          return d({ url: "/confuse", method: "get", params: t });
        }),
        (e.i = function(t) {
          return d({ url: "/user", method: "get", params: t });
        }),
        (e.g = function(t) {
          return d({ url: "/note", method: "get", params: t });
        }),
        (e.h = function() {
          return d({ url: "/topics", method: "get" });
        }),
        (e.e = function() {
          return d({ url: "/difficult", method: "get" });
        }),
        (e.c = function(t) {
          return d({ url: "/difficult", method: "post", data: t });
        });
    },
    "6k2e": function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = n("Dd8w"),
        s = n.n(i),
        a = n("NYxO"),
        o = {
          name: "hamburger",
          props: {
            isActive: { type: Boolean, default: !1 },
            toggleClick: { type: Function, default: null }
          }
        },
        r = {
          render: function() {
            var t = this.$createElement,
              e = this._self._c || t;
            return e("div", [
              e(
                "svg",
                {
                  staticClass: "wscn-icon hamburger",
                  class: { "is-active": this.isActive },
                  staticStyle: { "enable-background": "new 0 0 512 512" },
                  attrs: {
                    xmlns: "http://www.w3.org/2000/svg",
                    "xmlns:xlink": "http://www.w3.org/1999/xlink",
                    version: "1.1",
                    id: "Layer_1",
                    x: "0px",
                    y: "0px",
                    viewBox: "0 0 512 512",
                    "xml:space": "preserve",
                    width: "64",
                    height: "64"
                  },
                  on: { click: this.toggleClick }
                },
                [
                  e("g", [
                    e("g", [
                      e("path", {
                        attrs: {
                          d:
                            "M491.318,235.318H20.682C9.26,235.318,0,244.577,0,256s9.26,20.682,20.682,20.682h470.636    c11.423,0,20.682-9.259,20.682-20.682C512,244.578,502.741,235.318,491.318,235.318z",
                          fill: "#FFFFFF"
                        }
                      })
                    ])
                  ]),
                  this._v(" "),
                  e("g", [
                    e("g", [
                      e("path", {
                        attrs: {
                          d:
                            "M491.318,78.439H20.682C9.26,78.439,0,87.699,0,99.121c0,11.422,9.26,20.682,20.682,20.682h470.636    c11.423,0,20.682-9.26,20.682-20.682C512,87.699,502.741,78.439,491.318,78.439z",
                          fill: "#FFFFFF"
                        }
                      })
                    ])
                  ]),
                  this._v(" "),
                  e("g", [
                    e("g", [
                      e("path", {
                        attrs: {
                          d:
                            "M491.318,392.197H20.682C9.26,392.197,0,401.456,0,412.879s9.26,20.682,20.682,20.682h470.636    c11.423,0,20.682-9.259,20.682-20.682S502.741,392.197,491.318,392.197z",
                          fill: "#FFFFFF"
                        }
                      })
                    ])
                  ])
                ]
              )
            ]);
          },
          staticRenderFns: []
        };
      var l = n("VU/8")(
          o,
          r,
          !1,
          function(t) {
            n("lkbi");
          },
          "data-v-2fd76e5a",
          null
        ).exports,
        c = n("I95x"),
        u = n.n(c),
        d = {
          name: "screenfull",
          props: {
            width: { type: Number, default: 22 },
            height: { type: Number, default: 22 },
            fill: { type: String, default: "#48576a" }
          },
          data: function() {
            return { isFullscreen: !1 };
          },
          methods: {
            click: function() {
              if (!u.a.enabled)
                return (
                  this.$message({
                    message: "you browser can not work",
                    type: "warning"
                  }),
                  !1
                );
              u.a.toggle();
            }
          }
        },
        p = {
          render: function() {
            var t = this.$createElement,
              e = this._self._c || t;
            return e("div", [
              e(
                "svg",
                {
                  staticClass: "screenfull-svg",
                  staticStyle: { "enable-background": "new 0 0 489.3 489.3" },
                  attrs: {
                    x: "0px",
                    y: "0px",
                    viewBox: "0 0 489.3 489.3",
                    "xml:space": "preserve",
                    width: "32",
                    height: "32"
                  },
                  on: { click: this.click }
                },
                [
                  e("g", [
                    e("g", [
                      e("path", {
                        attrs: {
                          d:
                            "M476.95,0H12.35c-6.8,0-12.2,5.5-12.2,12.2V235c0,6.8,5.5,12.2,12.2,12.2s12.3-5.5,12.3-12.2V24.5h440.2v440.2h-211.9    c-6.8,0-12.3,5.5-12.3,12.3s5.5,12.3,12.3,12.3h224c6.8,0,12.3-5.5,12.3-12.3V12.3C489.25,5.5,483.75,0,476.95,0z",
                          fill: "#FFFFFF"
                        }
                      }),
                      this._v(" "),
                      e("path", {
                        attrs: {
                          d:
                            "M0.05,476.9c0,6.8,5.5,12.3,12.2,12.3h170.4c6.8,0,12.3-5.5,12.3-12.3V306.6c0-6.8-5.5-12.3-12.3-12.3H12.35    c-6.8,0-12.2,5.5-12.2,12.3v170.3H0.05z M24.55,318.8h145.9v145.9H24.55V318.8z",
                          fill: "#FFFFFF"
                        }
                      }),
                      this._v(" "),
                      e("path", {
                        attrs: {
                          d:
                            "M222.95,266.3c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6l138.6-138.7v79.9c0,6.8,5.5,12.3,12.3,12.3s12.3-5.5,12.3-12.3    V98.1c0-6.8-5.5-12.3-12.3-12.3h-109.5c-6.8,0-12.3,5.5-12.3,12.3s5.5,12.3,12.3,12.3h79.9L222.95,249    C218.15,253.8,218.15,261.5,222.95,266.3z",
                          fill: "#FFFFFF"
                        }
                      })
                    ])
                  ])
                ]
              )
            ]);
          },
          staticRenderFns: []
        };
      var h = {
          components: {
            Hamburger: l,
            Screenfull: n("VU/8")(
              d,
              p,
              !1,
              function(t) {
                n("v4W0");
              },
              "data-v-3d8fe5f7",
              null
            ).exports
          },
          computed: s()({}, Object(a.b)(["sidebar", "email", "avatar"])),
          methods: {
            goToMailbox: function() {
              window.open("http://mail.vce.vn");
            },
            toggleSideBar: function() {
              this.$store.dispatch("toggleSideBar");
            },
            logout: function() {
              this.$session.destroy(),
                this.$cookies.remove("token"),
                this.$cookies.remove("otp"),
                this.$router.push("/login");
            },
            goToPage: function(t) {
              switch (t) {
                case "manage-user":
                  this.$router.push("/quan-ly-user/index");
              }
            }
          }
        },
        m = {
          render: function() {
            var t = this,
              e = t.$createElement,
              i = t._self._c || e;
            return i(
              "el-menu",
              { staticClass: "navbar", attrs: { mode: "horizontal" } },
              [
                i("hamburger", {
                  staticClass: "hamburger-container",
                  attrs: {
                    toggleClick: t.toggleSideBar,
                    isActive: t.sidebar.opened
                  }
                }),
                t._v(" "),
                i("div", { attrs: { id: "logo" } }, [
                  i("div", { staticClass: "logo-img" }),
                  t._v(" "),
                  i(
                    "span",
                    {
                      staticClass: "service-name",
                      staticStyle: {
                        "font-size": "22px",
                        "font-family": "Dialog"
                      }
                    },
                    [t._v("MV")]
                  )
                ]),
                t._v(" "),
                i(
                  "div",
                  { staticClass: "right-menu" },
                  [
                    i(
                      "el-tooltip",
                      {
                        attrs: {
                          effect: "dark",
                          content: "Fullscreen",
                          placement: "bottom"
                        }
                      },
                      [
                        i("screenfull", {
                          staticClass: "screenfull right-menu-item"
                        })
                      ],
                      1
                    ),
                    t._v(" "),
                    i(
                      "el-dropdown",
                      {
                        staticClass: "avatar-container right-menu-item",
                        attrs: { trigger: "click", "show-timeout": 0 }
                      },
                      [
                        i("div", { staticClass: "avatar-wrapper" }, [
                          i("img", {
                            staticClass: "user-avatar",
                            attrs: { src: n("ssfn") }
                          }),
                          t._v(" "),
                          i("i", {
                            staticClass: "el-icon-caret-bottom",
                            staticStyle: { color: "#fff" }
                          })
                        ]),
                        t._v(" "),
                        i(
                          "el-dropdown-menu",
                          { attrs: { slot: "dropdown" }, slot: "dropdown" },
                          [
                            i("el-dropdown-item", { attrs: { divided: "" } }, [
                              i(
                                "span",
                                {
                                  staticStyle: { display: "block" },
                                  on: { click: t.logout }
                                },
                                [
                                  i("i", {
                                    staticClass: "fas fa-power-off fa-fw"
                                  }),
                                  t._v(" Đăng xuất\n          ")
                                ]
                              )
                            ])
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            );
          },
          staticRenderFns: []
        };
      var f = n("VU/8")(
        h,
        m,
        !1,
        function(t) {
          n("GPY1");
        },
        "data-v-79073192",
        null
      );
      e.default = f.exports;
    },
    "7kLr": function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = {
          name: "memo",
          data: function() {
            return { textarea: "" };
          },
          methods: {
            sendServer: function() {
              var t = this;
              console.log(this.textarea);
              var e = { key: this.textarea, table: "mv" };
              this.$http.post("http://127.0.0.1:8100/memo", e).then(
                function(t) {
                  !0 === t.body.status
                    ? (this.$notify({
                        title: "Success",
                        message: t.body.message,
                        type: "success",
                        position: "bottom-right"
                      }),
                      this.getdata())
                    : this.$notify.error({
                        title: "Error",
                        message: t.body.message
                      });
                },
                function(e) {
                  t.notify("warning", e.body.message);
                }
              );
            }
          }
        },
        s = {
          render: function() {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n(
              "div",
              [
                n(
                  "el-row",
                  { attrs: { gutter: 10 } },
                  [
                    n(
                      "el-col",
                      { attrs: { span: 8 } },
                      [
                        n(
                          "el-row",
                          [
                            n(
                              "div",
                              { staticClass: "app-container" },
                              [
                                n("el-input", {
                                  attrs: {
                                    type: "textarea",
                                    rows: 28,
                                    placeholder: "Please input"
                                  },
                                  model: {
                                    value: t.textarea,
                                    callback: function(e) {
                                      t.textarea = e;
                                    },
                                    expression: "textarea"
                                  }
                                })
                              ],
                              1
                            ),
                            t._v(" "),
                            n(
                              "center",
                              [
                                n(
                                  "el-button",
                                  {
                                    attrs: { type: "primary", plain: "" },
                                    on: { click: t.sendServer }
                                  },
                                  [t._v("Primary")]
                                )
                              ],
                              1
                            )
                          ],
                          1
                        ),
                        t._v(" "),
                        n("br")
                      ],
                      1
                    ),
                    t._v(" "),
                    n("el-col", { attrs: { span: 8 } }, [
                      n("div", { staticClass: "mv" })
                    ]),
                    t._v(" "),
                    n("el-col", { attrs: { span: 8 } })
                  ],
                  1
                )
              ],
              1
            );
          },
          staticRenderFns: []
        };
      var a = n("VU/8")(
        i,
        s,
        !1,
        function(t) {
          n("XEqd");
        },
        "data-v-1d0bed44",
        null
      );
      e.default = a.exports;
    },
    "9xcB": function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = n("5ybE"),
        s = {
          name: "showAll",
          data: function() {
            return {
              dialogFormVisible: !1,
              level: 15,
              level2: 1,
              en: "",
              vn: "",
              words1: [],
              words2: [],
              check: !0,
              check1: !0
            };
          },
          mounted: function() {
            this.getdata();
          },
          methods: {
            getdata: function() {
              var t = this,
                e = { level: this.level2 };
              Object(i.d)(e).then(function(e) {
                console.log("==========================="), console.log(e);
                var n = [];
                for (var i in ((t.words1 = []),
                (t.words2 = []),
                (n = e.data.data)))
                  n[i].edit = !1;
                if ((console.log(parseInt(n.length / 2)), n.length > 1)) {
                  for (var s = 0; s < n.length / 2; s++) t.words1.push(n[s]);
                  for (
                    var a =
                      n.length % 2
                        ? parseInt(n.length / 2) + 1
                        : parseInt(n.length / 2);
                    a < n.length;
                    a++
                  )
                    t.words2.push(n[a]);
                } else t.words1 = n;
              });
            },
            pronounce: function(t) {
              var e = new SpeechSynthesisUtterance();
              (e.voiceURI = "native"),
                (e.text = t),
                (e.lang = "en-US"),
                (e.onend = function(t) {
                  console.log("Finished in " + event.elapsedTime + " seconds.");
                }),
                speechSynthesis.speak(e),
                console.log(t);
            },
            confuse: function() {
              this.words1.sort(function() {
                return 0.5 - Math.random();
              }),
                this.words2.sort(function() {
                  return 0.5 - Math.random();
                });
            },
            addVoca: function() {
              var t = this,
                e = {
                  key: this.en,
                  value: this.vn,
                  level: this.level,
                  table: this.$route.params.nameTopic
                };
              this.$http.post("http://127.0.0.1:8100/preview", e).then(
                function(t) {
                  !0 === t.body.status
                    ? (this.$notify({
                        title: "Success",
                        message: t.body.message,
                        type: "success"
                      }),
                      this.getdata())
                    : this.$notify.error({
                        title: "Error",
                        message: t.body.message
                      });
                },
                function(e) {
                  t.notify("warning", e.body.message);
                }
              );
            },
            update: function(t) {
              var e = this,
                n = {
                  key: t.key,
                  value: t.value,
                  level: t.level,
                  table: this.$route.params.nameTopic,
                  _id: t._id.$oid
                };
              this.$http.put("http://127.0.0.1:8100/preview", n).then(
                function(t) {
                  !0 === t.body.status
                    ? this.$notify({
                        title: "Success",
                        message: t.body.message,
                        type: "success"
                      })
                    : this.$notify.error({
                        title: "Error",
                        message: t.body.message
                      });
                },
                function(t) {
                  e.$notify.error({ title: "Error", message: t.body.message });
                }
              );
            },
            delete: function(t) {
              var e = this,
                n = { table: this.$route.params.nameTopic, _id: t._id.$oid };
              this.$http
                .delete("http://127.0.0.1:8100/preview", { body: n })
                .then(
                  function(t) {
                    !0 === t.body.status &&
                      (this.$notify({
                        title: "Success",
                        message: t.body.message,
                        type: "success"
                      }),
                      this.getdata());
                  },
                  function(t) {
                    e.$notify.error({
                      title: "Error",
                      message: t.body.message
                    });
                  }
                );
            },
            handleDeleteUser: function(t) {
              (t.edit = !1), this.delete(t);
            },
            handleCancelEditUser: function(t) {
              t.edit = !1;
            },
            handleEditUser: function(t) {
              t.edit = !0;
            },
            handleUpdateUserRole: function(t) {
              this.update(t), (t.edit = !1);
            }
          }
        },
        a = {
          render: function() {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n(
              "div",
              [
                n(
                  "el-row",
                  [
                    n(
                      "div",
                      { staticClass: "app-container" },
                      [
                        n(
                          "el-row",
                          { attrs: { gutter: 20 } },
                          [
                            n(
                              "el-col",
                              { attrs: { xs: 24, sm: 24, md: 24 } },
                              [
                                n(
                                  "el-card",
                                  { attrs: { shadow: "never" } },
                                  [
                                    n(
                                      "div",
                                      {
                                        staticClass: "clearfix",
                                        staticStyle: { position: "relative" },
                                        attrs: { slot: "header" },
                                        slot: "header"
                                      },
                                      [
                                        n(
                                          "span",
                                          {
                                            staticStyle: {
                                              "font-weight": "bold",
                                              "font-size": "20px"
                                            }
                                          },
                                          [
                                            t._v(
                                              "Topic " +
                                                t._s(
                                                  this.$route.params.nameTopic
                                                )
                                            )
                                          ]
                                        ),
                                        t._v(" "),
                                        n(
                                          "el-button",
                                          {
                                            staticStyle: {
                                              "padding-left": "10px"
                                            },
                                            attrs: {
                                              size: "mini",
                                              type: "primary"
                                            },
                                            on: {
                                              click: function(e) {
                                                t.dialogFormVisible = !0;
                                              }
                                            }
                                          },
                                          [
                                            n("i", {
                                              staticClass: "fas fa-plus-circle"
                                            }),
                                            t._v(" Thêm mới")
                                          ]
                                        ),
                                        t._v(" "),
                                        n(
                                          "el-button",
                                          {
                                            attrs: {
                                              type: "primary",
                                              plain: ""
                                            },
                                            on: {
                                              click: function(e) {
                                                return t.getdata();
                                              }
                                            }
                                          },
                                          [t._v("Show level")]
                                        ),
                                        t._v(" "),
                                        n("el-input-number", {
                                          staticStyle: { width: "90px" },
                                          attrs: {
                                            size: "mini",
                                            "controls-position": "right",
                                            min: 1,
                                            max: 15
                                          },
                                          model: {
                                            value: t.level2,
                                            callback: function(e) {
                                              t.level2 = e;
                                            },
                                            expression: "level2"
                                          }
                                        }),
                                        t._v(" "),
                                        n(
                                          "div",
                                          { staticStyle: { float: "right" } },
                                          [
                                            n(
                                              "el-button",
                                              {
                                                attrs: { type: "primary" },
                                                on: {
                                                  click: function(e) {
                                                    return t.confuse();
                                                  }
                                                }
                                              },
                                              [t._v("Confuse")]
                                            )
                                          ],
                                          1
                                        )
                                      ],
                                      1
                                    ),
                                    t._v(" "),
                                    n(
                                      "el-row",
                                      {
                                        staticStyle: {
                                          "margin-left": "0!important",
                                          "margin-right": "0!important"
                                        },
                                        attrs: { gutter: 20 }
                                      },
                                      [
                                        n(
                                          "el-col",
                                          { attrs: { xs: 24, sm: 24, lg: 12 } },
                                          [
                                            n(
                                              "el-table",
                                              {
                                                staticStyle: { width: "100%" },
                                                attrs: {
                                                  data: t.words1,
                                                  stripe: ""
                                                }
                                              },
                                              [
                                                n("el-table-column", {
                                                  attrs: {
                                                    label: "EN",
                                                    width: "150"
                                                  },
                                                  scopedSlots: t._u([
                                                    {
                                                      key: "default",
                                                      fn: function(e) {
                                                        return [
                                                          !1 === e.row.edit
                                                            ? n("div", [
                                                                t.check
                                                                  ? n("div", [
                                                                      t._v(
                                                                        " " +
                                                                          t._s(
                                                                            e
                                                                              .row
                                                                              .key
                                                                          ) +
                                                                          " "
                                                                      ),
                                                                      n("i", {
                                                                        staticClass:
                                                                          "el-icon-video-play",
                                                                        on: {
                                                                          click: function(
                                                                            n
                                                                          ) {
                                                                            return t.pronounce(
                                                                              e
                                                                                .row
                                                                                .key
                                                                            );
                                                                          }
                                                                        }
                                                                      })
                                                                    ])
                                                                  : t._e()
                                                              ])
                                                            : n(
                                                                "div",
                                                                [
                                                                  n(
                                                                    "el-input",
                                                                    {
                                                                      attrs: {
                                                                        placeholder:
                                                                          "Please input"
                                                                      },
                                                                      model: {
                                                                        value:
                                                                          e.row
                                                                            .key,
                                                                        callback: function(
                                                                          n
                                                                        ) {
                                                                          t.$set(
                                                                            e.row,
                                                                            "key",
                                                                            n
                                                                          );
                                                                        },
                                                                        expression:
                                                                          "scope.row.key"
                                                                      }
                                                                    }
                                                                  )
                                                                ],
                                                                1
                                                              )
                                                        ];
                                                      }
                                                    }
                                                  ])
                                                }),
                                                t._v(" "),
                                                n("el-table-column", {
                                                  attrs: {
                                                    label: "VN",
                                                    width: "200"
                                                  },
                                                  scopedSlots: t._u([
                                                    {
                                                      key: "default",
                                                      fn: function(e) {
                                                        return [
                                                          !1 === e.row.edit
                                                            ? n("div", [
                                                                t.check1
                                                                  ? n("div", [
                                                                      t._v(
                                                                        t._s(
                                                                          e.row
                                                                            .value
                                                                        )
                                                                      )
                                                                    ])
                                                                  : t._e()
                                                              ])
                                                            : n(
                                                                "div",
                                                                [
                                                                  n(
                                                                    "el-input",
                                                                    {
                                                                      attrs: {
                                                                        placeholder:
                                                                          "Please input"
                                                                      },
                                                                      model: {
                                                                        value:
                                                                          e.row
                                                                            .value,
                                                                        callback: function(
                                                                          n
                                                                        ) {
                                                                          t.$set(
                                                                            e.row,
                                                                            "value",
                                                                            n
                                                                          );
                                                                        },
                                                                        expression:
                                                                          "scope.row.value"
                                                                      }
                                                                    }
                                                                  )
                                                                ],
                                                                1
                                                              )
                                                        ];
                                                      }
                                                    }
                                                  ])
                                                }),
                                                t._v(" "),
                                                n("el-table-column", {
                                                  attrs: {
                                                    prop: "level",
                                                    label: "LE",
                                                    width: "100"
                                                  },
                                                  scopedSlots: t._u([
                                                    {
                                                      key: "default",
                                                      fn: function(e) {
                                                        return [
                                                          !1 === e.row.edit
                                                            ? n("div", [
                                                                t._v(
                                                                  "\n                        " +
                                                                    t._s(
                                                                      e.row
                                                                        .level
                                                                    ) +
                                                                    "\n                      "
                                                                )
                                                              ])
                                                            : n(
                                                                "div",
                                                                [
                                                                  n(
                                                                    "el-input-number",
                                                                    {
                                                                      staticStyle: {
                                                                        width:
                                                                          "80px"
                                                                      },
                                                                      attrs: {
                                                                        size:
                                                                          "mini",
                                                                        "controls-position":
                                                                          "right",
                                                                        min: 1,
                                                                        max: 15
                                                                      },
                                                                      model: {
                                                                        value:
                                                                          e.row
                                                                            .level,
                                                                        callback: function(
                                                                          n
                                                                        ) {
                                                                          t.$set(
                                                                            e.row,
                                                                            "level",
                                                                            n
                                                                          );
                                                                        },
                                                                        expression:
                                                                          "scope.row.level"
                                                                      }
                                                                    }
                                                                  )
                                                                ],
                                                                1
                                                              )
                                                        ];
                                                      }
                                                    }
                                                  ])
                                                }),
                                                t._v(" "),
                                                n("el-table-column", {
                                                  attrs: {
                                                    label: "Manager",
                                                    width: "130"
                                                  },
                                                  scopedSlots: t._u([
                                                    {
                                                      key: "default",
                                                      fn: function(e) {
                                                        return [
                                                          !0 === e.row.edit
                                                            ? n(
                                                                "el-button",
                                                                {
                                                                  attrs: {
                                                                    type:
                                                                      "text",
                                                                    plain: "",
                                                                    size: "mini"
                                                                  },
                                                                  on: {
                                                                    click: function(
                                                                      n
                                                                    ) {
                                                                      return t.handleUpdateUserRole(
                                                                        e.row
                                                                      );
                                                                    }
                                                                  }
                                                                },
                                                                [
                                                                  t._v(
                                                                    "\n                        Lưu\n                      "
                                                                  )
                                                                ]
                                                              )
                                                            : t._e(),
                                                          t._v(" "),
                                                          !0 === e.row.edit
                                                            ? n(
                                                                "el-button",
                                                                {
                                                                  attrs: {
                                                                    type:
                                                                      "text",
                                                                    plain: "",
                                                                    size: "mini"
                                                                  },
                                                                  on: {
                                                                    click: function(
                                                                      n
                                                                    ) {
                                                                      return t.handleCancelEditUser(
                                                                        e.row
                                                                      );
                                                                    }
                                                                  }
                                                                },
                                                                [
                                                                  t._v(
                                                                    "\n                        Hủy\n                      "
                                                                  )
                                                                ]
                                                              )
                                                            : t._e(),
                                                          t._v(" "),
                                                          n(
                                                            "el-tooltip",
                                                            {
                                                              staticClass:
                                                                "item",
                                                              attrs: {
                                                                effect: "dark",
                                                                content:
                                                                  "Sửa đổi",
                                                                placement:
                                                                  "top-start",
                                                                enterable: !1
                                                              }
                                                            },
                                                            [
                                                              !1 === e.row.edit
                                                                ? n(
                                                                    "el-button",
                                                                    {
                                                                      attrs: {
                                                                        icon:
                                                                          "el-icon-edit",
                                                                        type:
                                                                          "text",
                                                                        plain:
                                                                          "",
                                                                        size:
                                                                          "mini"
                                                                      },
                                                                      on: {
                                                                        click: function(
                                                                          n
                                                                        ) {
                                                                          return t.handleEditUser(
                                                                            e.row
                                                                          );
                                                                        }
                                                                      }
                                                                    }
                                                                  )
                                                                : t._e()
                                                            ],
                                                            1
                                                          ),
                                                          t._v(" "),
                                                          !1 === e.row.edit
                                                            ? n(
                                                                "el-tooltip",
                                                                {
                                                                  staticClass:
                                                                    "item",
                                                                  attrs: {
                                                                    effect:
                                                                      "dark",
                                                                    content:
                                                                      "Xoá khỏi hệ thống",
                                                                    placement:
                                                                      "top-start",
                                                                    enterable: !1
                                                                  }
                                                                },
                                                                [
                                                                  n(
                                                                    "el-button",
                                                                    {
                                                                      attrs: {
                                                                        type:
                                                                          "text",
                                                                        plain:
                                                                          "",
                                                                        size:
                                                                          "mini"
                                                                      },
                                                                      on: {
                                                                        click: function(
                                                                          n
                                                                        ) {
                                                                          return t.handleDeleteUser(
                                                                            e.row
                                                                          );
                                                                        }
                                                                      }
                                                                    },
                                                                    [
                                                                      n("i", {
                                                                        staticClass:
                                                                          "el-icon-delete"
                                                                      })
                                                                    ]
                                                                  )
                                                                ],
                                                                1
                                                              )
                                                            : t._e()
                                                        ];
                                                      }
                                                    }
                                                  ])
                                                })
                                              ],
                                              1
                                            )
                                          ],
                                          1
                                        ),
                                        t._v(" "),
                                        n(
                                          "el-col",
                                          { attrs: { xs: 24, sm: 24, lg: 12 } },
                                          [
                                            n(
                                              "el-table",
                                              {
                                                staticStyle: { width: "100%" },
                                                attrs: {
                                                  data: t.words2,
                                                  stripe: ""
                                                }
                                              },
                                              [
                                                n("el-table-column", {
                                                  attrs: {
                                                    prop: "key",
                                                    label: "EN",
                                                    width: "150"
                                                  },
                                                  scopedSlots: t._u([
                                                    {
                                                      key: "default",
                                                      fn: function(e) {
                                                        return [
                                                          !1 === e.row.edit
                                                            ? n("div", [
                                                                t.check
                                                                  ? n("div", [
                                                                      t._v(
                                                                        " " +
                                                                          t._s(
                                                                            e
                                                                              .row
                                                                              .key
                                                                          ) +
                                                                          " "
                                                                      ),
                                                                      n("i", {
                                                                        staticClass:
                                                                          "el-icon-video-play",
                                                                        on: {
                                                                          click: function(
                                                                            n
                                                                          ) {
                                                                            return t.pronounce(
                                                                              e
                                                                                .row
                                                                                .key
                                                                            );
                                                                          }
                                                                        }
                                                                      })
                                                                    ])
                                                                  : t._e()
                                                              ])
                                                            : n(
                                                                "div",
                                                                [
                                                                  n(
                                                                    "el-input",
                                                                    {
                                                                      attrs: {
                                                                        placeholder:
                                                                          "Please input"
                                                                      },
                                                                      model: {
                                                                        value:
                                                                          e.row
                                                                            .key,
                                                                        callback: function(
                                                                          n
                                                                        ) {
                                                                          t.$set(
                                                                            e.row,
                                                                            "key",
                                                                            n
                                                                          );
                                                                        },
                                                                        expression:
                                                                          "scope.row.key"
                                                                      }
                                                                    }
                                                                  )
                                                                ],
                                                                1
                                                              )
                                                        ];
                                                      }
                                                    }
                                                  ])
                                                }),
                                                t._v(" "),
                                                n("el-table-column", {
                                                  attrs: {
                                                    prop: "value",
                                                    label: "VN",
                                                    width: "200"
                                                  },
                                                  scopedSlots: t._u([
                                                    {
                                                      key: "default",
                                                      fn: function(e) {
                                                        return [
                                                          !1 === e.row.edit
                                                            ? n("div", [
                                                                t.check1
                                                                  ? n("div", [
                                                                      t._v(
                                                                        t._s(
                                                                          e.row
                                                                            .value
                                                                        )
                                                                      )
                                                                    ])
                                                                  : t._e()
                                                              ])
                                                            : n(
                                                                "div",
                                                                [
                                                                  n(
                                                                    "el-input",
                                                                    {
                                                                      attrs: {
                                                                        placeholder:
                                                                          "Please input"
                                                                      },
                                                                      model: {
                                                                        value:
                                                                          e.row
                                                                            .value,
                                                                        callback: function(
                                                                          n
                                                                        ) {
                                                                          t.$set(
                                                                            e.row,
                                                                            "value",
                                                                            n
                                                                          );
                                                                        },
                                                                        expression:
                                                                          "scope.row.value"
                                                                      }
                                                                    }
                                                                  )
                                                                ],
                                                                1
                                                              )
                                                        ];
                                                      }
                                                    }
                                                  ])
                                                }),
                                                t._v(" "),
                                                n("el-table-column", {
                                                  attrs: {
                                                    prop: "level",
                                                    label: "LE",
                                                    width: "100"
                                                  },
                                                  scopedSlots: t._u([
                                                    {
                                                      key: "default",
                                                      fn: function(e) {
                                                        return [
                                                          !1 === e.row.edit
                                                            ? n("div", [
                                                                t._v(
                                                                  "\n                        " +
                                                                    t._s(
                                                                      e.row
                                                                        .level
                                                                    ) +
                                                                    "\n                      "
                                                                )
                                                              ])
                                                            : n(
                                                                "div",
                                                                [
                                                                  n(
                                                                    "el-input-number",
                                                                    {
                                                                      staticStyle: {
                                                                        width:
                                                                          "80px"
                                                                      },
                                                                      attrs: {
                                                                        size:
                                                                          "mini",
                                                                        "controls-position":
                                                                          "right",
                                                                        min: 1,
                                                                        max: 15
                                                                      },
                                                                      model: {
                                                                        value:
                                                                          e.row
                                                                            .level,
                                                                        callback: function(
                                                                          n
                                                                        ) {
                                                                          t.$set(
                                                                            e.row,
                                                                            "level",
                                                                            n
                                                                          );
                                                                        },
                                                                        expression:
                                                                          "scope.row.level"
                                                                      }
                                                                    }
                                                                  )
                                                                ],
                                                                1
                                                              )
                                                        ];
                                                      }
                                                    }
                                                  ])
                                                }),
                                                t._v(" "),
                                                n("el-table-column", {
                                                  attrs: {
                                                    label: "Manager",
                                                    width: "130"
                                                  },
                                                  scopedSlots: t._u([
                                                    {
                                                      key: "default",
                                                      fn: function(e) {
                                                        return [
                                                          !0 === e.row.edit
                                                            ? n(
                                                                "el-button",
                                                                {
                                                                  attrs: {
                                                                    type:
                                                                      "text",
                                                                    plain: "",
                                                                    size: "mini"
                                                                  },
                                                                  on: {
                                                                    click: function(
                                                                      n
                                                                    ) {
                                                                      return t.handleUpdateUserRole(
                                                                        e.row
                                                                      );
                                                                    }
                                                                  }
                                                                },
                                                                [
                                                                  t._v(
                                                                    "\n                        Lưu\n                      "
                                                                  )
                                                                ]
                                                              )
                                                            : t._e(),
                                                          t._v(" "),
                                                          !0 === e.row.edit
                                                            ? n(
                                                                "el-button",
                                                                {
                                                                  attrs: {
                                                                    type:
                                                                      "text",
                                                                    plain: "",
                                                                    size: "mini"
                                                                  },
                                                                  on: {
                                                                    click: function(
                                                                      n
                                                                    ) {
                                                                      return t.handleCancelEditUser(
                                                                        e.row
                                                                      );
                                                                    }
                                                                  }
                                                                },
                                                                [
                                                                  t._v(
                                                                    "\n                        Hủy\n                      "
                                                                  )
                                                                ]
                                                              )
                                                            : t._e(),
                                                          t._v(" "),
                                                          n(
                                                            "el-tooltip",
                                                            {
                                                              staticClass:
                                                                "item",
                                                              attrs: {
                                                                effect: "dark",
                                                                content:
                                                                  "Sửa đổi",
                                                                placement:
                                                                  "top-start",
                                                                enterable: !1
                                                              }
                                                            },
                                                            [
                                                              !1 === e.row.edit
                                                                ? n(
                                                                    "el-button",
                                                                    {
                                                                      attrs: {
                                                                        icon:
                                                                          "el-icon-edit",
                                                                        type:
                                                                          "text",
                                                                        plain:
                                                                          "",
                                                                        size:
                                                                          "mini"
                                                                      },
                                                                      on: {
                                                                        click: function(
                                                                          n
                                                                        ) {
                                                                          return t.handleEditUser(
                                                                            e.row
                                                                          );
                                                                        }
                                                                      }
                                                                    }
                                                                  )
                                                                : t._e()
                                                            ],
                                                            1
                                                          ),
                                                          t._v(" "),
                                                          !1 === e.row.edit
                                                            ? n(
                                                                "el-tooltip",
                                                                {
                                                                  staticClass:
                                                                    "item",
                                                                  attrs: {
                                                                    effect:
                                                                      "dark",
                                                                    content:
                                                                      "Xoá khỏi hệ thống",
                                                                    placement:
                                                                      "top-start",
                                                                    enterable: !1
                                                                  }
                                                                },
                                                                [
                                                                  n(
                                                                    "el-button",
                                                                    {
                                                                      attrs: {
                                                                        type:
                                                                          "text",
                                                                        plain:
                                                                          "",
                                                                        size:
                                                                          "mini"
                                                                      },
                                                                      on: {
                                                                        click: function(
                                                                          n
                                                                        ) {
                                                                          return t.handleDeleteUser(
                                                                            e.row
                                                                          );
                                                                        }
                                                                      }
                                                                    },
                                                                    [
                                                                      n("i", {
                                                                        staticClass:
                                                                          "el-icon-delete"
                                                                      })
                                                                    ]
                                                                  )
                                                                ],
                                                                1
                                                              )
                                                            : t._e()
                                                        ];
                                                      }
                                                    }
                                                  ])
                                                })
                                              ],
                                              1
                                            )
                                          ],
                                          1
                                        )
                                      ],
                                      1
                                    )
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    t._v(" "),
                    n(
                      "el-dialog",
                      {
                        attrs: {
                          title: "Add vocabulary",
                          visible: t.dialogFormVisible
                        },
                        on: {
                          "update:visible": function(e) {
                            t.dialogFormVisible = e;
                          }
                        }
                      },
                      [
                        n(
                          "el-form",
                          [
                            n(
                              "el-form-item",
                              { attrs: { label: "EN" } },
                              [
                                n("el-input", {
                                  attrs: { clearable: "" },
                                  model: {
                                    value: t.en,
                                    callback: function(e) {
                                      t.en = e;
                                    },
                                    expression: "en"
                                  }
                                })
                              ],
                              1
                            ),
                            t._v(" "),
                            n(
                              "el-form-item",
                              { attrs: { label: "VN" } },
                              [
                                n("el-input", {
                                  attrs: { clearable: "" },
                                  nativeOn: {
                                    keyup: function(e) {
                                      return !e.type.indexOf("key") &&
                                        t._k(
                                          e.keyCode,
                                          "enter",
                                          13,
                                          e.key,
                                          "Enter"
                                        )
                                        ? null
                                        : t.addVoca.apply(null, arguments);
                                    }
                                  },
                                  model: {
                                    value: t.vn,
                                    callback: function(e) {
                                      t.vn = e;
                                    },
                                    expression: "vn"
                                  }
                                })
                              ],
                              1
                            ),
                            t._v(" "),
                            n(
                              "el-form-item",
                              { attrs: { label: "Level" } },
                              [
                                n("el-rate", {
                                  attrs: {
                                    max: 15,
                                    colors: ["#99A9BF", "#F7BA2A", "#FF9900"]
                                  },
                                  model: {
                                    value: t.level,
                                    callback: function(e) {
                                      t.level = e;
                                    },
                                    expression: "level"
                                  }
                                }),
                                t._v(" "),
                                n("span", [t._v(t._s(t.level))])
                              ],
                              1
                            )
                          ],
                          1
                        ),
                        t._v(" "),
                        n(
                          "span",
                          {
                            staticClass: "dialog-footer",
                            attrs: { slot: "footer" },
                            slot: "footer"
                          },
                          [
                            n(
                              "el-button",
                              {
                                on: {
                                  click: function(e) {
                                    t.dialogFormVisible = !1;
                                  }
                                }
                              },
                              [t._v("Cancel")]
                            ),
                            t._v(" "),
                            n(
                              "el-button",
                              {
                                attrs: { type: "primary" },
                                on: {
                                  click: function(e) {
                                    return t.addVoca();
                                  }
                                }
                              },
                              [t._v("Confirm")]
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            );
          },
          staticRenderFns: []
        };
      var o = n("VU/8")(
        s,
        a,
        !1,
        function(t) {
          n("PaOn");
        },
        "data-v-493eea4a",
        null
      );
      e.default = o.exports;
    },
    A66B: function(t, e, n) {
      t.exports = function(t) {
        return function() {
          return n("Opzk")("./" + t + ".vue");
        };
      };
    },
    ARoL: function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = n("bEjd"),
        s = n("k96P"),
        a = n("WBHA"),
        o = n.n(a),
        r = n("5ybE"),
        l = n("PJh5"),
        c = n.n(l),
        u = n("TIfe"),
        d = {
          name: "dashboard-admin",
          components: {
            PanelGroup: i.default,
            pieChart: s.default,
            countTo: o.a
          },
          data: function() {
            return {
              lev: 14,
              en: "",
              vn: "",
              chartOptions: null,
              chart: null,
              chart1: null,
              total: 0,
              expert: 0,
              vague: 0,
              forget: 0,
              note: [],
              packages: { total: 0 },
              exten: null,
              pro: 0,
              available: 0,
              used: 0,
              innings: 0,
              incomplete: 0,
              check_add: !1,
              lev_note: 15,
              note_ad: ""
            };
          },
          mounted: function() {
            this.getdata();
          },
          created: function() {
            this.getdata(), this.getuser(), this.getNote();
          },
          methods: {
            getdata: function() {
              var t = this,
                e = {
                  start: c()(new Date().toDateString()).format("DD-MM-YYYY")
                };
              Object(r.f)(e).then(function(e) {
                console.log(Object(u.a)()),
                  (t.total = e.data.total),
                  (t.expert = e.data.expert),
                  (t.vague = e.data.vague),
                  (t.forget = e.data.forget),
                  (t.exten = e.data.data);
              });
            },
            getuser: function() {
              var t = this,
                e = {
                  start: c()(new Date().toDateString()).format("DD-MM-YYYY")
                };
              Object(r.i)(e).then(function(e) {
                (t.innings = e.data.innings),
                  (t.incomplete = e.data.incomplete);
              });
            },
            getNote: function() {
              var t = this;
              Object(r.g)().then(function(e) {
                console.log(e), (t.note = e.data.data);
              }),
                console.log(this.note);
            },
            pushdata: function() {
              var t = this,
                e = {
                  key: this.en,
                  value: this.vn,
                  level: this.lev,
                  creat_day: c()(new Date().toDateString()).format("DD-MM-YYYY")
                };
              Object(r.a)(e).then(function(e) {
                !0 === e.data.status
                  ? (t.$notify({
                      title: "Thành công",
                      message: e.data.message,
                      type: "success"
                    }),
                    t.getdata())
                  : t.$notify({
                      title: "emergency",
                      message: e.data.message,
                      type: "error"
                    });
              });
            },
            pushNote: function() {
              var t = this,
                e = { note: this.note_ad, level: this.lev_note };
              Object(r.b)(e).then(function(e) {
                !0 === e.data.status
                  ? (t.$notify({
                      title: "Thành công",
                      message: e.data.message,
                      type: "success"
                    }),
                    t.getNote(),
                    (t.check_add = !1))
                  : t.$notify({
                      title: "emergency",
                      message: e.data.message,
                      type: "error"
                    });
              });
            }
          }
        },
        p = {
          render: function() {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n(
              "div",
              {
                staticStyle: {
                  padding: "2%",
                  "padding-top": "10px",
                  "background-image":
                    "url('https://gonefisching.com/wp-content/uploads/2020/04/Tres-Lagunas-Cordillera-Huayhuash.jpg')"
                }
              },
              [
                n(
                  "el-row",
                  {
                    staticStyle: { padding: "20px", "padding-top": "10px" },
                    attrs: { gutter: 40 }
                  },
                  [
                    n("el-col", { attrs: { xs: 24, sm: 24, lg: 8, md: 12 } }, [
                      n(
                        "div",
                        { staticClass: "grid-content bg-purple" },
                        [
                          n(
                            "div",
                            {
                              staticClass: "hea3",
                              staticStyle: {
                                "border-right": "1px #e6e6e6 solid"
                              }
                            },
                            [
                              n(
                                "div",
                                {
                                  staticStyle: {
                                    "margin-bottom": "40px",
                                    border: "black"
                                  }
                                },
                                [
                                  n(
                                    "el-button",
                                    {
                                      staticStyle: { "font-size": "18px" },
                                      attrs: { type: "text" },
                                      on: {
                                        click: function(e) {
                                          return t.pushdata();
                                        }
                                      }
                                    },
                                    [t._v("Raise")]
                                  )
                                ],
                                1
                              )
                            ]
                          ),
                          t._v(" "),
                          n(
                            "el-row",
                            [
                              n(
                                "el-col",
                                { attrs: { span: 14 } },
                                [
                                  n(
                                    "el-row",
                                    {
                                      staticStyle: {
                                        "padding-left": "5px",
                                        "padding-top": "5px"
                                      }
                                    },
                                    [
                                      n("el-input", {
                                        attrs: {
                                          size: "mini",
                                          placeholder: "EN",
                                          clearable: ""
                                        },
                                        model: {
                                          value: t.en,
                                          callback: function(e) {
                                            t.en = e;
                                          },
                                          expression: "en"
                                        }
                                      })
                                    ],
                                    1
                                  ),
                                  t._v(" "),
                                  n(
                                    "el-row",
                                    {
                                      staticStyle: {
                                        "padding-left": "5px",
                                        "padding-bottom": "2px",
                                        "padding-top": "15px"
                                      }
                                    },
                                    [
                                      n("el-input", {
                                        attrs: {
                                          size: "mini",
                                          placeholder: "VN",
                                          clearable: ""
                                        },
                                        nativeOn: {
                                          keyup: function(e) {
                                            return !e.type.indexOf("key") &&
                                              t._k(
                                                e.keyCode,
                                                "enter",
                                                13,
                                                e.key,
                                                "Enter"
                                              )
                                              ? null
                                              : t.pushdata();
                                          }
                                        },
                                        model: {
                                          value: t.vn,
                                          callback: function(e) {
                                            t.vn = e;
                                          },
                                          expression: "vn"
                                        }
                                      })
                                    ],
                                    1
                                  )
                                ],
                                1
                              ),
                              t._v(" "),
                              n(
                                "el-col",
                                { attrs: { span: 10 } },
                                [
                                  n(
                                    "center",
                                    { staticStyle: { "padding-top": "25px" } },
                                    [
                                      n("el-input-number", {
                                        staticStyle: { width: "100px" },
                                        attrs: { size: "mini" },
                                        model: {
                                          value: t.lev,
                                          callback: function(e) {
                                            t.lev = e;
                                          },
                                          expression: "lev"
                                        }
                                      })
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ]),
                    t._v(" "),
                    n("el-col", { attrs: { xs: 24, sm: 24, lg: 8, md: 12 } }, [
                      n(
                        "div",
                        { staticClass: "grid-content bg-purple" },
                        [
                          n("div", { staticClass: "hea" }, [
                            t.total
                              ? n(
                                  "div",
                                  [
                                    t._v("Progress: "),
                                    n("countTo", {
                                      attrs: {
                                        startVal: 0,
                                        endVal: t.total,
                                        duration: 3500
                                      }
                                    })
                                  ],
                                  1
                                )
                              : t._e()
                          ]),
                          t._v(" "),
                          n(
                            "el-row",
                            [
                              n(
                                "el-col",
                                {
                                  staticStyle: {
                                    "border-right": "1px #e6e6e6 solid"
                                  },
                                  attrs: { xs: 8, sm: 8, lg: 8, md: 12 }
                                },
                                [
                                  n(
                                    "el-row",
                                    [
                                      n(
                                        "el-col",
                                        { attrs: { span: 10 } },
                                        [
                                          n("center", [
                                            n("div", { staticClass: "dd" }, [
                                              n("br")
                                            ])
                                          ])
                                        ],
                                        1
                                      ),
                                      t._v(" "),
                                      n(
                                        "el-col",
                                        {
                                          staticStyle: {
                                            "margin-top": "3px",
                                            color: "#616366"
                                          },
                                          attrs: { span: 14 }
                                        },
                                        [n("span", [t._v("Expert")])]
                                      )
                                    ],
                                    1
                                  ),
                                  t._v(" "),
                                  n("div", [
                                    n(
                                      "div",
                                      {
                                        staticStyle: {
                                          "text-align": "center",
                                          "padding-top": "15px",
                                          "font-size": "24px",
                                          color: "#616366"
                                        }
                                      },
                                      [
                                        n("countTo", {
                                          attrs: {
                                            startVal: 0,
                                            endVal: t.expert,
                                            duration: 3500
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  ]),
                                  t._v(" "),
                                  n("br")
                                ],
                                1
                              ),
                              t._v(" "),
                              n(
                                "el-col",
                                {
                                  staticStyle: {
                                    "border-right": "1px #e6e6e6 solid"
                                  },
                                  attrs: { xs: 8, sm: 8, lg: 8, md: 12 }
                                },
                                [
                                  n(
                                    "el-row",
                                    [
                                      n(
                                        "el-col",
                                        { attrs: { span: 5 } },
                                        [
                                          n("center", [
                                            n("div", { staticClass: "dd1" }, [
                                              n("br")
                                            ])
                                          ])
                                        ],
                                        1
                                      ),
                                      t._v(" "),
                                      n(
                                        "el-col",
                                        {
                                          staticStyle: {
                                            "margin-top": "3px",
                                            color: "#616366"
                                          },
                                          attrs: { span: 19 }
                                        },
                                        [n("span", [t._v("Vague")])]
                                      )
                                    ],
                                    1
                                  ),
                                  t._v(" "),
                                  n("div", [
                                    n(
                                      "div",
                                      {
                                        staticStyle: {
                                          "text-align": "center",
                                          "padding-top": "15px",
                                          "font-size": "24px",
                                          color: "#616366"
                                        }
                                      },
                                      [
                                        n("countTo", {
                                          attrs: {
                                            startVal: 0,
                                            endVal: t.vague,
                                            duration: 3500
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  ]),
                                  t._v(" "),
                                  n("br")
                                ],
                                1
                              ),
                              t._v(" "),
                              n(
                                "el-col",
                                { attrs: { xs: 8, sm: 8, lg: 8, md: 12 } },
                                [
                                  n(
                                    "el-row",
                                    [
                                      n(
                                        "el-col",
                                        { attrs: { span: 6 } },
                                        [
                                          n("center", [
                                            n("div", { staticClass: "dd2" }, [
                                              n("br")
                                            ])
                                          ])
                                        ],
                                        1
                                      ),
                                      t._v(" "),
                                      n(
                                        "el-col",
                                        {
                                          staticStyle: {
                                            "margin-top": "3px",
                                            color: "#616366"
                                          },
                                          attrs: { span: 18 }
                                        },
                                        [n("span", [t._v("Forget")])]
                                      )
                                    ],
                                    1
                                  ),
                                  t._v(" "),
                                  n("div", [
                                    n(
                                      "div",
                                      {
                                        staticStyle: {
                                          "text-align": "center",
                                          "padding-top": "15px",
                                          "font-size": "24px",
                                          color: "#616366"
                                        }
                                      },
                                      [
                                        n("countTo", {
                                          attrs: {
                                            startVal: 0,
                                            endVal: t.forget,
                                            duration: 3500
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  ]),
                                  t._v(" "),
                                  n("br")
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          t._v(" "),
                          n("div", {
                            staticStyle: {
                              height: "4px",
                              width: "100%",
                              "background-color": "rgba(75, 179, 197, 0.97)"
                            }
                          })
                        ],
                        1
                      )
                    ]),
                    t._v(" "),
                    n("el-col", { attrs: { xs: 24, sm: 24, lg: 8, md: 12 } }, [
                      n(
                        "div",
                        { staticClass: "grid-content bg-purple" },
                        [
                          n("div", { staticClass: "hea1" }, [
                            n(
                              "div",
                              [
                                t._v("Counter "),
                                n("countTo", {
                                  attrs: {
                                    startVal: 0,
                                    endVal: t.innings,
                                    duration: 3e3
                                  }
                                })
                              ],
                              1
                            )
                          ]),
                          t._v(" "),
                          n(
                            "el-row",
                            [
                              n(
                                "el-col",
                                {
                                  staticStyle: {
                                    "border-right": "1px #e6e6e6 solid"
                                  },
                                  attrs: { span: 12 }
                                },
                                [
                                  n(
                                    "el-row",
                                    [
                                      n(
                                        "el-col",
                                        { attrs: { span: 10 } },
                                        [
                                          n("center", [
                                            n("div", { staticClass: "dd" }, [
                                              n("br")
                                            ])
                                          ])
                                        ],
                                        1
                                      ),
                                      t._v(" "),
                                      n(
                                        "el-col",
                                        {
                                          staticStyle: {
                                            "margin-top": "3px",
                                            color: "#616366"
                                          },
                                          attrs: { span: 14 }
                                        },
                                        [n("span", [t._v("Done")])]
                                      )
                                    ],
                                    1
                                  ),
                                  t._v(" "),
                                  n("div", [
                                    n(
                                      "div",
                                      {
                                        staticStyle: {
                                          "text-align": "center",
                                          "padding-top": "15px",
                                          "font-size": "24px",
                                          color: "#616366"
                                        }
                                      },
                                      [
                                        n("countTo", {
                                          attrs: {
                                            startVal: 0,
                                            endVal: t.innings,
                                            duration: 3500
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  ]),
                                  t._v(" "),
                                  n("br")
                                ],
                                1
                              ),
                              t._v(" "),
                              n(
                                "el-col",
                                { attrs: { span: 12 } },
                                [
                                  n(
                                    "el-row",
                                    [
                                      n(
                                        "el-col",
                                        { attrs: { span: 10 } },
                                        [
                                          n("center", [
                                            n("div", { staticClass: "dd2" }, [
                                              n("br")
                                            ])
                                          ])
                                        ],
                                        1
                                      ),
                                      t._v(" "),
                                      n(
                                        "el-col",
                                        {
                                          staticStyle: {
                                            "margin-top": "3px",
                                            color: "#616366"
                                          },
                                          attrs: { span: 14 }
                                        },
                                        [n("span", [t._v("Incomplete")])]
                                      )
                                    ],
                                    1
                                  ),
                                  t._v(" "),
                                  n("div", [
                                    n(
                                      "div",
                                      {
                                        staticStyle: {
                                          "text-align": "center",
                                          "padding-top": "15px",
                                          "font-size": "24px",
                                          color: "#616366"
                                        }
                                      },
                                      [
                                        n("countTo", {
                                          attrs: {
                                            startVal: 0,
                                            endVal: t.incomplete,
                                            duration: 3500
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  ])
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          t._v(" "),
                          n("div", {
                            staticStyle: {
                              height: "4px",
                              width: "100%",
                              "background-color": "rgba(63, 173, 79, 0.97)"
                            }
                          })
                        ],
                        1
                      )
                    ])
                  ],
                  1
                ),
                t._v(" "),
                n(
                  "div",
                  { staticStyle: { padding: "20px" } },
                  [
                    n(
                      "el-row",
                      { attrs: { gutter: 20 } },
                      [
                        n(
                          "el-col",
                          { attrs: { xs: 24, sm: 24, lg: 12 } },
                          [
                            n(
                              "el-card",
                              {
                                staticStyle: {
                                  height: "410px",
                                  overflow: "scroll"
                                }
                              },
                              [
                                n(
                                  "div",
                                  {
                                    staticClass: "clearfix",
                                    attrs: { slot: "header" },
                                    slot: "header"
                                  },
                                  [
                                    n("i", {
                                      staticClass: "fas fa-user-tag fa-fw"
                                    }),
                                    t._v(" "),
                                    n("strong", [t._v("Hot")])
                                  ]
                                ),
                                t._v(" "),
                                n(
                                  "el-row",
                                  t._l(t.exten, function(e) {
                                    return n(
                                      "el-col",
                                      {
                                        key: e.key,
                                        staticStyle: {
                                          "border-right": "1px #e6e6e6 solid"
                                        },
                                        attrs: { span: 6 }
                                      },
                                      [
                                        n("center", [
                                          n("p", [t._v(t._s(e.key))])
                                        ])
                                      ],
                                      1
                                    );
                                  }),
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        ),
                        t._v(" "),
                        n(
                          "el-col",
                          { attrs: { xs: 24, sm: 24, lg: 12 } },
                          [
                            n(
                              "el-card",
                              {
                                staticStyle: {
                                  height: "410px",
                                  overflow: "scroll"
                                }
                              },
                              [
                                n(
                                  "div",
                                  {
                                    staticClass: "clearfix",
                                    attrs: { slot: "header" },
                                    slot: "header"
                                  },
                                  [
                                    n("i", {
                                      staticClass: "fas fa-user-tag fa-fw"
                                    }),
                                    t._v(" "),
                                    n("strong", [t._v("Note")]),
                                    t._v(" "),
                                    n(
                                      "el-button",
                                      {
                                        attrs: {
                                          size: "mini",
                                          type: "success",
                                          plain: ""
                                        },
                                        on: {
                                          click: function(e) {
                                            t.check_add = !t.check_add;
                                          }
                                        }
                                      },
                                      [t._v("Add")]
                                    )
                                  ],
                                  1
                                ),
                                t._v(" "),
                                !1 === t.check_add
                                  ? n(
                                      "div",
                                      t._l(t.note, function(e) {
                                        return n(
                                          "div",
                                          { key: e.note },
                                          [
                                            n("el-row", [
                                              n("p", [t._v(t._s(e.note))])
                                            ])
                                          ],
                                          1
                                        );
                                      }),
                                      0
                                    )
                                  : n(
                                      "div",
                                      [
                                        n("el-input", {
                                          attrs: {
                                            type: "textarea",
                                            rows: 10,
                                            placeholder: "Please input"
                                          },
                                          model: {
                                            value: t.note_ad,
                                            callback: function(e) {
                                              t.note_ad = e;
                                            },
                                            expression: "note_ad"
                                          }
                                        }),
                                        t._v(" "),
                                        n(
                                          "center",
                                          {
                                            staticStyle: {
                                              "padding-top": "5px"
                                            }
                                          },
                                          [
                                            n("el-input-number", {
                                              staticStyle: { width: "100px" },
                                              attrs: {
                                                max: "15",
                                                size: "mini"
                                              },
                                              model: {
                                                value: t.lev_note,
                                                callback: function(e) {
                                                  t.lev_note = e;
                                                },
                                                expression: "lev_note"
                                              }
                                            })
                                          ],
                                          1
                                        ),
                                        t._v(" "),
                                        n(
                                          "center",
                                          {
                                            staticStyle: {
                                              "padding-top": "5px"
                                            }
                                          },
                                          [
                                            n(
                                              "el-button",
                                              {
                                                attrs: {
                                                  size: "mini",
                                                  type: "success",
                                                  plain: ""
                                                },
                                                on: {
                                                  click: function(e) {
                                                    return t.pushNote();
                                                  }
                                                }
                                              },
                                              [t._v("Confirm")]
                                            )
                                          ],
                                          1
                                        )
                                      ],
                                      1
                                    )
                              ]
                            )
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    t._v(" "),
                    n(
                      "el-row",
                      [
                        n(
                          "el-card",
                          {
                            staticStyle: { height: "410px", overflow: "scroll" }
                          },
                          [
                            n(
                              "div",
                              {
                                staticClass: "clearfix",
                                attrs: { slot: "header" },
                                slot: "header"
                              },
                              [
                                n("i", {
                                  staticClass: "fas fa-user-tag fa-fw"
                                }),
                                t._v(" "),
                                n("strong", [t._v("Note")]),
                                t._v(" "),
                                n(
                                  "el-button",
                                  {
                                    attrs: {
                                      size: "mini",
                                      type: "success",
                                      plain: ""
                                    },
                                    on: {
                                      click: function(e) {
                                        t.check_add = !t.check_add;
                                      }
                                    }
                                  },
                                  [t._v("Add")]
                                )
                              ],
                              1
                            ),
                            t._v(" "),
                            n("pie-chart"),
                            t._v(" "),
                            n("div")
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            );
          },
          staticRenderFns: []
        };
      var h = n("VU/8")(
        d,
        p,
        !1,
        function(t) {
          n("ffh+");
        },
        "data-v-31dbb206",
        null
      );
      e.default = h.exports;
    },
    AkUR: function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = n("6k2e"),
        s = n("WTox"),
        a = (n("Vg/Y"), n("BoPo")),
        o = {
          name: "layout",
          components: {
            Navbar: i.default,
            Sidebar: s.default,
            AppMain: a.default
          },
          computed: {
            sidebar: function() {
              return this.$store.state.app.sidebar;
            }
          }
        },
        r = {
          render: function() {
            var t = this.$createElement,
              e = this._self._c || t;
            return e(
              "div",
              {
                staticClass: "app-wrapper",
                class: { hideSidebar: !this.sidebar.opened }
              },
              [
                e("sidebar", { staticClass: "sidebar-container" }),
                this._v(" "),
                e(
                  "div",
                  { staticClass: "main-container" },
                  [
                    e("navbar", { staticStyle: { "padding-left": "auto" } }),
                    this._v(" "),
                    e("app-main")
                  ],
                  1
                )
              ],
              1
            );
          },
          staticRenderFns: []
        };
      var l = n("VU/8")(
        o,
        r,
        !1,
        function(t) {
          n("D7x3");
        },
        "data-v-11eeb1e2",
        null
      );
      e.default = l.exports;
    },
    BoPo: function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = {
          render: function() {
            var t = this.$createElement,
              e = this._self._c || t;
            return e(
              "section",
              {
                staticClass: "app-main",
                staticStyle: { "min-height": "100%" }
              },
              [
                e(
                  "transition",
                  { attrs: { name: "fade", mode: "out-in" } },
                  [
                    e(
                      "keep-alive",
                      { attrs: { include: this.cachedViews } },
                      [e("router-view", { key: this.$route.fullPath })],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            );
          },
          staticRenderFns: []
        },
        s = n("VU/8")(
          {
            name: "AppMain",
            computed: {
              cachedViews: function() {
                return this.$store.state.tagsView.cachedViews;
              }
            }
          },
          i,
          !1,
          null,
          null,
          null
        );
      e.default = s.exports;
    },
    CDRv: function(t, e) {},
    CF4h: function(t, e) {},
    D7x3: function(t, e) {},
    "F++a": function(t, e, n) {
      t.exports = n.p + "static/img/tt.4ae70c0.jpg";
    },
    Fjre: function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = {
          name: "index",
          data: function() {
            return {
              array: [
                {
                  title: "Contracts",
                  link:
                    "https://iguana-idm.com/wp-content/uploads/Contract-Management-2.jpg",
                  word: []
                },
                {
                  title: "Marketing",
                  link:
                    "https://blog.webico.vn/wp-content/uploads/2017/01/tu-vung-tieng-anh-trong-marketing-696x487.jpg",
                  word: []
                },
                {
                  title: "Warranties",
                  link:
                    "https://www.aada.asn.au/wp-content/uploads/2015/07/warranty.jpg",
                  word: []
                },
                {
                  title: "Business Planning",
                  link:
                    "https://s3.amazonaws.com/pas-wordpress-media/content/uploads/2017/10/22085951/The-elements-of-a-business-plan-min.png",
                  word: []
                },
                {
                  title: "Conferences",
                  link:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeh1KKGHfBqY7WZvP_6lsbjFB0JrbJOy2yO_WB6Latmrkt-A3f",
                  word: []
                },
                {
                  title: "Computers",
                  link:
                    "https://d3endcnfk4174v.cloudfront.net/wp-content/uploads/2018/02/15093132/Ulysses-Pro-Writing-Hero-4.jpg",
                  word: []
                },
                {
                  title: "Office Technology",
                  link:
                    "http://www.whatmobile.net/wp-content/uploads/2019/02/office-tech.jpg",
                  word: []
                },
                {
                  title: "Office Procedures",
                  link:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS90F0kzlzNcEEO1hsjzN50Br9hLv929aBo1p3qeA3n9aTttA-p",
                  word: []
                },
                {
                  title: "Electronics",
                  link:
                    "https://www.telegraph.co.uk/content/dam/business/2018/04/19/Ultra-Electronics_trans_NvBQzQNjv4BqY1pDbA9t2TcEbSModODvKbRRmBxJxfllGDm4tj3DiWg.jpg?imwidth=450",
                  word: []
                },
                {
                  title: "Correspondence",
                  link:
                    "http://blog.blueup.vn/wp-content/uploads/2015/06/Correspondence-380x330.jpg",
                  word: []
                },
                {
                  title: "Job Advertising Recruiting",
                  link:
                    "https://marketplace.canva.com/MACRtnhXJVk/2/0/thumbnail_large/canva-yellow-job-vacancy-announcement-MACRtnhXJVk.jpg",
                  word: []
                },
                {
                  title: "Applying and Interviewing",
                  link:
                    "data:image/jpeg;base64,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",
                  word: []
                },
                {
                  title: "Hiring and Training",
                  link:
                    "http://blog.blueup.vn/wp-content/uploads/2015/06/Hiring-and-training.jpg",
                  word: []
                },
                {
                  title: "Salaries and Benefits",
                  link:
                    "data:image/jpeg;base64,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",
                  word: []
                },
                {
                  title: "Promotions,Pensions,Awards",
                  link:
                    "https://tienganhtflat.com/uploads/blog/promotions-pensions-award-75b1e07438.jpg?4234",
                  word: []
                },
                {
                  title: "Shopping",
                  link:
                    "https://patch.com/img/cdn20/users/22887410/20180518/093059/styles/T800x600/public/processed_images/shutterstock_626081396-1526650208-4766.jpg",
                  word: []
                },
                {
                  title: "Ordering Supplies",
                  link:
                    "http://toeicspeakingmsngoc.com/images/tintuc/toeic-1520747066_Ordering_Supplies.jpg",
                  word: []
                },
                {
                  title: "Shipping",
                  link:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmd6zJs7k2_LmQDSv97tHz416loGH_P3CwrOCFnvvUjqpFrRkR",
                  word: []
                },
                {
                  title: "Invoices",
                  link:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqkmIGp5SzFuaDyXR6CJ7H-n9maBKe4t_1SYUvsUQ5IfqocaSv",
                  word: []
                },
                {
                  title: "Inventory",
                  link:
                    "data:image/jpeg;base64,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",
                  word: []
                }
              ],
              currentDate: new Date().toDateString()
            };
          }
        },
        s = {
          render: function() {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n(
              "div",
              [
                n(
                  "el-row",
                  t._l(t.array, function(e, i) {
                    return n(
                      "el-col",
                      {
                        key: e,
                        staticStyle: {
                          "padding-left": "15px",
                          "padding-top": "10px"
                        },
                        attrs: { span: 6 }
                      },
                      [
                        n(
                          "el-card",
                          { staticClass: "box-card" },
                          [
                            n(
                              "el-row",
                              [
                                n("el-col", { attrs: { span: 18 } }, [
                                  n("img", {
                                    staticClass: "image",
                                    attrs: { src: e.link }
                                  })
                                ]),
                                t._v(" "),
                                n(
                                  "el-col",
                                  { attrs: { span: 6 } },
                                  t._l(e.word, function(e) {
                                    return n("p", { staticClass: "word" }, [
                                      t._v(t._s(e))
                                    ]);
                                  }),
                                  0
                                )
                              ],
                              1
                            ),
                            t._v(" "),
                            n("div", { staticStyle: { padding: "0px" } }, [
                              n(
                                "span",
                                { staticStyle: { "font-size": "14px" } },
                                [t._v(t._s(e.title))]
                              ),
                              t._v(" "),
                              n("div", { staticClass: "bottom clearfix" }, [
                                n("time", { staticClass: "time" }, [
                                  t._v(t._s(t.currentDate))
                                ]),
                                t._v(" "),
                                n("br"),
                                t._v(" "),
                                n(
                                  "div",
                                  { staticStyle: { "padding-top": "10px" } },
                                  [
                                    n(
                                      "el-button",
                                      {
                                        staticClass: "button",
                                        attrs: { type: "text" }
                                      },
                                      [t._v("Explore button")]
                                    )
                                  ],
                                  1
                                )
                              ])
                            ])
                          ],
                          1
                        )
                      ],
                      1
                    );
                  }),
                  1
                )
              ],
              1
            );
          },
          staticRenderFns: []
        };
      var a = n("VU/8")(
        i,
        s,
        !1,
        function(t) {
          n("UTtX");
        },
        "data-v-5c52ddfc",
        null
      );
      e.default = a.exports;
    },
    GHuI: function(t, e) {},
    GPY1: function(t, e) {},
    IcnI: function(t, e, n) {
      "use strict";
      var i = n("7+uW"),
        s = n("NYxO"),
        a = n("lbHh"),
        o = n.n(a),
        r = {
          state: {
            sidebar: {
              opened: !+o.a.get("sidebarStatus") && !!o.a.get("sidebarStatus")
            },
            language: o.a.get("language") || "en"
          },
          mutations: {
            TOGGLE_SIDEBAR: function(t) {
              t.sidebar.opened
                ? o.a.set("sidebarStatus", 1)
                : o.a.set("sidebarStatus", 0),
                (t.sidebar.opened = !t.sidebar.opened);
            },
            SET_LANGUAGE: function(t, e) {
              (t.language = e), o.a.set("language", e);
            }
          },
          actions: {
            toggleSideBar: function(t) {
              (0, t.commit)("TOGGLE_SIDEBAR");
            },
            setLanguage: function(t, e) {
              (0, t.commit)("SET_LANGUAGE", e);
            }
          }
        },
        l = {
          state: { logs: [] },
          mutations: {
            ADD_ERROR_LOG: function(t, e) {
              t.logs.push(e);
            }
          },
          actions: {
            addErrorLog: function(t, e) {
              (0, t.commit)("ADD_ERROR_LOG", e);
            }
          }
        },
        c = n("//Fk"),
        u = n.n(c),
        d = n("YaEn");
      var p = {
          state: { routers: d.a, addRouters: [] },
          mutations: {
            SET_ROUTERS: function(t, e) {
              (t.addRouters = e), (t.routers = d.a.concat(e));
            }
          },
          actions: {
            GenerateRoutes: function(t, e) {
              var n = t.commit,
                i = t.rootState;
              return new u.a(function(t) {
                var s = e.roles,
                  a = void 0;
                (a =
                  s.indexOf("owner") >= 0
                    ? i.asyncRoutes.routes
                    : (function t(e, n) {
                        return e.filter(function(e) {
                          return (
                            !!(function(t, e) {
                              return (
                                !e.meta ||
                                !e.meta.roles ||
                                t.some(function(t) {
                                  return e.meta.roles.indexOf(t) >= 0;
                                })
                              );
                            })(n, e) &&
                            (e.children &&
                              e.children.length &&
                              (e.children = t(e.children, n)),
                            !0)
                          );
                        });
                      })(i.asyncRoutes.routes, s)),
                  n("SET_ROUTERS", a),
                  t();
              });
            }
          }
        },
        h = n("Gu7T"),
        m = n.n(h),
        f = n("BO1k"),
        v = n.n(f),
        g = n("d7EF"),
        A = n.n(g),
        w = {
          state: { visitedViews: [], cachedViews: [] },
          mutations: {
            ADD_VISITED_VIEWS: function(t, e) {
              t.visitedViews.some(function(t) {
                return t.path === e.path;
              }) ||
                (t.visitedViews.push({
                  name: e.name,
                  path: e.path,
                  title: e.meta.title || "no-name"
                }),
                e.meta.noCache || t.cachedViews.push(e.name));
            },
            DEL_VISITED_VIEWS: function(t, e) {
              var n = !0,
                i = !1,
                s = void 0;
              try {
                for (
                  var a, o = v()(t.visitedViews.entries());
                  !(n = (a = o.next()).done);
                  n = !0
                ) {
                  var r = a.value,
                    l = A()(r, 2),
                    c = l[0];
                  if (l[1].path === e.path) {
                    t.visitedViews.splice(c, 1);
                    break;
                  }
                }
              } catch (t) {
                (i = !0), (s = t);
              } finally {
                try {
                  !n && o.return && o.return();
                } finally {
                  if (i) throw s;
                }
              }
              var u = !0,
                d = !1,
                p = void 0;
              try {
                for (
                  var h, m = v()(t.cachedViews);
                  !(u = (h = m.next()).done);
                  u = !0
                ) {
                  var f = h.value;
                  if (f === e.name) {
                    var g = t.cachedViews.indexOf(f);
                    t.cachedViews.splice(g, 1);
                    break;
                  }
                }
              } catch (t) {
                (d = !0), (p = t);
              } finally {
                try {
                  !u && m.return && m.return();
                } finally {
                  if (d) throw p;
                }
              }
            },
            DEL_OTHERS_VIEWS: function(t, e) {
              var n = !0,
                i = !1,
                s = void 0;
              try {
                for (
                  var a, o = v()(t.visitedViews.entries());
                  !(n = (a = o.next()).done);
                  n = !0
                ) {
                  var r = a.value,
                    l = A()(r, 2),
                    c = l[0];
                  if (l[1].path === e.path) {
                    t.visitedViews = t.visitedViews.slice(c, c + 1);
                    break;
                  }
                }
              } catch (t) {
                (i = !0), (s = t);
              } finally {
                try {
                  !n && o.return && o.return();
                } finally {
                  if (i) throw s;
                }
              }
              var u = !0,
                d = !1,
                p = void 0;
              try {
                for (
                  var h, m = v()(t.cachedViews);
                  !(u = (h = m.next()).done);
                  u = !0
                ) {
                  var f = h.value;
                  if (f === e.name) {
                    var g = t.cachedViews.indexOf(f);
                    t.cachedViews = t.cachedViews.slice(g, f + 1);
                    break;
                  }
                }
              } catch (t) {
                (d = !0), (p = t);
              } finally {
                try {
                  !u && m.return && m.return();
                } finally {
                  if (d) throw p;
                }
              }
            },
            DEL_ALL_VIEWS: function(t) {
              (t.visitedViews = []), (t.cachedViews = []);
            }
          },
          actions: {
            addVisitedViews: function(t, e) {
              (0, t.commit)("ADD_VISITED_VIEWS", e);
            },
            delVisitedViews: function(t, e) {
              var n = t.commit,
                i = t.state;
              return new u.a(function(t) {
                n("DEL_VISITED_VIEWS", e), t([].concat(m()(i.visitedViews)));
              });
            },
            delOthersViews: function(t, e) {
              var n = t.commit,
                i = t.state;
              return new u.a(function(t) {
                n("DEL_OTHERS_VIEWS", e), t([].concat(m()(i.visitedViews)));
              });
            },
            delAllViews: function(t) {
              var e = t.commit,
                n = t.state;
              return new u.a(function(t) {
                e("DEL_ALL_VIEWS"), t([].concat(m()(n.visitedViews)));
              });
            }
          }
        },
        y = n("GHuI"),
        b = n.n(y),
        k = n("TIfe"),
        x = {
          state: {
            token: Object(k.a)(),
            email: "",
            innings: 0,
            avatar: "https://image.flaticon.com/icons/svg/702/702023.svg",
            roles: [],
            name: "",
            setting: { articlePlatform: [] }
          },
          mutations: {
            SET_TOKEN: function(t, e) {
              t.token = e;
            },
            SET_SETTING: function(t, e) {
              t.setting = e;
            },
            SET_EMAIL: function(t, e) {
              t.email = e;
            },
            SET_NAME: function(t, e) {
              t.name = e;
            },
            SET_INNINGS: function(t, e) {
              t.innings = e;
            },
            SET_AVATAR: function(t, e) {
              t.avatar = e;
            },
            SET_ROLES: function(t, e) {
              t.roles = e;
            }
          },
          actions: {
            gotAccessToken: function(t, e) {
              var n = t.commit;
              return new u.a(function(t, i) {
                n("SET_TOKEN", e), Object(k.c)(e), t();
              });
            },
            LogOut: function(t) {
              var e = t.commit;
              t.state;
              e("SET_TOKEN", ""),
                e("SET_ROLES", []),
                Object(k.b)(),
                (window.location.href =
                  Object({
                    NODE_ENV: "production",
                    ENV_CONFIG: "sit",
                    BASE_API: "",
                    SWAPI_URL: "",
                    BILLING: "",
                    TEST_LOCAL: "http://127.0.0.1:8100"
                  }).SSO_URL +
                  "/logout?service=" +
                  Object({
                    NODE_ENV: "production",
                    ENV_CONFIG: "sit",
                    BASE_API: "",
                    SWAPI_URL: "",
                    BILLING: "",
                    TEST_LOCAL: "http://127.0.0.1:8100"
                  }).APP_URL +
                  "&gateway=true");
            },
            FedLogOut: function(t) {
              var e = t.commit;
              return new u.a(function(t) {
                e("SET_TOKEN", ""), Object(k.b)(), t();
              });
            }
          }
        },
        S = {
          sidebar: function(t) {
            return t.app.sidebar;
          },
          language: function(t) {
            return t.app.language;
          },
          visitedViews: function(t) {
            return t.tagsView.visitedViews;
          },
          cachedViews: function(t) {
            return t.tagsView.cachedViews;
          },
          token: function(t) {
            return t.user.token;
          },
          avatar: function(t) {
            return t.user.avatar;
          },
          email: function(t) {
            return t.user.email;
          },
          roles: function(t) {
            return t.user.roles;
          },
          setting: function(t) {
            return t.user.setting;
          },
          permission_routers: function(t) {
            return t.permission.routers;
          },
          addRouters: function(t) {
            return t.permission.addRouters;
          },
          asyncRoutes: function(t) {
            return t.asyncRoutes.routes;
          },
          hotlineList: function(t) {
            return t.asyncRoutes.hotlineList;
          }
        },
        E = n("VQQ4"),
        R = n.n(E);
      i.default.use(s.a);
      var j = new s.a.Store({
        modules: {
          app: r,
          errorLog: l,
          permission: p,
          tagsView: w,
          user: x,
          asyncRoutes: b.a,
          hide: R.a
        },
        getters: S
      });
      e.a = j;
    },
    JEvH: function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = n("5ybE"),
        s = {
          name: "chose_en",
          data: function() {
            return {
              check_start: !1,
              totalTime: 900,
              resetButton: !1,
              title: "Countdown to rest time!",
              edit: !1,
              userTime: 26,
              percent: 0,
              count: 0,
              level_get: 9,
              words: [],
              item: "",
              radio: "",
              check: !0,
              answer: []
            };
          },
          mounted: function() {
            this.getdata();
          },
          methods: {
            getdata: function() {
              var t = this,
                e = { level: this.level_get };
              Object(i.d)(e).then(function(e) {
                console.log("==========================="),
                  console.log(e),
                  (t.words = e.data.data);
              });
            },
            checkAnser: function() {
              (this.check_start = !0),
                console.log(this.check_start),
                900 === this.totalTime && this.startTimer(),
                (this.answer = ["", "", "", ""]),
                (this.radio = ""),
                (this.ramdom = Math.floor(
                  Math.random() * this.words.length + 0
                )),
                (this.item = this.words[this.ramdom]),
                console.log(this.item);
              var t = Math.floor(4 * Math.random() + 0);
              for (var e in ((this.answer[t] = this.item.key), this.answer))
                if ("" === this.answer[e]) {
                  var n = Math.floor(Math.random() * this.words.length + 0);
                  if (this.answer.indexOf(this.words[n].key) < 0)
                    this.answer[e] = this.words[n].key;
                  else
                    for (var i = 0; i < this.words.length; i++)
                      this.answer.indexOf(this.words[i].key) < 0 &&
                        (this.answer[e] = this.words[i].key);
                }
            },
            exampale: function() {
              "" === this.radio
                ? ((this.count = this.count + 1),
                  (this.percent = parseInt(
                    (this.count / (this.words.length + 7)) * 100
                  )),
                  (this.item = this.words[this.ramdom]),
                  this.checkAnser())
                : ((this.percent = parseInt(
                    (this.count / (this.words.length + 7)) * 100
                  )),
                  (this.item = this.words[this.ramdom]),
                  this.radio === this.item.key
                    ? ((this.count = this.count + 1),
                      this.$message({
                        message: "Congrats, this is a success message.",
                        type: "success"
                      }),
                      this.checkAnser())
                    : this.$message({
                        message: "Congrats, có một sự nhầm lẫn ko hề nhẹ",
                        type: "warning"
                      }));
            },
            startTimer: function() {
              var t = this;
              (this.check_start = !0),
                (this.timer = setInterval(function() {
                  return t.countdown();
                }, 1e3)),
                (this.resetButton = !0),
                (this.edit = !1);
            },
            stopTimer: function() {
              clearInterval(this.timer),
                (this.timer = null),
                (this.resetButton = !0);
            },
            resetTimer: function() {
              (this.totalTime = 60 * this.userTime),
                clearInterval(this.timer),
                (this.timer = null),
                (this.resetButton = !1);
            },
            editTimer: function() {
              this.edit = !this.edit;
            },
            padTime: function(t) {
              return (t < 10 ? "0" : "") + t;
            },
            countdown: function() {
              this.totalTime--;
            }
          },
          computed: {
            minutes: function() {
              var t = Math.floor(this.totalTime / 60);
              return this.padTime(t);
            },
            seconds: function() {
              var t = this.totalTime - 60 * this.minutes;
              return this.padTime(t);
            }
          }
        },
        a = {
          render: function() {
            var t = this,
              e = t.$createElement,
              i = t._self._c || e;
            return i(
              "div",
              [
                i("el-row", [
                  i(
                    "div",
                    { staticClass: "app-container" },
                    [
                      i(
                        "el-row",
                        { attrs: { gutter: 20 } },
                        [
                          i(
                            "el-col",
                            { attrs: { xs: 24, sm: 24, md: 24 } },
                            [
                              i("el-card", { attrs: { shadow: "never" } }, [
                                i(
                                  "div",
                                  {
                                    staticClass: "clearfix",
                                    staticStyle: { position: "relative" },
                                    attrs: { slot: "header" },
                                    slot: "header"
                                  },
                                  [
                                    i(
                                      "span",
                                      {
                                        staticStyle: {
                                          "font-weight": "bold",
                                          "font-size": "20px"
                                        }
                                      },
                                      [t._v("VN test")]
                                    ),
                                    t._v(" "),
                                    i(
                                      "el-button",
                                      {
                                        attrs: { type: "primary" },
                                        on: {
                                          click: function(e) {
                                            return t.checkAnser();
                                          }
                                        }
                                      },
                                      [t._v("Start")]
                                    ),
                                    t._v(" "),
                                    i(
                                      "el-tag",
                                      { attrs: { type: "success" } },
                                      [
                                        t._v(
                                          t._s(t.minutes) +
                                            ":" +
                                            t._s(t.seconds)
                                        )
                                      ]
                                    ),
                                    t._v(" "),
                                    i(
                                      "div",
                                      { staticStyle: { float: "right" } },
                                      [
                                        t.edit
                                          ? i("input", {
                                              directives: [
                                                {
                                                  name: "model",
                                                  rawName: "v-model",
                                                  value: t.userTime,
                                                  expression: "userTime"
                                                }
                                              ],
                                              attrs: { type: "text" },
                                              domProps: { value: t.userTime },
                                              on: {
                                                input: function(e) {
                                                  e.target.composing ||
                                                    (t.userTime =
                                                      e.target.value);
                                                }
                                              }
                                            })
                                          : t._e(),
                                        t._v(" "),
                                        t.check_start
                                          ? i(
                                              "el-button",
                                              {
                                                attrs: {
                                                  type: "success",
                                                  plain: ""
                                                },
                                                on: {
                                                  click: function(e) {
                                                    t.check = !t.check;
                                                  }
                                                }
                                              },
                                              [t._v("Show answer")]
                                            )
                                          : t._e()
                                      ],
                                      1
                                    )
                                  ],
                                  1
                                ),
                                t._v(" "),
                                t.check_start
                                  ? i(
                                      "div",
                                      [
                                        i(
                                          "el-row",
                                          {
                                            staticStyle: {
                                              "margin-left": "0!important",
                                              "margin-right": "0!important"
                                            },
                                            attrs: { gutter: 20 }
                                          },
                                          [
                                            i(
                                              "el-col",
                                              { attrs: { span: 12 } },
                                              [
                                                i(
                                                  "center",
                                                  [
                                                    i("h2", [
                                                      t._v(t._s(t.item.value))
                                                    ]),
                                                    t._v(" "),
                                                    i("el-progress", {
                                                      attrs: {
                                                        percentage: t.percent,
                                                        status: "success"
                                                      }
                                                    }),
                                                    t._v(" "),
                                                    i("p", [
                                                      t._v(t._s(t.count))
                                                    ])
                                                  ],
                                                  1
                                                )
                                              ],
                                              1
                                            ),
                                            t._v(" "),
                                            i(
                                              "el-col",
                                              { attrs: { span: 12 } },
                                              [
                                                t.check
                                                  ? i(
                                                      "div",
                                                      [
                                                        i(
                                                          "el-row",
                                                          t._l(
                                                            t.answer,
                                                            function(e) {
                                                              return i(
                                                                "el-col",
                                                                {
                                                                  key: e.key,
                                                                  staticStyle: {
                                                                    "padding-top":
                                                                      "40px"
                                                                  },
                                                                  attrs: {
                                                                    span: 12
                                                                  }
                                                                },
                                                                [
                                                                  i(
                                                                    "el-radio",
                                                                    {
                                                                      attrs: {
                                                                        label: e
                                                                      },
                                                                      model: {
                                                                        value:
                                                                          t.radio,
                                                                        callback: function(
                                                                          e
                                                                        ) {
                                                                          t.radio = e;
                                                                        },
                                                                        expression:
                                                                          "radio"
                                                                      }
                                                                    },
                                                                    [
                                                                      t._v(
                                                                        t._s(e)
                                                                      )
                                                                    ]
                                                                  )
                                                                ],
                                                                1
                                                              );
                                                            }
                                                          ),
                                                          1
                                                        )
                                                      ],
                                                      1
                                                    )
                                                  : t._e()
                                              ]
                                            )
                                          ],
                                          1
                                        ),
                                        t._v(" "),
                                        i(
                                          "el-row",
                                          {
                                            staticStyle: {
                                              "padding-top": "40px"
                                            }
                                          },
                                          [
                                            i(
                                              "center",
                                              [
                                                i(
                                                  "el-button",
                                                  {
                                                    attrs: { type: "primary" },
                                                    on: {
                                                      click: function(e) {
                                                        return t.exampale();
                                                      }
                                                    }
                                                  },
                                                  [
                                                    i("i", {
                                                      staticClass:
                                                        "fas fa-forward"
                                                    })
                                                  ]
                                                )
                                              ],
                                              1
                                            )
                                          ],
                                          1
                                        )
                                      ],
                                      1
                                    )
                                  : i(
                                      "div",
                                      [
                                        i("center", [
                                          i("img", {
                                            staticClass: "image",
                                            attrs: { src: n("jUum") }
                                          }),
                                          t._v(" "),
                                          i(
                                            "h3",
                                            {
                                              staticClass: "test",
                                              staticStyle: {
                                                "font-family":
                                                  "'Merriweather', serif"
                                              }
                                            },
                                            [t._v("code by vunm")]
                                          )
                                        ])
                                      ],
                                      1
                                    )
                              ])
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ])
              ],
              1
            );
          },
          staticRenderFns: []
        };
      var o = n("VU/8")(
        s,
        a,
        !1,
        function(t) {
          n("KAGp");
        },
        "data-v-9ca572c0",
        null
      );
      e.default = o.exports;
    },
    KAGp: function(t, e) {},
    LtNZ: function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = {
          name: "Study",
          data: function() {
            return {
              test: !0,
              show: !1,
              radio: "",
              check: !0,
              words: [],
              item: "",
              answer: ["", "", "", ""],
              ramdom: 1,
              timer: null,
              totalTime: 900,
              resetButton: !1,
              title: "Countdown to rest time!",
              edit: !1,
              userTime: 26,
              percent: 0,
              count: 0
            };
          },
          mounted: function() {
            this.getdata();
          },
          methods: {
            getdata: function() {
              this.$http
                .get("http://127.0.0.1:8100/preview", {
                  headers: { Authorization: "vudz" },
                  params: { table: this.$route.params.nameTopic, level: 1 }
                })
                .then(function(t) {
                  (this.words = t.body.data), console.log(this.words);
                });
            },
            getramdom: function() {
              console.log(this.words),
                (this.item = this.words[
                  Math.floor(Math.random() * this.words.length)
                ]),
                console.log(this.item);
            },
            memorize: function() {
              var t = this,
                e = { key: this.item.key, table: this.$route.params.nameTopic };
              this.$http.post("http://127.0.0.1:8100/showexample", e).then(
                function(t) {
                  !0 === t.body.status
                    ? (this.$notify({
                        title: "Success",
                        message: t.body.message,
                        type: "success",
                        position: "bottom-right"
                      }),
                      this.getdata())
                    : this.$notify.error({
                        title: "Error",
                        message: t.body.message
                      });
                },
                function(e) {
                  t.notify("warning", e.body.message);
                }
              );
            },
            checkAnser: function() {
              (this.show = !0),
                900 === this.totalTime && this.startTimer(),
                (this.answer = ["", "", "", ""]),
                (this.radio = ""),
                (this.ramdom = Math.floor(
                  Math.random() * this.words.length + 0
                )),
                (this.item = this.words[this.ramdom]),
                console.log(this.item);
              var t = Math.floor(4 * Math.random() + 0);
              for (var e in ((this.answer[t] = this.item.value), this.answer))
                if ((console.log("===" + e), "" === this.answer[e])) {
                  var n = Math.floor(Math.random() * this.words.length + 0);
                  if (this.answer.indexOf(this.words[n].value) < 0)
                    this.answer[e] = this.words[n].value;
                  else
                    for (var i = 0; i < this.words.length; i++)
                      this.answer.indexOf(this.words[i].value) < 0 &&
                        (this.answer[e] = this.words[i].value);
                }
            },
            exampale: function() {
              "" === this.radio
                ? ((this.count = this.count + 1),
                  (this.percent = parseInt(
                    (this.count / (this.words.length + 7)) * 100
                  )),
                  (this.item = this.words[this.ramdom]),
                  this.checkAnser())
                : ((this.count = this.count + 1),
                  (this.percent = parseInt(
                    (this.count / (this.words.length + 7)) * 100
                  )),
                  (this.item = this.words[this.ramdom]),
                  this.radio === this.item.value
                    ? this.$message({
                        message: "Congrats, this is a success message.",
                        type: "success"
                      })
                    : (this.$message({
                        message: "Congrats, this is a success message.",
                        type: "warning"
                      }),
                      this.memorize()),
                  this.checkAnser());
              var t = new SpeechSynthesisUtterance(this.item.key);
              window.speechSynthesis.speak(t);
            },
            startTimer: function() {
              var t = this;
              (this.timer = setInterval(function() {
                return t.countdown();
              }, 1e3)),
                (this.resetButton = !0),
                (this.edit = !1);
            },
            stopTimer: function() {
              clearInterval(this.timer),
                (this.timer = null),
                (this.resetButton = !0);
            },
            resetTimer: function() {
              (this.totalTime = 60 * this.userTime),
                clearInterval(this.timer),
                (this.timer = null),
                (this.resetButton = !1);
            },
            editTimer: function() {
              this.edit = !this.edit;
            },
            padTime: function(t) {
              return (t < 10 ? "0" : "") + t;
            },
            countdown: function() {
              this.totalTime--;
            },
            pronounce: function(t) {
              var e = new SpeechSynthesisUtterance();
              (e.voiceURI = "native"),
                (e.text = t),
                (e.lang = "en-US"),
                (e.onend = function(t) {
                  console.log("Finished in " + event.elapsedTime + " seconds.");
                }),
                speechSynthesis.speak(e),
                console.log(t);
            }
          },
          computed: {
            minutes: function() {
              var t = Math.floor(this.totalTime / 60);
              return this.padTime(t);
            },
            seconds: function() {
              var t = this.totalTime - 60 * this.minutes;
              return this.padTime(t);
            }
          }
        },
        s = {
          render: function() {
            var t = this,
              e = t.$createElement,
              i = t._self._c || e;
            return i(
              "div",
              [
                i("el-row", [
                  i(
                    "div",
                    { staticClass: "app-container" },
                    [
                      i(
                        "el-row",
                        { attrs: { gutter: 20 } },
                        [
                          i(
                            "el-col",
                            { attrs: { xs: 24, sm: 24, md: 24 } },
                            [
                              i("el-card", { attrs: { shadow: "never" } }, [
                                i(
                                  "div",
                                  {
                                    staticClass: "clearfix",
                                    staticStyle: { position: "relative" },
                                    attrs: { slot: "header" },
                                    slot: "header"
                                  },
                                  [
                                    i(
                                      "span",
                                      {
                                        staticStyle: {
                                          "font-weight": "bold",
                                          "font-size": "20px"
                                        }
                                      },
                                      [
                                        t._v(
                                          "Topic " +
                                            t._s(this.$route.params.nameTopic)
                                        )
                                      ]
                                    ),
                                    t._v(" "),
                                    i(
                                      "div",
                                      { staticStyle: { float: "right" } },
                                      [
                                        t.edit
                                          ? i("input", {
                                              directives: [
                                                {
                                                  name: "model",
                                                  rawName: "v-model",
                                                  value: t.userTime,
                                                  expression: "userTime"
                                                }
                                              ],
                                              attrs: { type: "text" },
                                              domProps: { value: t.userTime },
                                              on: {
                                                input: function(e) {
                                                  e.target.composing ||
                                                    (t.userTime =
                                                      e.target.value);
                                                }
                                              }
                                            })
                                          : t._e(),
                                        t._v(" "),
                                        i(
                                          "el-tag",
                                          { attrs: { type: "success" } },
                                          [
                                            t._v(
                                              t._s(t.minutes) +
                                                ":" +
                                                t._s(t.seconds)
                                            )
                                          ]
                                        ),
                                        t._v(" "),
                                        i(
                                          "el-button",
                                          {
                                            attrs: { type: "primary" },
                                            on: {
                                              click: function(e) {
                                                return t.checkAnser();
                                              }
                                            }
                                          },
                                          [t._v("Start")]
                                        ),
                                        t._v(" "),
                                        i(
                                          "el-button",
                                          {
                                            attrs: {
                                              type: "success",
                                              plain: ""
                                            },
                                            on: {
                                              click: function(e) {
                                                t.check = !t.check;
                                              }
                                            }
                                          },
                                          [t._v("Show answer")]
                                        ),
                                        t._v(" "),
                                        i(
                                          "el-button",
                                          {
                                            attrs: {
                                              type: "warning",
                                              plain: ""
                                            },
                                            on: {
                                              click: function(e) {
                                                t.test = !t.test;
                                              }
                                            }
                                          },
                                          [t._v("Hide vn")]
                                        )
                                      ],
                                      1
                                    )
                                  ]
                                ),
                                t._v(" "),
                                t.show
                                  ? i(
                                      "div",
                                      [
                                        i(
                                          "div",
                                          {
                                            staticStyle: {
                                              "padding-top": "-5px"
                                            }
                                          },
                                          [
                                            i("el-progress", {
                                              attrs: {
                                                percentage: t.percent,
                                                status: "success"
                                              }
                                            })
                                          ],
                                          1
                                        ),
                                        t._v(" "),
                                        i(
                                          "el-row",
                                          {
                                            staticStyle: {
                                              "margin-left": "0!important",
                                              "margin-right": "0!important"
                                            },
                                            attrs: { gutter: 20 }
                                          },
                                          [
                                            i(
                                              "el-col",
                                              { attrs: { span: 8 } },
                                              [
                                                i(
                                                  "center",
                                                  [
                                                    i("h2", [
                                                      t._v(t._s(t.item.key))
                                                    ]),
                                                    t._v(" "),
                                                    i("p", [
                                                      t._v(t._s(t.count))
                                                    ]),
                                                    t._v(" "),
                                                    i("el-button", {
                                                      attrs: {
                                                        type: "warning",
                                                        icon:
                                                          "el-icon-phone-outline",
                                                        circle: ""
                                                      },
                                                      on: {
                                                        click: function(e) {
                                                          return t.pronounce(
                                                            t.item.key
                                                          );
                                                        }
                                                      }
                                                    })
                                                  ],
                                                  1
                                                )
                                              ],
                                              1
                                            ),
                                            t._v(" "),
                                            i(
                                              "el-col",
                                              { attrs: { span: 16 } },
                                              [
                                                t.check
                                                  ? i(
                                                      "div",
                                                      [
                                                        i(
                                                          "el-row",
                                                          t._l(
                                                            t.answer,
                                                            function(e) {
                                                              return i(
                                                                "el-col",
                                                                {
                                                                  key: e.key,
                                                                  staticStyle: {
                                                                    "padding-top":
                                                                      "40px"
                                                                  },
                                                                  attrs: {
                                                                    span: 12
                                                                  }
                                                                },
                                                                [
                                                                  i(
                                                                    "el-radio",
                                                                    {
                                                                      attrs: {
                                                                        label: e
                                                                      },
                                                                      model: {
                                                                        value:
                                                                          t.radio,
                                                                        callback: function(
                                                                          e
                                                                        ) {
                                                                          t.radio = e;
                                                                        },
                                                                        expression:
                                                                          "radio"
                                                                      }
                                                                    },
                                                                    [
                                                                      t._v(
                                                                        t._s(e)
                                                                      )
                                                                    ]
                                                                  )
                                                                ],
                                                                1
                                                              );
                                                            }
                                                          ),
                                                          1
                                                        )
                                                      ],
                                                      1
                                                    )
                                                  : t._e()
                                              ]
                                            )
                                          ],
                                          1
                                        ),
                                        t._v(" "),
                                        i(
                                          "el-row",
                                          {
                                            staticStyle: {
                                              "padding-top": "40px"
                                            }
                                          },
                                          [
                                            i(
                                              "center",
                                              [
                                                i(
                                                  "el-button",
                                                  {
                                                    attrs: { type: "danger" },
                                                    on: {
                                                      click: function(e) {
                                                        return t.memorize();
                                                      }
                                                    }
                                                  },
                                                  [
                                                    i("i", {
                                                      staticClass:
                                                        "fas fa-download"
                                                    })
                                                  ]
                                                ),
                                                t._v(" "),
                                                i(
                                                  "el-button",
                                                  {
                                                    attrs: { type: "primary" },
                                                    on: {
                                                      click: function(e) {
                                                        return t.exampale();
                                                      }
                                                    }
                                                  },
                                                  [
                                                    i("i", {
                                                      staticClass:
                                                        "fas fa-forward"
                                                    })
                                                  ]
                                                )
                                              ],
                                              1
                                            )
                                          ],
                                          1
                                        )
                                      ],
                                      1
                                    )
                                  : i(
                                      "div",
                                      [
                                        i("center", [
                                          i("img", {
                                            staticClass: "image",
                                            attrs: { src: n("F++a") }
                                          }),
                                          t._v(" "),
                                          i(
                                            "h3",
                                            {
                                              staticClass: "test",
                                              class: { test2: t.test },
                                              staticStyle: {
                                                "font-family":
                                                  "'Merriweather', serif"
                                              }
                                            },
                                            [t._v("code by vunm")]
                                          )
                                        ])
                                      ],
                                      1
                                    )
                              ])
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ])
              ],
              1
            );
          },
          staticRenderFns: []
        };
      var a = n("VU/8")(
        i,
        s,
        !1,
        function(t) {
          n("CDRv");
        },
        "data-v-0b96fab2",
        null
      );
      e.default = a.exports;
    },
    NHnr: function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = {};
      n.d(i, "toThousandslsFilter", function() {
        return g;
      }),
        n.d(i, "toRedirectMode", function() {
          return A;
        }),
        n.d(i, "formatHotline", function() {
          return w;
        }),
        n.d(i, "formatMoney", function() {
          return y;
        }),
        n.d(i, "format1", function() {
          return b;
        }),
        n.d(i, "result", function() {
          return k;
        });
      var s = n("fZjL"),
        a = n.n(s),
        o = n("7+uW"),
        r = (n("uMhA"), n("zL8q")),
        l = n.n(r),
        c =
          (n("tvR6"),
          n("yh13"),
          {
            name: "App",
            components: {
              HelloWorld: n("VU/8")(null, null, !1, null, null, null).exports
            }
          }),
        u = {
          render: function() {
            var t = this.$createElement,
              e = this._self._c || t;
            return e("div", { attrs: { id: "app" } }, [e("router-view")], 1);
          },
          staticRenderFns: []
        },
        d = n("VU/8")(c, u, !1, null, null, null).exports,
        p = n("YaEn"),
        h = n("IcnI"),
        m = n("6EBc"),
        f = n("ppUw"),
        v = n.n(f);
      function g(t) {
        return (+t || 0).toString().replace(/^-?\d+/g, function(t) {
          return t.replace(/(?=(?!\b)(\d{3})+$)/g, ",");
        });
      }
      function A(t) {
        return "none" === t
          ? "Gác máy"
          : "team" === t
          ? "Nhóm trực"
          : "mobile" === t
          ? "Di động"
          : "Máy lẻ";
      }
      function w(t) {
        var e = t.substring(0, 4),
          n = t.substring(4, 7),
          i =
            11 === t.length
              ? t.substring(t.length - 4)
              : t.substring(t.length - 3);
        return "0" === t[0] ? e + "." + n + "." + i : t;
      }
      function y(t) {
        return t
          ? (t = parseInt(t)).toFixed(0).replace(/./g, function(t, e, n) {
              return e > 0 && "." !== t && (n.length - e) % 3 == 0
                ? "." + t
                : t;
            })
          : "";
      }
      function b(t) {
        return t.toFixed(2).replace(/./g, function(t, e, n) {
          return e > 0 && "." !== t && (n.length - e) % 3 == 0 ? "." + t : t;
        });
      }
      function k(t) {
        var e = b(t);
        return e.slice(0, e.length - 3);
      }
      var x = n("y8RO"),
        S = n.n(x),
        E = n("18Sv"),
        R = n.n(E),
        j = n("8+8L"),
        C = n("TIfe");
      o.default.use(R.a),
        o.default.use(m.a),
        o.default.use(j.a),
        o.default.use(v.a),
        o.default.use(l.a, { size: "small", locale: S.a }),
        a()(i).forEach(function(t) {
          o.default.filter(t, i[t]);
        }),
        (o.default.config.productionTip = !1),
        new o.default({
          el: "#app",
          router: p.b,
          store: h.a,
          template: "<App/>",
          watch: { $route: "checkLogin()" },
          components: { App: d },
          mounted: function() {
            this.checkLogin();
          },
          created: function() {
            this.checkLogin();
          },
          methods: {
            checkLogin: function() {
              Object(C.a)() || this.$router.push("/login");
            }
          }
        });
    },
    Oi8u: function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = {
          name: "history",
          data: function() {
            return {
              show: !1,
              activety: null,
              pag: 1,
              new_data: null,
              total: 0
            };
          },
          mounted: function() {},
          methods: {
            get_method: function(t) {
              this.$http
                .get("/activity", {
                  headers: { Authorization: this.$session.get("token") },
                  params: { offset: t, limit: 15 }
                })
                .then(
                  function(t) {
                    !0 === t.body.status &&
                      ((this.activety = t.data.data),
                      (this.total = t.data.total),
                      (this.k = 10 * parseInt(t.data.total / 15) + 1),
                      console.log(this.total));
                  },
                  function(t) {
                    t.body.status;
                  }
                );
            },
            handleCurrentChange: function() {
              this.get_method(this.pag);
            }
          }
        },
        s = {
          render: function() {
            this.$createElement;
            this._self._c;
            return this._m(0);
          },
          staticRenderFns: [
            function() {
              var t = this.$createElement,
                e = this._self._c || t;
              return e("div", [
                e("iframe", {
                  attrs: {
                    src: "https://www.toeicmoingay.com/",
                    width: "1300",
                    height: "2400",
                    frameborder: "0"
                  }
                })
              ]);
            }
          ]
        };
      var a = n("VU/8")(
        i,
        s,
        !1,
        function(t) {
          n("jK7l");
        },
        "data-v-3ddd4fac",
        null
      );
      e.default = a.exports;
    },
    Opzk: function(t, e, n) {
      var i = {
        "./add_vocabulary/index.vue": ["Fjre"],
        "./addon/addon.vue": ["bpzJ"],
        "./addon/part/add_normal.vue": ["UHnr", 3],
        "./addon/part/add_storage.vue": ["nEDw", 4],
        "./chose_en/chose_en.vue": ["JEvH"],
        "./confuse/confuse.vue": ["vnIt"],
        "./dashboard/_index.vue": ["TzlA", 1],
        "./dashboard/admin/components/BarChart.vue": ["Eoil", 10],
        "./dashboard/admin/components/LineChart.vue": ["7EAa", 9],
        "./dashboard/admin/components/PanelGroup.vue": ["bEjd"],
        "./dashboard/admin/components/PieChart.vue": ["k96P"],
        "./dashboard/admin/components/PieChart2.vue": ["M+HG", 8],
        "./dashboard/admin/components/RaddarChart.vue": ["+xof", 7],
        "./dashboard/admin/index.vue": ["1Rx3", 6],
        "./dashboard/editor/index.vue": ["DY7s", 5],
        "./dashboard/index.vue": ["ARoL"],
        "./difficult/difficult.vue": ["bgYx"],
        "./errorPage/401.vue": ["eRLo", 2],
        "./errorPage/404.vue": ["AejC", 0],
        "./history/history.vue": ["Oi8u"],
        "./layout/Layout.vue": ["AkUR"],
        "./layout/components/AppMain.vue": ["BoPo"],
        "./layout/components/Navbar.vue": ["6k2e"],
        "./layout/components/Sidebar/SidebarItem.vue": ["tlvQ"],
        "./layout/components/Sidebar/index.vue": ["WTox"],
        "./layout/components/TagsView.vue": ["Vg/Y"],
        "./loading/components/Loader.vue": ["TvbN"],
        "./loading/index.vue": ["rbS3"],
        "./login/authen.vue": ["aOtM"],
        "./login/login.vue": ["W2Q3"],
        "./memo/memo.vue": ["7kLr"],
        "./showAll/showAll.vue": ["9xcB"],
        "./topic/element/index.vue": ["RACG"],
        "./topic/element/part/Study.vue": ["LtNZ"],
        "./topic/element/part/VnToE.vue": ["0KY8"],
        "./topic/element/part/showTable.vue": ["rLym"],
        "./topic/topic.vue": ["iIx/"],
        "./topics/topics.vue": ["fk85"]
      };
      function s(t) {
        var e = i[t];
        return e
          ? Promise.all(e.slice(1).map(n.e)).then(function() {
              return n(e[0]);
            })
          : Promise.reject(new Error("Cannot find module '" + t + "'."));
      }
      (s.keys = function() {
        return Object.keys(i);
      }),
        (s.id = "Opzk"),
        (t.exports = s);
    },
    P5RY: function(t, e) {},
    PaOn: function(t, e) {},
    Qwey: function(t, e, n) {
      "use strict";
      var i = n("Gu7T"),
        s = n.n(i),
        a = n("HNqp"),
        o = {
          props: {
            value: { required: !0 },
            name: {
              type: String,
              required: !1,
              default: function() {
                return "";
              }
            },
            options: {
              type: Array,
              required: !1,
              default: function() {
                return [];
              }
            },
            optionLabel: {
              type: String,
              required: !1,
              default: function() {
                return null;
              }
            },
            optionKey: {
              type: String,
              required: !1,
              default: function() {
                return null;
              }
            },
            placeholder: {
              type: String,
              required: !1,
              default: function() {
                return "Search Here";
              }
            },
            maxHeight: {
              type: String,
              default: function() {
                return "220px";
              },
              required: !1
            },
            inputId: {
              type: String,
              default: function() {
                return "single-select";
              },
              required: !1
            },
            classes: {
              type: Object,
              required: !1,
              default: function() {
                return {
                  pointer: -1,
                  wrapper: "single-select-wrapper",
                  input: "search-input",
                  icons: "icons",
                  required: "required",
                  activeClass: "active",
                  dropdown: "dropdown"
                };
              }
            },
            initial: {
              type: String,
              required: !1,
              default: function() {
                return null;
              }
            },
            disabled: {
              type: Boolean,
              required: !1,
              default: function() {
                return !1;
              }
            },
            required: {
              type: Boolean,
              required: !1,
              default: function() {
                return !1;
              }
            },
            maxResults: {
              type: Number,
              required: !1,
              default: function() {
                return 30;
              }
            },
            tabindex: {
              type: String,
              required: !1,
              default: function() {
                return "";
              }
            },
            getOptionDescription: {
              type: Function,
              default: function(t) {
                return this.optionKey && this.optionLabel
                  ? t[this.optionKey] + " " + t[this.optionLabel]
                  : this.optionLabel
                  ? t[this.optionLabel]
                  : this.optionKey
                  ? t[this.optionKey]
                  : t;
              }
            },
            getOptionValue: {
              type: Function,
              default: function(t) {
                return this.optionKey
                  ? t[this.optionKey]
                  : this.optionLabel
                  ? t[this.optionLabel]
                  : t;
              }
            },
            filterBy: {
              type: Function,
              default: function(t) {
                return this.optionLabel && this.optionKey
                  ? t[this.optionLabel]
                      .toString()
                      .toLowerCase()
                      .includes(this.searchText.toString().toLowerCase()) ||
                      t[this.optionKey]
                        .toString()
                        .toLowerCase()
                        .includes(this.searchText.toString().toLowerCase())
                  : this.optionLabel
                  ? t[this.optionLabel]
                      .toString()
                      .toLowerCase()
                      .includes(this.searchText.toString().toLowerCase())
                  : (this.optionKey &&
                      t[this.optionKey]
                        .toString()
                        .toLowerCase()
                        .includes(this.searchText.toString().toLowerCase()),
                    t
                      .toString()
                      .toLowerCase()
                      .includes(this.searchText.toString().toLowerCase()));
              }
            }
          },
          mixins: [a.a],
          mounted: function() {
            document.addEventListener("click", this.handleClickOutside),
              document.addEventListener("keyup", this.handleClickOutside),
              this.value && this.options.includes(this.value)
                ? (this.selectedOption = this.value)
                : (this.searchText = this.initial);
          },
          destroyed: function() {
            document.removeEventListener("keyup", this.handleClickOutside),
              document.removeEventListener("click", this.handleClickOutside);
          },
          data: function() {
            return { searchText: null, selectedOption: null, dropdownOpen: !1 };
          },
          watch: {
            value: function(t, e) {
              this.selectedOption = t;
            },
            searchText: function(t, e) {
              t !== e && (this.pointer = -1);
            },
            selectedOption: function(t, e) {
              this.$emit("input", t);
            },
            dropdownOpen: function(t, e) {
              var n = this;
              t !== e &&
                (t
                  ? (this.searchText || (this.searchText = ""),
                    this.$nextTick().then(function() {
                      n.$refs.search.focus();
                    }))
                  : (this.searchText = null));
            }
          },
          computed: {
            isRequired: function() {
              return this.required
                ? this.selectedOption
                  ? ""
                  : "required"
                : "";
            },
            matchingOptions: function() {
              var t = this;
              return null === this.searchText
                ? null
                : this.searchText.length
                ? this.options
                    .filter(function(e) {
                      return t.filterBy(e);
                    })
                    .slice(0, this.maxResults)
                : [].concat(s()(this.options)).slice(0, this.maxResults);
            }
          },
          methods: {
            setPointerIdx: function(t) {
              this.pointer = t;
            },
            seedSearchText: function() {
              null === this.searchText && (this.searchText = "");
            },
            switchToSearch: function(t) {
              (this.$refs.selectedValue.value = null),
                (this.searchText = t.target.value),
                (this.selectedOption = null),
                (this.dropdownOpen = !0);
            },
            toggleDropdown: function() {
              this.disabled || (this.dropdownOpen = !this.dropdownOpen);
            },
            closeOut: function() {
              (this.selectedOption = null),
                (this.dropdownOpen = !1),
                (this.searchText = null);
            },
            movePointerDown: function() {
              this.matchingOptions &&
                (this.pointer >= this.matchingOptions.length - 1 ||
                  this.pointer++);
            },
            movePointerUp: function() {
              this.pointer > 0 && this.pointer--;
            },
            setOption: function() {
              var t = this;
              this.matchingOptions &&
                this.matchingOptions.length &&
                (-1 === this.pointer && this.pointer++,
                (this.selectedOption = this.matchingOptions[this.pointer]),
                (this.searchText = null),
                (this.dropdownOpen = !1),
                (this.pointer = -1),
                this.$nextTick().then(function() {
                  t.$refs.match.focus();
                }));
            },
            handleClickOutside: function(t) {
              this.$el.contains(t.target) ||
                t.target.id === this.inputId ||
                ((this.dropdownOpen = !1), (this.searchText = null));
            }
          }
        },
        r = {
          render: function() {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n("div", { ref: "vuesingleselect" }, [
              t.selectedOption
                ? t._e()
                : n("div", { class: t.classes.wrapper }, [
                    n("div", { staticClass: "relative inline-block w-full" }, [
                      n("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: t.searchText,
                            expression: "searchText"
                          }
                        ],
                        ref: "search",
                        class: [t.classes.input, t.isRequired],
                        attrs: {
                          disabled: t.disabled,
                          id: t.inputId,
                          placeholder: t.placeholder,
                          autocomplete: "off",
                          required: t.required
                        },
                        domProps: { value: t.searchText },
                        on: {
                          focus: t.seedSearchText,
                          keydown: function(e) {
                            return !e.type.indexOf("key") &&
                              t._k(e.keyCode, "enter", 13, e.key, "Enter")
                              ? null
                              : (e.preventDefault(),
                                t.setOption.apply(null, arguments));
                          },
                          keyup: [
                            function(e) {
                              return !e.type.indexOf("key") &&
                                t._k(e.keyCode, "enter", 13, e.key, "Enter")
                                ? null
                                : (e.preventDefault(),
                                  t.setOption.apply(null, arguments));
                            },
                            function(e) {
                              return !e.type.indexOf("key") &&
                                t._k(e.keyCode, "down", 40, e.key, [
                                  "Down",
                                  "ArrowDown"
                                ])
                                ? null
                                : t.movePointerDown.apply(null, arguments);
                            },
                            function(e) {
                              return !e.type.indexOf("key") &&
                                t._k(e.keyCode, "tab", 9, e.key, "Tab")
                                ? null
                                : (e.stopPropagation(),
                                  t.closeOut.apply(null, arguments));
                            },
                            function(e) {
                              return !e.type.indexOf("key") &&
                                t._k(e.keyCode, "esc", 27, e.key, [
                                  "Esc",
                                  "Escape"
                                ])
                                ? null
                                : (e.stopPropagation(),
                                  t.closeOut.apply(null, arguments));
                            },
                            function(e) {
                              return !e.type.indexOf("key") &&
                                t._k(e.keyCode, "up", 38, e.key, [
                                  "Up",
                                  "ArrowUp"
                                ])
                                ? null
                                : t.movePointerUp.apply(null, arguments);
                            }
                          ],
                          input: function(e) {
                            e.target.composing ||
                              (t.searchText = e.target.value);
                          }
                        }
                      }),
                      t._v(" "),
                      n(
                        "div",
                        {
                          staticClass:
                            "cursor-pointer absolute flex items-center",
                          class: [t.classes.icons],
                          on: { click: t.toggleDropdown }
                        },
                        [
                          t.dropdownOpen
                            ? n(
                                "svg",
                                {
                                  attrs: {
                                    "aria-hidden": "true",
                                    viewBox: "0 0 448 512"
                                  }
                                },
                                [
                                  n("path", {
                                    attrs: {
                                      d:
                                        "M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"
                                    }
                                  })
                                ]
                              )
                            : n(
                                "svg",
                                {
                                  attrs: {
                                    "aria-hidden": "true",
                                    viewBox: "0 0 448 512"
                                  }
                                },
                                [
                                  n("path", {
                                    attrs: {
                                      d:
                                        "M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                                    }
                                  })
                                ]
                              )
                        ]
                      ),
                      t._v(" "),
                      t.matchingOptions
                        ? n(
                            "ul",
                            {
                              ref: "options",
                              staticClass:
                                "absolute w-full overflow-auto appearance-none mt-px list-reset",
                              class: [t.classes.dropdown],
                              staticStyle: { "z-index": "100" },
                              style: { "max-height": t.maxHeight },
                              attrs: { tabindex: "-1" }
                            },
                            t._l(t.matchingOptions, function(e, i) {
                              return n(
                                "li",
                                {
                                  key: i,
                                  staticClass: "cursor-pointer outline-none",
                                  class:
                                    i === t.pointer
                                      ? t.classes.activeClass
                                      : "",
                                  attrs: { tabindex: "-1" },
                                  on: {
                                    mouseover: function(e) {
                                      return t.setPointerIdx(i);
                                    },
                                    keyup: [
                                      function(e) {
                                        return !e.type.indexOf("key") &&
                                          t._k(
                                            e.keyCode,
                                            "enter",
                                            13,
                                            e.key,
                                            "Enter"
                                          )
                                          ? null
                                          : t.setOption.apply(null, arguments);
                                      },
                                      function(e) {
                                        return !e.type.indexOf("key") &&
                                          t._k(e.keyCode, "up", 38, e.key, [
                                            "Up",
                                            "ArrowUp"
                                          ])
                                          ? null
                                          : t.movePointerUp.apply(
                                              null,
                                              arguments
                                            );
                                      },
                                      function(e) {
                                        return !e.type.indexOf("key") &&
                                          t._k(e.keyCode, "down", 40, e.key, [
                                            "Down",
                                            "ArrowDown"
                                          ])
                                          ? null
                                          : t.movePointerDown.apply(
                                              null,
                                              arguments
                                            );
                                      }
                                    ],
                                    click: function(e) {
                                      return (
                                        e.preventDefault(),
                                        t.setOption.apply(null, arguments)
                                      );
                                    }
                                  }
                                },
                                [
                                  t._t(
                                    "option",
                                    function() {
                                      return [
                                        t._v(t._s(t.getOptionDescription(e)))
                                      ];
                                    },
                                    null,
                                    { option: e, idx: i }
                                  )
                                ],
                                2
                              );
                            }),
                            0
                          )
                        : t._e()
                    ])
                  ]),
              t._v(" "),
              t.selectedOption
                ? n("div", { class: t.classes.wrapper }, [
                    n("input", {
                      ref: "match",
                      class: [t.classes.input],
                      attrs: { id: t.inputId, required: t.required },
                      domProps: {
                        value: t.getOptionDescription(t.selectedOption)
                      },
                      on: {
                        input: function(e) {
                          return t.switchToSearch(e);
                        }
                      }
                    }),
                    t._v(" "),
                    n("input", {
                      ref: "selectedValue",
                      attrs: { type: "hidden", name: t.name },
                      domProps: { value: t.getOptionValue(t.selectedOption) }
                    }),
                    t._v(" "),
                    n(
                      "div",
                      {
                        staticClass: "flex absolute items-center",
                        class: t.classes.icons
                      },
                      [
                        n(
                          "svg",
                          {
                            staticClass: "cursor-pointer",
                            attrs: {
                              "aria-hidden": "true",
                              viewBox: "0 0 512 512"
                            },
                            on: { click: t.closeOut }
                          },
                          [
                            n("path", {
                              attrs: {
                                d:
                                  "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
                              }
                            })
                          ]
                        )
                      ]
                    )
                  ])
                : t._e()
            ]);
          },
          staticRenderFns: []
        };
      var l = n("VU/8")(
        o,
        r,
        !1,
        function(t) {
          n("txjo");
        },
        "data-v-b3635f2e",
        null
      );
      e.a = l.exports;
    },
    RACG: function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = n("rLym"),
        s = n("LtNZ"),
        a = n("0KY8"),
        o = {
          name: "index",
          components: { show: i.default, study: s.default, vn: a.default }
        },
        r = {
          render: function() {
            var t = this.$createElement,
              e = this._self._c || t;
            return e(
              "el-tabs",
              {
                staticStyle: {
                  "padding-left": "10px",
                  "background-image":
                    "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMDk0fQ&w=1000&q=80')"
                }
              },
              [
                e(
                  "el-tab-pane",
                  { attrs: { label: "Show words" } },
                  [e("show")],
                  1
                ),
                this._v(" "),
                e(
                  "el-tab-pane",
                  { attrs: { label: "Study" } },
                  [e("study")],
                  1
                ),
                this._v(" "),
                e("el-tab-pane", { attrs: { label: "VN" } }, [e("vn")], 1)
              ],
              1
            );
          },
          staticRenderFns: []
        };
      var l = n("VU/8")(
        o,
        r,
        !1,
        function(t) {
          n("mCCf");
        },
        "data-v-2d6cede5",
        null
      );
      e.default = l.exports;
    },
    Sijj: function(t, e) {},
    TIfe: function(t, e, n) {
      "use strict";
      (e.a = function() {
        return s.a.get(a);
      }),
        (e.c = function(t) {
          return s.a.set(a, t);
        }),
        (e.b = function() {
          return s.a.remove(a);
        });
      var i = n("lbHh"),
        s = n.n(i),
        a = "Admin-Token";
    },
    TvbN: function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = {
        render: function() {
          this.$createElement;
          this._self._c;
          return this._m(0);
        },
        staticRenderFns: [
          function() {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n("div", { staticClass: "loader-container" }, [
              n("div", { staticClass: "loader" }, [
                n("div", { staticClass: "square" }),
                t._v(" "),
                n("div", { staticClass: "square" }),
                t._v(" "),
                n("div", { staticClass: "square last" }),
                t._v(" "),
                n("div", { staticClass: "square clear" }),
                t._v(" "),
                n("div", { staticClass: "square" }),
                t._v(" "),
                n("div", { staticClass: "square last" }),
                t._v(" "),
                n("div", { staticClass: "square clear" }),
                t._v(" "),
                n("div", { staticClass: "square" }),
                t._v(" "),
                n("div", { staticClass: "square last" })
              ])
            ]);
          }
        ]
      };
      var s = n("VU/8")(
        {},
        i,
        !1,
        function(t) {
          n("lfr6");
        },
        null,
        null
      );
      e.default = s.exports;
    },
    UTtX: function(t, e) {},
    VQQ4: function(t, e) {},
    "Vg/Y": function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = n("VU/8")(null, null, !1, null, null, null);
      e.default = i.exports;
    },
    W2Q3: function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = n("TIfe"),
        s = {
          name: "login",
          data: function() {
            return { username: "", password: "", check: !0, pass: "password" };
          },
          methods: {
            register: function() {
              this.$router.push("/register");
            },
            aaa: function() {
              "" !== this.password && (this.check = !this.check),
                !0 === this.check
                  ? (this.pass = "password")
                  : (this.pass = "text");
            },
            login: function() {
              var t = this;
              if (this.username && this.password) {
                var e = this.password,
                  s = n("L6bb")(e),
                  a = { name: this.username, step_1: "yes", pass: s };
                this.$http.post("http://127.0.0.1:8100/login", a).then(
                  function(t) {
                    !0 === t.body.status && t.body.token
                      ? (Object(i.c)(t.body.token),
                        (this.$store.state.user.token = Object(i.a)()),
                        this.$router.push("/dashboard"),
                        console.log("ok"))
                      : this.notify("warning", t.body.message);
                  },
                  function(e) {
                    t.$notify({
                      group: "foo",
                      type: "error",
                      title: e.body.message
                    });
                  }
                );
              }
            },
            notify: function(t, e) {
              return this.$notify({ group: "foo", type: t, title: e });
            }
          }
        },
        a = {
          render: function() {
            var t = this,
              e = t.$createElement,
              i = t._self._c || e;
            return i(
              "div",
              [
                i("center", [
                  i("img", {
                    attrs: { src: n("xpK5"), width: "300", height: "170" }
                  })
                ]),
                t._v(" "),
                i(
                  "center",
                  [
                    i(
                      "el-card",
                      { staticClass: "box-card" },
                      [
                        i(
                          "div",
                          {
                            staticClass: "clearfix",
                            attrs: { slot: "header" },
                            slot: "header"
                          },
                          [i("strong", [t._v("Đăng nhập")])]
                        ),
                        t._v(" "),
                        i(
                          "span",
                          {
                            staticStyle: {
                              float: "left",
                              "font-size": "14px",
                              color: "#727379"
                            }
                          },
                          [t._v("Username")]
                        ),
                        t._v(" "),
                        i("el-input", {
                          staticStyle: { "padding-top": "5px" },
                          attrs: {
                            size: "medium",
                            placeholder: "Tên đăng nhập",
                            clearable: ""
                          },
                          model: {
                            value: t.username,
                            callback: function(e) {
                              t.username = e;
                            },
                            expression: "username"
                          }
                        }),
                        t._v(" "),
                        i(
                          "span",
                          {
                            staticStyle: {
                              float: "left",
                              "font-size": "14px",
                              color: "#727379",
                              "padding-top": "25px"
                            }
                          },
                          [t._v("Password")]
                        ),
                        t._v(" "),
                        i(
                          "el-input",
                          {
                            staticStyle: { "padding-top": "5px" },
                            attrs: {
                              type: t.pass,
                              size: "medium",
                              placeholder: "Mật khẩu"
                            },
                            nativeOn: {
                              keyup: function(e) {
                                return !e.type.indexOf("key") &&
                                  t._k(e.keyCode, "enter", 13, e.key, "Enter")
                                  ? null
                                  : t.login.apply(null, arguments);
                              }
                            },
                            model: {
                              value: t.password,
                              callback: function(e) {
                                t.password = e;
                              },
                              expression: "password"
                            }
                          },
                          [
                            i(
                              "el-button",
                              {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: t.check,
                                    expression: "check"
                                  }
                                ],
                                staticStyle: {
                                  color: "#b4b4b4",
                                  "padding-top": "15px"
                                },
                                attrs: { slot: "suffix", type: "text" },
                                on: { click: t.aaa },
                                slot: "suffix"
                              },
                              [i("i", { staticClass: "fas fa-eye" })]
                            ),
                            t._v(" "),
                            i(
                              "el-button",
                              {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: !t.check,
                                    expression: "!check"
                                  }
                                ],
                                staticStyle: {
                                  color: "#b4b4b4",
                                  "padding-top": "15px"
                                },
                                attrs: { slot: "suffix", type: "text" },
                                on: { click: t.aaa },
                                slot: "suffix"
                              },
                              [i("i", { staticClass: "fas fa-eye-slash" })]
                            )
                          ],
                          1
                        ),
                        t._v(" "),
                        i(
                          "div",
                          {
                            staticStyle: {
                              float: "right",
                              "padding-top": "8px"
                            }
                          },
                          [
                            i("el-button", { attrs: { type: "text" } }, [
                              t._v("Quên mật khẩu")
                            ])
                          ],
                          1
                        ),
                        t._v(" "),
                        i(
                          "div",
                          { staticStyle: { "padding-top": "50px" } },
                          [
                            i(
                              "el-button",
                              {
                                staticStyle: { width: "220px" },
                                attrs: { type: "primary" },
                                on: { click: t.login }
                              },
                              [t._v("ĐĂNG NHẬP")]
                            )
                          ],
                          1
                        ),
                        t._v(" "),
                        i(
                          "el-button",
                          {
                            staticStyle: { color: "#d3d3d3" },
                            attrs: { slot: "suffix", type: "text" },
                            on: { click: t.aaa },
                            slot: "suffix"
                          },
                          [i("i", { staticClass: "fas fa-eye" })]
                        ),
                        t._v(" "),
                        i(
                          "center",
                          { staticStyle: { "padding-top": "18px" } },
                          [
                            i(
                              "span",
                              {
                                staticStyle: {
                                  float: "left",
                                  "font-size": "14px",
                                  color: "#727379"
                                }
                              },
                              [
                                t._v("Chưa có tài khoản ? "),
                                i(
                                  "el-button",
                                  {
                                    attrs: { type: "text" },
                                    on: {
                                      click: function(e) {
                                        return t.register();
                                      }
                                    }
                                  },
                                  [t._v("Đăng ký")]
                                )
                              ],
                              1
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    t._v(" "),
                    i("div", { staticClass: "box-card" }, [
                      i(
                        "div",
                        { staticStyle: { float: "right" } },
                        [
                          i(
                            "el-row",
                            [
                              i("el-button", { attrs: { type: "text" } }, [
                                t._v("Điều khoản")
                              ]),
                              t._v(" "),
                              i("el-button", { attrs: { type: "text" } }, [
                                t._v("Bảo mật")
                              ])
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ])
                  ],
                  1
                )
              ],
              1
            );
          },
          staticRenderFns: []
        };
      var o = n("VU/8")(
        s,
        a,
        !1,
        function(t) {
          n("dPUt");
        },
        "data-v-e1e8efe2",
        null
      );
      e.default = o.exports;
    },
    WTox: function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = n("Dd8w"),
        s = n.n(i),
        a = n("NYxO"),
        o = n("tlvQ"),
        r = {
          name: "scrollBar",
          data: function() {
            return { top: 0 };
          },
          methods: {
            handleScroll: function(t) {
              var e = t.wheelDelta || 3 * -t.deltaY,
                n = this.$refs.scrollContainer.offsetHeight,
                i = this.$refs.scrollWrapper.offsetHeight;
              e > 0
                ? (this.top = Math.min(0, this.top + e))
                : n - 15 < i
                ? this.top < -(i - n + 15)
                  ? (this.top = this.top)
                  : (this.top = Math.max(this.top + e, n - i - 15))
                : (this.top = 0);
            }
          }
        },
        l = {
          render: function() {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n(
              "div",
              {
                ref: "scrollContainer",
                staticClass: "scroll-container",
                on: {
                  wheel: function(e) {
                    return (
                      e.preventDefault(), t.handleScroll.apply(null, arguments)
                    );
                  }
                }
              },
              [
                n(
                  "div",
                  {
                    ref: "scrollWrapper",
                    staticClass: "scroll-wrapper",
                    style: { top: t.top + "px" }
                  },
                  [t._t("default")],
                  2
                )
              ]
            );
          },
          staticRenderFns: []
        };
      var c = n("VU/8")(
          r,
          l,
          !1,
          function(t) {
            n("CF4h");
          },
          "data-v-e9459c5e",
          null
        ).exports,
        u = {
          components: { SidebarItem: o.default, ScrollBar: c },
          computed: s()({}, Object(a.b)(["sidebar"]), {
            isCollapse: function() {
              return !this.sidebar.opened;
            }
          }),
          mounted: function() {
            console.log();
          }
        },
        d = {
          render: function() {
            var t = this.$createElement,
              e = this._self._c || t;
            return e(
              "el-scrollbar",
              { staticClass: "scrollBars" },
              [
                e(
                  "el-menu",
                  {
                    attrs: {
                      mode: "vertical",
                      "unique-opened": "",
                      "default-active": this.$route.path,
                      collapse: this.isCollapse,
                      "background-color": "#304156",
                      "text-color": "#bfcbd9",
                      "active-text-color": "#409EFF"
                    }
                  },
                  [e("sidebar-item")],
                  1
                )
              ],
              1
            );
          },
          staticRenderFns: []
        };
      var p = n("VU/8")(
        u,
        d,
        !1,
        function(t) {
          n("z3Jr");
        },
        null,
        null
      );
      e.default = p.exports;
    },
    XEqd: function(t, e) {},
    YaEn: function(t, e, n) {
      "use strict";
      n.d(e, "a", function() {
        return k;
      });
      var i = n("7+uW"),
        s = n("/ocq"),
        a = n("W2Q3"),
        o = n("aOtM"),
        r = n("bpzJ"),
        l = n("Oi8u"),
        c = n("AkUR"),
        u = n("Fjre"),
        d = n("iIx/"),
        p = n("RACG"),
        h = n("vnIt"),
        m = n("bgYx"),
        f = n("fk85"),
        v = n("ARoL"),
        g = n("rbS3"),
        A = n("JEvH"),
        w = n("9xcB"),
        y = n("7kLr"),
        b = n("A66B");
      i.default.use(s.a);
      var k = [
        { path: "/loading", component: b("loading/index"), hidden: !0 },
        { path: "/404", component: b("errorPage/404"), hidden: !0 },
        { path: "/401", component: b("errorPage/401"), hidden: !0 },
        {
          path: "/dashboard",
          component: c.default,
          redirect: "",
          hidden: !0,
          children: [
            {
              path: "",
              component: v.default,
              name: "tracking-tong-dai-cskh",
              meta: {
                title: "Giám sát cuộc gọi",
                noCache: !0,
                roles: ["owner", "monitor_manage"]
              }
            }
          ]
        },
        {
          path: "/addons",
          component: c.default,
          redirect: "",
          hidden: !0,
          children: [{ path: "", component: r.default }]
        },
        {
          path: "/addVocabulary",
          component: c.default,
          redirect: "",
          hidden: !0,
          children: [{ path: "", component: u.default }]
        },
        {
          path: "/topic/:nameTopic",
          component: c.default,
          redirect: "",
          hidden: !0,
          children: [{ path: "", component: p.default }]
        },
        {
          path: "/topic",
          component: c.default,
          redirect: "",
          hidden: !0,
          children: [{ path: "", component: d.default }]
        },
        {
          path: "/difficult",
          component: c.default,
          redirect: "",
          hidden: !0,
          children: [{ path: "", component: m.default }]
        },
        {
          path: "/topics",
          component: c.default,
          redirect: "",
          hidden: !0,
          children: [{ path: "", component: f.default }]
        },
        {
          path: "/confuse",
          component: c.default,
          redirect: "",
          hidden: !0,
          children: [{ path: "", component: h.default }]
        },
        {
          path: "/chose",
          component: c.default,
          redirect: "",
          hidden: !0,
          children: [{ path: "", component: A.default }]
        },
        {
          path: "/history",
          component: c.default,
          redirect: "",
          hidden: !0,
          children: [{ path: "", component: l.default }]
        },
        {
          path: "/showAll",
          component: c.default,
          redirect: "",
          hidden: !0,
          children: [{ path: "", component: w.default }]
        },
        { path: "", component: c.default, redirect: "/dashboard", hidden: !0 },
        { path: "/loading", component: g.default, redirect: "", hidden: !0 },
        {
          path: "/memo",
          component: c.default,
          redirect: "",
          hidden: !0,
          children: [{ path: "", component: y.default }]
        },
        { path: "*", redirect: "/" },
        { path: "/login", component: a.default, hidden: !0, props: !0 },
        { path: "/register", component: o.default, hidden: !0, props: !0 }
      ];
      e.b = new s.a({
        base: Object({
          NODE_ENV: "production",
          ENV_CONFIG: "sit",
          BASE_API: "",
          SWAPI_URL: "",
          BILLING: "",
          TEST_LOCAL: "http://127.0.0.1:8100"
        }).BASE_URL,
        mode: "history",
        scrollBehavior: function() {
          return { y: 0 };
        },
        linkActiveClass: "is-active",
        routes: k
      });
    },
    aOtM: function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = {
          name: "authen",
          data: function() {
            return { otp: "" };
          },
          methods: {
            notify: function(t, e) {
              return this.$notify({ group: "foo", type: t, title: e });
            },
            sentOtp: function() {
              var t = this;
              if ((console.log(this.$store.state.username), this.otp)) {
                var e = {
                  otp: this.otp,
                  step_2: "yes",
                  token: this.$session.get("token")
                };
                this.$http.post("/login", e).then(
                  function(t) {
                    !0 === t.body.status
                      ? (this.$session.set("otp", "true"),
                        this.$cookies.set("otp", "true"),
                        this.$router.push("/loading"))
                      : this.notify("warning", t.body.message);
                  },
                  function(e) {
                    t.notify("warning", e.body.message);
                  }
                );
              }
            }
          }
        },
        s = {
          render: function() {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n("div", { staticClass: "content" }, [
              n("div", { staticClass: "wrapper fadeInDown" }, [
                n(
                  "div",
                  { attrs: { id: "formContent" } },
                  [
                    t._m(0),
                    t._v(" "),
                    n("el-input", {
                      staticClass: "fadeIn second",
                      staticStyle: { width: "70%" },
                      attrs: { type: "text", placeholder: "Name" },
                      on: {
                        keyup: function(e) {
                          return !e.type.indexOf("key") &&
                            t._k(e.keyCode, "enter", 13, e.key, "Enter")
                            ? null
                            : t.sentOtp.apply(null, arguments);
                        }
                      },
                      model: {
                        value: t.Name,
                        callback: function(e) {
                          t.Name = e;
                        },
                        expression: "Name"
                      }
                    }),
                    t._v(" "),
                    n("el-input", {
                      staticClass: "fadeIn second",
                      staticStyle: { width: "70%", "padding-top": "10px" },
                      attrs: { type: "text", placeholder: "Email" },
                      on: {
                        keyup: function(e) {
                          return !e.type.indexOf("key") &&
                            t._k(e.keyCode, "enter", 13, e.key, "Enter")
                            ? null
                            : t.sentOtp.apply(null, arguments);
                        }
                      },
                      model: {
                        value: t.Email,
                        callback: function(e) {
                          t.Email = e;
                        },
                        expression: "Email"
                      }
                    }),
                    t._v(" "),
                    n(
                      "el-input",
                      {
                        staticStyle: { "padding-top": "10px", width: "70%" },
                        attrs: {
                          type: t.pass,
                          size: "medium",
                          placeholder: "Pass"
                        }
                      },
                      [
                        n(
                          "el-button",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: t.check,
                                expression: "check"
                              }
                            ],
                            staticStyle: {
                              color: "#b4b4b4",
                              "padding-top": "15px"
                            },
                            attrs: { slot: "suffix", type: "text" },
                            on: { click: t.aaa },
                            slot: "suffix"
                          },
                          [n("i", { staticClass: "fas fa-eye" })]
                        ),
                        t._v(" "),
                        n(
                          "el-button",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: !t.check,
                                expression: "!check"
                              }
                            ],
                            staticStyle: {
                              color: "#b4b4b4",
                              "padding-top": "15px"
                            },
                            attrs: { slot: "suffix", type: "text" },
                            on: { click: t.aaa },
                            slot: "suffix"
                          },
                          [n("i", { staticClass: "fas fa-eye-slash" })]
                        )
                      ],
                      1
                    ),
                    t._v(" "),
                    n("input", {
                      staticClass: "fadeIn fourth",
                      attrs: { type: "submit", value: "Confirm" },
                      on: { click: t.sentOtp }
                    })
                  ],
                  1
                )
              ])
            ]);
          },
          staticRenderFns: [
            function() {
              var t = this.$createElement,
                e = this._self._c || t;
              return e("div", { staticClass: "fadeIn first" }, [
                e("img", {
                  attrs: { src: n("xpK5"), height: "200", width: "200" }
                })
              ]);
            }
          ]
        };
      var a = n("VU/8")(
        i,
        s,
        !1,
        function(t) {
          n("528N");
        },
        "data-v-8ed53b44",
        null
      );
      e.default = a.exports;
    },
    bEjd: function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = {
        render: function() {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n(
            "el-row",
            { staticClass: "panel-group", attrs: { gutter: 40 } },
            [
              n(
                "el-col",
                {
                  staticClass: "card-panel-col",
                  attrs: { xs: 12, sm: 12, lg: 8 }
                },
                [
                  n(
                    "div",
                    { staticClass: "card-panel" },
                    [
                      n(
                        "el-col",
                        {
                          staticClass: "title-header",
                          staticStyle: {
                            background: "linear-gradient(45deg,#4099ff,#73b4ff)"
                          },
                          attrs: { span: 24 }
                        },
                        [n("strong", [t._v("Tổng đài")])]
                      ),
                      t._v(" "),
                      n(
                        "el-col",
                        {
                          staticStyle: {
                            padding: "2px 0px",
                            "border-bottom": "3px solid #4099ff",
                            height: "66%"
                          },
                          attrs: { span: 24 }
                        },
                        [
                          n(
                            "el-col",
                            { staticClass: "left", attrs: { span: 12 } },
                            [
                              n("div", { staticClass: "name-card" }, [
                                n("span", [t._v("CSKH")])
                              ]),
                              t._v(" "),
                              n("div", { staticClass: "info" }, [
                                n("span", [
                                  t._v(t._s(t.panelData.hotlineCount.cskh))
                                ])
                              ])
                            ]
                          ),
                          t._v(" "),
                          n(
                            "el-col",
                            { staticClass: "right", attrs: { span: 12 } },
                            [
                              n("div", { staticClass: "name-card" }, [
                                n("span", [t._v("Văn phòng")])
                              ]),
                              t._v(" "),
                              n("div", { staticClass: "info" }, [
                                n("span", [
                                  t._v(t._s(t.panelData.hotlineCount.office))
                                ])
                              ])
                            ]
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ]
              ),
              t._v(" "),
              n(
                "el-col",
                {
                  staticClass: "card-panel-col",
                  attrs: { xs: 12, sm: 12, lg: 8 }
                },
                [
                  n(
                    "div",
                    { staticClass: "card-panel" },
                    [
                      n(
                        "el-col",
                        {
                          staticClass: "title-header",
                          staticStyle: {
                            background: "linear-gradient(45deg,#2ed8b6,#59e0c5)"
                          },
                          attrs: { span: 24 }
                        },
                        [n("strong", [t._v("Số cuộc gọi ra hôm nay")])]
                      ),
                      t._v(" "),
                      n(
                        "el-col",
                        {
                          staticStyle: {
                            padding: "2px 0px",
                            "border-bottom": "3px solid #2ed8b6",
                            height: "66%"
                          },
                          attrs: { span: 24 }
                        },
                        [
                          n(
                            "el-col",
                            { staticClass: "left", attrs: { span: 12 } },
                            [
                              n("div", { staticClass: "name-card" }, [
                                n("span", [t._v("Thành công")])
                              ]),
                              t._v(" "),
                              n("div", { staticClass: "info" }, [
                                n("span", [
                                  t._v(t._s(t.panelData.callToday.success))
                                ])
                              ])
                            ]
                          ),
                          t._v(" "),
                          n(
                            "el-col",
                            { staticClass: "right", attrs: { span: 12 } },
                            [
                              n("div", { staticClass: "name-card" }, [
                                n("span", [t._v("Thất bại")])
                              ]),
                              t._v(" "),
                              n("div", { staticClass: "info" }, [
                                n("span", [
                                  t._v(t._s(t.panelData.callToday.failure))
                                ])
                              ])
                            ]
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ]
              ),
              t._v(" "),
              n(
                "el-col",
                {
                  staticClass: "card-panel-col",
                  attrs: { xs: 12, sm: 12, lg: 8 }
                },
                [
                  n(
                    "div",
                    { staticClass: "card-panel" },
                    [
                      n(
                        "el-col",
                        {
                          staticClass: "title-header",
                          staticStyle: {
                            background: "linear-gradient(45deg,#FFB64D,#ffcb80)"
                          },
                          attrs: { span: 24 }
                        },
                        [n("strong", [t._v("Thông số")])]
                      ),
                      t._v(" "),
                      n(
                        "el-col",
                        {
                          staticStyle: {
                            padding: "2px 0px",
                            "border-bottom": "3px solid #FFB64D",
                            height: "66%"
                          },
                          attrs: { span: 24 }
                        },
                        [
                          n(
                            "el-col",
                            { staticClass: "left", attrs: { span: 12 } },
                            [
                              n("div", { staticClass: "name-card" }, [
                                n("span", [t._v("Thiết bị")])
                              ]),
                              t._v(" "),
                              n("div", { staticClass: "info" }, [
                                n("span", [
                                  t._v(t._s(t.panelData.statistics.device))
                                ])
                              ])
                            ]
                          ),
                          t._v(" "),
                          n(
                            "el-col",
                            { staticClass: "right", attrs: { span: 12 } },
                            [
                              n("div", { staticClass: "name-card" }, [
                                n("span", [t._v("Máy lẻ")])
                              ]),
                              t._v(" "),
                              n("div", { staticClass: "info" }, [
                                n("span", [
                                  t._v(t._s(t.panelData.statistics.ext))
                                ])
                              ])
                            ]
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ]
              )
            ],
            1
          );
        },
        staticRenderFns: []
      };
      var s = n("VU/8")(
        { props: ["panelData"] },
        i,
        !1,
        function(t) {
          n("P5RY");
        },
        "data-v-239b38fe",
        null
      );
      e.default = s.exports;
    },
    bgYx: function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = n("//Fk"),
        s = n.n(i),
        a = n("5ybE"),
        o = {
          name: "difficult",
          data: function() {
            return {
              dialogVisible: !1,
              level: 15,
              level2: 1,
              en: "",
              vn: "",
              words1: [],
              words2: [],
              check: !0,
              lent: 0,
              check1: !0
            };
          },
          mounted: function() {
            this.getdata();
          },
          methods: {
            getdata: function() {
              var t = this;
              Object(a.e)().then(function(e) {
                console.log(e);
                var n = [];
                for (var i in ((t.words1 = []),
                (t.words2 = []),
                (n = e.data.data),
                (t.lent = n.length),
                n))
                  n[i].edit = !1;
                if ((console.log(parseInt(n.length / 2)), n.length > 1)) {
                  for (var s = 0; s < n.length / 2; s++) t.words1.push(n[s]);
                  for (
                    var a =
                      n.length % 2
                        ? parseInt(n.length / 2) + 1
                        : parseInt(n.length / 2);
                    a < n.length;
                    a++
                  )
                    t.words2.push(n[a]);
                } else t.words1 = n;
              });
            },
            generateNewwords: function() {
              var t = this,
                e = { confirm: "yes" };
              return new s.a(function(n, i) {
                Object(a.c)(e)
                  .then(function(e) {
                    console.log(e),
                      !0 === e.data.status &&
                        (t.$notify({
                          title: "Success",
                          message: e.data.message,
                          type: "success"
                        }),
                        (t.dialogVisible = !1),
                        t.getdata());
                  })
                  .catch(function(t) {
                    i(t);
                  });
              });
            },
            pronounce: function(t) {
              var e = new SpeechSynthesisUtterance();
              (e.voiceURI = "native"),
                (e.text = t),
                (e.lang = "en-US"),
                (e.onend = function(t) {
                  console.log("Finished in " + event.elapsedTime + " seconds.");
                }),
                speechSynthesis.speak(e),
                console.log(t);
            },
            handleCancelEditUser: function(t) {
              t.edit = !1;
            },
            handleEditUser: function(t) {
              t.edit = !0;
            },
            addTopic: function() {
              var t = this,
                e = {
                  topic: this.ad_topic,
                  level: this.ad_level,
                  favorite: this.ad_favorite,
                  idi: this.ad_topic
                };
              this.$http.post("http://127.0.0.1:8100/topics", e).then(
                function(t) {
                  !0 === t.body.status
                    ? (this.$notify({
                        title: "Success",
                        message: t.body.message,
                        type: "success"
                      }),
                      this.getdata())
                    : this.$notify.error({
                        title: "Error",
                        message: t.body.message
                      });
                },
                function(e) {
                  t.notify("warning", e.body.message);
                }
              );
            },
            updateTopic: function(t) {
              var e = this,
                n = {
                  topic: t.topic,
                  level: t.level,
                  favorite: t.favorite,
                  idi: t.idi,
                  order: t.order
                };
              this.$http.put("http://127.0.0.1:8100/topics", n).then(
                function(t) {
                  !0 === t.body.status
                    ? (this.$notify({
                        title: "Success",
                        message: t.body.message,
                        type: "success"
                      }),
                      this.getdata())
                    : this.$notify.error({
                        title: "Error",
                        message: t.body.message
                      });
                },
                function(t) {
                  e.$notify.error({ title: "Error", message: t.body.message });
                }
              );
            },
            handleDeleteUser: function(t) {
              var e = this,
                n = { idi: t.idi };
              this.$http
                .delete("http://127.0.0.1:8100/topics", { body: n })
                .then(
                  function(t) {
                    !0 === t.body.status
                      ? (this.$notify({
                          title: "Success",
                          message: t.body.message,
                          type: "success"
                        }),
                        this.getdata())
                      : this.$notify.error({
                          title: "Error",
                          message: t.body.message
                        });
                  },
                  function(t) {
                    e.$notify.error({
                      title: "Error",
                      message: t.body.message
                    });
                  }
                );
            },
            confuse: function() {
              this.words1.sort(function() {
                return 0.5 - Math.random();
              }),
                this.words2.sort(function() {
                  return 0.5 - Math.random();
                });
            }
          }
        },
        r = {
          render: function() {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n("div", [
              n(
                "div",
                [
                  n(
                    "el-row",
                    [
                      n(
                        "div",
                        { staticClass: "app-container" },
                        [
                          n(
                            "el-row",
                            { attrs: { gutter: 20 } },
                            [
                              n(
                                "el-col",
                                { attrs: { xs: 24, sm: 24, md: 24 } },
                                [
                                  n(
                                    "el-card",
                                    { attrs: { shadow: "never" } },
                                    [
                                      n(
                                        "div",
                                        {
                                          staticClass: "clearfix",
                                          staticStyle: { position: "relative" },
                                          attrs: { slot: "header" },
                                          slot: "header"
                                        },
                                        [
                                          n(
                                            "span",
                                            {
                                              staticStyle: {
                                                "font-weight": "bold",
                                                "font-size": "20px"
                                              }
                                            },
                                            [
                                              t._v(
                                                "Topic " +
                                                  t._s(
                                                    this.$route.params.nameTopic
                                                  ) +
                                                  " " +
                                                  t._s(this.lent)
                                              )
                                            ]
                                          ),
                                          t._v(" "),
                                          n(
                                            "el-button",
                                            {
                                              staticStyle: {
                                                "padding-left": "10px"
                                              },
                                              attrs: {
                                                size: "mini",
                                                type: "primary"
                                              },
                                              on: {
                                                click: function(e) {
                                                  t.dialogVisible = !0;
                                                }
                                              }
                                            },
                                            [
                                              n("i", {
                                                staticClass:
                                                  "fas fa-plus-circle"
                                              }),
                                              t._v(" Thêm mới")
                                            ]
                                          ),
                                          t._v(" "),
                                          n(
                                            "el-button",
                                            {
                                              attrs: {
                                                type: "primary",
                                                plain: ""
                                              },
                                              on: {
                                                click: function(e) {
                                                  return t.getdata();
                                                }
                                              }
                                            },
                                            [t._v("Show level")]
                                          ),
                                          t._v(" "),
                                          n("el-input-number", {
                                            staticStyle: { width: "90px" },
                                            attrs: {
                                              size: "mini",
                                              "controls-position": "right",
                                              min: 1,
                                              max: 15
                                            },
                                            model: {
                                              value: t.level2,
                                              callback: function(e) {
                                                t.level2 = e;
                                              },
                                              expression: "level2"
                                            }
                                          }),
                                          t._v(" "),
                                          n(
                                            "div",
                                            { staticStyle: { float: "right" } },
                                            [
                                              n(
                                                "el-button",
                                                {
                                                  attrs: { type: "primary" },
                                                  on: {
                                                    click: function(e) {
                                                      return t.confuse();
                                                    }
                                                  }
                                                },
                                                [t._v("Confuse")]
                                              ),
                                              t._v(" "),
                                              n(
                                                "el-button",
                                                {
                                                  attrs: {
                                                    type: "success",
                                                    plain: ""
                                                  },
                                                  on: {
                                                    click: function(e) {
                                                      t.check = !t.check;
                                                    }
                                                  }
                                                },
                                                [t._v("Hide en")]
                                              ),
                                              t._v(" "),
                                              n(
                                                "el-button",
                                                {
                                                  attrs: {
                                                    type: "warning",
                                                    plain: ""
                                                  },
                                                  on: {
                                                    click: function(e) {
                                                      t.check1 = !t.check1;
                                                    }
                                                  }
                                                },
                                                [t._v("Hide vn")]
                                              )
                                            ],
                                            1
                                          )
                                        ],
                                        1
                                      ),
                                      t._v(" "),
                                      n(
                                        "el-row",
                                        {
                                          staticStyle: {
                                            "margin-left": "0!important",
                                            "margin-right": "0!important"
                                          },
                                          attrs: { gutter: 20 }
                                        },
                                        [
                                          n(
                                            "el-col",
                                            {
                                              attrs: { xs: 24, sm: 24, lg: 12 }
                                            },
                                            [
                                              n(
                                                "el-table",
                                                {
                                                  staticStyle: {
                                                    width: "100%"
                                                  },
                                                  attrs: {
                                                    data: t.words1,
                                                    stripe: ""
                                                  }
                                                },
                                                [
                                                  n("el-table-column", {
                                                    attrs: {
                                                      label: "EN",
                                                      width: "150"
                                                    },
                                                    scopedSlots: t._u([
                                                      {
                                                        key: "default",
                                                        fn: function(e) {
                                                          return [
                                                            !1 === e.row.edit
                                                              ? n("div", [
                                                                  t.check
                                                                    ? n("div", [
                                                                        t._v(
                                                                          " " +
                                                                            t._s(
                                                                              e
                                                                                .row
                                                                                .key
                                                                            ) +
                                                                            " "
                                                                        ),
                                                                        n("i", {
                                                                          staticClass:
                                                                            "el-icon-video-play",
                                                                          on: {
                                                                            click: function(
                                                                              n
                                                                            ) {
                                                                              return t.pronounce(
                                                                                e
                                                                                  .row
                                                                                  .key
                                                                              );
                                                                            }
                                                                          }
                                                                        })
                                                                      ])
                                                                    : t._e()
                                                                ])
                                                              : n(
                                                                  "div",
                                                                  [
                                                                    n(
                                                                      "el-input",
                                                                      {
                                                                        attrs: {
                                                                          placeholder:
                                                                            "Please input"
                                                                        },
                                                                        model: {
                                                                          value:
                                                                            e
                                                                              .row
                                                                              .key,
                                                                          callback: function(
                                                                            n
                                                                          ) {
                                                                            t.$set(
                                                                              e.row,
                                                                              "key",
                                                                              n
                                                                            );
                                                                          },
                                                                          expression:
                                                                            "scope.row.key"
                                                                        }
                                                                      }
                                                                    )
                                                                  ],
                                                                  1
                                                                )
                                                          ];
                                                        }
                                                      }
                                                    ])
                                                  }),
                                                  t._v(" "),
                                                  n("el-table-column", {
                                                    attrs: {
                                                      label: "VN",
                                                      width: "200"
                                                    },
                                                    scopedSlots: t._u([
                                                      {
                                                        key: "default",
                                                        fn: function(e) {
                                                          return [
                                                            !1 === e.row.edit
                                                              ? n("div", [
                                                                  t.check1
                                                                    ? n("div", [
                                                                        t._v(
                                                                          t._s(
                                                                            e
                                                                              .row
                                                                              .value
                                                                          )
                                                                        )
                                                                      ])
                                                                    : t._e()
                                                                ])
                                                              : n(
                                                                  "div",
                                                                  [
                                                                    n(
                                                                      "el-input",
                                                                      {
                                                                        attrs: {
                                                                          placeholder:
                                                                            "Please input"
                                                                        },
                                                                        model: {
                                                                          value:
                                                                            e
                                                                              .row
                                                                              .value,
                                                                          callback: function(
                                                                            n
                                                                          ) {
                                                                            t.$set(
                                                                              e.row,
                                                                              "value",
                                                                              n
                                                                            );
                                                                          },
                                                                          expression:
                                                                            "scope.row.value"
                                                                        }
                                                                      }
                                                                    )
                                                                  ],
                                                                  1
                                                                )
                                                          ];
                                                        }
                                                      }
                                                    ])
                                                  }),
                                                  t._v(" "),
                                                  n("el-table-column", {
                                                    attrs: {
                                                      prop: "level",
                                                      label: "LE",
                                                      width: "100"
                                                    },
                                                    scopedSlots: t._u([
                                                      {
                                                        key: "default",
                                                        fn: function(e) {
                                                          return [
                                                            !1 === e.row.edit
                                                              ? n("div", [
                                                                  t._v(
                                                                    "\n                          " +
                                                                      t._s(
                                                                        e.row
                                                                          .level
                                                                      ) +
                                                                      "\n                        "
                                                                  )
                                                                ])
                                                              : n(
                                                                  "div",
                                                                  [
                                                                    n(
                                                                      "el-input-number",
                                                                      {
                                                                        staticStyle: {
                                                                          width:
                                                                            "80px"
                                                                        },
                                                                        attrs: {
                                                                          size:
                                                                            "mini",
                                                                          "controls-position":
                                                                            "right",
                                                                          min: 1,
                                                                          max: 15
                                                                        },
                                                                        model: {
                                                                          value:
                                                                            e
                                                                              .row
                                                                              .level,
                                                                          callback: function(
                                                                            n
                                                                          ) {
                                                                            t.$set(
                                                                              e.row,
                                                                              "level",
                                                                              n
                                                                            );
                                                                          },
                                                                          expression:
                                                                            "scope.row.level"
                                                                        }
                                                                      }
                                                                    )
                                                                  ],
                                                                  1
                                                                )
                                                          ];
                                                        }
                                                      }
                                                    ])
                                                  }),
                                                  t._v(" "),
                                                  n("el-table-column", {
                                                    attrs: {
                                                      label: "Manager",
                                                      width: "130"
                                                    },
                                                    scopedSlots: t._u([
                                                      {
                                                        key: "default",
                                                        fn: function(e) {
                                                          return [
                                                            !0 === e.row.edit
                                                              ? n(
                                                                  "el-button",
                                                                  {
                                                                    attrs: {
                                                                      type:
                                                                        "text",
                                                                      plain: "",
                                                                      size:
                                                                        "mini"
                                                                    },
                                                                    on: {
                                                                      click: function(
                                                                        n
                                                                      ) {
                                                                        return t.handleUpdateUserRole(
                                                                          e.row
                                                                        );
                                                                      }
                                                                    }
                                                                  },
                                                                  [
                                                                    t._v(
                                                                      "\n                          Lưu\n                        "
                                                                    )
                                                                  ]
                                                                )
                                                              : t._e(),
                                                            t._v(" "),
                                                            !0 === e.row.edit
                                                              ? n(
                                                                  "el-button",
                                                                  {
                                                                    attrs: {
                                                                      type:
                                                                        "text",
                                                                      plain: "",
                                                                      size:
                                                                        "mini"
                                                                    },
                                                                    on: {
                                                                      click: function(
                                                                        n
                                                                      ) {
                                                                        return t.handleCancelEditUser(
                                                                          e.row
                                                                        );
                                                                      }
                                                                    }
                                                                  },
                                                                  [
                                                                    t._v(
                                                                      "\n                          Hủy\n                        "
                                                                    )
                                                                  ]
                                                                )
                                                              : t._e(),
                                                            t._v(" "),
                                                            n(
                                                              "el-tooltip",
                                                              {
                                                                staticClass:
                                                                  "item",
                                                                attrs: {
                                                                  effect:
                                                                    "dark",
                                                                  content:
                                                                    "Sửa đổi",
                                                                  placement:
                                                                    "top-start",
                                                                  enterable: !1
                                                                }
                                                              },
                                                              [
                                                                !1 ===
                                                                e.row.edit
                                                                  ? n(
                                                                      "el-button",
                                                                      {
                                                                        attrs: {
                                                                          icon:
                                                                            "el-icon-edit",
                                                                          type:
                                                                            "text",
                                                                          plain:
                                                                            "",
                                                                          size:
                                                                            "mini"
                                                                        },
                                                                        on: {
                                                                          click: function(
                                                                            n
                                                                          ) {
                                                                            return t.handleEditUser(
                                                                              e.row
                                                                            );
                                                                          }
                                                                        }
                                                                      }
                                                                    )
                                                                  : t._e()
                                                              ],
                                                              1
                                                            ),
                                                            t._v(" "),
                                                            !1 === e.row.edit
                                                              ? n(
                                                                  "el-tooltip",
                                                                  {
                                                                    staticClass:
                                                                      "item",
                                                                    attrs: {
                                                                      effect:
                                                                        "dark",
                                                                      content:
                                                                        "Xoá khỏi hệ thống",
                                                                      placement:
                                                                        "top-start",
                                                                      enterable: !1
                                                                    }
                                                                  },
                                                                  [
                                                                    n(
                                                                      "el-button",
                                                                      {
                                                                        attrs: {
                                                                          type:
                                                                            "text",
                                                                          plain:
                                                                            "",
                                                                          size:
                                                                            "mini"
                                                                        },
                                                                        on: {
                                                                          click: function(
                                                                            n
                                                                          ) {
                                                                            return t.handleDeleteUser(
                                                                              e.row
                                                                            );
                                                                          }
                                                                        }
                                                                      },
                                                                      [
                                                                        n("i", {
                                                                          staticClass:
                                                                            "el-icon-delete"
                                                                        })
                                                                      ]
                                                                    )
                                                                  ],
                                                                  1
                                                                )
                                                              : t._e()
                                                          ];
                                                        }
                                                      }
                                                    ])
                                                  })
                                                ],
                                                1
                                              )
                                            ],
                                            1
                                          ),
                                          t._v(" "),
                                          n(
                                            "el-col",
                                            {
                                              attrs: { xs: 24, sm: 24, lg: 12 }
                                            },
                                            [
                                              n(
                                                "el-table",
                                                {
                                                  staticStyle: {
                                                    width: "100%"
                                                  },
                                                  attrs: {
                                                    data: t.words2,
                                                    stripe: ""
                                                  }
                                                },
                                                [
                                                  n("el-table-column", {
                                                    attrs: {
                                                      prop: "key",
                                                      label: "EN",
                                                      width: "150"
                                                    },
                                                    scopedSlots: t._u([
                                                      {
                                                        key: "default",
                                                        fn: function(e) {
                                                          return [
                                                            !1 === e.row.edit
                                                              ? n("div", [
                                                                  t.check
                                                                    ? n("div", [
                                                                        t._v(
                                                                          " " +
                                                                            t._s(
                                                                              e
                                                                                .row
                                                                                .key
                                                                            ) +
                                                                            " "
                                                                        ),
                                                                        n("i", {
                                                                          staticClass:
                                                                            "el-icon-video-play",
                                                                          on: {
                                                                            click: function(
                                                                              n
                                                                            ) {
                                                                              return t.pronounce(
                                                                                e
                                                                                  .row
                                                                                  .key
                                                                              );
                                                                            }
                                                                          }
                                                                        })
                                                                      ])
                                                                    : t._e()
                                                                ])
                                                              : n(
                                                                  "div",
                                                                  [
                                                                    n(
                                                                      "el-input",
                                                                      {
                                                                        attrs: {
                                                                          placeholder:
                                                                            "Please input"
                                                                        },
                                                                        model: {
                                                                          value:
                                                                            e
                                                                              .row
                                                                              .key,
                                                                          callback: function(
                                                                            n
                                                                          ) {
                                                                            t.$set(
                                                                              e.row,
                                                                              "key",
                                                                              n
                                                                            );
                                                                          },
                                                                          expression:
                                                                            "scope.row.key"
                                                                        }
                                                                      }
                                                                    )
                                                                  ],
                                                                  1
                                                                )
                                                          ];
                                                        }
                                                      }
                                                    ])
                                                  }),
                                                  t._v(" "),
                                                  n("el-table-column", {
                                                    attrs: {
                                                      prop: "value",
                                                      label: "VN",
                                                      width: "200"
                                                    },
                                                    scopedSlots: t._u([
                                                      {
                                                        key: "default",
                                                        fn: function(e) {
                                                          return [
                                                            !1 === e.row.edit
                                                              ? n("div", [
                                                                  t.check1
                                                                    ? n("div", [
                                                                        t._v(
                                                                          t._s(
                                                                            e
                                                                              .row
                                                                              .value
                                                                          )
                                                                        )
                                                                      ])
                                                                    : t._e()
                                                                ])
                                                              : n(
                                                                  "div",
                                                                  [
                                                                    n(
                                                                      "el-input",
                                                                      {
                                                                        attrs: {
                                                                          placeholder:
                                                                            "Please input"
                                                                        },
                                                                        model: {
                                                                          value:
                                                                            e
                                                                              .row
                                                                              .value,
                                                                          callback: function(
                                                                            n
                                                                          ) {
                                                                            t.$set(
                                                                              e.row,
                                                                              "value",
                                                                              n
                                                                            );
                                                                          },
                                                                          expression:
                                                                            "scope.row.value"
                                                                        }
                                                                      }
                                                                    )
                                                                  ],
                                                                  1
                                                                )
                                                          ];
                                                        }
                                                      }
                                                    ])
                                                  }),
                                                  t._v(" "),
                                                  n("el-table-column", {
                                                    attrs: {
                                                      prop: "level",
                                                      label: "LE",
                                                      width: "100"
                                                    },
                                                    scopedSlots: t._u([
                                                      {
                                                        key: "default",
                                                        fn: function(e) {
                                                          return [
                                                            !1 === e.row.edit
                                                              ? n("div", [
                                                                  t._v(
                                                                    "\n                          " +
                                                                      t._s(
                                                                        e.row
                                                                          .level
                                                                      ) +
                                                                      "\n                        "
                                                                  )
                                                                ])
                                                              : n(
                                                                  "div",
                                                                  [
                                                                    n(
                                                                      "el-input-number",
                                                                      {
                                                                        staticStyle: {
                                                                          width:
                                                                            "80px"
                                                                        },
                                                                        attrs: {
                                                                          size:
                                                                            "mini",
                                                                          "controls-position":
                                                                            "right",
                                                                          min: 1,
                                                                          max: 15
                                                                        },
                                                                        model: {
                                                                          value:
                                                                            e
                                                                              .row
                                                                              .level,
                                                                          callback: function(
                                                                            n
                                                                          ) {
                                                                            t.$set(
                                                                              e.row,
                                                                              "level",
                                                                              n
                                                                            );
                                                                          },
                                                                          expression:
                                                                            "scope.row.level"
                                                                        }
                                                                      }
                                                                    )
                                                                  ],
                                                                  1
                                                                )
                                                          ];
                                                        }
                                                      }
                                                    ])
                                                  }),
                                                  t._v(" "),
                                                  n("el-table-column", {
                                                    attrs: {
                                                      label: "Manager",
                                                      width: "130"
                                                    },
                                                    scopedSlots: t._u([
                                                      {
                                                        key: "default",
                                                        fn: function(e) {
                                                          return [
                                                            !0 === e.row.edit
                                                              ? n(
                                                                  "el-button",
                                                                  {
                                                                    attrs: {
                                                                      type:
                                                                        "text",
                                                                      plain: "",
                                                                      size:
                                                                        "mini"
                                                                    },
                                                                    on: {
                                                                      click: function(
                                                                        n
                                                                      ) {
                                                                        return t.handleUpdateUserRole(
                                                                          e.row
                                                                        );
                                                                      }
                                                                    }
                                                                  },
                                                                  [
                                                                    t._v(
                                                                      "\n                          Lưu\n                        "
                                                                    )
                                                                  ]
                                                                )
                                                              : t._e(),
                                                            t._v(" "),
                                                            !0 === e.row.edit
                                                              ? n(
                                                                  "el-button",
                                                                  {
                                                                    attrs: {
                                                                      type:
                                                                        "text",
                                                                      plain: "",
                                                                      size:
                                                                        "mini"
                                                                    },
                                                                    on: {
                                                                      click: function(
                                                                        n
                                                                      ) {
                                                                        return t.handleCancelEditUser(
                                                                          e.row
                                                                        );
                                                                      }
                                                                    }
                                                                  },
                                                                  [
                                                                    t._v(
                                                                      "\n                          Hủy\n                        "
                                                                    )
                                                                  ]
                                                                )
                                                              : t._e(),
                                                            t._v(" "),
                                                            n(
                                                              "el-tooltip",
                                                              {
                                                                staticClass:
                                                                  "item",
                                                                attrs: {
                                                                  effect:
                                                                    "dark",
                                                                  content:
                                                                    "Sửa đổi",
                                                                  placement:
                                                                    "top-start",
                                                                  enterable: !1
                                                                }
                                                              },
                                                              [
                                                                !1 ===
                                                                e.row.edit
                                                                  ? n(
                                                                      "el-button",
                                                                      {
                                                                        attrs: {
                                                                          icon:
                                                                            "el-icon-edit",
                                                                          type:
                                                                            "text",
                                                                          plain:
                                                                            "",
                                                                          size:
                                                                            "mini"
                                                                        },
                                                                        on: {
                                                                          click: function(
                                                                            n
                                                                          ) {
                                                                            return t.handleEditUser(
                                                                              e.row
                                                                            );
                                                                          }
                                                                        }
                                                                      }
                                                                    )
                                                                  : t._e()
                                                              ],
                                                              1
                                                            ),
                                                            t._v(" "),
                                                            !1 === e.row.edit
                                                              ? n(
                                                                  "el-tooltip",
                                                                  {
                                                                    staticClass:
                                                                      "item",
                                                                    attrs: {
                                                                      effect:
                                                                        "dark",
                                                                      content:
                                                                        "Xoá khỏi hệ thống",
                                                                      placement:
                                                                        "top-start",
                                                                      enterable: !1
                                                                    }
                                                                  },
                                                                  [
                                                                    n(
                                                                      "el-button",
                                                                      {
                                                                        attrs: {
                                                                          type:
                                                                            "text",
                                                                          plain:
                                                                            "",
                                                                          size:
                                                                            "mini"
                                                                        },
                                                                        on: {
                                                                          click: function(
                                                                            n
                                                                          ) {
                                                                            return t.handleDeleteUser(
                                                                              e.row
                                                                            );
                                                                          }
                                                                        }
                                                                      },
                                                                      [
                                                                        n("i", {
                                                                          staticClass:
                                                                            "el-icon-delete"
                                                                        })
                                                                      ]
                                                                    )
                                                                  ],
                                                                  1
                                                                )
                                                              : t._e()
                                                          ];
                                                        }
                                                      }
                                                    ])
                                                  })
                                                ],
                                                1
                                              )
                                            ],
                                            1
                                          )
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      t._v(" "),
                      n(
                        "el-dialog",
                        {
                          attrs: {
                            title: "Tips",
                            visible: t.dialogVisible,
                            width: "30%"
                          },
                          on: {
                            "update:visible": function(e) {
                              t.dialogVisible = e;
                            }
                          }
                        },
                        [
                          n("span", [t._v("This is a message")]),
                          t._v(" "),
                          n(
                            "span",
                            {
                              staticClass: "dialog-footer",
                              attrs: { slot: "footer" },
                              slot: "footer"
                            },
                            [
                              n(
                                "el-button",
                                {
                                  on: {
                                    click: function(e) {
                                      t.dialogVisible = !1;
                                    }
                                  }
                                },
                                [t._v("Cancel")]
                              ),
                              t._v(" "),
                              n(
                                "el-button",
                                {
                                  attrs: { type: "primary" },
                                  on: { click: t.generateNewwords }
                                },
                                [t._v("Confirm")]
                              )
                            ],
                            1
                          )
                        ]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ]);
          },
          staticRenderFns: []
        };
      var l = n("VU/8")(
        o,
        r,
        !1,
        function(t) {
          n("cWKn");
        },
        "data-v-21bae83e",
        null
      );
      e.default = l.exports;
    },
    bpzJ: function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = n("VU/8")(null, null, !1, null, null, null);
      e.default = i.exports;
    },
    cWKn: function(t, e) {},
    dPUt: function(t, e) {},
    dthE: function(t, e) {},
    "ffh+": function(t, e) {},
    fk85: function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = n("5ybE"),
        s = {
          name: "topics",
          data: function() {
            return {
              dialogFormVisible: !1,
              level: 15,
              level2: 1,
              en: "",
              vn: "",
              words1: [],
              words2: [],
              check: !0,
              check1: !0,
              topics: [],
              ad_topic: "",
              ad_level: 12,
              ad_favorite: 0
            };
          },
          mounted: function() {
            this.getdata();
          },
          methods: {
            getdata: function() {
              var t = this;
              Object(i.h)().then(function(e) {
                var n = e.data.data;
                for (var i in n) n[i].edit = !1;
                t.topics = n;
              });
            },
            pronounce: function(t) {
              var e = new SpeechSynthesisUtterance();
              (e.voiceURI = "native"),
                (e.text = t),
                (e.lang = "en-US"),
                (e.onend = function(t) {
                  console.log("Finished in " + event.elapsedTime + " seconds.");
                }),
                speechSynthesis.speak(e),
                console.log(t);
            },
            handleCancelEditUser: function(t) {
              t.edit = !1;
            },
            handleEditUser: function(t) {
              t.edit = !0;
            },
            addTopic: function() {
              var t = this,
                e = {
                  topic: this.ad_topic,
                  level: this.ad_level,
                  favorite: this.ad_favorite,
                  idi: this.ad_topic
                };
              this.$http.post("http://127.0.0.1:8100/topics", e).then(
                function(t) {
                  !0 === t.body.status
                    ? (this.$notify({
                        title: "Success",
                        message: t.body.message,
                        type: "success"
                      }),
                      this.getdata())
                    : this.$notify.error({
                        title: "Error",
                        message: t.body.message
                      });
                },
                function(e) {
                  t.notify("warning", e.body.message);
                }
              );
            },
            updateTopic: function(t) {
              var e = this,
                n = {
                  topic: t.topic,
                  level: t.level,
                  favorite: t.favorite,
                  idi: t.idi,
                  order: t.order
                };
              this.$http.put("http://127.0.0.1:8100/topics", n).then(
                function(t) {
                  !0 === t.body.status
                    ? (this.$notify({
                        title: "Success",
                        message: t.body.message,
                        type: "success"
                      }),
                      this.getdata())
                    : this.$notify.error({
                        title: "Error",
                        message: t.body.message
                      });
                },
                function(t) {
                  e.$notify.error({ title: "Error", message: t.body.message });
                }
              );
            },
            handleDeleteUser: function(t) {
              var e = this,
                n = { idi: t.idi };
              this.$http
                .delete("http://127.0.0.1:8100/topics", { body: n })
                .then(
                  function(t) {
                    !0 === t.body.status
                      ? (this.$notify({
                          title: "Success",
                          message: t.body.message,
                          type: "success"
                        }),
                        this.getdata())
                      : this.$notify.error({
                          title: "Error",
                          message: t.body.message
                        });
                  },
                  function(t) {
                    e.$notify.error({
                      title: "Error",
                      message: t.body.message
                    });
                  }
                );
            }
          }
        },
        a = {
          render: function() {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n(
              "div",
              [
                n(
                  "el-card",
                  { attrs: { shadow: "never" } },
                  [
                    n(
                      "div",
                      {
                        staticClass: "clearfix",
                        staticStyle: { position: "relative" },
                        attrs: { slot: "header" },
                        slot: "header"
                      },
                      [
                        n(
                          "span",
                          {
                            staticStyle: {
                              "font-weight": "bold",
                              "font-size": "20px"
                            }
                          },
                          [t._v(" " + t._s(t.topics.length))]
                        ),
                        t._v(" "),
                        n(
                          "el-button",
                          {
                            staticStyle: { "padding-left": "10px" },
                            attrs: { size: "mini", type: "primary" },
                            on: {
                              click: function(e) {
                                t.dialogFormVisible = !0;
                              }
                            }
                          },
                          [
                            n("i", { staticClass: "fas fa-plus-circle" }),
                            t._v(" Thêm mới")
                          ]
                        )
                      ],
                      1
                    ),
                    t._v(" "),
                    n(
                      "el-row",
                      {
                        staticStyle: {
                          "margin-left": "0!important",
                          "margin-right": "0!important"
                        },
                        attrs: { gutter: 20 }
                      },
                      [
                        n(
                          "el-col",
                          { attrs: { xs: 24, sm: 24, lg: 24 } },
                          [
                            n(
                              "el-table",
                              {
                                staticStyle: { width: "100%" },
                                attrs: { data: t.topics, stripe: "" }
                              },
                              [
                                n("el-table-column", {
                                  attrs: {
                                    label: "Topic",
                                    sortable: "",
                                    width: "250"
                                  },
                                  scopedSlots: t._u([
                                    {
                                      key: "default",
                                      fn: function(e) {
                                        return [
                                          !1 === e.row.edit
                                            ? n("div", [
                                                t.check
                                                  ? n("div", [
                                                      t._v(
                                                        " " +
                                                          t._s(e.row.topic) +
                                                          " "
                                                      ),
                                                      n("i", {
                                                        staticClass:
                                                          "el-icon-video-play",
                                                        on: {
                                                          click: function(n) {
                                                            return t.pronounce(
                                                              e.row.topic
                                                            );
                                                          }
                                                        }
                                                      })
                                                    ])
                                                  : t._e()
                                              ])
                                            : n(
                                                "div",
                                                [
                                                  n("el-input", {
                                                    attrs: {
                                                      placeholder:
                                                        "Please input"
                                                    },
                                                    model: {
                                                      value: e.row.topic,
                                                      callback: function(n) {
                                                        t.$set(
                                                          e.row,
                                                          "topic",
                                                          n
                                                        );
                                                      },
                                                      expression:
                                                        "scope.row.topic"
                                                    }
                                                  })
                                                ],
                                                1
                                              )
                                        ];
                                      }
                                    }
                                  ])
                                }),
                                t._v(" "),
                                n("el-table-column", {
                                  attrs: {
                                    prop: "order",
                                    sortable: "",
                                    label: "order"
                                  }
                                }),
                                t._v(" "),
                                n("el-table-column", {
                                  attrs: { label: "order", width: "200" },
                                  scopedSlots: t._u([
                                    {
                                      key: "default",
                                      fn: function(e) {
                                        return [
                                          !1 === e.row.edit
                                            ? n("div", [
                                                n("div", [
                                                  t._v(t._s(e.row.order))
                                                ])
                                              ])
                                            : n(
                                                "div",
                                                [
                                                  n("el-input-number", {
                                                    staticStyle: {
                                                      width: "80px"
                                                    },
                                                    attrs: {
                                                      size: "mini",
                                                      "controls-position":
                                                        "right",
                                                      min: 0,
                                                      max: 105
                                                    },
                                                    model: {
                                                      value: e.row.order,
                                                      callback: function(n) {
                                                        t.$set(
                                                          e.row,
                                                          "order",
                                                          n
                                                        );
                                                      },
                                                      expression:
                                                        "scope.row.order"
                                                    }
                                                  })
                                                ],
                                                1
                                              )
                                        ];
                                      }
                                    }
                                  ])
                                }),
                                t._v(" "),
                                n("el-table-column", {
                                  attrs: { label: "favorite", width: "200" },
                                  scopedSlots: t._u([
                                    {
                                      key: "default",
                                      fn: function(e) {
                                        return [
                                          !1 === e.row.edit
                                            ? n("div", [
                                                n("div", [
                                                  t._v(t._s(e.row.favorite))
                                                ])
                                              ])
                                            : n(
                                                "div",
                                                [
                                                  n("el-input-number", {
                                                    staticStyle: {
                                                      width: "80px"
                                                    },
                                                    attrs: {
                                                      size: "mini",
                                                      "controls-position":
                                                        "right",
                                                      min: 0,
                                                      max: 15
                                                    },
                                                    model: {
                                                      value: e.row.favorite,
                                                      callback: function(n) {
                                                        t.$set(
                                                          e.row,
                                                          "favorite",
                                                          n
                                                        );
                                                      },
                                                      expression:
                                                        "scope.row.favorite"
                                                    }
                                                  })
                                                ],
                                                1
                                              )
                                        ];
                                      }
                                    }
                                  ])
                                }),
                                t._v(" "),
                                n("el-table-column", {
                                  attrs: {
                                    prop: "level",
                                    label: "LE",
                                    width: "100"
                                  },
                                  scopedSlots: t._u([
                                    {
                                      key: "default",
                                      fn: function(e) {
                                        return [
                                          !1 === e.row.edit
                                            ? n("div", [
                                                t._v(
                                                  "\n                " +
                                                    t._s(e.row.level) +
                                                    "\n              "
                                                )
                                              ])
                                            : n(
                                                "div",
                                                [
                                                  n("el-input-number", {
                                                    staticStyle: {
                                                      width: "80px"
                                                    },
                                                    attrs: {
                                                      size: "mini",
                                                      "controls-position":
                                                        "right",
                                                      min: 0,
                                                      max: 15
                                                    },
                                                    model: {
                                                      value: e.row.level,
                                                      callback: function(n) {
                                                        t.$set(
                                                          e.row,
                                                          "level",
                                                          n
                                                        );
                                                      },
                                                      expression:
                                                        "scope.row.level"
                                                    }
                                                  })
                                                ],
                                                1
                                              )
                                        ];
                                      }
                                    }
                                  ])
                                }),
                                t._v(" "),
                                n("el-table-column", {
                                  attrs: { label: "Manager", width: "130" },
                                  scopedSlots: t._u([
                                    {
                                      key: "default",
                                      fn: function(e) {
                                        return [
                                          !0 === e.row.edit
                                            ? n(
                                                "el-button",
                                                {
                                                  attrs: {
                                                    type: "text",
                                                    plain: "",
                                                    size: "mini"
                                                  },
                                                  on: {
                                                    click: function(n) {
                                                      return t.updateTopic(
                                                        e.row
                                                      );
                                                    }
                                                  }
                                                },
                                                [
                                                  t._v(
                                                    "\n                Lưu\n              "
                                                  )
                                                ]
                                              )
                                            : t._e(),
                                          t._v(" "),
                                          !0 === e.row.edit
                                            ? n(
                                                "el-button",
                                                {
                                                  attrs: {
                                                    type: "text",
                                                    plain: "",
                                                    size: "mini"
                                                  },
                                                  on: {
                                                    click: function(n) {
                                                      return t.handleCancelEditUser(
                                                        e.row
                                                      );
                                                    }
                                                  }
                                                },
                                                [
                                                  t._v(
                                                    "\n                Hủy\n              "
                                                  )
                                                ]
                                              )
                                            : t._e(),
                                          t._v(" "),
                                          n(
                                            "el-tooltip",
                                            {
                                              staticClass: "item",
                                              attrs: {
                                                effect: "dark",
                                                content: "Sửa đổi",
                                                placement: "top-start",
                                                enterable: !1
                                              }
                                            },
                                            [
                                              !1 === e.row.edit
                                                ? n("el-button", {
                                                    attrs: {
                                                      icon: "el-icon-edit",
                                                      type: "text",
                                                      plain: "",
                                                      size: "mini"
                                                    },
                                                    on: {
                                                      click: function(n) {
                                                        return t.handleEditUser(
                                                          e.row
                                                        );
                                                      }
                                                    }
                                                  })
                                                : t._e()
                                            ],
                                            1
                                          ),
                                          t._v(" "),
                                          !1 === e.row.edit
                                            ? n(
                                                "el-tooltip",
                                                {
                                                  staticClass: "item",
                                                  attrs: {
                                                    effect: "dark",
                                                    content:
                                                      "Xoá khỏi hệ thống",
                                                    placement: "top-start",
                                                    enterable: !1
                                                  }
                                                },
                                                [
                                                  n(
                                                    "el-button",
                                                    {
                                                      attrs: {
                                                        type: "text",
                                                        plain: "",
                                                        size: "mini"
                                                      },
                                                      on: {
                                                        click: function(n) {
                                                          return t.handleDeleteUser(
                                                            e.row
                                                          );
                                                        }
                                                      }
                                                    },
                                                    [
                                                      n("i", {
                                                        staticClass:
                                                          "el-icon-delete"
                                                      })
                                                    ]
                                                  )
                                                ],
                                                1
                                              )
                                            : t._e()
                                        ];
                                      }
                                    }
                                  ])
                                })
                              ],
                              1
                            )
                          ],
                          1
                        ),
                        t._v(" "),
                        n(
                          "el-dialog",
                          {
                            attrs: {
                              title: "Add vocabulary",
                              visible: t.dialogFormVisible
                            },
                            on: {
                              "update:visible": function(e) {
                                t.dialogFormVisible = e;
                              }
                            }
                          },
                          [
                            n(
                              "el-form",
                              [
                                n(
                                  "el-form-item",
                                  { attrs: { label: "Topic" } },
                                  [
                                    n("el-input", {
                                      attrs: { clearable: "" },
                                      model: {
                                        value: t.ad_topic,
                                        callback: function(e) {
                                          t.ad_topic = e;
                                        },
                                        expression: "ad_topic"
                                      }
                                    })
                                  ],
                                  1
                                ),
                                t._v(" "),
                                n(
                                  "el-form-item",
                                  { attrs: { label: "Level" } },
                                  [
                                    n("el-input-number", {
                                      staticStyle: { width: "90px" },
                                      attrs: {
                                        size: "mini",
                                        "controls-position": "right",
                                        min: 0,
                                        max: 15
                                      },
                                      model: {
                                        value: t.ad_level,
                                        callback: function(e) {
                                          t.ad_level = e;
                                        },
                                        expression: "ad_level"
                                      }
                                    })
                                  ],
                                  1
                                ),
                                t._v(" "),
                                n(
                                  "el-form-item",
                                  { attrs: { label: "Favorite" } },
                                  [
                                    n("el-input-number", {
                                      staticStyle: { width: "90px" },
                                      attrs: {
                                        size: "mini",
                                        "controls-position": "right",
                                        min: 0,
                                        max: 15
                                      },
                                      model: {
                                        value: t.ad_favorite,
                                        callback: function(e) {
                                          t.ad_favorite = e;
                                        },
                                        expression: "ad_favorite"
                                      }
                                    })
                                  ],
                                  1
                                )
                              ],
                              1
                            ),
                            t._v(" "),
                            n(
                              "span",
                              {
                                staticClass: "dialog-footer",
                                attrs: { slot: "footer" },
                                slot: "footer"
                              },
                              [
                                n(
                                  "el-button",
                                  {
                                    on: {
                                      click: function(e) {
                                        t.dialogFormVisible = !1;
                                      }
                                    }
                                  },
                                  [t._v("Cancel")]
                                ),
                                t._v(" "),
                                n(
                                  "el-button",
                                  {
                                    attrs: { type: "primary" },
                                    on: {
                                      click: function(e) {
                                        return t.addTopic();
                                      }
                                    }
                                  },
                                  [t._v("Confirm")]
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            );
          },
          staticRenderFns: []
        };
      var o = n("VU/8")(
        s,
        a,
        !1,
        function(t) {
          n("i9YX");
        },
        "data-v-828448e2",
        null
      );
      e.default = o.exports;
    },
    i9YX: function(t, e) {},
    "iIx/": function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = n("5ybE"),
        s = {
          name: "index",
          data: function() {
            return {
              array: [
                {
                  title: "Contracts",
                  link:
                    "https://iguana-idm.com/wp-content/uploads/Contract-Management-2.jpg",
                  word: [],
                  count: 1
                },
                {
                  title: "Marketing",
                  link:
                    "https://blog.webico.vn/wp-content/uploads/2017/01/tu-vung-tieng-anh-trong-marketing-696x487.jpg",
                  word: [],
                  count: 2
                },
                {
                  title: "Warranties",
                  link:
                    "https://www.aada.asn.au/wp-content/uploads/2015/07/warranty.jpg",
                  word: [],
                  count: 3
                },
                {
                  title: "Business Planning",
                  link:
                    "https://s3.amazonaws.com/pas-wordpress-media/content/uploads/2017/10/22085951/The-elements-of-a-business-plan-min.png",
                  word: [],
                  count: 4
                },
                {
                  title: "Conferences",
                  link:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeh1KKGHfBqY7WZvP_6lsbjFB0JrbJOy2yO_WB6Latmrkt-A3f",
                  word: [],
                  count: 5
                },
                {
                  title: "Computers",
                  link:
                    "https://ae01.alicdn.com/kf/HTB1d0I3bdjvK1RjSspiq6AEqXXak/Multi-function-PC-Monitor-Laptop-Stand-Tempered-Glass-Computer-Desk-USB-2-0-Suit-for-Laptop.jpg",
                  word: [],
                  count: 6
                },
                {
                  title: "Office Technology",
                  link:
                    "https://thumbs.dreamstime.com/z/business-man-standing-window-office-technology-layer-effect-working-46228329.jpg",
                  word: [],
                  count: 7
                },
                {
                  title: "Office Procedures",
                  link:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS90F0kzlzNcEEO1hsjzN50Br9hLv929aBo1p3qeA3n9aTttA-p",
                  word: [],
                  count: 8
                },
                {
                  title: "Electronics",
                  link:
                    "https://www.telegraph.co.uk/content/dam/business/2018/04/19/Ultra-Electronics_trans_NvBQzQNjv4BqY1pDbA9t2TcEbSModODvKbRRmBxJxfllGDm4tj3DiWg.jpg?imwidth=450",
                  word: [],
                  count: 9
                },
                {
                  title: "Correspondence",
                  link:
                    "https://www.infofort.com/common/Correspondence-Management.svg",
                  word: [],
                  count: 10
                },
                {
                  title: "Job Advertising Recruiting",
                  link:
                    "https://marketplace.canva.com/MACRtnhXJVk/2/0/thumbnail_large/canva-yellow-job-vacancy-announcement-MACRtnhXJVk.jpg",
                  word: [],
                  count: 11
                },
                {
                  title: "Applying and Interviewing",
                  link:
                    "data:image/jpeg;base64,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",
                  word: [],
                  count: 12
                },
                {
                  title: "Hiring and Training",
                  link:
                    "https://p.calameoassets.com/140604065922-ac22c26aacd8b359a55d28babda99407/p1.jpg",
                  word: [],
                  count: 13
                },
                {
                  title: "Salaries and Benefits",
                  link:
                    "data:image/jpeg;base64,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",
                  word: [],
                  count: 14
                },
                {
                  title: "Promotions,Pensions,Awards",
                  link:
                    "https://tienganhtflat.com/uploads/blog/promotions-pensions-award-75b1e07438.jpg?4234",
                  word: [],
                  count: 15
                },
                {
                  title: "Shopping",
                  link:
                    "https://patch.com/img/cdn20/users/22887410/20180518/093059/styles/T800x600/public/processed_images/shutterstock_626081396-1526650208-4766.jpg",
                  word: [],
                  count: 16
                },
                {
                  title: "Ordering Supplies",
                  link:
                    "http://toeicspeakingmsngoc.com/images/tintuc/toeic-1520747066_Ordering_Supplies.jpg",
                  word: [],
                  count: 17
                },
                {
                  title: "Shipping",
                  link:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmd6zJs7k2_LmQDSv97tHz416loGH_P3CwrOCFnvvUjqpFrRkR",
                  word: [],
                  count: 18
                },
                {
                  title: "Invoices",
                  link:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqkmIGp5SzFuaDyXR6CJ7H-n9maBKe4t_1SYUvsUQ5IfqocaSv",
                  word: [],
                  count: 19
                },
                {
                  title: "Inventory",
                  link:
                    "data:image/jpeg;base64,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",
                  word: [],
                  count: 20
                },
                {
                  title: "Other",
                  link: "https://pbs.twimg.com/media/CBDgItLUgAAufpZ.jpg",
                  word: [],
                  count: 21
                },
                {
                  title: "Forget",
                  link: "https://pbs.twimg.com/media/CBDgItLUgAAufpZ.jpg",
                  word: [],
                  count: 22
                },
                {
                  title: "Expand01",
                  link:
                    "https://i.pinimg.com/736x/4b/50/fb/4b50fb74db88cdd5424fea3ce6d05baf.jpg",
                  word: [],
                  count: 23
                },
                {
                  title: "Expand02",
                  link:
                    "https://thanhcongcanhan.files.wordpress.com/2013/04/lessonfromababy.jpg",
                  word: [],
                  count: 24
                },
                {
                  title: "Expand part7",
                  link: "http://image.pmcontent.com/film/732/poster.medium.jpg",
                  word: [],
                  count: 25
                },
                {
                  title: "Appendix",
                  link:
                    "https://i.pinimg.com/originals/e5/f0/3b/e5f03b0c40607a43e18807effc2a49b1.jpg",
                  word: [],
                  count: 26
                },
                {
                  title: "mv",
                  link:
                    "https://i0.wp.com/thuvienanh.net/wp-content/uploads/2019/03/15319063_1870502259827840_8901988026005563692_n.jpg?resize=462%2C486&ssl=1",
                  word: [],
                  count: 27
                },
                {
                  title: "Javis",
                  link:
                    "https://images.pexels.com/photos/50582/selfie-monkey-self-portrait-macaca-nigra-50582.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                  word: [],
                  count: 28
                },
                {
                  title: "Part1",
                  link:
                    "https://i.pinimg.com/originals/54/34/3c/54343c82ee4683c4e80346eafd0edd94.jpg",
                  word: [],
                  count: 29
                },
                {
                  title: "Advance",
                  link:
                    "https://tuvantamly.com.vn/wp-content/uploads/2016/02/s%E1%BB%B1-th%E1%BA%ADt-v%E1%BB%81-t%C3%ACnh-y%C3%AAu-2.jpg",
                  word: [],
                  count: 30
                },
                {
                  title: "Essential",
                  link:
                    "https://www.thoughtco.com/thmb/ZxfjWnSvTYQnInIb-_qUD2wo7Zk=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-480663639-566ad9db3df78ce161594b7b.jpg",
                  word: [],
                  count: 31
                },
                {
                  title: "Pro",
                  link:
                    "https://tonygentilcore.com/wp-content/uploads/2017/08/Strong-1024x683.jpg",
                  word: [],
                  count: 32
                },
                {
                  title: "33",
                  link:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQe3qxlixkvu03qLWCH8hzDOK8RJsxogrc9B_6rCbafXHGkah53&usqp=CAU",
                  word: [],
                  count: 33
                },
                {
                  title: "34",
                  link:
                    "https://i.pinimg.com/originals/7d/f5/ca/7df5ca14b6b25cd4c815d4356fd68b30.jpg",
                  word: [],
                  count: 34
                },
                {
                  title: "35",
                  link:
                    "http://static2.yan.vn/YanNews/2167221/201709/20170920-035730-1_600x525.PNG",
                  word: [],
                  count: 35
                },
                {
                  title: "36",
                  link:
                    "https://i2.wp.com/thuvienanh.net/wp-content/uploads/2019/03/14390859_266626337070063_2303668231215962723_n.jpg?resize=512%2C640&ssl=1",
                  word: [],
                  count: 36
                },
                {
                  title: "ets2018_1",
                  link:
                    "https://sohanews.sohacdn.com/thumb_w/660/2016/2sao-cam-tu-vi-uong-ava-1481269556182-0-0-304-490-crop-1481272730302.jpg",
                  word: [],
                  count: 37
                },
                {
                  title: "ets2018_2",
                  link:
                    "https://vcdn-giaitri.vnecdn.net/2018/11/14/trieu-man14-1542185914_680x0.jpg",
                  word: [],
                  count: 38
                },
                {
                  title: "ets2018_3",
                  link:
                    "https://photo-2-baomoi.zadn.vn/w1000_r1/2019_04_20_329_30427408/9efd6dd6bc9655c80c87.jpg",
                  word: [],
                  count: 39
                },
                {
                  title: "ets2018_4",
                  link:
                    "https://i.pinimg.com/564x/cb/0c/b7/cb0cb7cc3aaf21fee2f4549e62d39899.jpg",
                  word: [],
                  count: 40
                },
                {
                  title: "ets2018_5",
                  link:
                    "https://media.doisongphapluat.com/493/2019/3/11/tan-y-thien-do-long-ky-trieu-man-tran-ngoc-ky%20(4).jpg",
                  word: [],
                  count: 41
                },
                {
                  title: "ets2018_6",
                  link:
                    "https://i.pinimg.com/564x/1c/6f/07/1c6f07875ea6d428f8f5b940a56c70b7.jpg",
                  word: [],
                  count42: 42
                },
                {
                  title: "ets2018_7",
                  link:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQiurot76yqzGphc1G4qOrp3AwuAsx29WujKYcKz0keCIR-juL3&usqp=CAU",
                  word: [],
                  count43: 43
                },
                {
                  title: "ets2018_8",
                  link:
                    "https://i.pinimg.com/564x/0c/8e/d7/0c8ed7a0c3d1526522b8ef40f7fd64c5.jpg",
                  word: [],
                  count44: 44
                },
                {
                  title: "advise",
                  link:
                    "https://i.pinimg.com/564x/3e/13/f0/3e13f032cb1b1179abdda74679fa0754.jpg",
                  word: [],
                  count45: 45
                },
                {
                  title: "objective",
                  link:
                    "https://i.pinimg.com/564x/10/a9/4a/10a94a4f4f84df4624286b9517581ae3.jpg",
                  word: [],
                  count46: 46
                },
                {
                  title: "precisely",
                  link:
                    "https://i.pinimg.com/564x/b0/24/29/b02429cca3d46f5f732108374abaef38.jpg",
                  word: [],
                  count47: 47
                },
                {
                  title: "division",
                  link:
                    "https://i.pinimg.com/564x/1e/02/1c/1e021cb02dc36a17c579360ad7ef856b.jpg",
                  word: [],
                  count48: 48
                },
                {
                  title: "resoureful",
                  link:
                    "http://www.newsinside.kr/news/photo/201704/455994_292193_1516.gif",
                  word: [],
                  count49: 49
                },
                {
                  title: "notwithstanding",
                  link:
                    "http://www.newsinside.kr/news/photo/201704/455994_292195_1521.gif",
                  word: [],
                  count50: 50
                },
                {
                  title: "regulations",
                  link:
                    "http://www.newsinside.kr/news/photo/201704/455994_292229_1654.gif",
                  word: [],
                  count51: 51
                },
                {
                  title: "devote",
                  link:
                    "https://i.pinimg.com/originals/74/61/9c/74619ce112da065328d81e6a615e461a.gif",
                  word: [],
                  count52: 52
                }
              ],
              currentDate: new Date().toDateString(),
              views: [],
              topics: [],
              path:
                "https://i.pinimg.com/originals/e5/f0/3b/e5f03b0c40607a43e18807effc2a49b1.jpg"
            };
          },
          mounted: function() {
            this.getramdom(), this.getallTopic();
          },
          methods: {
            getdata: function() {
              this.$http
                .get("http://127.0.0.1:8100/preview", {
                  headers: { Authorization: "vudz" },
                  params: {
                    table: this.$route.params.nameTopic,
                    level: this.level2
                  }
                })
                .then(function(t) {
                  var e = [];
                  for (var n in ((this.words1 = []),
                  (this.words2 = []),
                  (e = t.body.data)))
                    e[n].edit = !1;
                  if (e.length > 1) {
                    for (var i = 0; i < e.length / 2; i++)
                      this.words1.push(e[i]);
                    for (
                      var s =
                        e.length % 2
                          ? parseInt(e.length / 2) + 1
                          : parseInt(e.length / 2);
                      s < e.length;
                      s++
                    )
                      this.words2.push(e[s]);
                  } else this.words1 = e;
                });
            },
            getallTopic: function() {
              var t = this;
              Object(i.h)().then(function(e) {
                var n = e.data.data;
                for (var i in n) n[i].edit = !1;
                (t.topics = n), console.log(t.topics);
              });
            },
            getramdom: function() {
              this.$http
                .get("http://127.0.0.1:8100/showexample", {
                  headers: { Authorization: "vudz" }
                })
                .then(function(t) {
                  var e = t.body;
                  for (var n in this.array) {
                    var i = this.array[n].title.toLowerCase().replace(" ", "_");
                    for (var s in ((i = i.replace(" ", "_")),
                    console.log("--" + i),
                    e))
                      if (i === e[s].table)
                        for (var a in e[s].data)
                          this.array[n].word.push(e[s].data[a].key),
                            this.topics[n].word.push(e[s].data[a].key);
                  }
                  for (var o in this.array) this.array[o].word.reverse();
                });
            },
            getexp: function(t) {
              this.$http
                .get("http://127.0.0.1:8100/preview", {
                  headers: { Authorization: "vudz" },
                  params: {
                    table: this.$route.params.nameTopic,
                    level: this.level2
                  }
                })
                .then(function(t) {
                  var e = [];
                  for (var n in ((this.words1 = []),
                  (this.words2 = []),
                  (e = t.body.data)))
                    e[n].edit = !1;
                  if ((console.log(parseInt(e.length / 2)), e.length > 1)) {
                    for (var i = 0; i < e.length / 2; i++)
                      this.words1.push(e[i]);
                    for (
                      var s =
                        e.length % 2
                          ? parseInt(e.length / 2) + 1
                          : parseInt(e.length / 2);
                      s < e.length;
                      s++
                    )
                      this.words2.push(e[s]);
                  } else this.words1 = e;
                });
            }
          }
        },
        a = {
          render: function() {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n(
              "div",
              {
                staticStyle: {
                  "background-image":
                    "url('https://syndlab.com/files/view/5db9b150252346nbDR1gKP3OYNuwBhXsHJerdToc5I0SMLfk7qlv951730.jpeg')"
                }
              },
              [
                n(
                  "el-row",
                  t._l(t.topics, function(e) {
                    return n(
                      "el-col",
                      {
                        key: e.topic,
                        staticStyle: {
                          "padding-left": "35px",
                          "padding-top": "10px"
                        },
                        attrs: { xs: 24, sm: 24, lg: 6, md: 12 }
                      },
                      [
                        n(
                          "el-card",
                          { staticClass: "box-card" },
                          [
                            n(
                              "el-row",
                              [
                                n("el-col", { attrs: { span: 15 } }, [
                                  n("img", {
                                    staticClass: "image",
                                    attrs: { src: e.link }
                                  })
                                ]),
                                t._v(" "),
                                n(
                                  "el-col",
                                  { attrs: { span: 9 } },
                                  t._l(e.word, function(e) {
                                    return n("p", { staticClass: "word" }, [
                                      t._v(t._s(e))
                                    ]);
                                  }),
                                  0
                                )
                              ],
                              1
                            ),
                            t._v(" "),
                            n("div", { staticStyle: { padding: "0px" } }, [
                              n(
                                "span",
                                {
                                  staticStyle: {
                                    "font-size": "14px",
                                    color: "#e64c4b"
                                  }
                                },
                                [t._v(t._s(e.topic))]
                              ),
                              t._v(" "),
                              n(
                                "div",
                                { staticClass: "bottom clearfix" },
                                [
                                  n(
                                    "router-link",
                                    { attrs: { to: "/topic/" + e.topic } },
                                    [
                                      n("time", { staticClass: "time" }, [
                                        t._v(
                                          t._s(t.currentDate) +
                                            " - " +
                                            t._s(e.count)
                                        )
                                      ])
                                    ]
                                  ),
                                  t._v(" "),
                                  n("br"),
                                  t._v(" "),
                                  n(
                                    "div",
                                    { staticStyle: { "padding-top": "10px" } },
                                    [
                                      n(
                                        "router-link",
                                        { attrs: { to: "/topic/" + e.topic } },
                                        [
                                          n(
                                            "el-button",
                                            {
                                              staticClass: "button",
                                              attrs: { type: "text" }
                                            },
                                            [t._v("Explore")]
                                          )
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ])
                          ],
                          1
                        )
                      ],
                      1
                    );
                  }),
                  1
                ),
                t._v(" "),
                n("el-row", [
                  n(
                    "h3",
                    {
                      staticStyle: { "text-align": "center", color: "#c4c4c4" }
                    },
                    [
                      t._v(
                        "\n      Nếu bạn muốn từ bỏ hãy nghĩ tới lí do bạn bắt đầu.\n    "
                      )
                    ]
                  ),
                  t._v(" "),
                  n(
                    "h4",
                    {
                      staticStyle: { "text-align": "center", color: "#c4c4c4" }
                    },
                    [t._v("\n      code by vunm\n    ")]
                  )
                ])
              ],
              1
            );
          },
          staticRenderFns: []
        };
      var o = n("VU/8")(
        s,
        a,
        !1,
        function(t) {
          n("Sijj");
        },
        "data-v-05ee34c4",
        null
      );
      e.default = o.exports;
    },
    jK7l: function(t, e) {},
    jUum: function(t, e, n) {
      t.exports = n.p + "static/img/mv2.8adebdc.jpg";
    },
    k96P: function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = n("XLwt"),
        s = n.n(i),
        a = n("0xDb"),
        o = n("TIfe");
      n("tcAE");
      var r = {
          props: {
            className: { type: String, default: "chart" },
            width: { type: String, default: "100%" },
            height: { type: String, default: "300px" }
          },
          data: function() {
            return { chart: null };
          },
          mounted: function() {
            var t = this;
            this.initChart(),
              (this.__resizeHanlder = Object(a.a)(function() {
                t.chart && t.chart.resize();
              }, 100)),
              window.addEventListener("resize", this.__resizeHanlder);
          },
          beforeDestroy: function() {
            this.chart &&
              (window.removeEventListener("resize", this.__resizeHanlder),
              this.chart.dispose(),
              (this.chart = null));
          },
          methods: {
            initChart: function() {
              this.$http
                .get("http://127.0.0.1:8100/extension", {
                  headers: { Authorization: Object(o.a)() }
                })
                .then(function(t) {
                  (this.chart = s.a.init(this.$el, "macarons")),
                    this.chart.setOption({
                      tooltip: {
                        trigger: "item",
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                      },
                      legend: {
                        left: "center",
                        bottom: "10",
                        data: ["Expert", "Forget", "Vague"]
                      },
                      calculable: !0,
                      series: [
                        {
                          name: "Progress",
                          type: "pie",
                          roseType: "radius",
                          radius: [15, 95],
                          center: ["50%", "38%"],
                          data: [
                            { value: t.data.expert, name: "Expert" },
                            { value: t.data.forget, name: "Forget" },
                            { value: t.data.vague, name: "Vague" }
                          ],
                          animationEasing: "cubicInOut",
                          animationDuration: 2600
                        }
                      ]
                    });
                });
            }
          }
        },
        l = {
          render: function() {
            var t = this.$createElement;
            return (this._self._c || t)("div", {
              class: this.className,
              style: { height: this.height, width: this.width }
            });
          },
          staticRenderFns: []
        },
        c = n("VU/8")(r, l, !1, null, null, null);
      e.default = c.exports;
    },
    "kk+z": function(t, e) {},
    lfr6: function(t, e) {},
    lkbi: function(t, e) {},
    mCCf: function(t, e) {},
    mmw7: function(t, e) {},
    nga4: function(t, e) {},
    qs6A: function(t, e) {},
    rLym: function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = {
          name: "showTable",
          data: function() {
            return {
              dialogFormVisible: !1,
              level: 15,
              level2: 1,
              en: "",
              vn: "",
              words1: [],
              words2: [],
              check: !0,
              lent: 0,
              check1: !0
            };
          },
          mounted: function() {
            this.getdata();
          },
          methods: {
            getdata: function() {
              this.$http
                .get("http://127.0.0.1:8100/preview", {
                  headers: { Authorization: "vudz" },
                  params: {
                    table: this.$route.params.nameTopic,
                    level: this.level2
                  }
                })
                .then(function(t) {
                  var e = [];
                  for (var n in ((this.words1 = []),
                  (this.words2 = []),
                  (e = t.body.data),
                  (this.lent = e.length),
                  e))
                    e[n].edit = !1;
                  if ((console.log(parseInt(e.length / 2)), e.length > 1)) {
                    for (var i = 0; i < e.length / 2; i++)
                      this.words1.push(e[i]);
                    for (
                      var s =
                        e.length % 2
                          ? parseInt(e.length / 2) + 1
                          : parseInt(e.length / 2);
                      s < e.length;
                      s++
                    )
                      this.words2.push(e[s]);
                  } else this.words1 = e;
                });
            },
            pronounce: function(t) {
              var e = new SpeechSynthesisUtterance();
              (e.voiceURI = "native"),
                (e.text = t),
                (e.lang = "en-US"),
                (e.onend = function(t) {
                  console.log("Finished in " + event.elapsedTime + " seconds.");
                }),
                speechSynthesis.speak(e),
                console.log(t);
            },
            confuse: function() {
              this.words1.sort(function() {
                return 0.5 - Math.random();
              }),
                this.words2.sort(function() {
                  return 0.5 - Math.random();
                });
            },
            addVoca: function() {
              var t = this,
                e = {
                  key: this.en,
                  value: this.vn,
                  level: this.level,
                  table: this.$route.params.nameTopic
                };
              this.$http.post("http://127.0.0.1:8100/preview", e).then(
                function(t) {
                  !0 === t.body.status
                    ? (this.$notify({
                        title: "Success",
                        message: t.body.message,
                        type: "success"
                      }),
                      this.getdata())
                    : this.$notify.error({
                        title: "Error",
                        message: t.body.message
                      });
                },
                function(e) {
                  t.notify("warning", e.body.message);
                }
              );
            },
            update: function(t) {
              var e = this,
                n = {
                  key: t.key,
                  value: t.value,
                  level: t.level,
                  table: this.$route.params.nameTopic,
                  _id: t._id.$oid
                };
              this.$http.put("http://127.0.0.1:8100/preview", n).then(
                function(t) {
                  !0 === t.body.status
                    ? this.$notify({
                        title: "Success",
                        message: t.body.message,
                        type: "success"
                      })
                    : this.$notify.error({
                        title: "Error",
                        message: t.body.message
                      });
                },
                function(t) {
                  e.$notify.error({ title: "Error", message: t.body.message });
                }
              );
            },
            delete: function(t) {
              var e = this,
                n = { table: this.$route.params.nameTopic, _id: t._id.$oid };
              this.$http
                .delete("http://127.0.0.1:8100/preview", { body: n })
                .then(
                  function(t) {
                    !0 === t.body.status &&
                      (this.$notify({
                        title: "Success",
                        message: t.body.message,
                        type: "success"
                      }),
                      this.getdata());
                  },
                  function(t) {
                    e.$notify.error({
                      title: "Error",
                      message: t.body.message
                    });
                  }
                );
            },
            handleDeleteUser: function(t) {
              (t.edit = !1), this.delete(t);
            },
            handleCancelEditUser: function(t) {
              t.edit = !1;
            },
            handleEditUser: function(t) {
              t.edit = !0;
            },
            handleUpdateUserRole: function(t) {
              this.update(t), (t.edit = !1);
            }
          }
        },
        s = {
          render: function() {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n(
              "div",
              [
                n(
                  "el-row",
                  [
                    n(
                      "div",
                      { staticClass: "app-container" },
                      [
                        n(
                          "el-row",
                          { attrs: { gutter: 20 } },
                          [
                            n(
                              "el-col",
                              { attrs: { xs: 24, sm: 24, md: 24 } },
                              [
                                n(
                                  "el-card",
                                  { attrs: { shadow: "never" } },
                                  [
                                    n(
                                      "div",
                                      {
                                        staticClass: "clearfix",
                                        staticStyle: { position: "relative" },
                                        attrs: { slot: "header" },
                                        slot: "header"
                                      },
                                      [
                                        n(
                                          "span",
                                          {
                                            staticStyle: {
                                              "font-weight": "bold",
                                              "font-size": "20px"
                                            }
                                          },
                                          [
                                            t._v(
                                              "Topic " +
                                                t._s(
                                                  this.$route.params.nameTopic
                                                ) +
                                                " " +
                                                t._s(this.lent)
                                            )
                                          ]
                                        ),
                                        t._v(" "),
                                        n(
                                          "el-button",
                                          {
                                            staticStyle: {
                                              "padding-left": "10px"
                                            },
                                            attrs: {
                                              size: "mini",
                                              type: "primary"
                                            },
                                            on: {
                                              click: function(e) {
                                                t.dialogFormVisible = !0;
                                              }
                                            }
                                          },
                                          [
                                            n("i", {
                                              staticClass: "fas fa-plus-circle"
                                            }),
                                            t._v(" Thêm mới")
                                          ]
                                        ),
                                        t._v(" "),
                                        n(
                                          "el-button",
                                          {
                                            attrs: {
                                              type: "primary",
                                              plain: ""
                                            },
                                            on: {
                                              click: function(e) {
                                                return t.getdata();
                                              }
                                            }
                                          },
                                          [t._v("Show level")]
                                        ),
                                        t._v(" "),
                                        n("el-input-number", {
                                          staticStyle: { width: "90px" },
                                          attrs: {
                                            size: "mini",
                                            "controls-position": "right",
                                            min: 1,
                                            max: 15
                                          },
                                          model: {
                                            value: t.level2,
                                            callback: function(e) {
                                              t.level2 = e;
                                            },
                                            expression: "level2"
                                          }
                                        }),
                                        t._v(" "),
                                        n(
                                          "div",
                                          { staticStyle: { float: "right" } },
                                          [
                                            n(
                                              "el-button",
                                              {
                                                attrs: { type: "primary" },
                                                on: {
                                                  click: function(e) {
                                                    return t.confuse();
                                                  }
                                                }
                                              },
                                              [t._v("Confuse")]
                                            ),
                                            t._v(" "),
                                            n(
                                              "el-button",
                                              {
                                                attrs: {
                                                  type: "success",
                                                  plain: ""
                                                },
                                                on: {
                                                  click: function(e) {
                                                    t.check = !t.check;
                                                  }
                                                }
                                              },
                                              [t._v("Hide en")]
                                            ),
                                            t._v(" "),
                                            n(
                                              "el-button",
                                              {
                                                attrs: {
                                                  type: "warning",
                                                  plain: ""
                                                },
                                                on: {
                                                  click: function(e) {
                                                    t.check1 = !t.check1;
                                                  }
                                                }
                                              },
                                              [t._v("Hide vn")]
                                            )
                                          ],
                                          1
                                        )
                                      ],
                                      1
                                    ),
                                    t._v(" "),
                                    n(
                                      "el-row",
                                      {
                                        staticStyle: {
                                          "margin-left": "0!important",
                                          "margin-right": "0!important"
                                        },
                                        attrs: { gutter: 20 }
                                      },
                                      [
                                        n(
                                          "el-col",
                                          { attrs: { xs: 24, sm: 24, lg: 12 } },
                                          [
                                            n(
                                              "el-table",
                                              {
                                                staticStyle: { width: "100%" },
                                                attrs: {
                                                  data: t.words1,
                                                  stripe: ""
                                                }
                                              },
                                              [
                                                n("el-table-column", {
                                                  attrs: {
                                                    label: "EN",
                                                    width: "150"
                                                  },
                                                  scopedSlots: t._u([
                                                    {
                                                      key: "default",
                                                      fn: function(e) {
                                                        return [
                                                          !1 === e.row.edit
                                                            ? n("div", [
                                                                t.check
                                                                  ? n("div", [
                                                                      t._v(
                                                                        " " +
                                                                          t._s(
                                                                            e
                                                                              .row
                                                                              .key
                                                                          ) +
                                                                          " "
                                                                      ),
                                                                      n("i", {
                                                                        staticClass:
                                                                          "el-icon-video-play",
                                                                        on: {
                                                                          click: function(
                                                                            n
                                                                          ) {
                                                                            return t.pronounce(
                                                                              e
                                                                                .row
                                                                                .key
                                                                            );
                                                                          }
                                                                        }
                                                                      })
                                                                    ])
                                                                  : t._e()
                                                              ])
                                                            : n(
                                                                "div",
                                                                [
                                                                  n(
                                                                    "el-input",
                                                                    {
                                                                      attrs: {
                                                                        placeholder:
                                                                          "Please input"
                                                                      },
                                                                      model: {
                                                                        value:
                                                                          e.row
                                                                            .key,
                                                                        callback: function(
                                                                          n
                                                                        ) {
                                                                          t.$set(
                                                                            e.row,
                                                                            "key",
                                                                            n
                                                                          );
                                                                        },
                                                                        expression:
                                                                          "scope.row.key"
                                                                      }
                                                                    }
                                                                  )
                                                                ],
                                                                1
                                                              )
                                                        ];
                                                      }
                                                    }
                                                  ])
                                                }),
                                                t._v(" "),
                                                n("el-table-column", {
                                                  attrs: {
                                                    label: "VN",
                                                    width: "200"
                                                  },
                                                  scopedSlots: t._u([
                                                    {
                                                      key: "default",
                                                      fn: function(e) {
                                                        return [
                                                          !1 === e.row.edit
                                                            ? n("div", [
                                                                t.check1
                                                                  ? n("div", [
                                                                      t._v(
                                                                        t._s(
                                                                          e.row
                                                                            .value
                                                                        )
                                                                      )
                                                                    ])
                                                                  : t._e()
                                                              ])
                                                            : n(
                                                                "div",
                                                                [
                                                                  n(
                                                                    "el-input",
                                                                    {
                                                                      attrs: {
                                                                        placeholder:
                                                                          "Please input"
                                                                      },
                                                                      model: {
                                                                        value:
                                                                          e.row
                                                                            .value,
                                                                        callback: function(
                                                                          n
                                                                        ) {
                                                                          t.$set(
                                                                            e.row,
                                                                            "value",
                                                                            n
                                                                          );
                                                                        },
                                                                        expression:
                                                                          "scope.row.value"
                                                                      }
                                                                    }
                                                                  )
                                                                ],
                                                                1
                                                              )
                                                        ];
                                                      }
                                                    }
                                                  ])
                                                }),
                                                t._v(" "),
                                                n("el-table-column", {
                                                  attrs: {
                                                    prop: "level",
                                                    label: "LE",
                                                    width: "100"
                                                  },
                                                  scopedSlots: t._u([
                                                    {
                                                      key: "default",
                                                      fn: function(e) {
                                                        return [
                                                          !1 === e.row.edit
                                                            ? n("div", [
                                                                t._v(
                                                                  "\n                          " +
                                                                    t._s(
                                                                      e.row
                                                                        .level
                                                                    ) +
                                                                    "\n                        "
                                                                )
                                                              ])
                                                            : n(
                                                                "div",
                                                                [
                                                                  n(
                                                                    "el-input-number",
                                                                    {
                                                                      staticStyle: {
                                                                        width:
                                                                          "80px"
                                                                      },
                                                                      attrs: {
                                                                        size:
                                                                          "mini",
                                                                        "controls-position":
                                                                          "right",
                                                                        min: 1,
                                                                        max: 15
                                                                      },
                                                                      model: {
                                                                        value:
                                                                          e.row
                                                                            .level,
                                                                        callback: function(
                                                                          n
                                                                        ) {
                                                                          t.$set(
                                                                            e.row,
                                                                            "level",
                                                                            n
                                                                          );
                                                                        },
                                                                        expression:
                                                                          "scope.row.level"
                                                                      }
                                                                    }
                                                                  )
                                                                ],
                                                                1
                                                              )
                                                        ];
                                                      }
                                                    }
                                                  ])
                                                }),
                                                t._v(" "),
                                                n("el-table-column", {
                                                  attrs: {
                                                    label: "Manager",
                                                    width: "130"
                                                  },
                                                  scopedSlots: t._u([
                                                    {
                                                      key: "default",
                                                      fn: function(e) {
                                                        return [
                                                          !0 === e.row.edit
                                                            ? n(
                                                                "el-button",
                                                                {
                                                                  attrs: {
                                                                    type:
                                                                      "text",
                                                                    plain: "",
                                                                    size: "mini"
                                                                  },
                                                                  on: {
                                                                    click: function(
                                                                      n
                                                                    ) {
                                                                      return t.handleUpdateUserRole(
                                                                        e.row
                                                                      );
                                                                    }
                                                                  }
                                                                },
                                                                [
                                                                  t._v(
                                                                    "\n                          Lưu\n                        "
                                                                  )
                                                                ]
                                                              )
                                                            : t._e(),
                                                          t._v(" "),
                                                          !0 === e.row.edit
                                                            ? n(
                                                                "el-button",
                                                                {
                                                                  attrs: {
                                                                    type:
                                                                      "text",
                                                                    plain: "",
                                                                    size: "mini"
                                                                  },
                                                                  on: {
                                                                    click: function(
                                                                      n
                                                                    ) {
                                                                      return t.handleCancelEditUser(
                                                                        e.row
                                                                      );
                                                                    }
                                                                  }
                                                                },
                                                                [
                                                                  t._v(
                                                                    "\n                          Hủy\n                        "
                                                                  )
                                                                ]
                                                              )
                                                            : t._e(),
                                                          t._v(" "),
                                                          n(
                                                            "el-tooltip",
                                                            {
                                                              staticClass:
                                                                "item",
                                                              attrs: {
                                                                effect: "dark",
                                                                content:
                                                                  "Sửa đổi",
                                                                placement:
                                                                  "top-start",
                                                                enterable: !1
                                                              }
                                                            },
                                                            [
                                                              !1 === e.row.edit
                                                                ? n(
                                                                    "el-button",
                                                                    {
                                                                      attrs: {
                                                                        icon:
                                                                          "el-icon-edit",
                                                                        type:
                                                                          "text",
                                                                        plain:
                                                                          "",
                                                                        size:
                                                                          "mini"
                                                                      },
                                                                      on: {
                                                                        click: function(
                                                                          n
                                                                        ) {
                                                                          return t.handleEditUser(
                                                                            e.row
                                                                          );
                                                                        }
                                                                      }
                                                                    }
                                                                  )
                                                                : t._e()
                                                            ],
                                                            1
                                                          ),
                                                          t._v(" "),
                                                          !1 === e.row.edit
                                                            ? n(
                                                                "el-tooltip",
                                                                {
                                                                  staticClass:
                                                                    "item",
                                                                  attrs: {
                                                                    effect:
                                                                      "dark",
                                                                    content:
                                                                      "Xoá khỏi hệ thống",
                                                                    placement:
                                                                      "top-start",
                                                                    enterable: !1
                                                                  }
                                                                },
                                                                [
                                                                  n(
                                                                    "el-button",
                                                                    {
                                                                      attrs: {
                                                                        type:
                                                                          "text",
                                                                        plain:
                                                                          "",
                                                                        size:
                                                                          "mini"
                                                                      },
                                                                      on: {
                                                                        click: function(
                                                                          n
                                                                        ) {
                                                                          return t.handleDeleteUser(
                                                                            e.row
                                                                          );
                                                                        }
                                                                      }
                                                                    },
                                                                    [
                                                                      n("i", {
                                                                        staticClass:
                                                                          "el-icon-delete"
                                                                      })
                                                                    ]
                                                                  )
                                                                ],
                                                                1
                                                              )
                                                            : t._e()
                                                        ];
                                                      }
                                                    }
                                                  ])
                                                })
                                              ],
                                              1
                                            )
                                          ],
                                          1
                                        ),
                                        t._v(" "),
                                        n(
                                          "el-col",
                                          { attrs: { xs: 24, sm: 24, lg: 12 } },
                                          [
                                            n(
                                              "el-table",
                                              {
                                                staticStyle: { width: "100%" },
                                                attrs: {
                                                  data: t.words2,
                                                  stripe: ""
                                                }
                                              },
                                              [
                                                n("el-table-column", {
                                                  attrs: {
                                                    prop: "key",
                                                    label: "EN",
                                                    width: "150"
                                                  },
                                                  scopedSlots: t._u([
                                                    {
                                                      key: "default",
                                                      fn: function(e) {
                                                        return [
                                                          !1 === e.row.edit
                                                            ? n("div", [
                                                                t.check
                                                                  ? n("div", [
                                                                      t._v(
                                                                        " " +
                                                                          t._s(
                                                                            e
                                                                              .row
                                                                              .key
                                                                          ) +
                                                                          " "
                                                                      ),
                                                                      n("i", {
                                                                        staticClass:
                                                                          "el-icon-video-play",
                                                                        on: {
                                                                          click: function(
                                                                            n
                                                                          ) {
                                                                            return t.pronounce(
                                                                              e
                                                                                .row
                                                                                .key
                                                                            );
                                                                          }
                                                                        }
                                                                      })
                                                                    ])
                                                                  : t._e()
                                                              ])
                                                            : n(
                                                                "div",
                                                                [
                                                                  n(
                                                                    "el-input",
                                                                    {
                                                                      attrs: {
                                                                        placeholder:
                                                                          "Please input"
                                                                      },
                                                                      model: {
                                                                        value:
                                                                          e.row
                                                                            .key,
                                                                        callback: function(
                                                                          n
                                                                        ) {
                                                                          t.$set(
                                                                            e.row,
                                                                            "key",
                                                                            n
                                                                          );
                                                                        },
                                                                        expression:
                                                                          "scope.row.key"
                                                                      }
                                                                    }
                                                                  )
                                                                ],
                                                                1
                                                              )
                                                        ];
                                                      }
                                                    }
                                                  ])
                                                }),
                                                t._v(" "),
                                                n("el-table-column", {
                                                  attrs: {
                                                    prop: "value",
                                                    label: "VN",
                                                    width: "200"
                                                  },
                                                  scopedSlots: t._u([
                                                    {
                                                      key: "default",
                                                      fn: function(e) {
                                                        return [
                                                          !1 === e.row.edit
                                                            ? n("div", [
                                                                t.check1
                                                                  ? n("div", [
                                                                      t._v(
                                                                        t._s(
                                                                          e.row
                                                                            .value
                                                                        )
                                                                      )
                                                                    ])
                                                                  : t._e()
                                                              ])
                                                            : n(
                                                                "div",
                                                                [
                                                                  n(
                                                                    "el-input",
                                                                    {
                                                                      attrs: {
                                                                        placeholder:
                                                                          "Please input"
                                                                      },
                                                                      model: {
                                                                        value:
                                                                          e.row
                                                                            .value,
                                                                        callback: function(
                                                                          n
                                                                        ) {
                                                                          t.$set(
                                                                            e.row,
                                                                            "value",
                                                                            n
                                                                          );
                                                                        },
                                                                        expression:
                                                                          "scope.row.value"
                                                                      }
                                                                    }
                                                                  )
                                                                ],
                                                                1
                                                              )
                                                        ];
                                                      }
                                                    }
                                                  ])
                                                }),
                                                t._v(" "),
                                                n("el-table-column", {
                                                  attrs: {
                                                    prop: "level",
                                                    label: "LE",
                                                    width: "100"
                                                  },
                                                  scopedSlots: t._u([
                                                    {
                                                      key: "default",
                                                      fn: function(e) {
                                                        return [
                                                          !1 === e.row.edit
                                                            ? n("div", [
                                                                t._v(
                                                                  "\n                          " +
                                                                    t._s(
                                                                      e.row
                                                                        .level
                                                                    ) +
                                                                    "\n                        "
                                                                )
                                                              ])
                                                            : n(
                                                                "div",
                                                                [
                                                                  n(
                                                                    "el-input-number",
                                                                    {
                                                                      staticStyle: {
                                                                        width:
                                                                          "80px"
                                                                      },
                                                                      attrs: {
                                                                        size:
                                                                          "mini",
                                                                        "controls-position":
                                                                          "right",
                                                                        min: 1,
                                                                        max: 15
                                                                      },
                                                                      model: {
                                                                        value:
                                                                          e.row
                                                                            .level,
                                                                        callback: function(
                                                                          n
                                                                        ) {
                                                                          t.$set(
                                                                            e.row,
                                                                            "level",
                                                                            n
                                                                          );
                                                                        },
                                                                        expression:
                                                                          "scope.row.level"
                                                                      }
                                                                    }
                                                                  )
                                                                ],
                                                                1
                                                              )
                                                        ];
                                                      }
                                                    }
                                                  ])
                                                }),
                                                t._v(" "),
                                                n("el-table-column", {
                                                  attrs: {
                                                    label: "Manager",
                                                    width: "130"
                                                  },
                                                  scopedSlots: t._u([
                                                    {
                                                      key: "default",
                                                      fn: function(e) {
                                                        return [
                                                          !0 === e.row.edit
                                                            ? n(
                                                                "el-button",
                                                                {
                                                                  attrs: {
                                                                    type:
                                                                      "text",
                                                                    plain: "",
                                                                    size: "mini"
                                                                  },
                                                                  on: {
                                                                    click: function(
                                                                      n
                                                                    ) {
                                                                      return t.handleUpdateUserRole(
                                                                        e.row
                                                                      );
                                                                    }
                                                                  }
                                                                },
                                                                [
                                                                  t._v(
                                                                    "\n                          Lưu\n                        "
                                                                  )
                                                                ]
                                                              )
                                                            : t._e(),
                                                          t._v(" "),
                                                          !0 === e.row.edit
                                                            ? n(
                                                                "el-button",
                                                                {
                                                                  attrs: {
                                                                    type:
                                                                      "text",
                                                                    plain: "",
                                                                    size: "mini"
                                                                  },
                                                                  on: {
                                                                    click: function(
                                                                      n
                                                                    ) {
                                                                      return t.handleCancelEditUser(
                                                                        e.row
                                                                      );
                                                                    }
                                                                  }
                                                                },
                                                                [
                                                                  t._v(
                                                                    "\n                          Hủy\n                        "
                                                                  )
                                                                ]
                                                              )
                                                            : t._e(),
                                                          t._v(" "),
                                                          n(
                                                            "el-tooltip",
                                                            {
                                                              staticClass:
                                                                "item",
                                                              attrs: {
                                                                effect: "dark",
                                                                content:
                                                                  "Sửa đổi",
                                                                placement:
                                                                  "top-start",
                                                                enterable: !1
                                                              }
                                                            },
                                                            [
                                                              !1 === e.row.edit
                                                                ? n(
                                                                    "el-button",
                                                                    {
                                                                      attrs: {
                                                                        icon:
                                                                          "el-icon-edit",
                                                                        type:
                                                                          "text",
                                                                        plain:
                                                                          "",
                                                                        size:
                                                                          "mini"
                                                                      },
                                                                      on: {
                                                                        click: function(
                                                                          n
                                                                        ) {
                                                                          return t.handleEditUser(
                                                                            e.row
                                                                          );
                                                                        }
                                                                      }
                                                                    }
                                                                  )
                                                                : t._e()
                                                            ],
                                                            1
                                                          ),
                                                          t._v(" "),
                                                          !1 === e.row.edit
                                                            ? n(
                                                                "el-tooltip",
                                                                {
                                                                  staticClass:
                                                                    "item",
                                                                  attrs: {
                                                                    effect:
                                                                      "dark",
                                                                    content:
                                                                      "Xoá khỏi hệ thống",
                                                                    placement:
                                                                      "top-start",
                                                                    enterable: !1
                                                                  }
                                                                },
                                                                [
                                                                  n(
                                                                    "el-button",
                                                                    {
                                                                      attrs: {
                                                                        type:
                                                                          "text",
                                                                        plain:
                                                                          "",
                                                                        size:
                                                                          "mini"
                                                                      },
                                                                      on: {
                                                                        click: function(
                                                                          n
                                                                        ) {
                                                                          return t.handleDeleteUser(
                                                                            e.row
                                                                          );
                                                                        }
                                                                      }
                                                                    },
                                                                    [
                                                                      n("i", {
                                                                        staticClass:
                                                                          "el-icon-delete"
                                                                      })
                                                                    ]
                                                                  )
                                                                ],
                                                                1
                                                              )
                                                            : t._e()
                                                        ];
                                                      }
                                                    }
                                                  ])
                                                })
                                              ],
                                              1
                                            )
                                          ],
                                          1
                                        )
                                      ],
                                      1
                                    )
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    t._v(" "),
                    n(
                      "el-dialog",
                      {
                        attrs: {
                          title: "Add vocabulary",
                          visible: t.dialogFormVisible
                        },
                        on: {
                          "update:visible": function(e) {
                            t.dialogFormVisible = e;
                          }
                        }
                      },
                      [
                        n(
                          "el-form",
                          [
                            n(
                              "el-form-item",
                              { attrs: { label: "EN" } },
                              [
                                n("el-input", {
                                  attrs: { clearable: "" },
                                  model: {
                                    value: t.en,
                                    callback: function(e) {
                                      t.en = e;
                                    },
                                    expression: "en"
                                  }
                                })
                              ],
                              1
                            ),
                            t._v(" "),
                            n(
                              "el-form-item",
                              { attrs: { label: "VN" } },
                              [
                                n("el-input", {
                                  attrs: { clearable: "" },
                                  nativeOn: {
                                    keyup: function(e) {
                                      return !e.type.indexOf("key") &&
                                        t._k(
                                          e.keyCode,
                                          "enter",
                                          13,
                                          e.key,
                                          "Enter"
                                        )
                                        ? null
                                        : t.addVoca.apply(null, arguments);
                                    }
                                  },
                                  model: {
                                    value: t.vn,
                                    callback: function(e) {
                                      t.vn = e;
                                    },
                                    expression: "vn"
                                  }
                                })
                              ],
                              1
                            ),
                            t._v(" "),
                            n(
                              "el-form-item",
                              { attrs: { label: "Level" } },
                              [
                                n("el-rate", {
                                  attrs: {
                                    max: 15,
                                    colors: ["#99A9BF", "#F7BA2A", "#FF9900"]
                                  },
                                  model: {
                                    value: t.level,
                                    callback: function(e) {
                                      t.level = e;
                                    },
                                    expression: "level"
                                  }
                                }),
                                t._v(" "),
                                n("span", [t._v(t._s(t.level))])
                              ],
                              1
                            )
                          ],
                          1
                        ),
                        t._v(" "),
                        n(
                          "span",
                          {
                            staticClass: "dialog-footer",
                            attrs: { slot: "footer" },
                            slot: "footer"
                          },
                          [
                            n(
                              "el-button",
                              {
                                on: {
                                  click: function(e) {
                                    t.dialogFormVisible = !1;
                                  }
                                }
                              },
                              [t._v("Cancel")]
                            ),
                            t._v(" "),
                            n(
                              "el-button",
                              {
                                attrs: { type: "primary" },
                                on: {
                                  click: function(e) {
                                    return t.addVoca();
                                  }
                                }
                              },
                              [t._v("Confirm")]
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            );
          },
          staticRenderFns: []
        };
      var a = n("VU/8")(
        i,
        s,
        !1,
        function(t) {
          n("dthE");
        },
        "data-v-004b5bc4",
        null
      );
      e.default = a.exports;
    },
    rbS3: function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = {
          name: "loading",
          components: { Loader: n("TvbN").default },
          data: function() {
            return {};
          },
          methods: {},
          mounted: function() {
            console.log(this.$refs.pac);
          }
        },
        s = {
          render: function() {
            var t = this.$createElement;
            return (this._self._c || t)("loader");
          },
          staticRenderFns: []
        };
      var a = n("VU/8")(
        i,
        s,
        !1,
        function(t) {
          n("kk+z"), n("nga4");
        },
        "data-v-1ec3d122",
        null
      );
      e.default = a.exports;
    },
    ssfn: function(t, e, n) {
      t.exports = n.p + "static/img/icona.1f54bbf.jpg";
    },
    tK7a: function(t, e, n) {
      t.exports = n.p + "static/img/nmv.501ba9d.jpg";
    },
    tlvQ: function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = n("Dd8w"),
        s = n.n(i),
        a = n("NYxO"),
        o = {
          name: "SidebarItem",
          components: { VueSingleSelect: n("6EBc").a },
          data: function() {
            return {
              numberOffice: "",
              numberService: "",
              temp: [],
              tempOffice: [],
              tempService: [],
              accounts: "",
              searchkey: "",
              searchkeys: "",
              filters: "",
              filterss: "",
              hotlines: "",
              k: 1,
              pag: 1,
              searht: "",
              searchbill: ""
            };
          },
          watch: {
            pag: function() {
              this.gethotlines(this.pag);
            },
            filters: function() {
              this.pag = 1;
            },
            searchkeys: function() {
              "" === this.searchkeys && this.gethotlines(this.pag);
            },
            "$store.state.hide.update": function() {
              this.$session.get("otp") && this.getall();
            },
            searchbill: function() {
              this.getall(this.searchbill);
            },
            searchkey: function() {
              this.getall(this.searchkey);
            }
          },
          mounted: function() {},
          computed: s()({}, Object(a.b)(["sidebar"])),
          methods: {
            getall: function(t) {},
            gethotlines: function(t) {},
            check_search: function(t, e) {
              return e.includes(t);
            },
            a: function() {
              alert("aaaa");
            },
            filtered: function() {},
            filteredht: function(t) {},
            formatPhone: function(t) {
              var e = t.replace(/\D/g, ""),
                n = { 4: ".", 7: "." };
              t = "";
              for (var i = 0; i < e.length; i++) t += (n[i] || "") + e[i];
              return t;
            },
            hasOneShowingChildren: function(t) {
              return (
                1 ===
                t.filter(function(t) {
                  return !t.hidden;
                }).length
              );
            },
            handleClickToggle: function() {
              this.sidebar.opened || this.$store.dispatch("toggleSideBar");
            },
            search: function(t, e) {
              return e.includes(t);
            },
            teee: function(t) {
              this.$router.push("/hotline/" + t);
            },
            click: function(t) {
              this.$router.push("/billing/" + t);
            },
            PushAccount: function(t) {
              alert(t);
            },
            phonerouter: function(t) {
              this.$router.push("/hotline_account/" + t);
            }
          }
        },
        r = {
          render: function() {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n("div", [
              n(
                "div",
                { staticClass: "menu-wrapper" },
                [
                  [
                    n(
                      "router-link",
                      { attrs: { to: "/dashboard" } },
                      [
                        n("el-menu-item", { attrs: { index: "aq222" } }, [
                          n("i", { staticClass: "fas fa-chart-bar fa-fw" }),
                          t._v(" "),
                          n(
                            "span",
                            { attrs: { slot: "title" }, slot: "title" },
                            [t._v("Dashboard")]
                          )
                        ])
                      ],
                      1
                    ),
                    t._v(" "),
                    n(
                      "router-link",
                      { attrs: { to: "/topic" } },
                      [
                        n("el-menu-item", { attrs: { index: "Study" } }, [
                          n("i", { staticClass: "fas fa-address-card" }),
                          t._v(" "),
                          n(
                            "span",
                            { attrs: { slot: "title" }, slot: "title" },
                            [t._v("Study by topic")]
                          )
                        ])
                      ],
                      1
                    ),
                    t._v(" "),
                    n(
                      "router-link",
                      { attrs: { to: "/topics" } },
                      [
                        n("el-menu-item", { attrs: { index: "topics" } }, [
                          n("i", { staticClass: "fa fa-book" }),
                          t._v(" "),
                          n(
                            "span",
                            { attrs: { slot: "title" }, slot: "title" },
                            [t._v("Topics")]
                          )
                        ])
                      ],
                      1
                    ),
                    t._v(" "),
                    n(
                      "router-link",
                      { attrs: { to: "/difficult" } },
                      [
                        n("el-menu-item", { attrs: { index: "difficult" } }, [
                          n("i", { staticClass: "fa fa-adjust" }),
                          t._v(" "),
                          n(
                            "span",
                            { attrs: { slot: "title" }, slot: "title" },
                            [t._v("Top difficult")]
                          )
                        ])
                      ],
                      1
                    ),
                    t._v(" "),
                    n(
                      "router-link",
                      { attrs: { to: "/confuse" } },
                      [
                        n("el-menu-item", { attrs: { index: "confuse" } }, [
                          n("i", { staticClass: "fas fa-mortar-pestle" }),
                          t._v(" "),
                          n(
                            "span",
                            { attrs: { slot: "title" }, slot: "title" },
                            [t._v("Study by confuse")]
                          )
                        ])
                      ],
                      1
                    ),
                    t._v(" "),
                    n(
                      "router-link",
                      { attrs: { to: "/chose" } },
                      [
                        n("el-menu-item", { attrs: { index: "listen" } }, [
                          n("i", {
                            staticClass: "fas fa-assistive-listening-systems"
                          }),
                          t._v(" "),
                          n(
                            "span",
                            { attrs: { slot: "title" }, slot: "title" },
                            [t._v("Listen")]
                          )
                        ])
                      ],
                      1
                    ),
                    t._v(" "),
                    n(
                      "router-link",
                      { attrs: { to: "/showAll" } },
                      [
                        n("el-menu-item", { attrs: { index: "listens" } }, [
                          n("i", {
                            staticClass: "fas fa-assistive-listening-systems"
                          }),
                          t._v(" "),
                          n(
                            "span",
                            { attrs: { slot: "title" }, slot: "title" },
                            [t._v("Show All")]
                          )
                        ])
                      ],
                      1
                    ),
                    t._v(" "),
                    n(
                      "router-link",
                      { attrs: { to: "/history" } },
                      [
                        n("el-menu-item", { attrs: { index: "history" } }, [
                          n("i", { staticClass: "fas fa-history" }),
                          t._v(" "),
                          n(
                            "span",
                            { attrs: { slot: "title" }, slot: "title" },
                            [t._v("Study")]
                          )
                        ])
                      ],
                      1
                    ),
                    t._v(" "),
                    n(
                      "router-link",
                      { attrs: { to: "/memo" } },
                      [
                        n("el-menu-item", { attrs: { index: "history" } }, [
                          n("i", { staticClass: "fas fa-database" }),
                          t._v(" "),
                          n(
                            "span",
                            { attrs: { slot: "title" }, slot: "title" },
                            [t._v("Memo")]
                          )
                        ])
                      ],
                      1
                    )
                  ]
                ],
                2
              )
            ]);
          },
          staticRenderFns: []
        };
      var l = n("VU/8")(
        o,
        r,
        !1,
        function(t) {
          n("3YWQ");
        },
        null,
        null
      );
      e.default = l.exports;
    },
    tvR6: function(t, e) {},
    txjo: function(t, e) {},
    uMhA: function(t, e) {},
    uslO: function(t, e, n) {
      var i = {
        "./af": "3CJN",
        "./af.js": "3CJN",
        "./ar": "3MVc",
        "./ar-dz": "tkWw",
        "./ar-dz.js": "tkWw",
        "./ar-kw": "j8cJ",
        "./ar-kw.js": "j8cJ",
        "./ar-ly": "wPpW",
        "./ar-ly.js": "wPpW",
        "./ar-ma": "dURR",
        "./ar-ma.js": "dURR",
        "./ar-sa": "7OnE",
        "./ar-sa.js": "7OnE",
        "./ar-tn": "BEem",
        "./ar-tn.js": "BEem",
        "./ar.js": "3MVc",
        "./az": "eHwN",
        "./az.js": "eHwN",
        "./be": "3hfc",
        "./be.js": "3hfc",
        "./bg": "lOED",
        "./bg.js": "lOED",
        "./bm": "hng5",
        "./bm.js": "hng5",
        "./bn": "aM0x",
        "./bn-bd": "1C9R",
        "./bn-bd.js": "1C9R",
        "./bn.js": "aM0x",
        "./bo": "w2Hs",
        "./bo.js": "w2Hs",
        "./br": "OSsP",
        "./br.js": "OSsP",
        "./bs": "aqvp",
        "./bs.js": "aqvp",
        "./ca": "wIgY",
        "./ca.js": "wIgY",
        "./cs": "ssxj",
        "./cs.js": "ssxj",
        "./cv": "N3vo",
        "./cv.js": "N3vo",
        "./cy": "ZFGz",
        "./cy.js": "ZFGz",
        "./da": "YBA/",
        "./da.js": "YBA/",
        "./de": "DOkx",
        "./de-at": "8v14",
        "./de-at.js": "8v14",
        "./de-ch": "Frex",
        "./de-ch.js": "Frex",
        "./de.js": "DOkx",
        "./dv": "rIuo",
        "./dv.js": "rIuo",
        "./el": "CFqe",
        "./el.js": "CFqe",
        "./en-au": "Sjoy",
        "./en-au.js": "Sjoy",
        "./en-ca": "Tqun",
        "./en-ca.js": "Tqun",
        "./en-gb": "hPuz",
        "./en-gb.js": "hPuz",
        "./en-ie": "ALEw",
        "./en-ie.js": "ALEw",
        "./en-il": "QZk1",
        "./en-il.js": "QZk1",
        "./en-in": "yJfC",
        "./en-in.js": "yJfC",
        "./en-nz": "dyB6",
        "./en-nz.js": "dyB6",
        "./en-sg": "NYST",
        "./en-sg.js": "NYST",
        "./eo": "Nd3h",
        "./eo.js": "Nd3h",
        "./es": "LT9G",
        "./es-do": "7MHZ",
        "./es-do.js": "7MHZ",
        "./es-mx": "USNP",
        "./es-mx.js": "USNP",
        "./es-us": "INcR",
        "./es-us.js": "INcR",
        "./es.js": "LT9G",
        "./et": "XlWM",
        "./et.js": "XlWM",
        "./eu": "sqLM",
        "./eu.js": "sqLM",
        "./fa": "2pmY",
        "./fa.js": "2pmY",
        "./fi": "nS2h",
        "./fi.js": "nS2h",
        "./fil": "rMbQ",
        "./fil.js": "rMbQ",
        "./fo": "OVPi",
        "./fo.js": "OVPi",
        "./fr": "tzHd",
        "./fr-ca": "bXQP",
        "./fr-ca.js": "bXQP",
        "./fr-ch": "VK9h",
        "./fr-ch.js": "VK9h",
        "./fr.js": "tzHd",
        "./fy": "g7KF",
        "./fy.js": "g7KF",
        "./ga": "U5Iz",
        "./ga.js": "U5Iz",
        "./gd": "nLOz",
        "./gd.js": "nLOz",
        "./gl": "FuaP",
        "./gl.js": "FuaP",
        "./gom-deva": "VGQH",
        "./gom-deva.js": "VGQH",
        "./gom-latn": "+27R",
        "./gom-latn.js": "+27R",
        "./gu": "rtsW",
        "./gu.js": "rtsW",
        "./he": "Nzt2",
        "./he.js": "Nzt2",
        "./hi": "ETHv",
        "./hi.js": "ETHv",
        "./hr": "V4qH",
        "./hr.js": "V4qH",
        "./hu": "xne+",
        "./hu.js": "xne+",
        "./hy-am": "GrS7",
        "./hy-am.js": "GrS7",
        "./id": "yRTJ",
        "./id.js": "yRTJ",
        "./is": "upln",
        "./is.js": "upln",
        "./it": "FKXc",
        "./it-ch": "/E8D",
        "./it-ch.js": "/E8D",
        "./it.js": "FKXc",
        "./ja": "ORgI",
        "./ja.js": "ORgI",
        "./jv": "JwiF",
        "./jv.js": "JwiF",
        "./ka": "RnJI",
        "./ka.js": "RnJI",
        "./kk": "j+vx",
        "./kk.js": "j+vx",
        "./km": "5j66",
        "./km.js": "5j66",
        "./kn": "gEQe",
        "./kn.js": "gEQe",
        "./ko": "eBB/",
        "./ko.js": "eBB/",
        "./ku": "kI9l",
        "./ku.js": "kI9l",
        "./ky": "6cf8",
        "./ky.js": "6cf8",
        "./lb": "z3hR",
        "./lb.js": "z3hR",
        "./lo": "nE8X",
        "./lo.js": "nE8X",
        "./lt": "/6P1",
        "./lt.js": "/6P1",
        "./lv": "jxEH",
        "./lv.js": "jxEH",
        "./me": "svD2",
        "./me.js": "svD2",
        "./mi": "gEU3",
        "./mi.js": "gEU3",
        "./mk": "Ab7C",
        "./mk.js": "Ab7C",
        "./ml": "oo1B",
        "./ml.js": "oo1B",
        "./mn": "CqHt",
        "./mn.js": "CqHt",
        "./mr": "5vPg",
        "./mr.js": "5vPg",
        "./ms": "ooba",
        "./ms-my": "G++c",
        "./ms-my.js": "G++c",
        "./ms.js": "ooba",
        "./mt": "oCzW",
        "./mt.js": "oCzW",
        "./my": "F+2e",
        "./my.js": "F+2e",
        "./nb": "FlzV",
        "./nb.js": "FlzV",
        "./ne": "/mhn",
        "./ne.js": "/mhn",
        "./nl": "3K28",
        "./nl-be": "Bp2f",
        "./nl-be.js": "Bp2f",
        "./nl.js": "3K28",
        "./nn": "C7av",
        "./nn.js": "C7av",
        "./oc-lnc": "KOFO",
        "./oc-lnc.js": "KOFO",
        "./pa-in": "pfs9",
        "./pa-in.js": "pfs9",
        "./pl": "7LV+",
        "./pl.js": "7LV+",
        "./pt": "ZoSI",
        "./pt-br": "AoDM",
        "./pt-br.js": "AoDM",
        "./pt.js": "ZoSI",
        "./ro": "wT5f",
        "./ro.js": "wT5f",
        "./ru": "ulq9",
        "./ru.js": "ulq9",
        "./sd": "fW1y",
        "./sd.js": "fW1y",
        "./se": "5Omq",
        "./se.js": "5Omq",
        "./si": "Lgqo",
        "./si.js": "Lgqo",
        "./sk": "OUMt",
        "./sk.js": "OUMt",
        "./sl": "2s1U",
        "./sl.js": "2s1U",
        "./sq": "V0td",
        "./sq.js": "V0td",
        "./sr": "f4W3",
        "./sr-cyrl": "c1x4",
        "./sr-cyrl.js": "c1x4",
        "./sr.js": "f4W3",
        "./ss": "7Q8x",
        "./ss.js": "7Q8x",
        "./sv": "Fpqq",
        "./sv.js": "Fpqq",
        "./sw": "DSXN",
        "./sw.js": "DSXN",
        "./ta": "+7/x",
        "./ta.js": "+7/x",
        "./te": "Nlnz",
        "./te.js": "Nlnz",
        "./tet": "gUgh",
        "./tet.js": "gUgh",
        "./tg": "5SNd",
        "./tg.js": "5SNd",
        "./th": "XzD+",
        "./th.js": "XzD+",
        "./tk": "+WRH",
        "./tk.js": "+WRH",
        "./tl-ph": "3LKG",
        "./tl-ph.js": "3LKG",
        "./tlh": "m7yE",
        "./tlh.js": "m7yE",
        "./tr": "k+5o",
        "./tr.js": "k+5o",
        "./tzl": "iNtv",
        "./tzl.js": "iNtv",
        "./tzm": "FRPF",
        "./tzm-latn": "krPU",
        "./tzm-latn.js": "krPU",
        "./tzm.js": "FRPF",
        "./ug-cn": "To0v",
        "./ug-cn.js": "To0v",
        "./uk": "ntHu",
        "./uk.js": "ntHu",
        "./ur": "uSe8",
        "./ur.js": "uSe8",
        "./uz": "XU1s",
        "./uz-latn": "/bsm",
        "./uz-latn.js": "/bsm",
        "./uz.js": "XU1s",
        "./vi": "0X8Q",
        "./vi.js": "0X8Q",
        "./x-pseudo": "e/KL",
        "./x-pseudo.js": "e/KL",
        "./yo": "YXlc",
        "./yo.js": "YXlc",
        "./zh-cn": "Vz2w",
        "./zh-cn.js": "Vz2w",
        "./zh-hk": "ZUyn",
        "./zh-hk.js": "ZUyn",
        "./zh-mo": "+WA1",
        "./zh-mo.js": "+WA1",
        "./zh-tw": "BbgG",
        "./zh-tw.js": "BbgG"
      };
      function s(t) {
        return n(a(t));
      }
      function a(t) {
        var e = i[t];
        if (!(e + 1)) throw new Error("Cannot find module '" + t + "'.");
        return e;
      }
      (s.keys = function() {
        return Object.keys(i);
      }),
        (s.resolve = a),
        (t.exports = s),
        (s.id = "uslO");
    },
    v4W0: function(t, e) {},
    vnIt: function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = n("5ybE"),
        s = {
          name: "confuse",
          data: function() {
            return {
              check_start: !1,
              totalTime: 900,
              resetButton: !1,
              title: "Countdown to rest time!",
              edit: !1,
              userTime: 26,
              percent: 0,
              count: 0,
              level_get: 9,
              words: [],
              item: "",
              radio: "",
              check: !0,
              answer: []
            };
          },
          mounted: function() {
            this.getdata();
          },
          methods: {
            getdata: function() {
              var t = this,
                e = { level: this.level_get };
              Object(i.d)(e).then(function(e) {
                console.log("==========================="),
                  console.log(e),
                  (t.words = e.data.data);
              });
            },
            checkAnser: function() {
              (this.check_start = !0),
                console.log(this.check_start),
                900 === this.totalTime && this.startTimer(),
                (this.answer = ["", "", "", ""]),
                (this.radio = ""),
                (this.ramdom = Math.floor(
                  Math.random() * this.words.length + 0
                )),
                (this.item = this.words[this.ramdom]),
                console.log(this.item);
              var t = Math.floor(4 * Math.random() + 0);
              for (var e in ((this.answer[t] = this.item.value), this.answer))
                if ("" === this.answer[e]) {
                  var n = Math.floor(Math.random() * this.words.length + 0);
                  if (this.answer.indexOf(this.words[n].value) < 0)
                    this.answer[e] = this.words[n].value;
                  else
                    for (var i = 0; i < this.words.length; i++)
                      this.answer.indexOf(this.words[i].value) < 0 &&
                        (this.answer[e] = this.words[i].value);
                }
            },
            exampale: function() {
              "" === this.radio
                ? ((this.count = this.count + 1),
                  (this.percent = parseInt(
                    (this.count / (this.words.length + 7)) * 100
                  )),
                  (this.item = this.words[this.ramdom]),
                  this.checkAnser())
                : ((this.percent = parseInt(
                    (this.count / (this.words.length + 7)) * 100
                  )),
                  (this.item = this.words[this.ramdom]),
                  this.radio === this.item.value
                    ? ((this.count = this.count + 1),
                      this.$message({
                        message: "Congrats, this is a success message.",
                        type: "success"
                      }),
                      this.checkAnser())
                    : this.$message({
                        message: "Congrats, this is a success message.",
                        type: "warning"
                      }));
              var t = new SpeechSynthesisUtterance(this.item.key);
              window.speechSynthesis.speak(t);
            },
            startTimer: function() {
              var t = this;
              (this.check_start = !0),
                (this.timer = setInterval(function() {
                  return t.countdown();
                }, 1e3)),
                (this.resetButton = !0),
                (this.edit = !1);
            },
            stopTimer: function() {
              clearInterval(this.timer),
                (this.timer = null),
                (this.resetButton = !0);
            },
            resetTimer: function() {
              (this.totalTime = 60 * this.userTime),
                clearInterval(this.timer),
                (this.timer = null),
                (this.resetButton = !1);
            },
            editTimer: function() {
              this.edit = !this.edit;
            },
            padTime: function(t) {
              return (t < 10 ? "0" : "") + t;
            },
            countdown: function() {
              this.totalTime--;
            },
            pronounce: function(t) {
              var e = new SpeechSynthesisUtterance();
              (e.voiceURI = "native"),
                (e.text = t),
                (e.lang = "en-US"),
                (e.onend = function(t) {
                  console.log("Finished in " + event.elapsedTime + " seconds.");
                }),
                speechSynthesis.speak(e),
                console.log(t);
            }
          },
          computed: {
            minutes: function() {
              var t = Math.floor(this.totalTime / 60);
              return this.padTime(t);
            },
            seconds: function() {
              var t = this.totalTime - 60 * this.minutes;
              return this.padTime(t);
            }
          }
        },
        a = {
          render: function() {
            var t = this,
              e = t.$createElement,
              i = t._self._c || e;
            return i(
              "div",
              [
                i("el-row", [
                  i(
                    "div",
                    { staticClass: "app-container" },
                    [
                      i(
                        "el-row",
                        { attrs: { gutter: 20 } },
                        [
                          i(
                            "el-col",
                            { attrs: { xs: 24, sm: 24, md: 24 } },
                            [
                              i("el-card", { attrs: { shadow: "never" } }, [
                                i(
                                  "div",
                                  {
                                    staticClass: "clearfix",
                                    staticStyle: { position: "relative" },
                                    attrs: { slot: "header" },
                                    slot: "header"
                                  },
                                  [
                                    i(
                                      "span",
                                      {
                                        staticStyle: {
                                          "font-weight": "bold",
                                          "font-size": "20px"
                                        }
                                      },
                                      [t._v("Study mix")]
                                    ),
                                    t._v(" "),
                                    i(
                                      "el-button",
                                      {
                                        attrs: { type: "primary" },
                                        on: {
                                          click: function(e) {
                                            return t.checkAnser();
                                          }
                                        }
                                      },
                                      [t._v("Start")]
                                    ),
                                    t._v(" "),
                                    i(
                                      "el-tag",
                                      { attrs: { type: "success" } },
                                      [
                                        t._v(
                                          t._s(t.minutes) +
                                            ":" +
                                            t._s(t.seconds)
                                        )
                                      ]
                                    ),
                                    t._v(" "),
                                    i(
                                      "div",
                                      { staticStyle: { float: "right" } },
                                      [
                                        t.edit
                                          ? i("input", {
                                              directives: [
                                                {
                                                  name: "model",
                                                  rawName: "v-model",
                                                  value: t.userTime,
                                                  expression: "userTime"
                                                }
                                              ],
                                              attrs: { type: "text" },
                                              domProps: { value: t.userTime },
                                              on: {
                                                input: function(e) {
                                                  e.target.composing ||
                                                    (t.userTime =
                                                      e.target.value);
                                                }
                                              }
                                            })
                                          : t._e(),
                                        t._v(" "),
                                        t.check_start
                                          ? i(
                                              "el-button",
                                              {
                                                attrs: {
                                                  type: "success",
                                                  plain: ""
                                                },
                                                on: {
                                                  click: function(e) {
                                                    t.check = !t.check;
                                                  }
                                                }
                                              },
                                              [t._v("Show answer")]
                                            )
                                          : t._e()
                                      ],
                                      1
                                    )
                                  ],
                                  1
                                ),
                                t._v(" "),
                                t.check_start
                                  ? i(
                                      "div",
                                      [
                                        i(
                                          "el-row",
                                          {
                                            staticStyle: {
                                              "padding-top": "0px"
                                            }
                                          },
                                          [
                                            i("el-progress", {
                                              attrs: {
                                                percentage: t.percent,
                                                status: "success"
                                              }
                                            })
                                          ],
                                          1
                                        ),
                                        t._v(" "),
                                        i(
                                          "el-row",
                                          {
                                            staticStyle: {
                                              "margin-left": "0!important",
                                              "margin-right": "0!important"
                                            },
                                            attrs: { gutter: 20 }
                                          },
                                          [
                                            i(
                                              "el-col",
                                              { attrs: { span: 8 } },
                                              [
                                                i(
                                                  "center",
                                                  [
                                                    i("h2", [
                                                      t._v(t._s(t.item.key))
                                                    ]),
                                                    t._v(" "),
                                                    i("p", [
                                                      t._v(t._s(t.count))
                                                    ]),
                                                    t._v(" "),
                                                    i("el-button", {
                                                      attrs: {
                                                        type: "warning",
                                                        icon:
                                                          "el-icon-phone-outline",
                                                        circle: ""
                                                      },
                                                      on: {
                                                        click: function(e) {
                                                          return t.pronounce(
                                                            t.item.key
                                                          );
                                                        }
                                                      }
                                                    })
                                                  ],
                                                  1
                                                )
                                              ],
                                              1
                                            ),
                                            t._v(" "),
                                            i(
                                              "el-col",
                                              { attrs: { span: 16 } },
                                              [
                                                t.check
                                                  ? i(
                                                      "div",
                                                      [
                                                        i(
                                                          "el-row",
                                                          t._l(
                                                            t.answer,
                                                            function(e) {
                                                              return i(
                                                                "el-col",
                                                                {
                                                                  key: e.key,
                                                                  staticStyle: {
                                                                    "padding-top":
                                                                      "40px"
                                                                  },
                                                                  attrs: {
                                                                    span: 12
                                                                  }
                                                                },
                                                                [
                                                                  i(
                                                                    "el-radio",
                                                                    {
                                                                      attrs: {
                                                                        label: e
                                                                      },
                                                                      model: {
                                                                        value:
                                                                          t.radio,
                                                                        callback: function(
                                                                          e
                                                                        ) {
                                                                          t.radio = e;
                                                                        },
                                                                        expression:
                                                                          "radio"
                                                                      }
                                                                    },
                                                                    [
                                                                      t._v(
                                                                        t._s(e)
                                                                      )
                                                                    ]
                                                                  )
                                                                ],
                                                                1
                                                              );
                                                            }
                                                          ),
                                                          1
                                                        )
                                                      ],
                                                      1
                                                    )
                                                  : t._e()
                                              ]
                                            )
                                          ],
                                          1
                                        ),
                                        t._v(" "),
                                        i(
                                          "el-row",
                                          {
                                            staticStyle: {
                                              "padding-top": "40px"
                                            }
                                          },
                                          [
                                            i(
                                              "center",
                                              [
                                                i(
                                                  "el-button",
                                                  {
                                                    attrs: { type: "primary" },
                                                    on: {
                                                      click: function(e) {
                                                        return t.exampale();
                                                      }
                                                    }
                                                  },
                                                  [
                                                    i("i", {
                                                      staticClass:
                                                        "fas fa-forward"
                                                    })
                                                  ]
                                                )
                                              ],
                                              1
                                            )
                                          ],
                                          1
                                        )
                                      ],
                                      1
                                    )
                                  : i(
                                      "div",
                                      [
                                        i("center", [
                                          i("img", {
                                            staticClass: "image",
                                            attrs: { src: n("tK7a") }
                                          }),
                                          t._v(" "),
                                          i(
                                            "h3",
                                            {
                                              staticClass: "test",
                                              staticStyle: {
                                                "font-family":
                                                  "'Merriweather', serif"
                                              }
                                            },
                                            [t._v("code by vunm")]
                                          )
                                        ])
                                      ],
                                      1
                                    )
                              ])
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ])
              ],
              1
            );
          },
          staticRenderFns: []
        };
      var o = n("VU/8")(
        s,
        a,
        !1,
        function(t) {
          n("qs6A");
        },
        "data-v-bdaf1d18",
        null
      );
      e.default = o.exports;
    },
    xpK5: function(t, e) {
      t.exports =
        "data:image/jpeg;base64,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";
    },
    y8RO: function(t, e) {
      (e.__esModule = !0),
        (e.default = {
          el: {
            colorpicker: { confirm: "OK", clear: "Xóa" },
            datepicker: {
              now: "Hiện tại",
              today: "Hôm nay",
              cancel: "Hủy",
              clear: "Xóa",
              confirm: "OK",
              selectDate: "Chọn ngày",
              selectTime: "Chọn giờ",
              startDate: "Ngày bắt đầu",
              startTime: "Thời gian bắt đầu",
              endDate: "Ngày kết thúc",
              endTime: "Thời gian kết thúc",
              prevYear: "Năm ngoái",
              nextYear: "Năm tới",
              prevMonth: "Tháng trước",
              nextMonth: "Tháng sau",
              year: "",
              month1: "Tháng 1",
              month2: "Tháng 2",
              month3: "Tháng 3",
              month4: "Tháng 4",
              month5: "Tháng 5",
              month6: "Tháng 6",
              month7: "Tháng 7",
              month8: "Tháng 8",
              month9: "Tháng 9",
              month10: "Tháng 10",
              month11: "Tháng 11",
              month12: "Tháng 12",
              weeks: {
                sun: "CN",
                mon: "T2",
                tue: "T3",
                wed: "T4",
                thu: "T5",
                fri: "T6",
                sat: "T7"
              },
              months: {
                jan: "Th.1",
                feb: "Th.2",
                mar: "Th.3",
                apr: "Th.4",
                may: "Th.5",
                jun: "Th.6",
                jul: "Th.7",
                aug: "Th.8",
                sep: "Th.9",
                oct: "Th.10",
                nov: "Th.11",
                dec: "Th.12"
              }
            },
            select: {
              loading: "Đang tải",
              noMatch: "Dữ liệu không phù hợp",
              noData: "Không tìm thấy dữ liệu",
              placeholder: "Chọn"
            },
            cascader: {
              noMatch: "Dữ liệu không phù hợp",
              loading: "Đang tải",
              placeholder: "Chọn"
            },
            pagination: {
              goto: "Nhảy tới",
              pagesize: "/trang",
              total: "Tổng {total}",
              pageClassifier: ""
            },
            messagebox: {
              title: "Thông báo",
              confirm: "OK",
              cancel: "Hủy",
              error: "Dữ liệu không hợp lệ"
            },
            upload: {
              deleteTip: "Ấn Xóa để xóa file",
              delete: "Xóa",
              preview: "Xem trước",
              continue: "Tiếp tục"
            },
            table: {
              emptyText: "Không có dữ liệu",
              confirmFilter: "OK",
              resetFilter: "Làm mới",
              clearFilter: "Xóa hết",
              sumText: "Tổng"
            },
            tree: { emptyText: "Không có dữ liệu" },
            transfer: {
              noMatch: "Dữ liệu không phù hợp",
              noData: "Không tìm thấy dữ liệu",
              titles: ["Danh sách 1", "Danh sách 2"],
              filterPlaceholder: "Nhập từ khóa",
              noCheckedFormat: "{total} mục",
              hasCheckedFormat: "{checked}/{total} đã chọn "
            }
          }
        });
    },
    yh13: function(t, e) {},
    z3Jr: function(t, e) {}
  },
  ["NHnr"]
);
