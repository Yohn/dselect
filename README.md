# dselect

Dropdown select box for bootstrap 5

[Demo](https://dselect.vercel.app)

## Features

- Placeholder
- Multiple (Tags)
- Search
- Creatable
- Clearable
- Sizing
- Validation
- Localization
- Images in dropdown menu


## Installation

Install dselect with npm

```bash
npm install @yohn/dselect
```

Install from cdn
```html
<link rel="stylesheet" href="https://unpkg.com/@yohn/dselect/dist/css/dselect.css">
<script src="https://unpkg.com/@yohn/dselect/dist/js/dselect.js"></script>
```
## Usage/Examples

```html
<select class="form-select" id="dselect-example">
    <option value="chrome">Chrome</option>
    <option value="firefox">Firefox</option>
    <option value="safari">Safari</option>
    <option value="edge">Edge</option>
    <option value="opera">Opera</option>
    <option value="brave">Brave</option>
</select>
```
```javascript
dselect(document.querySelector('#dselect-example'))
```
## Options

```javascript
const config = {
    search: false, // Toggle search feature. Default: false
    creatable: false, // Creatable selection. Default: false
    clearable: false, // Clearable selection. Default: false
    maxHeight: '360px', // Max height for showing scrollbar. Default: 360px
    size: '', // Can be "sm" or "lg". Default ''
    classTag: 'text-bg-dark bg-gradient', // a class to be added to the tag badges
    searchPlaceholder: 'Search..', // when search: true the placeholder in input box
    noResultsPlaceholder: 'No results found', // when search finds no results
    itemClass: '', // an additional css class to be added to each item within the dropdown menu
}
dselect(document.querySelector('#dselect-example'), config)
```

options can also be set in "data-dselect-*" attribute

```html
<select
  class="form-select" id="dselect-example"
  data-dselect-size="sm"
  data-dselect-search="true"
  data-dselect-creatable="true"
  data-dselect-clearable="true"
  data-dselect-item-class=""
  data-dselect-max-height="300px"
  data-dselect-class-tag="text-bg-dark bg-gradient"
  data-dselect-search-placeholder="Search.."
  data-dselect-no-results-placeholder="No results found">
    <option value="">Choose browser</option>
    <option data-dselect-img="imgs/chrome.svg" value="chrome">Chrome</option>
    <option data-dselect-img="imgs/firefox.svg" value="firefox">Firefox</option>
    <option data-dselect-img="imgs/safari.svg" value="safari">Safari</option>
    <option data-dselect-img="imgs/edge.svg" value="edge">Edge</option>
    <option data-dselect-img="imgs/opera.svg" value="opera">Opera</option>
    <option data-dselect-img="imgs/brave.svg" value="brave">Brave</option>
</select>
```
