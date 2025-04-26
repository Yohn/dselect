# dselect

Dropdown select box for bootstrap 5.3.3

[Demo](https://yohn.github.io/dselect/)

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
npm i @skem9/dselect
```

Install from cdn
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Yohn/dselect@latest/dist/css/dselect.min.css">
<script src="https://cdn.jsdelivr.net/gh/Yohn/dselect@1.1.5/dist/js/dselect.min.js"></script>
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
    searchExtraclass: '', // extra class to be added to the search input
    noResultsPlaceholder: 'No results found', // when search finds no results
    addOptionPlaceholder: 'Press Enter to add "&lt;strong&gt;[searched-term]&lt;/strong&gt;"', // when creatable: true the help text under the search box
    itemClass: '', // an additional css class to be added to each item within the dropdown menu
}
dselect(document.querySelector('#dselect-example'), config)
```

## HTML Attributes
> [!NOTE]
> options can also be set in "data-dselect-*" attribute

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
  data-dselect-search-extra-class=""
  data-dselect-no-results-placeholder="No results found"
  data-dselect-add-option-placeholder="Press Enter to add new tag.">
    <option value="">Choose browser</option>
    <option data-dselect-img="imgs/chrome.svg" value="chrome">Chrome</option>
    <option data-dselect-img="imgs/firefox.svg" value="firefox">Firefox</option>
    <option data-dselect-img="imgs/safari.svg" value="safari">Safari</option>
    <option data-dselect-img="imgs/edge.svg" value="edge">Edge</option>
    <option data-dselect-img="imgs/opera.svg" value="opera">Opera</option>
    <option data-dselect-img="imgs/brave.svg" value="brave">Brave</option>
</select>
```
## Events
> [!NOTE]
> Attach event listeners to to the `<select>` id and it will work as expected.

```javascript
const select = document.document.getElementById('select-id')
select.addEventListener('change', () => {
  console.log(select.value)
})

// for multi select / tags
const multiple = document.querySelector('#example-multiple')
multiple.addEventListener('change', () => {
  const selectedValues = Array.from(multiple.selectedOptions)
    .map((option) => option.value);
  console.innerHTML = JSON.stringify(selectedValues);
})
```
