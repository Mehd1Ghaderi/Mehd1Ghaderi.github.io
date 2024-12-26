import { _ as __nuxt_component_0 } from './nuxt-link-6bdec6f5.mjs';
import { useSSRContext, defineComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc, u as useRoute, a as useRouter } from '../server.mjs';
import { _ as __nuxt_component_0$1 } from './BaseTitle-f9b00f4c.mjs';
import { g as getBreakpoints } from './useBreakpoints-60b227af.mjs';
import 'ufo';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'h3';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
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
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<a${ssrRenderAttrs(mergeProps({ class: "badge w-full sm:w-48 relative hover:text-base-100 border-base-content text-base-content text-xl rounded-3xl cursor-pointer h-12 border flex justify-center items-center font-bold transition overflow-hidden z-10 outline-custom" }, _attrs))} data-v-d2aed941>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</a>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/BaseBadgeSlim.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-d2aed941"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const { lgAndSmaller } = getBreakpoints();
    const projects = {
      donuts: {
        title: "Donuts",
        description: `Donuts is a straightforward and user-friendly application designed to help users efficiently manage their tasks and notes. It allows for advanced task, project, and note management.`,
        tech: "TypeScript, Vue (Composition API, Pinia, Vue Router, VueUse, Vuelidate, VueDatePicker, VueDraggable), Vite, Firebase, Tailwind, DaisyUI, GSAP, Chart.js, ESLint, Prettier",
        live: "https://donuts-manager.netlify.app/",
        code: "https://github.com/aktyw/donuts",
        images: ["/img/donuts.webp", "/img/donuts-mobile.webp"],
        id: 0
      },
      memorize: {
        title: "Memorize",
        description: `Memory card game that includes some extra features. It's fully playable on mobile.`,
        tech: "Javascript, GSAP, Howler.js, CSS, HTML and Parcel. Written in OOP way.",
        live: "https://memorize-card.netlify.app/",
        code: "https://github.com/aktyw/memorize",
        images: ["/img/memorize.webp", "/img/memorize-mobile.webp"],
        id: 1
      },
      baryt: {
        title: "Restauracja Baryt",
        description: `Visual branding for a restaurant, which included creating a landing page with custom design, designing the logo, menu, flyers, and business cards.`,
        tech: `Javascript, SCSS, HTML, GSAP`,
        live: "https://restauracjabaryt.pl/",
        code: "https://github.com/aktyw/baryt",
        images: ["/img/baryt.webp", "/img/baryt-mobile.webp"],
        id: 2
      },
      countries: {
        title: "Countries REST API",
        description: "Challenge taken from frontendmentor.io - REST Countries API with color theme switcher",
        tech: "JavaScript, SCSS, HTML and Model-View-Controller (MVC) design pattern.",
        live: "https://countries-mvc.netlify.app/",
        code: "https://github.com/aktyw/rest-api-countries",
        images: ["/img/countries.webp", "/img/countries-mobile.webp"],
        id: 3
      }
    };
    const name = route.params.id;
    const handleCalcNextProject = () => {
      const currentProjectId = projects[name].id;
      const nextProjectId = (currentProjectId + 1) % Object.keys(projects).length === 0 ? 0 : currentProjectId + 1;
      return Object.keys(projects)[nextProjectId];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_BaseBadgeSlim = __nuxt_component_1;
      const _component_BaseTitle = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative sm:text-lg top-0 left-0 bg-base-100 [&>*]:text-base-content sm:h-screen flex flex-col gap-2 sm:gap-6 sm:p-24 w-full max-w-[1440px] overflow-y-auto" }, _attrs))} data-v-d339a0e2><div class="relative under-line" data-v-d339a0e2><div class="relative flex w-full justify-between py-2 sm:py-4" data-v-d339a0e2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        tabindex: "0",
        class: "under relative inline-block outline-none outline-custom cursor-pointer",
        onClick: ($event) => unref(router).back(),
        onKeyup: ($event) => unref(router).back()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Go back`);
          } else {
            return [
              createTextVNode("Go back")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "under hidden relative sm:inline-block outline-none outline-custom",
        to: { path: "/" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Arek Tywonek`);
          } else {
            return [
              createTextVNode("Arek Tywonek")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "under relative inline-block outline-none outline-custom",
        to: { path: `/projects/${handleCalcNextProject()}` },
        replace: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Next project`);
          } else {
            return [
              createTextVNode("Next project")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="flex flex-col lg:flex-row justify-between gap-4 sm:gap-12" data-v-d339a0e2><img class="relative max-h-36 lg:w-1/2 sm:max-h-[80vh] object-cover"${ssrRenderAttr("src", unref(lgAndSmaller) ? projects[unref(name)].images[1] : projects[unref(name)].images[0])} alt="Project presentation " data-v-d339a0e2><div data-v-d339a0e2><div class="flex flex-col justify-between items-center" data-v-d339a0e2><div class="flex flex-col gap-6 sm:gap-8" data-v-d339a0e2><p class="flex flex-wrap max-w-prose" data-v-d339a0e2>${ssrInterpolate(projects[unref(name)].description)}</p><p class="flex flex-wrap max-w-prose italic" data-v-d339a0e2>${ssrInterpolate(projects[unref(name)].tech)}</p><div class="flex flex-row gap-4 pb-8" data-v-d339a0e2>`);
      _push(ssrRenderComponent(_component_BaseBadgeSlim, {
        href: projects[unref(name)].code
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Code`);
          } else {
            return [
              createTextVNode(" Code")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_BaseBadgeSlim, {
        href: projects[unref(name)].live
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Live`);
          } else {
            return [
              createTextVNode("Live")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_BaseTitle, { class: "uppercase absolute text-[44px] sm:text-8xl lg:text-9xl sm:left-1/4 sm:absolute bottom-16 sm:right-64 flex justify-center" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(projects[unref(name)].title)}`);
          } else {
            return [
              createTextVNode(toDisplayString(projects[unref(name)].title), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/projects/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d339a0e2"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-f312eaf4.mjs.map
