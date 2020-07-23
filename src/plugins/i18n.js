import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './lang/en.js';
import ru from './lang/ru.js';

Vue.use(VueI18n);
export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: en,
    ru: ru
  }
});