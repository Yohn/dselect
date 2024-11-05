function dselectUpdate(button, classElement, classToggler) {
  const value = button.dataset.dselectValue;
  const target = button.closest(`.${classElement}`).previousElementSibling;
  const toggler = target.nextElementSibling.getElementsByClassName(classToggler)[0];
  const input = target.nextElementSibling.querySelector("input");
  if (target.multiple) {
    Array.from(target.options).filter((option) => option.value === value)[0].selected = true;
  } else {
    target.value = value;
  }
  if (target.multiple) {
    toggler.click();
  }
  target.dispatchEvent(new Event("change"));
  toggler.focus();
  if (input) {
    input.value = "";
  }
}
function dselectRemoveTag(button, classElement, classToggler) {
  const value = button.parentNode.dataset.dselectValue;
  const target = button.closest(`.${classElement}`).previousElementSibling;
  const toggler = target.nextElementSibling.getElementsByClassName(classToggler)[0];
  const input = target.nextElementSibling.querySelector("input");
  Array.from(target.options).filter((option) => option.value === value)[0].selected = false;
  target.dispatchEvent(new Event("change"));
  toggler.click();
  if (input) {
    input.value = "";
  }
}
function dselectSearch(event, input, classElement, classToggler, creatable, localization) {
  const filterValue = input.value.toLowerCase().trim();
  const itemsContainer = input.nextElementSibling;
  const headers = Array.from(itemsContainer.querySelectorAll(".dropdown-header"));
  const items = Array.from(itemsContainer.querySelectorAll(".dropdown-item"));
  const noResults = itemsContainer.nextElementSibling;
  headers.forEach((header) => header.classList.add("d-none"));
  items.forEach((item) => {
    const filterText = item.textContent.toLowerCase();
    const isVisible = filterText.includes(filterValue);
    item.classList.toggle("d-none", !isVisible);
    if (isVisible) {
      let currentHeader = item.previousElementSibling;
      while (currentHeader && !currentHeader.classList.contains("dropdown-header")) {
        currentHeader.classList.remove("d-none");
        currentHeader = currentHeader.previousElementSibling;
      }
    }
  });
  headers.forEach((header) => {
    const filterText = header.textContent.toLowerCase();
    const isVisible = filterText.includes(filterValue);
    header.classList.toggle("d-none", !isVisible);
    if (isVisible) {
      let currentItem = header.nextElementSibling;
      while (currentItem && !currentItem.classList.contains("dropdown-header")) {
        currentItem.classList.remove("d-none");
        currentItem = currentItem.nextElementSibling;
      }
    }
  });
  const foundItems = items.filter((item) => !item.classList.contains("d-none") && !item.hasAttribute("hidden"));
  if (foundItems.length === 0) {
    noResults.classList.remove("d-none");
    itemsContainer.classList.add("d-none");
    if (creatable) {
      noResults.innerHTML = localization.replace("[searched-term]", input.value);
      if (event.key === "Enter") {
        const target = input.closest(`.${classElement}`).previousElementSibling;
        const toggler = target.nextElementSibling.querySelector(`.${classToggler}`);
        target.insertAdjacentHTML("afterbegin", `<option value="${input.value}" selected>${input.value}</option>`);
        target.dispatchEvent(new Event("change"));
        input.value = "";
        input.dispatchEvent(new Event("keyup"));
        toggler.click();
        toggler.focus();
      }
    }
  } else {
    noResults.classList.add("d-none");
    itemsContainer.classList.remove("d-none");
  }
}
function dselectClear(button, classElement) {
  const target = button.closest(`.${classElement}`).previousElementSibling;
  Array.from(target.options).forEach((option) => option.selected = false);
  target.dispatchEvent(new Event("change"));
}
function dselect(el, option = {}) {
  el.style.display = "none";
  const classElement = "dselect-wrapper";
  const classNoResults = "dselect-no-results";
  const classTagRemove = "dselect-tag-remove";
  const dselectClassTag = "dselect-tag";
  const classPlaceholder = "dselect-placeholder";
  const classClearBtn = "dselect-clear";
  const classTogglerClearable = "dselect-clearable";
  const defaultClassTag = `text-bg-dark bg-gradient`;
  const defaultSearch = false;
  const defaultCreatable = false;
  const defaultClearable = false;
  const defaultMaxHeight = "360px";
  const defaultSize = "";
  const defaultItemClass = "";
  const defaultSearchPlaceholder = "Search..";
  const defaultAddOptionPlaceholder = "Press Enter to add &quot;<strong>[searched-term]</strong>&quot;";
  const defaultNoResultsPlaceholder = "No results found";
  const search = attrBool("search") || option.search || defaultSearch;
  const creatable = attrBool("creatable") || option.creatable || defaultCreatable;
  const clearable = attrBool("clearable") || option.clearable || defaultClearable;
  const maxHeight = el.dataset.dselectMaxHeight || option.maxHeight || defaultMaxHeight;
  const classTagTemp = el.dataset.dselectClassTag || option.classTag || defaultClassTag;
  const classTag = `${dselectClassTag} ${classTagTemp}`;
  const searchPlaceholder = el.dataset.dselectSearchPlaceholder || option.searchPlaceholder || defaultSearchPlaceholder;
  const noResultsPlaceholder = el.dataset.dselectNoResultsPlaceholder || option.noResultsPlaceholder || defaultNoResultsPlaceholder;
  const addOptionPlaceholder = el.dataset.dselectAddOptionPlaceholder || option.addOptionPlaceholder || defaultAddOptionPlaceholder;
  const itemClass = el.dataset.dselectItemClass || option.ItemClass || defaultItemClass;
  const customSize = el.dataset.dselectSize || option.size || defaultSize;
  let size = customSize !== "" ? ` form-select-${customSize}` : "";
  const classToggler = `form-select${size}`;
  const searchInput = search ? `<input onkeydown="return event.key !== 'Enter'" onkeyup="dselectSearch(event, this, '${classElement}', '${classToggler}', ${creatable}, '${addOptionPlaceholder}')" type="text" class="form-control" placeholder="${searchPlaceholder}" autofocus>` : "";
  function attrBool(attr) {
    const attribute = `data-dselect-${attr}`;
    if (!el.hasAttribute(attribute))
      return null;
    const value = el.getAttribute(attribute);
    return value.toLowerCase() === "true";
  }
  function removePrev() {
    if (el.nextElementSibling && el.nextElementSibling.classList && el.nextElementSibling.classList.contains(classElement)) {
      el.nextElementSibling.remove();
    }
  }
  function isPlaceholder(option2) {
    return option2.getAttribute("value") === "";
  }
  function selectedTag(options, multiple) {
    if (multiple) {
      const selectedOptions = Array.from(options).filter((option2) => option2.selected && !isPlaceholder(option2));
      const placeholderOption = Array.from(options).filter((option2) => isPlaceholder(option2));
      let tag = [];
      if (selectedOptions.length === 0) {
        const text = placeholderOption.length ? placeholderOption[0].textContent : "&nbsp;";
        tag.push(`<span class="${classPlaceholder}">${text}</span>`);
      } else {
        for (const option2 of selectedOptions) {
          tag.push(`
            <div class="${classTag}" data-dselect-value="${option2.value}">
              ${option2.text}
              <svg onclick="dselectRemoveTag(this, '${classElement}', '${classToggler}')" class="${classTagRemove}" width="14" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>
            </div>
          `);
        }
      }
      return tag.join("");
    } else {
      const selectedOption = options[options.selectedIndex];
      return isPlaceholder(selectedOption) ? `<span class="${classPlaceholder}">${selectedOption.innerHTML}</span>` : selectedOption.innerHTML;
    }
  }
  function selectedText(options) {
    const selectedOption = options[options.selectedIndex];
    return isPlaceholder(selectedOption) ? "" : selectedOption.textContent;
  }
  function itemTags(options) {
    let items = [];
    for (const option2 of options) {
      if (option2.tagName === "OPTGROUP") {
        items.push(`<h6 class="dropdown-header">${option2.getAttribute("label")}</h6>`);
      } else {
        const hidden = isPlaceholder(option2) ? " hidden" : "";
        const active = option2.selected ? " active" : "";
        const disabled = option2.selected ? " disabled" : "";
        const disabledvalue = option2.getAttribute("disabled");
        const btnClass = itemClass === "" ? "" : " " + itemClass;
        let disableitem = "";
        if (disabledvalue !== null) {
          disableitem = "disabled='true'";
        } else {
          disableitem = "";
        }
        const value = option2.value;
        let text = option2.textContent;
        if (option2.hasAttribute("data-dselect-img") && option2.getAttribute("data-dselect-img").trim() !== "") {
          const img = option2.getAttribute("data-dselect-img").trim();
          let imgSize = "1rem";
          if (customSize == "sm") {
            imgSize = ".7rem";
          } else if (customSize == "lg") {
            imgSize = "1.2rem";
          }
          text = `<span class="d-flex align-items-center">
            <img src="${img}" style="max-height:${imgSize}; width:auto;">
            <span class="ps-2">${text}</span>
          </span>`;
        }
        items.push(`<button${hidden} class="dropdown-item${active}${btnClass}"  ${disableitem} data-dselect-value="${value}" type="button" onclick="dselectUpdate(this, '${classElement}', '${classToggler}')" ${disabled}>
          ${text}
        </button>`);
      }
    }
    items = items.join("");
    return items;
  }
  function createDom() {
    const autoclose = el.multiple ? ' data-bs-auto-close="outside"' : "";
    const additionalClass = Array.from(el.classList).filter((className) => {
      return className !== "form-select" && className !== "form-select-sm" && className !== "form-select-lg";
    }).join(" ");
    const clearBtn = clearable && !el.multiple ? `
    <button type="button" class="btn ${classClearBtn}" title="Clear selection" onclick="dselectClear(this, '${classElement}')">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none">
        <path d="M13 1L0.999999 13" stroke-width="2" stroke="currentColor"></path>
        <path d="M1 1L13 13" stroke-width="2" stroke="currentColor"></path>
      </svg>
    </button>
    ` : "";
    const template = `
    <div class="dropdown ${classElement} ${additionalClass}">
      <button class="${classToggler} ${!el.multiple && clearable ? classTogglerClearable : ""}" data-dselect-text="${!el.multiple && selectedText(el.options)}" type="button" data-bs-toggle="dropdown" aria-expanded="false"${autoclose}>
        ${selectedTag(el.options, el.multiple)}
      </button>
      <div class="dropdown-menu">
        <div class="d-flex flex-column">
          ${searchInput}
          <div class="dselect-items" style="max-height:${maxHeight};overflow:auto">
            ${itemTags(el.querySelectorAll("*"))}
          </div>
          <div class="${classNoResults} d-none">${noResultsPlaceholder}</div>
        </div>
      </div>
      ${clearBtn}
    </div>
    `;
    removePrev();
    el.insertAdjacentHTML("afterend", template);
    const dropdownElement = el.nextElementSibling;
    dropdownElement.addEventListener("shown.bs.dropdown", function() {
      const searchInput2 = this.querySelector('input[type="text"]');
      if (searchInput2) {
        searchInput2.focus();
      }
    });
  }
  createDom();
  function updateDom() {
    const dropdown = el.nextElementSibling;
    const toggler = dropdown.getElementsByClassName(classToggler)[0];
    const dSelectItems = dropdown.getElementsByClassName("dselect-items")[0];
    toggler.innerHTML = selectedTag(el.options, el.multiple);
    dSelectItems.innerHTML = itemTags(el.querySelectorAll("*"));
    if (!el.multiple) {
      toggler.dataset.dselectText = selectedText(el.options);
    }
  }
  el.addEventListener("change", updateDom);
}
if (typeof window !== "undefined") {
  window.dselectUpdate = dselectUpdate;
  window.dselectRemoveTag = dselectRemoveTag;
  window.dselectSearch = dselectSearch;
  window.dselectClear = dselectClear;
  window.dselect = dselect;
}
