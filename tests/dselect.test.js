/**
 * @
 *
 * jest
 * -environment
 * jsdom
 */

// Import functions to be tested
const { dselectUpdate, dselectRemoveTag, dselectSearch, dselectClear } = require('./../dist/js/dselect.min.js');

test('I need help building tests', () => {
	/**
	 * Any assistance with building tests would be amazing!
	 * We can use any testing platform that suits your needs,
	 * such as Jest, Mocha, or Cypress.
	 * I never user any javascript test scripts so
	 * if you know how, go ahead and please add!
	 */
  expect(true).toBeTruthy();
});

//? // Mock setup for DOM elements and events
//? beforeEach(() => {
//?   document.body.innerHTML = `
//?     <select id="example-select" data-dselect>
//?       <option value="1">Option 1</option>
//?       <option value="2">Option 2</option>
//?     </select>
//?     <div class="dselect-wrapper"></div>
//?   `;
//? });
//?
//? test('dselectUpdate updates select element', () => {
//?   const button = document.createElement('button');
//?   button.dataset.dselectValue = '2';
//?
//?   const classElement = 'dselect-wrapper';
//?   const classToggler = 'form-select';
//?
//?   dselectUpdate(button, classElement, classToggler);
//?
//?   const selectElement = document.querySelector('#example-select');
//?   expect(selectElement.value).toBe('2');
//? });
//?
//? test('dselectRemoveTag removes selected option', () => {
//?   const button = document.createElement('button');
//?   button.parentNode = { dataset: { dselectValue: '2' } };
//?
//?   const classElement = 'dselect-wrapper';
//?   const classToggler = 'form-select';
//?
//?   dselectRemoveTag(button, classElement, classToggler);
//?
//?   const selectElement = document.querySelector('#example-select');
//?   expect(selectElement.value).toBe('1');
//? });
//?
//? test('dselectSearch filters dropdown items', () => {
//?   const input = document.createElement('input');
//?   input.value = 'Option 2'; // Simulate typing in the search input
//?
//?   const classElement = 'dselect-wrapper';
//?   const classToggler = 'form-select';
//?   const creatable = false; // Set to match your expected behavior
//?
//?   const event = { key: 'Enter' }; // Simulate Enter key press
//?
//?   dselectSearch(event, input, classElement, classToggler, creatable);
//?
//?   const dropdownItems = document.querySelectorAll('.dropdown-item');
//?   expect(dropdownItems.length).toBe(1); // Verify only one item is visible after filtering
//? });
//?
//? test('dselectClear clears all selections', () => {
//?   const button = document.createElement('button');
//?
//?   const classElement = 'dselect-wrapper';
//?
//?   dselectClear(button, classElement);
//?
//?   const selectElement = document.querySelector('#example-select');
//?   const selectedOptions = Array.from(selectElement.options).filter(option => option.selected);
//?   expect(selectedOptions.length).toBe(0); // Verify no options are selected after clearing
//? });
