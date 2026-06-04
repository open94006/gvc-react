/* eslint-disable */
// Global type declarations for third-party libraries loaded via CDN

declare const $: any;
declare const Swal: any;

// Augment Storage to allow dynamic properties
interface Storage {
  [key: string]: any;
}
