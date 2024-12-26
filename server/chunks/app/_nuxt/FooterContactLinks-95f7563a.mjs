import { useSSRContext, mergeProps, withCtx, createTextVNode, defineAsyncComponent } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from '../server.mjs';
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

const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<a${ssrRenderAttrs(mergeProps({ class: "badge relative p-4 md:p-8 lg:p-12 w-full text-xl md:text-3xl lg:text-5xl cursor-pointer uppercase border-base-100 h-12 border rounded-[48px] text-base-100 flex justify-center items-center font-bold text-x transition overflow-hidden z-10 outline-custom" }, _attrs))} data-v-f1808aef>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</a>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/BaseBadge.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-f1808aef"]]);
const __nuxt_component_1_lazy = /* @__PURE__ */ defineAsyncComponent(() => import('./FooterCircle-0488d6a2.mjs').then((m) => m.default || m));
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_BaseBadge = __nuxt_component_0;
  const _component_LazyFooterCircle = __nuxt_component_1_lazy;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative pb-4" }, _attrs))}><div class="relative gap-4 flex flex-col z-20 text-base-100">`);
  _push(ssrRenderComponent(_component_BaseBadge, { href: "mailto:ghaderimahdi850@gmail.com" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`ghaderimahdi850@gmail.com`);
      } else {
        return [
          createTextVNode("ghaderimahdi850@gmail.com")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="flex flex-col gap-8 sm:gap-16 pb-16"><div class="flex gap-4 items-start justify-start">`);
  _push(ssrRenderComponent(_component_BaseBadge, { href: "https://t.me/ghaelpv" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`telegram `);
      } else {
        return [
          createTextVNode("telegram ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_BaseBadge, { href: "https://github.com/Mehd1ghaderi" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` github `);
      } else {
        return [
          createTextVNode(" github ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div>`);
  _push(ssrRenderComponent(_component_LazyFooterCircle, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/footer/contact/FooterContactLinks.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const FooterContactLinks = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { FooterContactLinks as default };
//# sourceMappingURL=FooterContactLinks-95f7563a.mjs.map
