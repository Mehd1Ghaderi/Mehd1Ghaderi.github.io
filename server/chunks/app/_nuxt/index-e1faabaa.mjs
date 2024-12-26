import { useSSRContext, defineComponent, mergeProps, withCtx, createVNode, unref, createTextVNode, openBlock, createBlock, createCommentVNode, ref, defineAsyncComponent } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from '../server.mjs';
import { g as getBreakpoints } from './useBreakpoints-60b227af.mjs';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'h3';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'ufo';
import 'defu';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'klona';
import 'ohash';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';

const _sfc_main$7 = {};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-around sm:grid sm:col-span-12 w-full max-w-[1440px] h-8 items-center" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/the-header/subtitle/container/HeaderSubtitleContainer.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$4]]);
const _sfc_main$6 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<span${ssrRenderAttrs(mergeProps({ class: "text-base-content text-sm sm:text-base" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</span>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/the-header/subtitle/HeaderSubtitle.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$5 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "rounded-full w-3 h-3 bg-red-500 animate-ping" }, _attrs))}></div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/icon/IconCircle.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$4 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full bg-base-content h-0.5 my-2 sm:my-4 -translate-x-full" }, _attrs))}></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/BaseDivider.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "TheHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const { smAndSmaller } = getBreakpoints();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TheHeaderSubtitleContainer = __nuxt_component_0;
      const _component_TheHeaderSubtitle = __nuxt_component_1$1;
      const _component_IconCircle = __nuxt_component_2;
      const _component_BaseDivider = __nuxt_component_3;
      _push(`<header${ssrRenderAttrs(mergeProps({
        id: "header",
        class: "fixed w-full h-24 sm:h-32 flex flex-col justify-center items-center bg-base-100 z-30 bg-base"
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_TheHeaderSubtitleContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!unref(smAndSmaller)) {
              _push2(ssrRenderComponent(_component_TheHeaderSubtitle, {
                id: "headSubOne",
                class: "opacity-0 col-start-2 col-span-3"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Mehdi Ghaderi`);
                  } else {
                    return [
                      createTextVNode("Mehdi Ghaderi")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_TheHeaderSubtitle, {
              id: "headSubTwo",
              class: ["flex gap-2 items-center opacity-0 justify-center", { "col-start-5 col-span-1": !unref(smAndSmaller) }]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_IconCircle, null, null, _parent3, _scopeId2));
                  _push3(` Busy / Arnitex `);
                } else {
                  return [
                    createVNode(_component_IconCircle),
                    createTextVNode(" Busy / Arnitex ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TheHeaderSubtitle, {
              id: "headSubThree",
              class: ["opacity-0", { "col-start-9 col-span-1": !unref(smAndSmaller) }]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Iran/Th`);
                } else {
                  return [
                    createTextVNode(" Iran/Th")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              !unref(smAndSmaller) ? (openBlock(), createBlock(_component_TheHeaderSubtitle, {
                key: 0,
                id: "headSubOne",
                class: "opacity-0 col-start-2 col-span-3"
              }, {
                default: withCtx(() => [
                  createTextVNode("Mehdi Ghaderi")
                ]),
                _: 1
              })) : createCommentVNode("", true),
              createVNode(_component_TheHeaderSubtitle, {
                id: "headSubTwo",
                class: ["flex gap-2 items-center opacity-0 justify-center", { "col-start-5 col-span-1": !unref(smAndSmaller) }]
              }, {
                default: withCtx(() => [
                  createVNode(_component_IconCircle),
                  createTextVNode(" Busy / Arnitex ")
                ]),
                _: 1
              }, 8, ["class"]),
              createVNode(_component_TheHeaderSubtitle, {
                id: "headSubThree",
                class: ["opacity-0", { "col-start-9 col-span-1": !unref(smAndSmaller) }]
              }, {
                default: withCtx(() => [
                  createTextVNode(" Iran/Th")
                ]),
                _: 1
              }, 8, ["class"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_BaseDivider, { id: "headDivider" }, null, _parent));
      _push(`</header>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/the-header/TheHeader.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative lg:grid lg:grid-cols-12 col-span-12 flex flex-col items-center justify-around sm:justify-center pt-24 sm:pt-32 h-screen sm:min-h-[80vh] align-bottom pb-12" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/main/MainContainer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MainTitle",
  __ssrInlineRender: true,
  setup(__props) {
    const title = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<h1${ssrRenderAttrs(mergeProps({
        id: "mainTitle",
        ref_key: "title",
        ref: title,
        class: "text-small text-[70px] leading-[4rem] sm:text-[120px] md:text-[155px] lg:text-[185px] sm:leading-[8.5rem] h-48 sm:h-96 text-base-content font-title font-semibold italic bg-clip-text text-clip [&>span:hover]:transition [&>span:hover]:scale-105 [&>span:hover]:!rotate-12 cursor-default select-none -translate-x-60 tracking-tighter lg:col-span-12 lg:col-start-3 flex-nowrap"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</h1>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/main/MainTitle.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3_lazy = /* @__PURE__ */ defineAsyncComponent(() => import('./FooterContact-60523e09.mjs').then((m) => m.default || m));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TheHeader = _sfc_main$3;
      const _component_MainContainer = __nuxt_component_1;
      const _component_MainTitle = _sfc_main$1;
      const _component_LazyFooterContact = __nuxt_component_3_lazy;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "!bg-red relative max-w-[1440px] w-full flex flex-col items-center" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_TheHeader, null, null, _parent));
      _push(`<main class="grid grid-cols-12 min-h-screen w-full flex-nowrap pb-12 sm:pb-32">`);
      _push(ssrRenderComponent(_component_MainContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_MainTitle, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_MainTitle)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</main><footer id="contact" class="relative flex flex-col justify-center items-center text-center z-30 h-screen">`);
      _push(ssrRenderComponent(_component_LazyFooterContact, null, null, _parent));
      _push(`</footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-e1faabaa.mjs.map
