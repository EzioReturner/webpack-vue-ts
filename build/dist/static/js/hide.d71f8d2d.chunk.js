(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"./client/views/introduction/index.module.scss":function(e,s,t){e.exports={colorful:"index.module__colorful--1mxWa",title:"index.module__title--2jbkh",view:"index.module__view--2d3hA"}},"./client/views/introduction/tsx.vue":function(e,s,t){"use strict";t.r(s);var n=t("./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js"),o=t("./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js"),l=t("./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js"),i=t("./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js"),r=t("./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js"),a=t("./node_modules/tslib/tslib.es6.js"),u=t("./node_modules/vue-property-decorator/lib/vue-property-decorator.js"),c=t("./client/views/introduction/index.module.scss"),d=t.n(c),p=function(e){function s(){var e;return Object(n.a)(this,s),(e=Object(l.a)(this,Object(i.a)(s).apply(this,arguments))).a=123,e.styles=d.a,e.templateCode="<script lang=\"tsx\">\nimport { Vue, Component, Prop } from 'vue-property-decorator';\nimport Test from './test.vue';\nimport styles from './index.module.scss';\n\n@Component\nclass Tsx extends Vue {\n  public a: number = 123;\n  public styles: any = styles;\n\n  render(h: any) {\n    return (\n      <div>\n        <div class={styles.view}>\n          <div class={styles.colorful}>tttttssssssxxxxxx</div>\n          <Test />\n        </div>\n      </div>\n    );\n  }\n}\nexport default Tsx;\n<\/script>",e}return Object(r.a)(s,e),Object(o.a)(s,[{key:"render",value:function(e){var s=this.templateCode,t=e("div",["test display!"]);return e("div",[e("h2",[e("span",{class:d.a.colorful},["&"])," Vue page use tsx"," "]),e("h3",{class:d.a.title,style:"margin-top:20px;"},[e("span",{class:d.a.colorful},[">"])," view"]),e("div",{class:d.a.view},[e("div",{class:d.a.colorful},["tttttssssssxxxxxx"]),t]),e("h3",{class:d.a.title,style:"margin-top:20px;"},[e("span",{class:d.a.colorful},[">"])," script"]),e("pre",{directives:[{name:"hljs",value:!0}]},[e("code",[s])])])}}]),s}(u.c),m=p=a.a([u.a],p),v=t("./node_modules/vue-loader/lib/runtime/componentNormalizer.js"),x=Object(v.a)(m,void 0,void 0,!1,null,null,null);x.options.__file="client/views/introduction/tsx.vue";s.default=x.exports}}]);