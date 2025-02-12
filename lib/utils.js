"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateSkip = exports.paginatedPath = exports.getNextItem = exports.getPreviousItem = undefined;

var _get = require("lodash/fp/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getPreviousItem = exports.getPreviousItem = function getPreviousItem(items, index) {
  // If this is the first (or -1) element, there is no previous, so return
  // undefined
  if (index <= 0) {
    return;
  }

  // Get the previous element
  return (0, _get2.default)("[" + (index - 1) + "]", items);
};
var getNextItem = exports.getNextItem = function getNextItem(items, index) {
  // If this is the last element (or later), there is no previous, so return
  // undefined
  if (index >= items.length - 1) {
    return;
  }

  // Get the previous element
  return (0, _get2.default)("[" + (index + 1) + "]", items);
};

var paginatedPath = exports.paginatedPath = function paginatedPath(pathPrefix, pageNumber, numberOfPages, trailingSlash) {
  // If this page is less than zero (-1 for example), then it  it does not
  // exist, return an empty string.
  if (pageNumber < 0) {
    return "";
  }

  // If this page number (which is zero indexed) plus one is more than the total
  // number of pages, then this page does not exist, so return an empty string.
  if (pageNumber + 1 > numberOfPages) {
    return "";
  }

  // Calculate a path prefix either by calling `pathPrefix()` if it's a function
  // or simply using `pathPrefix` if it is a string.
  var prefix = typeof pathPrefix === "function" ? pathPrefix({ pageNumber: pageNumber, numberOfPages: numberOfPages }) : pathPrefix;

  // If first page
  if (pageNumber === 0) {
    //if single slash, return as is
    if (prefix === '/') return prefix;
    //else, check for trailingSlash
    return prefix + (trailingSlash ? "/" : "");
  }

  // Otherwise, add a slash and the number + 1. We add 1 because `pageNumber` is
  // zero indexed, but for human consuption, we want 1 indexed numbers.
  return (prefix !== "/" ? prefix : "") + "/" + (pageNumber + 1) + (trailingSlash ? "/" : "");
  // NOTE: If `pathPrefix` is a single slash (the index page) then we do not
  // want to output two slashes, so we omit it.
};

var calculateSkip = exports.calculateSkip = function calculateSkip(pageNumber, firstPageCount, itemsPerPage) {
  if (pageNumber === 0) {
    return 0;
  } else if (pageNumber === 1) {
    return firstPageCount;
  } else {
    return firstPageCount + itemsPerPage * (pageNumber - 1);
  }
};