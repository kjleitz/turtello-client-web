import _ from 'underscore';
import Vue, { VNode } from 'vue';
import { BvToastOptions } from "bootstrap-vue";
import { joinSentences } from '@/concerns/utilities';

export function errorStringsFrom(original: any, defaultMsg = "Something went wrong"): string[] {
  if (!original) return [defaultMsg];
  if (typeof original === 'string') return [original];

  if (Array.isArray(original)) {
    const errorLists = original.map(item => errorStringsFrom(item, defaultMsg));
    return _.flatten(errorLists);
  }

  if (original.detail) return [original.detail];
  if (original.title) return [original.title];
  if (original.messages) return _.flatten([original.messages]);
  if (original.description) return [original.description];

  const extractedErrors = _.flatten([
    original.errors
    || original.error
    || original.data?.errors
    || original.data?.error
    || original.response?.data?.errors
    || original.response?.data?.error
    || defaultMsg,
  ]);

  return _.flatten(extractedErrors.map(item => errorStringsFrom(item, defaultMsg)));
}

export function toastError(this: Vue, reason: any, toastOptions: Partial<BvToastOptions> = {}): void {
  const errors = errorStringsFrom(reason);
  this.$bvToast.toast(joinSentences(errors), {
    title: "Oh no!",
    variant: 'danger',
    noAutoHide: true,
    appendToast: true,
    ...toastOptions,
  });
}

export function toastSuccess(this: Vue, message: string | VNode | VNode[], toastOptions: Partial<BvToastOptions> = {}): void {
  this.$bvToast.toast(message, {
    title: "Aw yeah!",
    variant: 'success',
    autoHideDelay: 5000,
    appendToast: true,
    ...toastOptions,
  });
}
