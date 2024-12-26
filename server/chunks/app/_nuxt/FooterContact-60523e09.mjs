import { _ as __nuxt_component_0$1 } from './BaseTitle-f9b00f4c.mjs';
import { useSSRContext, mergeProps, withCtx, createTextVNode, createVNode, defineAsyncComponent, renderSlot } from 'vue';
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
  const _component_BaseTitle = __nuxt_component_0$1;
  _push(ssrRenderComponent(_component_BaseTitle, mergeProps({ class: "footer-title uppercase text-6xl sm:text-9xl italic z-50 pb-12 !text-base-100" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "default")
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/footer/FooterTitle.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const __nuxt_component_1_lazy = /* @__PURE__ */ defineAsyncComponent(() => import('./FooterContactLinks-95f7563a.mjs').then((m) => m.default || m));
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_FooterTitle = __nuxt_component_0;
  const _component_LazyFooterContactLinks = __nuxt_component_1_lazy;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-12" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_FooterTitle, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Let&#39;s Work<br${_scopeId}> Together`);
      } else {
        return [
          createTextVNode("Let's Work"),
          createVNode("br"),
          createTextVNode(" Together")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_LazyFooterContactLinks, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/footer/contact/FooterContact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const FooterContact = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { FooterContact as default };
//# sourceMappingURL=FooterContact-60523e09.mjs.map
